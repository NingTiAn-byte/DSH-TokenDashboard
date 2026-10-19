# 市场提交草稿

标题：

[插件提交] NingTiAn-byte/DSH-TokenDashboard — 本地 Token 用量、API 调用与缓存统计看板

以下内容复制到 https://github.com/dshplugin/dsh-plugin-hub/issues/new ：

### 仓库地址
https://github.com/NingTiAn-byte/DSH-TokenDashboard

### 一句话价值
在 DSH 侧边栏查看本地会话的 Token 用量、API 调用次数、缓存命中率，以及模型和项目用量排行。

### 能力分类
开发与运维

### 安装命令
```sh
dsh plugin --profile web add @ningtian-byte/dsh-tokendashboard
```

### 兼容与运行要求
需要提供 sessionPersistence、connection、slot、locale 和主题 API 的 DSH。Web profile；Desktop 需使用桌面应用附带的 CLI。具体已验证版本待补充。

### 许可证
MIT

### 截图 / 演示
![浅色主题](https://raw.githubusercontent.com/NingTiAn-byte/DSH-TokenDashboard/main/docs/images/overview-light.png)
![深色主题](https://raw.githubusercontent.com/NingTiAn-byte/DSH-TokenDashboard/main/docs/images/overview-dark.png)
截图使用示例数据。

### 补充说明
只读本地会话日志，不修改日志、不调用模型 API、不上传统计数据。无需额外 API Key，无运行时依赖。首次扫描大型日志可能较慢。本项目为社区插件，非 DeepSeek 官方产品。

### 提交前自查
- [x] 仓库已公开
- [x] 已添加 GitHub topic：dsh-plugin
- [x] README 包含安装命令
- [x] 插件导出 apply(ctx) 模块
- [x] 仓库根目录包含 package.json
