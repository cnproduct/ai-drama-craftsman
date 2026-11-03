/**
 * LibTV 画布 React Flow 拓扑控制器 (Canvas Topology Controller)
 * 封装节点创建、参数注入、资产连线与 React Fiber 穿透交互
 */

import fs from 'fs';
import path from 'path';

/**
 * 标准 5 卡参考图配置结构
 */
export const DEFAULT_ASSET_HANDLES = [
  { handle: 'ref-1', desc: '主角1面容与服装资产' },
  { handle: 'ref-2', desc: '主角2面容与服装资产' },
  { handle: 'ref-3', desc: '场景环境与光影资产' },
  { handle: 'ref-4', desc: '核心道具资产' },
  { handle: 'ref-5', desc: '运镜与风格资产' }
];

/**
 * 组装符合工业级去字幕与张嘴口型标准的节点参数
 * @param {Object} options
 * @returns {Object} 节点数据
 */
export function buildStandardVideoNode({
  id,
  title,
  prompt,
  speakingAction = true,
  objectExclusions = [],
  ratio = '9:16',
  duration = 9,
  position = { x: 6500, y: 1000 }
}) {
  // 1. 注入张嘴口型描述
  let enrichedPrompt = prompt;
  if (speakingAction && !prompt.includes('mouth') && !prompt.includes('嘴')) {
    enrichedPrompt = `${prompt}, (mouth naturally opens and closes speaking, animated jaw motion, expressive talking gestures, lively facial performance)`;
  }

  // 2. 注入 9:16 构图
  enrichedPrompt = `${enrichedPrompt}, 9:16 vertical composition, cinematic high dynamic range, photorealistic masterpiece`;

  // 3. 组装标准去字幕负向词
  const defaultNegatives = [
    'subtitles', 'subtitle bar', 'text', 'words', 'watermark', 'caption',
    'typography', 'Chinese characters', 'black bar at bottom', 'banner',
    'title', 'font', 'letters', 'credits', 'UI', 'interface', 'logo',
    'distorted face', 'static mouth', 'closed lips talking'
  ];
  const allNegatives = [...defaultNegatives, ...objectExclusions].join(', ');

  return {
    id,
    type: 'video',
    position,
    data: {
      title,
      prompt: enrichedPrompt,
      negativePrompt: allNegatives,
      ratio,
      duration: [4, 9, 14].includes(duration) ? duration : 9,
      model: 'Seedance 2.0 fast',
      status: 'idle',
      progress: 0,
      url: []
    }
  };
}

/**
 * 生成 5 节点连线拓扑
 */
export function createReferenceEdges(newNodeId, assetNodeIds = {}) {
  const edges = [];
  const keys = ['char1', 'char2', 'scene', 'props', 'style'];
  keys.forEach((key, index) => {
    const sourceId = assetNodeIds[key];
    if (sourceId) {
      edges.push({
        id: `e-${key}-${newNodeId}`,
        source: sourceId,
        target: newNodeId,
        sourceHandle: 'output',
        targetHandle: `ref-${index + 1}`
      });
    }
  });
  return edges;
}

console.log('✅ Canvas Controller 核心模块加载完成');
