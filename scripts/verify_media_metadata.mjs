/**
 * 视频直链真伪校验与多模态元数据探针 (Media Metadata Verifier)
 * 支持纯 Node.js HTTP HEAD 探活与浏览器端 HTMLVideoElement 零依赖探测
 */

import http from 'http';
import https from 'https';
import { URL } from 'url';

/**
 * 针对 OSS/CDN 直链发起二进制健康度检查
 * @param {string} videoUrl
 * @returns {Promise<{ alive: boolean, statusCode: number, sizeBytes: number, contentType: string }>}
 */
export async function verifyRemoteUrl(videoUrl) {
  return new Promise((resolve) => {
    try {
      const parsed = new URL(videoUrl);
      const client = parsed.protocol === 'https:' ? https : http;

      const req = client.request(
        parsed,
        { method: 'HEAD', headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } },
        (res) => {
          const statusCode = res.statusCode || 0;
          const sizeBytes = parseInt(res.headers['content-length'] || '0', 10);
          const contentType = res.headers['content-type'] || '';

          // 核心健康判断标准：200 OK 且体积大于 500KB
          const isHealthy = statusCode === 200 && sizeBytes > 500 * 1024;
          resolve({
            alive: isHealthy,
            statusCode,
            sizeBytes,
            sizeMB: (sizeBytes / (1024 * 1024)).toFixed(2),
            contentType
          });
        }
      );

      req.on('error', (err) => {
        resolve({ alive: false, error: err.message, statusCode: 0, sizeBytes: 0 });
      });

      req.setTimeout(8000, () => {
        req.destroy();
        resolve({ alive: false, error: 'Connection Timeout (8s)', statusCode: 408, sizeBytes: 0 });
      });

      req.end();
    } catch (e) {
      resolve({ alive: false, error: e.message, statusCode: 0, sizeBytes: 0 });
    }
  });
}

/**
 * 在浏览器/Puppeteer环境中执行的视频元数据提取代码片段
 */
export const BROWSER_SNIFFER_CODE = `
async function probeVideoMetadata(url) {
  return new Promise((resolve, reject) => {
    const v = document.createElement('video');
    v.crossOrigin = 'anonymous';
    v.preload = 'metadata';
    v.src = url;
    v.onloadedmetadata = () => {
      resolve({
        duration: v.duration,
        width: v.videoWidth,
        height: v.videoHeight,
        aspectRatio: (v.videoWidth / v.videoHeight).toFixed(2)
      });
    };
    v.onerror = (e) => reject(new Error('Video element failed to load'));
    setTimeout(() => reject(new Error('Probe timeout')), 10000);
  });
}
`;
