# Moltbot vLLM Local Plugin 🚀

<div align="center">

**连接本地 vLLM 部署的模型**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

</div>

---

## 📖 简介

这是一个 Moltbot 插件，让你可以轻松连接本地 vLLM 部署的模型。只需要输入 base URL 和 model 名字，就可以开始使用！

### ✨ 特性

- ✅ 支持任何 vLLM 部署的模型
- ✅ OpenAI 兼容 API
- ✅ 支持多个模型实例
- ✅ 简单配置（base URL + model 名字）
- ✅ 可选 API Key 认证
- ✅ 自动配置上下文窗口和最大 token

## 🚀 快速开始

### 安装

```bash
# 从本地安装
cd vllm-local
npm install
npm run build
moltbot plugins install .

# 或从 NPM 安装
moltbot plugins install @moltbot-china/vllm-local
```

### 配置

#### 方式 1: 使用命令行配置（推荐）

```bash
moltbot models auth login --provider vllm-local
```

会提示你输入：
- Base URL (如: http://tanglian.bodesitech.com:8000)
- Model 名字 (如: Qwen3-32B)
- API Key (可选，直接回车跳过)

#### 方式 2: 手动编辑配置文件

编辑 `~/.clawdbot/config.json5`:

```json5
{
  plugins: {
    entries: {
      "vllm-local": {
        enabled: true
      }
    }
  },
  models: {
    providers: {
      "vllm-local": {
        baseUrl: "http://tanglian.bodesitech.com:8000",
        api: "openai-completions",
        models: [
          {
            id: "Qwen3-32B",
            name: "Qwen3-32B (Local vLLM)",
            api: "openai-completions",
            reasoning: false,
            input: ["text"],
            cost: {
              input: 0,      // 本地模型无成本
              output: 0,
              cacheRead: 0,
              cacheWrite: 0
            },
            contextWindow: 32768,
            maxTokens: 4096
          }
        ]
      }
    }
  },
  agents: {
    defaults: {
      model: "vllm-local/Qwen3-32B"
    }
  }
}
```

### 使用

```bash
# 使用默认模型
moltbot agent --message "你好，你是哪个模型？"

# 指定模型
moltbot agent --model vllm-local/Qwen3-32B --message "介绍一下你自己"

# 通过消息通道使用
# 在飞书/Telegram 等渠道发送消息即可
```

## 📚 配置说明

### Base URL

你的 vLLM 服务器地址，例如：
- `http://localhost:8000` - 本地部署
- `http://192.168.1.100:8000` - 局域网
- `http://tanglian.bodesitech.com:8000` - 远程服务器

**注意**：不要在 URL 末尾加 `/v1`，插件会自动添加。

### Model 名字

你在 vLLM 中部署的模型名称，例如：
- `Qwen3-32B`
- `Qwen2.5-72B-Instruct`
- `Meta-Llama-3-70B`
- 任何其他模型名

### API Key（可选）

如果你的 vLLM 服务器需要认证，可以设置 API Key。

## 🔧 高级配置

### 配置多个模型

```json5
{
  models: {
    providers: {
      "vllm-local": {
        baseUrl: "http://tanglian.bodesitech.com:8000",
        models: [
          {
            id: "Qwen3-32B",
            name: "Qwen3-32B",
            contextWindow: 32768,
            maxTokens: 4096,
            // ... 其他配置
          },
          {
            id: "Qwen2.5-72B-Instruct",
            name: "Qwen2.5-72B (Larger)",
            contextWindow: 131072,
            maxTokens: 8192,
            // ... 其他配置
          }
        ]
      }
    }
  }
}
```

### 配置多个 vLLM 实例

```json5
{
  models: {
    providers: {
      "vllm-local-1": {
        baseUrl: "http://server1:8000",
        models: [...]
      },
      "vllm-local-2": {
        baseUrl: "http://server2:8000",
        models: [...]
      }
    }
  }
}
```

## 🧪 测试

### 测试连接

```bash
# 列出可用模型
moltbot models list

# 测试发送消息
moltbot agent --model vllm-local/Qwen3-32B --message "你好"
```

### 使用 curl 测试 vLLM 服务器

```bash
curl --request POST \
  --url http://tanglian.bodesitech.com:8000/v1/chat/completions \
  --header 'Content-Type: application/json' \
  --data '{
    "model": "Qwen3-32B",
    "messages": [
      {
        "role": "user",
        "content": "你好，你是哪个模型？"
      }
    ]
  }'
```

## 📝 vLLM 部署参考

### 启动 vLLM 服务器

```bash
# 基础启动
python -m vllm.entrypoints.openai.api_server \
  --model Qwen/Qwen2.5-32B-Instruct \
  --served-model-name Qwen3-32B \
  --host 0.0.0.0 \
  --port 8000

# 带 GPU 配置
python -m vllm.entrypoints.openai.api_server \
  --model Qwen/Qwen2.5-32B-Instruct \
  --served-model-name Qwen3-32B \
  --host 0.0.0.0 \
  --port 8000 \
  --gpu-memory-utilization 0.9 \
  --max-model-len 32768
```

---

<div align="center">
Made with ❤️ for the Moltbot community
</div>
