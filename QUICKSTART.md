# vLLM Local 插件 - 5分钟快速上手 🚀

## 快速配置（3 步）

### 1️⃣ 安装插件

```bash
# 从 NPM 安装（推荐）
moltbot plugins install @charnlee/vllm-local

# 或从源码安装
git clone https://github.com/charnlee/moltbot-localmodel.git
cd moltbot-localmodel
npm install
npm run build
moltbot plugins install .
```

### 2️⃣ 配置模型

```bash
moltbot models auth login --provider vllm-local
```

选择 **"Manual Configuration"**，系统会提示你输入：

```
? Enter your vLLM server base URL (e.g., http://localhost:8000)
  http://localhost:8000

? Enter the model name (as deployed in vLLM)
  Qwen2.5-7B-Instruct

? Enter API key (optional, press Enter to skip)
  [直接回车跳过]

? Enter context window size (tokens)
  32768

? Enter max output tokens
  4096

? Does this model support vision (images)?
  No
```

配置完成后，你会看到：

```
✓ Configuration saved:
  - Base URL: http://localhost:8000/v1
  - Model: Qwen2.5-7B-Instruct
  - Context window: 32768 tokens
  - Max tokens: 4096
  - Vision: disabled
```

### 3️⃣ 开始使用

```bash
# 测试模型
moltbot agent --model vllm-local/Qwen2.5-7B-Instruct --message "你好，你是哪个模型？"

# 设为默认模型
moltbot config set agents.defaults.model vllm-local/Qwen2.5-7B-Instruct

# 然后就可以直接用了
moltbot agent --message "介绍一下你自己"
```

## 验证安装

```bash
# 查看已安装的插件
moltbot plugins list | grep vllm

# 查看可用的模型
moltbot models list | grep vllm-local
```

## 通过消息渠道使用

配置完成后，在任何消息通道（Telegram、Discord、Slack 等）中发送消息，AI 就会使用你配置的 vLLM 模型回复！

```
# 在 Telegram 中
你好，你是哪个模型？

# 切换模型
!model vllm-local/Qwen2.5-7B-Instruct

# 继续对话
介绍一下你自己
```

## 配置多个模型

想添加更多模型？再次运行配置命令即可：

```bash
moltbot models auth login --provider vllm-local
```

或者手动编辑配置文件 `~/.clawdbot/config.json5`：

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
            // ...配置...
          },
          {
            id: "Qwen2.5-14B-Instruct",
            name: "Qwen2.5 14B Instruct",
            // ...配置...
          }
        ]
      }
    }
  }
}
```

## 使用环境变量

如果你更喜欢使用环境变量：

```bash
# 设置环境变量
export VLLM_BASE_URL="http://localhost:8000"
export VLLM_API_KEY="your-api-key"  # 可选

# 运行配置命令
moltbot models auth login --provider vllm-local
# 选择 "Environment Variables"
```

## 测试 vLLM 服务器

如果遇到问题，可以直接测试你的 vLLM 服务器：

```bash
curl --request POST \
  --url http://localhost:8000/v1/chat/completions \
  --header 'Content-Type: application/json' \
  --data '{
    "model": "Qwen2.5-7B-Instruct",
    "messages": [
      {"role": "user", "content": "你好"}
    ]
  }'
```

## 启动 vLLM 服务器

如果你还没有启动 vLLM 服务器：

```bash
# 基础启动
python -m vllm.entrypoints.openai.api_server \
  --model /path/to/Qwen2.5-7B-Instruct \
  --served-model-name Qwen2.5-7B-Instruct \
  --host 0.0.0.0 \
  --port 8000

# 优化配置
python -m vllm.entrypoints.openai.api_server \
  --model /path/to/Qwen2.5-7B-Instruct \
  --served-model-name Qwen2.5-7B-Instruct \
  --host 0.0.0.0 \
  --port 8000 \
  --gpu-memory-utilization 0.9 \
  --max-model-len 32768
```

## 完成！🎉

现在你可以用本地部署的模型了！

更多高级功能和故障排除，请参考 [完整文档](./README.md)。
