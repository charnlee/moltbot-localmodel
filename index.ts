import type {
  MoltbotPluginApi,
  ProviderAuthContext,
  ProviderAuthResult,
} from "moltbot/plugin-sdk";

const VLLM_DEFAULT_BASE_URL = "http://localhost:8000/v1";
const VLLM_DEFAULT_CONTEXT_WINDOW = 32768;
const VLLM_DEFAULT_MAX_TOKENS = 4096;

const plugin = {
  id: "vllm-local",
  name: "vLLM Local",
  description: "Connect to locally deployed vLLM models with OpenAI-compatible API",
  version: "0.2.0",
  configSchema: {
    type: "object",
    additionalProperties: false,
    properties: {},
  },
  register(api: MoltbotPluginApi) {
    api.logger.info("Registering vLLM Local provider");

    // Register the vLLM provider
    api.registerProvider({
      id: "vllm-local",
      label: "vLLM Local",
      docsPath: undefined,
      aliases: ["vllm"],
      envVars: ["VLLM_API_KEY", "VLLM_BASE_URL"],

      // Model configuration - will be populated during auth or from config
      models: {
        baseUrl: VLLM_DEFAULT_BASE_URL,
        api: "openai-completions",
        models: [],
      },

      // Authentication methods
      auth: [
        {
          id: "manual",
          label: "Manual Configuration",
          hint: "Configure vLLM server URL and model manually",
          kind: "custom",
          async run(ctx: ProviderAuthContext): Promise<ProviderAuthResult> {
            const { prompter } = ctx;

            // Prompt for base URL
            const baseUrlResult = await prompter.text({
              message: "Enter your vLLM server base URL (e.g., http://localhost:8000)",
              placeholder: "http://localhost:8000",
              defaultValue: "http://localhost:8000",
              validate: (value: string) => {
                if (!value.trim()) return "Base URL is required";
                try {
                  const url = new URL(value);
                  if (!url.protocol.match(/^https?:$/)) {
                    return "URL must use http or https protocol";
                  }
                  return undefined;
                } catch {
                  return "Invalid URL format";
                }
              },
            });

            if (baseUrlResult.cancelled) {
              throw new Error("Configuration cancelled");
            }

            let baseUrl = baseUrlResult.value.trim();
            // Add /v1 if not present
            if (!baseUrl.endsWith("/v1")) {
              baseUrl = baseUrl.replace(/\/$/, "") + "/v1";
            }

            // Prompt for model name
            const modelNameResult = await prompter.text({
              message: "Enter the model name (as deployed in vLLM)",
              placeholder: "Qwen2.5-7B-Instruct",
              validate: (value: string) => {
                if (!value.trim()) return "Model name is required";
                return undefined;
              },
            });

            if (modelNameResult.cancelled) {
              throw new Error("Configuration cancelled");
            }

            const modelName = modelNameResult.value.trim();
            const modelId = modelName;

            // Prompt for optional API key
            const apiKeyResult = await prompter.text({
              message: "Enter API key (optional, press Enter to skip)",
              placeholder: "sk-...",
              defaultValue: "",
            });

            if (apiKeyResult.cancelled) {
              throw new Error("Configuration cancelled");
            }

            const apiKey = apiKeyResult.value.trim() || undefined;

            // Prompt for context window
            const contextWindowResult = await prompter.text({
              message: "Enter context window size (tokens)",
              placeholder: "32768",
              defaultValue: "32768",
              validate: (value: string) => {
                const num = Number.parseInt(value, 10);
                if (Number.isNaN(num) || num <= 0) {
                  return "Must be a positive number";
                }
                return undefined;
              },
            });

            if (contextWindowResult.cancelled) {
              throw new Error("Configuration cancelled");
            }

            const contextWindow = Number.parseInt(contextWindowResult.value, 10);

            // Prompt for max tokens
            const maxTokensResult = await prompter.text({
              message: "Enter max output tokens",
              placeholder: "4096",
              defaultValue: "4096",
              validate: (value: string) => {
                const num = Number.parseInt(value, 10);
                if (Number.isNaN(num) || num <= 0) {
                  return "Must be a positive number";
                }
                return undefined;
              },
            });

            if (maxTokensResult.cancelled) {
              throw new Error("Configuration cancelled");
            }

            const maxTokens = Number.parseInt(maxTokensResult.value, 10);

            // Check if model supports vision
            const supportsVisionResult = await prompter.confirm({
              message: "Does this model support vision (images)?",
              initialValue: false,
            });

            const supportsVision = !supportsVisionResult.cancelled && supportsVisionResult.value;

            // Create auth profile
            const profiles = [];
            if (apiKey) {
              profiles.push({
                profileId: "default",
                credential: {
                  type: "api_key" as const,
                  key: apiKey,
                },
              });
            }

            // Create model definition
            const modelDefinition = {
              id: modelId,
              name: modelName,
              api: "openai-completions" as const,
              reasoning: false,
              input: supportsVision ? (["text", "image"] as const) : (["text"] as const),
              cost: {
                input: 0,
                output: 0,
                cacheRead: 0,
                cacheWrite: 0,
              },
              contextWindow,
              maxTokens,
            };

            // Build config patch
            const configPatch = {
              models: {
                providers: {
                  "vllm-local": {
                    baseUrl,
                    api: "openai-completions" as const,
                    ...(apiKey ? { apiKey: "VLLM_API_KEY" } : {}),
                    models: [modelDefinition],
                  },
                },
              },
            };

            const notes = [
              `Base URL: ${baseUrl}`,
              `Model: ${modelName}`,
              `Context window: ${contextWindow} tokens`,
              `Max tokens: ${maxTokens}`,
              supportsVision ? "Vision: enabled" : "Vision: disabled",
            ];

            if (apiKey) {
              notes.push("API key configured");
            }

            return {
              profiles,
              configPatch,
              defaultModel: `vllm-local/${modelId}`,
              notes,
            };
          },
        },
        {
          id: "env",
          label: "Environment Variables",
          hint: "Use VLLM_BASE_URL and VLLM_API_KEY environment variables",
          kind: "custom",
          async run(ctx: ProviderAuthContext): Promise<ProviderAuthResult> {
            const baseUrl = process.env.VLLM_BASE_URL?.trim() || VLLM_DEFAULT_BASE_URL;
            const apiKey = process.env.VLLM_API_KEY?.trim();

            const { prompter } = ctx;

            // Prompt for model name
            const modelNameResult = await prompter.text({
              message: "Enter the model name (as deployed in vLLM)",
              placeholder: "Qwen2.5-7B-Instruct",
              validate: (value: string) => {
                if (!value.trim()) return "Model name is required";
                return undefined;
              },
            });

            if (modelNameResult.cancelled) {
              throw new Error("Configuration cancelled");
            }

            const modelName = modelNameResult.value.trim();

            // Create model definition
            const modelDefinition = {
              id: modelName,
              name: modelName,
              api: "openai-completions" as const,
              reasoning: false,
              input: ["text"] as const,
              cost: {
                input: 0,
                output: 0,
                cacheRead: 0,
                cacheWrite: 0,
              },
              contextWindow: VLLM_DEFAULT_CONTEXT_WINDOW,
              maxTokens: VLLM_DEFAULT_MAX_TOKENS,
            };

            // Build config patch
            const configPatch = {
              models: {
                providers: {
                  "vllm-local": {
                    baseUrl,
                    api: "openai-completions" as const,
                    ...(apiKey ? { apiKey: "VLLM_API_KEY" } : {}),
                    models: [modelDefinition],
                  },
                },
              },
            };

            const notes = [
              `Base URL: ${baseUrl} (from VLLM_BASE_URL or default)`,
              `Model: ${modelName}`,
            ];

            if (apiKey) {
              notes.push("API key: using VLLM_API_KEY environment variable");
            }

            return {
              profiles: apiKey
                ? [
                    {
                      profileId: "default",
                      credential: {
                        type: "api_key" as const,
                        key: apiKey,
                      },
                    },
                  ]
                : [],
              configPatch,
              defaultModel: `vllm-local/${modelName}`,
              notes,
            };
          },
        },
      ],
    });

    api.logger.info("vLLM Local provider registered successfully");
  },
};

export default plugin;
