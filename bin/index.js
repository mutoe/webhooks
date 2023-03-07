#!/usr/bin/env node
'use strict'

import {program} from "commander";
import path from "path";
import fs from "fs";
import inquirer from "inquirer";
import chalk from "chalk";
import handlebars from "handlebars";
import packageJson from "../package.json" assert {type: 'json'};
import {fileURLToPath} from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const shFile = 'event.sh'

const config = {
  port: 80,
  secret: '',
  shFile,
  bash: `#!/bin/bash
  
# The following scripts will be run when the hook is triggered.
# For example
#
# cd /path/to/project
# git pull

`,
}

async function initial () {
  config.port = await inquirer.prompt({
    type: 'number',
    name: 'port',
    message: `Enter the ${chalk.underline('port')} you deployed the webhooks use:`,
    default: 80,
    validate: (port) => port >= 20 && port <= 65535 ? true : 'port should between 20 and 65535',
  }).then(answer => answer.port)

  config.secret = await inquirer.prompt({
    type: 'input',
    name: 'secret',
    message: 'Enter the secret you will use:',
  }).then(answer => answer.secret)

  const content = fs.readFileSync(path.join(__dirname, '../listener.js.template')).toString()
  const result = (await handlebars.compile(content))(config)
  fs.writeFileSync(path.join(process.cwd(), './listener.js'), result)
  fs.writeFileSync(path.join(process.cwd(), `./${shFile}`), config.bash)

  console.log(`${chalk.green.bold('listener.js')} and ${chalk.green.bold(shFile)} is created.`)
  console.log(`You can edit ${chalk.green.bold(shFile)} now.\n`)
  console.log(`When your modifications are complete, you can launch the hook by executing the following command:\n`)
  console.log(`${chalk.cyan('node listener.js')}\n`)
  console.log(`You can also use other tools to deploy the service, for example ${chalk.underline('pm2')}, ${chalk.underline('nodemon')} or ${chalk.underline('forever')}.\n`)
  console.log(`Thank you for using it and start coding happily! 😊`)
}

async function main () {
  program
    .version(packageJson.version)

  await initial()
}

void main()

program.parse(process.argv)
