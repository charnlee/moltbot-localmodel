import type { MoltbotPluginApi } from "moltbot/plugin-sdk";

const plugin = {
  id: "vllm-local",
  name: "vllm-local",
  description: "vllm-local plugin for Moltbot",
  configSchema: {
    type: "object",
    additionalProperties: false,
    properties: {},
  },
  register(api: MoltbotPluginApi) {
    api.logger.info("vllm-local plugin registered");
    // TODO: Implement plugin functionality
  },
};

export default plugin;
