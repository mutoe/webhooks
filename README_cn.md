# Webhooks

![npm (scoped)](https://img.shields.io/npm/v/@mutoe/webhooks?style=flat-square)

[English](/README.md)

一个简单的 webhook 实现，可以帮你做任何你想做的事

> 目前正在开发中，支持 Github webhook API 快速生成

## 使用方法

```bash
npm i -g @mutoe/webhooks
# 或者
pnpm i -g @mutoe/webhooks

webhooks

# 然后会生成一个 listener.js 和 pull.sh 在你的当前目录下，
# 接下来你可以编辑 pull.sh 来拉你仓库的代码，比如

# 下面这行脚本将会切换到 `/path/to/your/repo` 然后执行 `git pull`
#
# sed -i "$ a\cd /path/to/your/repo\ngit pull" pull.sh

# 接下来执行这个

node listener
# 或者
pm2 start --name webhooks listener.js

# 厉害的小东西!
```
