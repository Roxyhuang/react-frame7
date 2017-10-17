const shell = require('shelljs');
const config = require('config');
const chalk = require('chalk');
const checkVersion = require('../script/check-versions');

const host = config.get('host') || 'localhost';
const port = config.get('port') || '3000';

const option = process.argv[2];

checkVersion();

switch (option) {
  case 'lint':
    console.log(chalk.green('Start lint'));
    break;
  case 'dev':
    console.log(chalk.green('building for development...'));
    process.env.NODE_ENV = 'development';
    shell.exec(`cross-env HOST=${host} PORT=${port} NODE_ENV=development babel-node build/script/dev-server.js`);
    break;
  case 'build':
    console.log(chalk.green('building for release...'));
    process.env.NODE_ENV = 'release';
    shell.exec('cross-env NODE_ENV=release && babel-node build/script/build.js');
    break;
  case 'prod':
    console.log(chalk.green('building for prod...'));
    process.env.NODE_ENV = 'production';
    shell.exec('cross-env NODE_ENV=production && babel-node build/script/build.js');
    break;
  default:
    console.log(chalk.yellow('Invalid option.'));
    console.log(chalk.yellow('See README.md for more details.'));
}
