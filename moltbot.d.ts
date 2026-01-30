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
    config: any;
    registerChannel?: (params: any) => void;
    registerHttpHandler?: (handler: any) => void;
    registerProvider: (provider: ProviderPlugin) => void;
  }

  export type ModelApi =
    | "openai-completions"
    | "openai-responses"
    | "anthropic-messages"
    | "google-generative-ai"
    | "github-copilot"
    | "bedrock-converse-stream";

  export interface ModelDefinitionConfig {
    id: string;
    name: string;
    api?: ModelApi;
    reasoning: boolean;
    input: Array<"text" | "image">;
    cost: {
      input: number;
      output: number;
      cacheRead: number;
      cacheWrite: number;
    };
    contextWindow: number;
    maxTokens: number;
    headers?: Record<string, string>;
  }

  export interface ModelProviderConfig {
    baseUrl: string;
    apiKey?: string;
    auth?: "api-key" | "aws-sdk" | "oauth" | "token";
    api?: ModelApi;
    headers?: Record<string, string>;
    authHeader?: boolean;
    models: ModelDefinitionConfig[];
  }

  export type ProviderAuthKind = "oauth" | "api_key" | "token" | "device_code" | "custom";

  export interface AuthProfileCredential {
    type: "api_key" | "token" | "oauth";
    key?: string;
    token?: string;
  }

  export interface ProviderAuthResult {
    profiles: Array<{ profileId: string; credential: AuthProfileCredential }>;
    configPatch?: any;
    defaultModel?: string;
    notes?: string[];
  }

  export interface WizardPrompter {
    text: (options: {
      message: string;
      placeholder?: string;
      defaultValue?: string;
      validate?: (value: string) => string | undefined;
    }) => Promise<{ value: string; cancelled: boolean }>;
    confirm: (options: {
      message: string;
      initialValue?: boolean;
    }) => Promise<{ value: boolean; cancelled: boolean }>;
  }

  export interface ProviderAuthContext {
    config: any;
    agentDir?: string;
    workspaceDir?: string;
    prompter: WizardPrompter;
    runtime: any;
    isRemote: boolean;
    openUrl: (url: string) => Promise<void>;
    oauth: any;
  }

  export interface ProviderAuthMethod {
    id: string;
    label: string;
    hint?: string;
    kind: ProviderAuthKind;
    run: (ctx: ProviderAuthContext) => Promise<ProviderAuthResult>;
  }

  export interface ProviderPlugin {
    id: string;
    label: string;
    docsPath?: string;
    aliases?: string[];
    envVars?: string[];
    models?: ModelProviderConfig;
    auth: ProviderAuthMethod[];
    formatApiKey?: (cred: AuthProfileCredential) => string;
  }
}
