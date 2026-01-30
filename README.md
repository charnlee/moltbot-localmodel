# Moltbot vLLM Local Plugin 🚀

<div align="center">

**连接本地 vLLM 部署的模型**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

</div>

---

## 📖 简介

这是一个 Moltbot 插件，让你可以轻松连接本地 vLLM 部署的模型。通过简单的配置向导，就可以开始使用！

### ✨ 特性

- ✅ 支持任何 vLLM 部署的模型
- ✅ OpenAI 兼容 API
- ✅ 支持多个模型实例
- ✅ 交互式配置向导
- ✅ 可选 API Key 认证
- ✅ 自动配置上下文窗口和最大 token
- ✅ 支持视觉模型配置

## 🚀 快速开始

### 前置要求

1. 已安装 Moltbot（版本 >= 0.1.0）
2. 已本地部署模型

### 安装插件

```bash
# 从 NPM 安装（推荐）
moltbot plugins install @charnlee/vllm-local

# 或从本地源码安装
git clone https://github.com/charnlee/moltbot-localmodel.git
cd moltbot-localmodel
npm install
npm run build
moltbot plugins install .
```

### 配置模型

安装插件后，使用 Moltbot 的认证命令来配置你的 vLLM 模型：

```bash
moltbot models auth login --provider vllm-local
```

系统会提示你选择配置方式：

#### 方式 1: 手动配置（推荐）

选择 "Manual Configuration" 后，系统会逐步询问：

1. **Base URL**: vLLM 服务器地址（如 `http://localhost:8000`）
2. **Model Name**: 部署的模型名称（如 `Qwen2.5-7B-Instruct`）
3. **API Key**: （可选）如果 vLLM 需要认证，输入 API Key
4. **Context Window**: 上下文窗口大小（如 `32768`）
5. **Max Tokens**: 最大输出 token 数（如 `4096`）
6. **Vision Support**: 模型是否支持图像输入

示例交互：

```
? Enter your vLLM server base URL: http://localhost:8000
? Enter the model name: Qwen2.5-7B-Instruct
? Enter API key (optional): [按 Enter 跳过]
? Enter context window size (tokens): 32768
? Enter max output tokens: 4096
? Does this model support vision (images)? No

✓ Configuration saved:
  - Base URL: http://localhost:8000/v1
  - Model: Qwen2.5-7B-Instruct
  - Context window: 32768 tokens
  - Max tokens: 4096
  - Vision: disabled
```

#### 方式 2: 环境变量

选择 "Environment Variables" 后，插件会从环境变量读取配置：

```bash
export VLLM_BASE_URL="http://localhost:8000"
export VLLM_API_KEY="your-api-key"  # 可选
```

然后运行：

```bash
moltbot models auth login --provider vllm-local
```

### 使用模型

配置完成后，你可以通过以下方式使用模型：

```bash
# 查看可用模型
moltbot models list

# 使用模型（命令行）
moltbot agent --model vllm-local/Qwen2.5-7B-Instruct --message "你好，介绍一下你自己"

# 设置为默认模型
moltbot config set agents.defaults.model vllm-local/Qwen2.5-7B-Instruct

# 使用默认模型
moltbot agent --message "解释一下量子计算的原理"
```

### 在消息通道中使用

配置完成后，可以在 Telegram、Discord、Slack 等任何已配置的消息通道中直接使用：

```
# 在 Telegram 中发送消息
你好，你是哪个模型？

# 切换到 vLLM 模型
!model vllm-local/Qwen2.5-7B-Instruct

# 继续对话
介绍一下你自己
```

## 📚 高级配置

### 配置多个模型

你可以多次运行配置命令来添加多个模型：

```bash
# 添加第一个模型
moltbot models auth login --provider vllm-local
# 输入第一个模型的信息...

# 添加第二个模型
moltbot models auth login --provider vllm-local
# 输入第二个模型的信息...
```

或者手动编辑 `~/.clawdbot/config.json5`:

```json5
{
  models: {
    providers: {
      "vllm-local": {
        baseUrl: "http://localhost:8000/v1",
        api: "openai-completions",
        models: [
          {
            id: "Qwen2.5-7B-Instruct",
            name: "Qwen2.5 7B Instruct",
            api: "openai-completions",
            reasoning: false,
            input: ["text"],
            cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
            contextWindow: 32768,
            maxTokens: 4096
          },
          {
            id: "Qwen2.5-14B-Instruct",
            name: "Qwen2.5 14B Instruct",
            api: "openai-completions",
            reasoning: false,
            input: ["text"],
            cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
            contextWindow: 65536,
            maxTokens: 8192
          }
        ]
      }
    }
  }
}
```

### 配置多个 vLLM 实例

如果你有多个 vLLM 服务器，可以分别配置：

```json5
{
  models: {
    providers: {
      "vllm-local": {
        baseUrl: "http://server1:8000/v1",
        models: [/* 服务器 1 的模型 */]
      },
      "vllm-local-gpu2": {
        baseUrl: "http://server2:8000/v1",
        models: [/* 服务器 2 的模型 */]
      }
    }
  }
}
```

### 视觉模型配置

对于支持图像输入的模型（如 Qwen-VL），在配置时选择 "Yes" 启用视觉支持：

```
? Does this model support vision (images)? Yes
```

配置后可以发送图片：

```bash
moltbot agent --model vllm-local/Qwen-VL --message "描述这张图片" --image /path/to/image.jpg
```

## 🧪 测试与验证

### 验证插件安装

```bash
# 列出已安装的插件
moltbot plugins list

# 应该看到 vllm-local 插件
```

### 验证模型配置

```bash
# 列出所有可用模型
moltbot models list

# 应该看到 vllm-local/* 模型
```

### 测试模型连接

```bash
# 发送测试消息
moltbot agent --model vllm-local/your-model-name --message "你好"

# 检查响应
```


## 🔧 开发

### 从源码构建

```bash
git clone https://github.com/charnlee/moltbot-localmodel.git
cd moltbot-localmodel
npm install
npm run build
```

### 本地测试

```bash
# 安装到本地 Moltbot
moltbot plugins install .

# 查看日志
moltbot gateway run --verbose
```

## 📄 License

MIT License - 详见 [LICENSE](LICENSE) 文件

---

<div align="center">
Made with ❤️ for the Moltbot community
</div>
