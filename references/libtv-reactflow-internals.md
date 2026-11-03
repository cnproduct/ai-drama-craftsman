# LibTV 画布 React Flow 底层机制与自动化穿透指南

> 本文档揭示 LibTV 网页端画布前端渲染架构、React Flow 核心数据拓扑、节点生命周期管理与自动化操控深度技术。

---

## 1. LibTV 画布核心架构概览

LibTV 画布（Canvas）是基于 **React Flow** 构建的可视化节点图编辑器，其 URL 规则为：
```text
https://www.liblib.tv/canvas?spaceId={spaceId}&projectId={projectId}
```

### 核心架构层级：
1. **视图层 (View Layer)**：
   - React Flow 容器 (`.react-flow`)：负责缩放 (Zoom)、拖拽 (Pan) 与视口变换。
   - 节点图元 (`.react-flow__node`)：各类资产、提示词卡片与模型渲染器。
   - 连线图元 (`.react-flow__edge`)：数据流向与参考图输入连线。
2. **状态层 (State Layer)**：
   - 基于 Zustand / Redux / Context 的拓扑图存储（维护 `nodes` 数组与 `edges` 数组）。
3. **引擎调度层 (Execution Engine)**：
   - 触发任务时，前端将图拓扑序列化为 DAG（有向无环图），向后端提交生成工作流。

---

## 2. 节点核心数据模型 (Node Schema)

在 LibTV 中，视频生成节点（Video Generator Node）的内部结构如下：

```json
{
  "id": "v-YSSg5bmNsd",
  "type": "video",
  "position": {
    "x": 6500,
    "y": 1420
  },
  "data": {
    "title": "第6节：阿福保证安排_无字幕对白版",
    "prompt": "阿福满脸忠诚，拍着胸脯保证...",
    "negativePrompt": "subtitles, text, words, watermark...",
    "ratio": "9:16",
    "duration": 9,
    "model": "Seedance 2.0 fast",
    "status": "completed",
    "progress": 100,
    "url": [
      "https://liblibai-online.oss-cn-beijing.aliyuncs.com/media/xxx/final.mp4"
    ]
  }
}
```

### 关键字段解析：
- `id`: 全局唯一标识，以 `v-` 开头的为视频节点，以 `img-` 开头的为图像/资产节点。
- `position.x / y`: 画布坐标。短剧工业化排版通常将场次纵向垂直排列（固定 X，Y 逐节递增），或横向时间线排列（固定 Y，X 逐节递增）。
- `data.duration`: 仅接受 `4`、`9`、`14`。
- `data.url`: 生成成功后的视频直链数组。**提取有效视频直链必须优先读取 `data.url[0]`**。

---

## 3. React Flow 虚拟化与 React Fiber 穿透方案

### 3.1 视口虚拟化机制
当画布包含 30 个以上节点时，屏幕外节点将被自动 unmount（从 DOM 中删除），常规 `document.querySelector` 会失效。

### 3.2 穿透操控实现代码

```javascript
// 获取 React Flow 实例
function getReactFlowInstance() {
  const container = document.querySelector('.react-flow');
  if (!container) return null;
  
  // 遍历寻找 React Fiber 内部属性
  const fiberKey = Object.keys(container).find(k => 
    k.startsWith('__reactFiber$') || k.startsWith('__reactInternalInstance$')
  );
  if (!fiberKey) return null;
  
  // 向上攀爬或直接在 props 中获取
  let fiber = container[fiberKey];
  while (fiber) {
    if (fiber.memoizedProps && fiber.memoizedProps.nodes) {
      return fiber.memoizedProps;
    }
    fiber = fiber.return;
  }
  return null;
}

// 快速视口定位（让节点重回 DOM 视口）
function focusNode(nodeId) {
  const rf = getReactFlowInstance();
  if (!rf) return false;
  
  const node = rf.nodes.find(n => n.id === nodeId);
  if (node && window.__reactFlowInstance) {
    window.__reactFlowInstance.setCenter(node.position.x, node.position.y, {
      zoom: 0.85,
      duration: 200
    });
    return true;
  }
  return false;
}
```

---

## 4. 自动化创建节点与连线协议 (Graph Topology Automation)

### 4.1 节点新建与布局计算公式
为避免节点相互重叠碰撞，自动化工具应计算尾部节点的坐标并施加安全偏移量：
$$X_{\text{new}} = X_{\text{prev}}$$
$$Y_{\text{new}} = Y_{\text{prev}} + \Delta Y \quad (\text{其中推荐 } \Delta Y = 480\text{px})$$

### 4.2 资产参考卡拓扑连线 (Edges Injection)
向 `edges` 注入 5 条标准连接，源句柄（sourceHandle）连接至视频生成输入句柄（targetHandle）：
```javascript
const newEdges = [
  { id: `e-char1-${newNodeId}`, source: 'img-lin-character', target: newNodeId, targetHandle: 'ref-1' },
  { id: `e-char2-${newNodeId}`, source: 'img-afu-character', target: newNodeId, targetHandle: 'ref-2' },
  { id: `e-scene-${newNodeId}`, source: 'img-current-scene', target: newNodeId, targetHandle: 'ref-3' },
  { id: `e-props-${newNodeId}`, source: 'img-key-props', target: newNodeId, targetHandle: 'ref-4' },
  { id: `e-style-${newNodeId}`, source: 'img-style-preset', target: newNodeId, targetHandle: 'ref-5' }
];
```
注入后调用 `rf.onEdgesChange` 提交，画布即刻显现实时连线，并完整保留角色面貌特征。
