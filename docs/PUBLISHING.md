# 发布与市场提交

## 当前状态

已发布包名：`@ningtian-byte/dsh-tokendashboard`，版本：`1.0.0`。使用维护者 npm 账号作用域，避免与现有包 dsh-token-dashboard 的名称冲突。

npm 1.0.0 已于 2026-10-19 发布。市场收录申请通过 GitHub Issue 提交，审核结果以市场维护者回复为准。DSH 实际运行兼容版本需要维护者验证后补充，不能只凭语法检查声明兼容。

## 发布步骤

1. 在隔离的 DSH 测试 profile 中安装本地目录，确认侧栏、统计和中英文界面正常。不要与旧包重复启用，内部插件 ID 保持不变。
2. 提交并推送本仓库的修改。
3. GitHub 仓库右侧 About → 齿轮 → Topics 添加 `dsh-plugin`。package.json keywords 不会设置 GitHub Topic。
4. 在插件目录执行：

```sh
npm run check
npm pack --dry-run
npm login --registry=https://registry.npmjs.org/
npm publish --access public
```

发布需要该 npm 账号满足平台的认证要求。不要将 token 或验证码写入仓库。

5. 从 npm 安装并验证：

```sh
dsh plugin --profile web add @ningtian-byte/dsh-tokendashboard
```

6. 更新中英文 README 安装说明；后续版本发布前先提升 package.json 版本号。
7. 打开 https://dsh-plugin.org/zh/submit ，使用 docs/MARKETPLACE-SUBMISSION.md 创建提交 Issue。逐项确认自查项；发布 npm 后替换草稿中的 GitHub 安装命令为 npm 安装命令。

## 收录规则

社区网站允许 GitHub 源码安装；DSH 内的插件中心要求 npm 包。规则来源：https://dsh-plugin.org/zh/submit 。

## 项目名称

展示名称为 `DSH-TokenDashboard`，npm 包名为 `@ningtian-byte/dsh-tokendashboard`（npm 新包名不允许大写）。GitHub 仓库为 `NingTiAn-byte/DSH-TokenDashboard`；repository、homepage、bugs、README 和提交草稿中的链接已同步。
