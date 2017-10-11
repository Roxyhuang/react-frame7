const shell = require('shelljs');
const config = require('config');
const colors = require('colors');
const checkVersion = require('../script/check-versions');

const host = config.get('host') || 'localhost';
const port = config.get('port') || '8080';

const option = process.argv[2];

checkVersion();

switch (option){
  case 'lint':
    console.log(colors.green('Start lint'));
    break;
  case 'dev':
    console.log(colors.green('Start dev'));
    shell.exec(`cross-env HOST=${host} PORT=${port} babel-node build/script/dev-server.js`);
    break;
  case 'build':
    console.log(colors.green('Start dev'));
    break;
  default:
    console.log(colors.yellow('Invalid option.'));
    console.log(colors.yellow('See README.md for more details.'));
}

// switch (option) {
//   case 'lint':
//     shell.exec('cross-env eslint src/js/** server/** --format node_modules/eslint-friendly-formatter . --ext .js --ext .jsx  --cache; exit 0');
//     break;
//   case 'dev':
//     shell.exec(`cross-env HOST=${host} PORT=${port} webpack-dev-server --hot --progress --inline --colors --content-base ./docroot`);
//     break;
//   case 'build':
//     shell.exec(`cross-env rimraf docroot && webpack --progress --display-error-details`);
//     break;
//   default:
//     // If the app type is invalid, stop execution of the file.
//     console.log(colors.green('Invalid option.'));
//     console.log(colors.green('See README.md for more details.'));
//     return;
// }
