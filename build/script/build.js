import config from 'config';
import rm from 'rimraf';
import shell from 'shelljs';
import path from 'path';
import chalk from 'chalk';
import webpack from 'webpack';
import webpackConfig from '../config/webpack.prod.conf';

const APP_ENTRY_POINT = config.get('appEntry');

rm(path.join(config.get('distDirectory')), err => {
  if (err) throw err;
  webpack(webpackConfig, function (err, stats) {
    if (err) throw err;
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false,
    }) + '\n\n');

    console.log(chalk.cyan('  Build complete.\n'));
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ));
  });
});

