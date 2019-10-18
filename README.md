# Webhooks

![npm (scoped)](https://img.shields.io/npm/v/@mutoe/webhooks?style=flat-square)

[Chinese version](/README_cn.md)

A webhook can do anything you want

> Currently under development, support Github webhook API script generation

## Usage

```bash
npm i -g @mutoe/webhooks
# or
yarn global add @mutoe/webhooks

webhooks
# It will then generate a listener.js in your current directory, and then

node listener
# or
pm2 start --name webhooks listener.js

# Awesome tool!
```
