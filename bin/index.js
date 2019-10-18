#!/usr/bin/env node
'use strict'

const program = require('commander')
const path = require('path')
const os = require('os')
const fs = require('fs')
const { prompt } = require('inquirer')
const chalk = require('chalk')
const handlebars = require('handlebars')
const packageJson = require('../package.json')

const config = {
  port: 80,
  secret: '',
  bash: `#!/bin/bash
  
# The following scripts will be run when the hook is triggered.
`,
}

async function initial () {
  const configPath = path.join(os.homedir(), '/.config/webhooks.config.json')
  if (!fs.existsSync(configPath)) {
    config.port = await prompt({
      type: 'number',
      name: 'port',
      message: `Enter the ${chalk.underline('port')} you deployed the webhooks use:`,
      default: 80,
      validate: (port) => port >= 20 && port <= 65535 ? true : 'port should between 20 and 65535',
    }).then(answer => answer.port)

    config.secret = await prompt({
      type: 'input',
      name: 'secret',
      message: 'Enter the secret you will use:',
    }).then(answer => answer.secret)

    config.bash = await prompt({
      type: 'editor',
      name: 'bash',
      message: 'Enter the bash script the hook will execute',
      default: config.bash,
    }).then(answer => answer.bash)

    const content = fs.readFileSync(path.join(__dirname, '../listener.js.template')).toString()
    const result = handlebars.compile(content)(config)
    fs.writeFileSync(path.join(process.cwd(), './listener.js'), result)

    console.log(`${chalk.green.bold('listener.js')} is created.`)
  }
}

async function main () {
  program
    .version(packageJson.version)

  await initial()
}

main()

program.parse(process.argv)
