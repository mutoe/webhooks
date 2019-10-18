# Webhooks

![npm (scoped)](https://img.shields.io/npm/v/@mutoe/webhooks?style=flat-square)

[English](/README.md)

一个 webhook 可以做任何你想做的事

> 目前正在开发中，支持 Github webhook API 快速生成

## 使用方法

```bash
npm i -g @mutoe/webhooks
# or
yarn global add @mutoe/webhooks

webhooks
# 然后会生成一个 listener.js 在你的当前目录下，接下来

node listener
# or
pm2 start --name webhooks listener.js

# 厉害的小东西!
```
