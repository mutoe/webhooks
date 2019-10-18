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
# For example
#
# cd /path/to/project
# git pull

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

    const content = fs.readFileSync(path.join(__dirname, '../listener.js.template')).toString()
    const result = handlebars.compile(content)(config)
    fs.writeFileSync(path.join(process.cwd(), './listener.js'), result)
    fs.writeFileSync(path.join(process.cwd(), './pull.sh'), config.bash)

    console.log(`${chalk.green.bold('listener.js')} and ${chalk.green.bold('pull.sh')} is created.`)
    console.log(`You can edit ${chalk.green.bold('pull.sh')} now.\n`)
    console.log(`When your modifications are complete, you can launch the hook by executing the following command:\n`)
    console.log(`${chalk.cyan('node listener.js')}\n`)
    console.log(`You can also use other tools to deploy the service, for example ${chalk.underline('pm2')}, ${chalk.underline('nodemon')} or ${chalk.underline('forever')}.\n`)
    console.log(`Thank you for using it and start coding happily! 😊`)
  }
}

async function main () {
  program
    .version(packageJson.version)

  await initial()
}

main()

program.parse(process.argv)
