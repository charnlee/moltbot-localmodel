# vLLM Local 插件 - 5分钟快速上手 🚀

## 快速配置（3 步）

### 1️⃣ 安装插件

```bash
cd /Users/chengli/project-test/moltbot-china-plugins/vllm-local
npm install
npm run build
moltbot plugins install .
```

### 2️⃣ 配置模型

```bash
moltbot models auth login --provider vllm-local
```

会提示你输入：

```
? 输入 vLLM 服务器地址（base URL）
  http://tanglian.bodesitech.com:8000

? 输入模型名称
  Qwen3-32B

? 输入 API Key（可选，没有则直接回车）
  [直接回车跳过]
```

### 3️⃣ 开始使用

```bash
# 测试
moltbot agent --model vllm-local/Qwen3-32B --message "你好，你是哪个模型？"

# 设为默认模型
moltbot config set agents.defaults.model vllm-local/Qwen3-32B

# 然后就可以直接用了
moltbot agent --message "介绍一下你自己"
```

## 通过飞书/Telegram 等渠道使用

配置完成后，在任何消息通道中发送消息，AI 就会使用你配置的 vLLM 模型回复！

## 配置多个模型

想添加更多模型？再次运行配置命令即可：

```bash
moltbot models auth login --provider vllm-local
```

或者手动编辑配置文件 `~/.clawdbot/config.json5`，在 `models.providers.vllm-local.models` 数组中添加更多模型。

## 测试你的 vLLM 服务器

```bash
curl --request POST \
  --url http://tanglian.bodesitech.com:8000/v1/chat/completions \
  --header 'Content-Type: application/json' \
  --data '{
    "model": "Qwen3-32B",
    "messages": [
      {"role": "user", "content": "你好"}
    ]
  }'
```

## 完成！🎉

现在你可以用本地部署的模型了！
