const chalk = require('chalk');
const checkVersion = require('../script/check-versions');

const option = process.argv[2];

checkVersion();

switch (option) {
  case 'lint':
    console.log(chalk.green('Start lint'));
    break;
  case 'build':
    process.env.NODE_ENV = 'release';
    require('../script/build').default();
    break;
  case 'prod':
    process.env.NODE_ENV = 'production';
    require('../script/build').default();
    break;
  case 'stage':
    process.env.NODE_ENV = 'stage';
    require('../script/build').default();
    break;
  default:
    console.log(chalk.yellow('Invalid option.'));
    console.log(chalk.yellow('See README.md for more details.'));
}
