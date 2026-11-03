/**
 * 工业级短剧多镜头连续连播播放器生成引擎 (Build Series Player)
 * 生成自包含、高颜值、支持直链下载、全屏与下一集自动切换的 HTML 播放器
 */

import fs from 'fs';
import path from 'path';

/**
 * 渲染全功能 HTML 播放器
 * @param {Object} options
 * @param {string} options.title 剧名/场次标题
 * @param {string} options.description 场次剧情简介
 * @param {Array<{ id: string, title: string, duration: string, url: string, prompt?: string }>} options.videos 镜头列表
 * @param {string} options.outputPath 输出文件路径
 */
export function generateDramaPlayer({ title, description, videos, outputPath }) {
  const videoDataJson = JSON.stringify(videos, null, 2);

  const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} - 工业级短剧连续播放器</title>
  <style>
    :root {
      --primary: #f59e0b;
      --bg: #0b0f19;
      --panel: #111827;
      --text: #f3f4f6;
      --text-muted: #9ca3af;
      --border: #1f2937;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: var(--bg);
      color: var(--text);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
    header {
      background: rgba(17, 24, 39, 0.8);
      backdrop-filter: blur(12px);
      padding: 16px 24px;
      border-bottom: 1px solid var(--border);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    header h1 { font-size: 20px; font-weight: 700; color: #fff; display: flex; align-items: center; gap: 8px; }
    .badge {
      font-size: 11px;
      background: rgba(245, 158, 11, 0.15);
      color: var(--primary);
      padding: 3px 8px;
      border-radius: 999px;
      border: 1px solid rgba(245, 158, 11, 0.3);
    }
    .layout {
      flex: 1;
      display: flex;
      gap: 20px;
      padding: 20px;
      max-width: 1400px;
      margin: 0 auto;
      width: 100%;
    }
    .player-stage {
      flex: 1.2;
      display: flex;
      flex-direction: column;
      align-items: center;
      background: #000;
      border-radius: 16px;
      border: 1px solid var(--border);
      overflow: hidden;
      box-shadow: 0 20px 40px rgba(0,0,0,0.5);
      position: relative;
    }
    .video-wrapper {
      position: relative;
      width: 100%;
      height: 680px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #000;
    }
    video {
      width: 100%;
      height: 100%;
      object-fit: contain;
      aspect-ratio: 9 / 16;
    }
    .player-controls {
      width: 100%;
      background: var(--panel);
      padding: 14px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid var(--border);
    }
    .btn-group { display: flex; gap: 10px; align-items: center; }
    button {
      background: #1f2937;
      color: #fff;
      border: 1px solid #374151;
      padding: 8px 14px;
      border-radius: 8px;
      cursor: pointer;
      font-size: 13px;
      font-weight: 500;
      transition: all 0.2s;
    }
    button:hover { background: #374151; border-color: var(--primary); }
    button.active { background: var(--primary); color: #000; border-color: var(--primary); font-weight: 600; }
    .sidebar {
      flex: 1;
      background: var(--panel);
      border-radius: 16px;
      border: 1px solid var(--border);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      max-height: 750px;
    }
    .sidebar-header {
      padding: 16px;
      border-bottom: 1px solid var(--border);
      font-weight: 600;
      display: flex;
      justify-content: space-between;
    }
    .playlist {
      flex: 1;
      overflow-y: auto;
      padding: 12px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .shot-card {
      background: #1f2937;
      border: 1px solid #374151;
      border-radius: 10px;
      padding: 12px 14px;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      transition: all 0.2s;
    }
    .shot-card:hover { border-color: #4b5563; transform: translateX(2px); }
    .shot-card.active { border-color: var(--primary); background: rgba(245, 158, 11, 0.08); }
    .shot-info h4 { font-size: 14px; margin-bottom: 4px; color: #fff; }
    .shot-info p { font-size: 12px; color: var(--text-muted); }
    .download-pill {
      font-size: 11px;
      color: var(--primary);
      text-decoration: none;
      border: 1px solid rgba(245, 158, 11, 0.3);
      padding: 4px 8px;
      border-radius: 6px;
      transition: 0.2s;
    }
    .download-pill:hover { background: var(--primary); color: #000; }
  </style>
</head>
<body>
  <header>
    <h1>🎬 ${title} <span class="badge">9:16 竖屏短剧</span></h1>
    <div style="font-size: 13px; color: var(--text-muted);">共 ${videos.length} 镜头 · 零字幕纯净底片 · 口型自适应</div>
  </header>

  <div class="layout">
    <div class="player-stage">
      <div class="video-wrapper">
        <video id="mainVideo" controls autoplay playsinline preload="auto"></video>
      </div>
      <div class="player-controls">
        <div class="btn-group">
          <button id="prevBtn">⏮ 上一镜</button>
          <button id="nextBtn">下一镜 ⏭</button>
          <button id="loopBtn">🔁 连续自动播: 开</button>
        </div>
        <div class="btn-group">
          <button class="speedBtn active" data-speed="1">1.0x</button>
          <button class="speedBtn" data-speed="1.25">1.25x</button>
          <button class="speedBtn" data-speed="1.5">1.5x</button>
          <a id="currDownload" href="#" target="_blank" download class="download-pill" style="padding: 7px 12px;">⬇️ 下载本镜</a>
        </div>
      </div>
    </div>

    <div class="sidebar">
      <div class="sidebar-header">
        <span>分镜播放列表 (全剧集)</span>
        <span style="font-size: 12px; color: var(--text-muted);">点击即播</span>
      </div>
      <div class="playlist" id="playlist"></div>
    </div>
  </div>

  <script>
    const videos = ${videoDataJson};
    let currentIndex = 0;
    let autoNext = true;

    const mainVideo = document.getElementById('mainVideo');
    const playlistEl = document.getElementById('playlist');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const loopBtn = document.getElementById('loopBtn');
    const currDownload = document.getElementById('currDownload');

    function renderList() {
      playlistEl.innerHTML = '';
      videos.forEach((v, idx) => {
        const item = document.createElement('div');
        item.className = 'shot-card' + (idx === currentIndex ? ' active' : '');
        item.innerHTML = \`
          <div class="shot-info">
            <h4>\${idx + 1}. \${v.title}</h4>
            <p>时长: \${v.duration || '9s'} · 节点: \${v.id}</p>
          </div>
          <a href="\${v.url}" target="_blank" download class="download-pill" onclick="event.stopPropagation()">下载直链</a>
        \`;
        item.onclick = () => playIndex(idx);
        playlistEl.appendChild(item);
      });
    }

    function playIndex(index) {
      if (index < 0 || index >= videos.length) return;
      currentIndex = index;
      const target = videos[currentIndex];
      mainVideo.src = target.url;
      currDownload.href = target.url;
      currDownload.setAttribute('download', (target.title || 'shot') + '.mp4');
      mainVideo.play().catch(e => console.log('Autoplay prevented:', e));
      renderList();
    }

    mainVideo.onended = () => {
      if (autoNext) {
        if (currentIndex < videos.length - 1) {
          playIndex(currentIndex + 1);
        } else {
          playIndex(0); // 循环回到第一个
        }
      }
    };

    prevBtn.onclick = () => playIndex(Math.max(0, currentIndex - 1));
    nextBtn.onclick = () => playIndex((currentIndex + 1) % videos.length);
    loopBtn.onclick = () => {
      autoNext = !autoNext;
      loopBtn.textContent = autoNext ? '🔁 连续自动播: 开' : '⏹ 连续自动播: 关';
      loopBtn.classList.toggle('active', autoNext);
    };

    document.querySelectorAll('.speedBtn').forEach(btn => {
      btn.onclick = () => {
        document.querySelectorAll('.speedBtn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        mainVideo.playbackRate = parseFloat(btn.dataset.speed);
      };
    });

    renderList();
    if (videos.length > 0) playIndex(0);
  </script>
</body>
</html>`;

  fs.writeFileSync(outputPath, html, 'utf8');
  console.log(`✅ 连播播放器生成完毕: ${outputPath}`);
}
