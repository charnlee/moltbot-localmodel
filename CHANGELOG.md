# Changelog

## [0.2.0] - 2026-01-30

### 🎉 重大更新：完整的 Provider 注册功能

这个版本是一个完全重写，实现了完整的 Moltbot Provider 插件功能。

### ✨ 新增功能

- **完整的 Provider 注册**: 插件现在正确实现了 `registerProvider` API
- **交互式配置向导**: 两种配置方式
  - **手动配置**: 交互式提示，逐步配置所有参数
  - **环境变量**: 从 `VLLM_BASE_URL` 和 `VLLM_API_KEY` 读取配置
- **完整的模型配置支持**:
  - 自定义上下文窗口大小
  - 自定义最大输出 token 数
  - 视觉模型支持配置
  - 可选的 API Key 认证
- **自动 URL 规范化**: 自动在 base URL 末尾添加 `/v1`
- **完整的 TypeScript 类型定义**: 添加 `moltbot.d.ts` 提供完整的类型支持

### 📝 文档更新

- **README.md**: 完全重写，详细说明新的使用方式
  - 安装指南
  - 配置向导说明
  - 高级配置选项
  - vLLM 部署参考
  - 常见问题解答
- **QUICKSTART.md**: 更新快速开始指南
  - 5 分钟上手教程
  - 配置验证步骤
  - 常用命令参考

### 🔧 技术改进

- TypeScript 类型系统完善
- 错误处理和输入验证
- 符合 Moltbot Provider API 规范
- 配置自动写入 `config.json5`

### 🐛 修复

- 修复插件无法注册为 Provider 的问题
- 修复模型不出现在 `models list` 中的问题
- 修复 TypeScript 编译错误

### 🚀 升级指南

从 0.1.x 升级到 0.2.0：

1. 卸载旧版本（如果已安装）:
   ```bash
   moltbot plugins uninstall vllm-local
   ```

2. 安装新版本:
   ```bash
   moltbot plugins install @charnlee/vllm-local@0.2.0
   ```

3. 重新配置模型:
   ```bash
   moltbot models auth login --provider vllm-local
   ```

### ⚠️ 破坏性变更

- **配置方式改变**: 不再支持直接在 `config.json5` 中配置，必须通过 `moltbot models auth login` 命令配置
- **Provider ID 固定**: Provider ID 现在固定为 `vllm-local`，不再支持自定义

### 📦 依赖更新

无依赖变更。

---

## [0.1.1] - 2026-01-29

### 初始版本

- 基础插件框架
- 占位实现（功能未完成）

