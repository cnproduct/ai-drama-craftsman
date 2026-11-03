#!/usr/bin/env node
/**
 * AI Drama Craftsman CLI 工具箱
 * 提供直链探测、播放器生成、分镜提示词转换的一键式命令行工具
 */

import fs from 'fs';
import path from 'path';
import { verifyRemoteUrl } from './verify_media_metadata.mjs';
import { generateDramaPlayer } from './build_series_player.mjs';
import { buildStandardVideoNode } from './canvas_controller.mjs';

const [,, cmd, ...args] = process.argv;

async function main() {
  switch (cmd) {
    case 'verify': {
      const url = args[0];
      if (!url) {
        console.error('用法: node scripts/cli.mjs verify <视频直链URL>');
        process.exit(1);
      }
      console.log(`🔍 正在探测直链状态: ${url}`);
      const res = await verifyRemoteUrl(url);
      console.log('探测结果:', res);
      break;
    }

    case 'player': {
      const [inputJson, outputHtml] = args;
      if (!inputJson) {
        console.error('用法: node scripts/cli.mjs player <分镜JSON文件路径> [输出HTML文件路径]');
        process.exit(1);
      }
      const data = JSON.parse(fs.readFileSync(inputJson, 'utf-8'));
      const outputPath = outputHtml || path.join(path.dirname(inputJson), 'player.html');
      generateDramaPlayer({
        title: data.seriesTitle ? `${data.seriesTitle} - 第${data.sceneIndex}场` : (data.title || '短剧连播播放器'),
        description: data.sceneName || data.description || '',
        videos: (data.shots || data.videos || []).map(s => ({
          id: s.nodeId || s.id,
          title: s.title,
          duration: `${s.duration || 9}s`,
          url: s.url || '',
          prompt: s.prompt
        })),
        outputPath
      });
      break;
    }

    case 'prompt': {
      const rawPrompt = args.join(' ');
      if (!rawPrompt) {
        console.error('用法: node scripts/cli.mjs prompt "<场景与动作描述>"');
        process.exit(1);
      }
      const node = buildStandardVideoNode({
        id: 'v-preview',
        title: '分镜生成预览',
        prompt: rawPrompt,
        speakingAction: true
      });
      console.log('--- 工业级正向提示词 (Positive Prompt) ---');
      console.log(node.data.prompt);
      console.log('\n--- 工业级去字幕负向提示词 (Negative Prompt) ---');
      console.log(node.data.negativePrompt);
      break;
    }

    default:
      console.log(`
🎬 AI Drama Craftsman CLI 工具箱使用说明:
  node scripts/cli.mjs verify <URL>               # 探测视频直链真伪与体积 (200 OK & >500KB)
  node scripts/cli.mjs player <input.json> [out]   # 根据分镜 JSON 自动构建连播 HTML 播放器
  node scripts/cli.mjs prompt "<描述>"             # 快速将台词转化为零字幕+张嘴口型提示词
      `);
      break;
  }
}

main().catch(err => {
  console.error('❌ 执行异常:', err.message);
  process.exit(1);
});
