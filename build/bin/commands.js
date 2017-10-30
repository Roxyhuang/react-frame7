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
  case 'build':
    // console.log(chalk.green('building for release...'));
    process.env.NODE_ENV = 'release';
    require('../script/build').default();
    break;
  case 'prod':
    // console.log(chalk.green('building for prod...'));
    process.env.NODE_ENV = 'production';
    require('../script/build').default();
    break;
  case 'stage':
    // console.log(chalk.green('building for stage...'));
    process.env.NODE_ENV = 'stage';
    require('../script/build').default();
    break;
  default:
    console.log(chalk.yellow('Invalid option.'));
    console.log(chalk.yellow('See README.md for more details.'));
}
