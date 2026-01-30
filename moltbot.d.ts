/**
 * 本地类型定义文件
 * 因为 npm 上的 moltbot 包尚未提供完整的类型定义
 */

declare module "moltbot/plugin-sdk" {
  export interface MoltbotPluginApi {
    logger: {
      info: (message: string, ...args: any[]) => void;
      warn: (message: string, ...args: any[]) => void;
      error: (message: string, ...args: any[]) => void;
      debug: (message: string, ...args: any[]) => void;
    };
    runtime: any;
    registerChannel?: (params: any) => void;
    registerHttpHandler?: (handler: any) => void;
  }
}
