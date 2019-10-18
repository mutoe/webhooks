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

# It will then generate a listener.js and pull.sh in your current directory, 
# and then you can edit pull.sh to pull your repository, for example

# The following line will switch to `/path/to/your/repo` and then 
# execute `git pull`
#
# sed -i "$ a\cd /path/to/your/repo\ngit pull" pull.sh

# Next, run

node listener
# or
pm2 start --name webhooks listener.js

# Awesome tool!
```
