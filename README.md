# AI Drama Craftsman (AI 短剧全流程工业级智造引擎)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Platform](https://img.shields.io/badge/Platform-LibTV%20%7C%20Seedance-blue.svg)](https://www.liblib.tv)
[![Format](https://img.shields.io/badge/Format-9%3A16%20Vertical-green.svg)](#)
[![Status](https://img.shields.io/badge/Status-Production%20Ready-brightgreen.svg)](#)

> **基于《爆笑变形记》（7大场次、60个镜头、13分钟全链路）实战全量成功交付经验与全部避坑技术攻坚沉淀。**
> 
> 提供从文学剧本切分、9:16电影级提示词工程、显式张嘴口型控制、零字幕纯净视觉底片规范、LibTV React Flow画布底层穿透控制，到自动化任务监控与工业级连播播放器生成的全套开箱即用解决方案。

---

## 🌟 核心突破与特性 (Key Highlights)

- 🚫 **绝对零字幕纯净视觉底片 (Zero-Subtitle Protocol)**：独创“语义去词元化”与负向词强效封锁机制，彻底根除画面长出黑条中文字幕与乱码字体的顽疾，为后期统一配音字幕铺路。
- 🗣️ **显式张嘴对白口型控制 (Lip-Sync Dynamic Action)**：通过下颌与唇部运动指令注入，告别 AI 视频角色“面瘫闭嘴”，让画面动作与后期配音严丝合缝。
- 🎯 **农产品/关键道具物种锁死 (Object Anti-Confusion)**：解决大模型“在果园自动生成红苹果而非金黄脐橙”的预训练偏见，实现 100% 正确的物种一致性。
- ⚡ **React Flow 拓扑内存级穿透 (React Fiber Bypass)**：彻底攻克 60+ 复杂节点场景下视口虚拟化 DOM 销毁（Unmount）导致无法自动化控制的行业难题。
- 🛡️ **直链 404 哈希溯源探活 (OSS/CDN Integrity Probe)**：自带 HEAD/GET 双重二进制探测器，杜绝历史缓存与失效链接。
- 🎬 **多镜头连续连播播放器引擎 (Series Player Engine)**：自动化生成高颜值、支持直链一键下载、全屏切换、无缝下一镜播放与倍速调节的独立 HTML 播放器。

---

## 📊 实战交付大盘：《爆笑变形记》全剧 7 大场次

| 场次 | 场景主题 | 镜头数 | 实测时长 | 关键攻坚点 |
| :--- | :--- | :--- | :--- | :--- |
| **场次一** | 豪门逐子：总裁断绝关系与百亿卡冻结 | 10 节 | 114 秒 | 100% 满分直链探活，毫秒级连播 |
| **场次二** | 投奔发小：阿福豪言安排与秘密密谋 | 6 节 | 66 秒 | 第 6 节重拍攻克字幕黑条，口型丝滑 |
| **场次三** | 荒诞上路：拖拉机颠簸与乡村变形记 | 7 节 | 81 秒 | 彻底解决中间态 404 哈希漂移失效 |
| **场次四** | 变形受难：插秧栽倒、挑粪惨败与偷鸡 | 20 节 | 258 秒 | 20 镜头连续剧情长片工业级拓扑编排 |
| **场次五** | 商业觉醒：村头召集大会与村民对峙 | 6 节 | 68 秒 | 全量重拍实现全员张嘴说话、神态激昂 |
| **场次六** | 橙山逆袭：电商直播带货与脐橙丰收 | 5 节 | 59 秒 | 第 4 节重拍将红苹果彻底置换为赣南脐橙 |
| **场次七** | 巅峰归来：五年重逢、父子和解大结局 | 6 节 | 66 秒 | 豪车接驾、情感高潮、大结局圆满收尾 |

> **总计**：全剧 7 场、60 个镜头、总时长 12 分 42 秒。100% 采用 9:16 竖屏高保真呈现。

---

## 📁 目录架构 (Repository Structure)

```text
ai-drama-craftsman/
├── SKILL.md                          # Antigravity 官方标准化技能规范入口
├── README.md                         # 项目核心架构与实战指引（本文档）
├── LICENSE                           # MIT 开源授权协议
├── references/                       # 核心技术资产与深度避坑指南
│   ├── troubleshooting-guide.md      # 《AI短剧全流程工业级出片深度避坑与排错手册》
│   ├── prompt-engineering-rules.md   # 《短剧分镜提示词工业级工程规范》
│   ├── libtv-reactflow-internals.md  # 《LibTV 画布 React Flow 底层机制与虚拟化穿透指南》
│   └── full-drama-blueprint.md       # 《爆笑变形记》全剧 7 场 60 镜头实战档案
├── scripts/                          # 核心自动化工具箱（纯 ESM 规范）
│   ├── canvas_controller.mjs         # 画布节点创建、连线与参数注入控制器
│   ├── poll_task_monitor.mjs         # 自动化异步长任务状态机智能轮询
│   ├── verify_media_metadata.mjs     # 视频直链真伪校验与元数据探针
│   └── build_series_player.mjs       # 短剧多镜头连续连播播放器生成引擎
└── examples/                         # 范例资产与模板
    ├── scene_templates/              # 工业化分镜 JSON 配置模板
    └── sample_players/               # 样例播放器产物
```

---

## 🛠️ 快速上手 (Quick Start)

### 1. 安装与准备
```bash
git clone https://github.com/cnproduct/libtv-ai-drama-generator.git
cd libtv-ai-drama-generator
```

### 2. 生成符合工业级无字幕与口型标准的节点参数
```javascript
import { buildStandardVideoNode } from './scripts/canvas_controller.mjs';

const node = buildStandardVideoNode({
  id: 'v-demo-01',
  title: '第1节：主角震惊',
  prompt: '林天豪满脸错愕，猛然转头',
  speakingAction: true,               // 自动注入张嘴口型
  objectExclusions: ['apple', 'cars'],// 道具/物种排他性过滤
  duration: 9
});
```

### 3. 一键生成独立连播 HTML 播放器
```javascript
import { generateDramaPlayer } from './scripts/build_series_player.mjs';

generateDramaPlayer({
  title: '爆笑变形记 - 第一场',
  videos: [
    { id: 'v-1', title: '逐出家门', duration: '9s', url: 'https://.../1.mp4' },
    { id: 'v-2', title: '黑卡冻结', duration: '9s', url: 'https://.../2.mp4' }
  ],
  outputPath: './output_player.html'
});
```

---

## 📖 必读避坑指南

出片前请务必阅读我们的排错手册：
- **[避坑 1：画面长出中文字幕与黑条的终极解法](references/troubleshooting-guide.md#避坑-1画面自动长出黑条中文字幕与乱码字体)**
- **[避坑 2：角色面瘫闭嘴、后期对白脱节的解决之道](references/troubleshooting-guide.md#避坑-2角色面瘫闭嘴后期对白无法贴合口型)**
- **[避坑 3：果园长出红苹果？道具物种混淆规避指南](references/troubleshooting-guide.md#避坑-3关键农产品道具物种混淆红苹果误现脐橙果园)**
- **[避坑 4：视频直链 404 失效与哈希版本漂移治理](references/troubleshooting-guide.md#避坑-4视频直链-404-失效与-osscdn-哈希漂移)**
- **[避坑 5：React Flow 画布远距虚拟化节点 DOM 销毁穿透指南](references/troubleshooting-guide.md#避坑-5react-flow-画布远距虚拟化节点-dom-销毁-unmount)**

---

## 📄 开源许可证

本项目基于 [MIT License](LICENSE) 开源发布。欢迎 Star ⭐️ 与 Pull Request！
