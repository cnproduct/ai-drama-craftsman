/**
 * LibTV 视频生成长任务智能监控器 (Task Monitor)
 * 具备自适应轮询、超时熔断、状态机解析与直链捕获
 */

export class VideoTaskMonitor {
  /**
   * @param {Object} options
   * @param {Function} options.fetchStatusFn 获取当前任务/节点状态的异步回调函数
   * @param {number} [options.intervalMs=5000] 轮询间隔
   * @param {number} [options.timeoutMs=600000] 超时时间（默认10分钟）
   */
  constructor({ fetchStatusFn, intervalMs = 5000, timeoutMs = 600000 }) {
    this.fetchStatusFn = fetchStatusFn;
    this.intervalMs = intervalMs;
    this.timeoutMs = timeoutMs;
  }

  /**
   * 开始监控直到任务完成或失败
   */
  async waitUtilComplete(taskOrNodeId) {
    const startTime = Date.now();
    console.log(`[TaskMonitor] 开始监控节点/任务: ${taskOrNodeId}...`);

    while (Date.now() - startTime < this.timeoutMs) {
      try {
        const state = await this.fetchStatusFn(taskOrNodeId);
        const progress = state?.progress ?? 0;
        const status = state?.status ?? 'unknown';

        console.log(`[TaskMonitor] [${new Date().toLocaleTimeString()}] 状态: ${status} | 进度: ${progress}%`);

        if (status === 'completed' || status === 'success' || (state?.urls && state.urls.length > 0)) {
          console.log(`🎉 [TaskMonitor] 节点 ${taskOrNodeId} 渲染成功！`);
          return {
            success: true,
            urls: state.urls || [state.url],
            duration: (Date.now() - startTime) / 1000
          };
        }

        if (status === 'failed' || status === 'error') {
          throw new Error(`节点生成失败: ${state?.errorMsg || '未知错误'}`);
        }
      } catch (err) {
        console.warn(`[TaskMonitor] 状态拉取抖动: ${err.message}`);
      }

      await new Promise(resolve => setTimeout(resolve, this.intervalMs));
    }

    throw new Error(`[TaskMonitor] 任务超时 (${this.timeoutMs / 1000}s)`);
  }
}
