# 贡献指南

感谢你对 vLLM Local 插件的关注！我们欢迎各种形式的贡献。

## 如何贡献

### 报告问题

如果你发现了 bug 或有功能建议，请：

1. 在 [GitHub Issues](https://github.com/charnlee/moltbot-localmodel/issues) 中搜索，确保问题未被报告
2. 创建新的 Issue，提供详细信息：
   - 问题描述
   - 复现步骤
   - 预期行为
   - 实际行为
   - 环境信息（OS、Node 版本、Moltbot 版本等）

### 提交代码

1. **Fork 仓库**
   ```bash
   # 在 GitHub 上 fork 仓库，然后 clone 你的 fork
   git clone https://github.com/YOUR_USERNAME/moltbot-localmodel.git
   cd moltbot-localmodel
   ```

2. **创建分支**
   ```bash
   git checkout -b feature/your-feature-name
   # 或
   git checkout -b fix/your-bug-fix
   ```

3. **安装依赖**
   ```bash
   npm install
   ```

4. **开发**
   ```bash
   # 开发模式（自动编译）
   npm run dev
   
   # 或手动编译
   npm run build
   ```

5. **测试**
   ```bash
   # 本地测试插件
   moltbot plugins install .
   moltbot models auth login --provider vllm-local
   ```

6. **提交代码**
   ```bash
   git add .
   git commit -m "feat: add awesome feature"
   # 或
   git commit -m "fix: resolve bug xyz"
   ```

   提交信息格式：
   - `feat:` 新功能
   - `fix:` Bug 修复
   - `docs:` 文档更新
   - `style:` 代码格式
   - `refactor:` 重构
   - `test:` 测试
   - `chore:` 构建/工具

7. **推送并创建 PR**
   ```bash
   git push origin feature/your-feature-name
   ```
   
   然后在 GitHub 上创建 Pull Request。

## 开发规范

### 代码风格

- 使用 TypeScript
- 遵循 `.editorconfig` 配置
- 2 空格缩进
- 使用有意义的变量名
- 添加必要的注释

### 文件组织

```
vllm-local/
├── index.ts              # 主插件文件
├── moltbot.d.ts          # 类型定义
├── package.json          # 包配置
├── tsconfig.json         # TypeScript 配置
├── README.md             # 主文档
├── QUICKSTART.md         # 快速开始
├── CHANGELOG.md          # 变更日志
└── dist/                 # 编译输出（Git 忽略）
```

### 版本管理

我们使用语义化版本 (Semantic Versioning):

- **MAJOR** (X.0.0): 破坏性变更
- **MINOR** (0.X.0): 新功能（向后兼容）
- **PATCH** (0.0.X): Bug 修复

### Pull Request 检查清单

在提交 PR 前，请确保：

- [ ] 代码通过 TypeScript 编译 (`npm run build`)
- [ ] 代码通过类型检查 (`npm run type-check`)
- [ ] 已测试基本功能
- [ ] 更新了相关文档（如果需要）
- [ ] 更新了 `CHANGELOG.md`（如果是重要变更）
- [ ] PR 描述清晰说明了变更内容

## 发布流程

（仅维护者）

1. 更新版本号
   ```bash
   npm version patch  # 或 minor/major
   ```

2. 更新 CHANGELOG.md

3. 构建并发布
   ```bash
   npm run rebuild
   npm publish
   ```

4. 推送到 GitHub
   ```bash
   git push origin main --tags
   ```

## 需要帮助？

- 📖 查看 [README.md](README.md)
- 🐛 提交 [Issue](https://github.com/charnlee/moltbot-localmodel/issues)
- 💬 参与 [Discussions](https://github.com/charnlee/moltbot-localmodel/discussions)

## 行为准则

- 尊重他人
- 友好沟通
- 接受建设性批评
- 关注对项目最有利的事情

感谢你的贡献！🎉
