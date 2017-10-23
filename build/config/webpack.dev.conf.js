import config from 'config';
import chalk from 'chalk';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import BrowserSyncPlugin from 'browser-sync-webpack-plugin';
import DashboardPlugin from 'webpack-dashboard/plugin';
import StyleLintPlugin from 'stylelint-webpack-plugin';
import OpenBrowserPlugin from 'open-browser-webpack-plugin';//帮助打开浏览器

import webpackConfig from './webpack.base.conf';
import STYLE_CONFIG from '../../.stylelintrc'

const PUBLIC_PATH = config.get('publicPath');
const APP_ENTRY_POINT = config.get('appEntry');

let webpackDevOutput;

let entryConfig = {
  vendors: [
    'react',
    'react-dom',
    'framework7-react'
  ]
};

// const webpackDevOutput = {
//   publicPath: `http://${PUBLIC_PATH}/`,
//   filename: 'assets/[name].[chunkhash].js',
//   chunkFilename: ('assets/[id].[chunkhash].js'),
// };

// Config for Javascript file
if (Object.entries(APP_ENTRY_POINT).length > 1) {

  Object.entries(APP_ENTRY_POINT).forEach(item => {
    Object.assign(entryConfig, {[`${item[0]}/assets/${item[0]}`]: [
      'babel-polyfill',
      'webpack-hot-middleware/client?reload=true',
      'webpack/hot/only-dev-server',
      item[1]
    ]});
  });

} else if(Object.entries(APP_ENTRY_POINT).length === 1){
  Object.entries(APP_ENTRY_POINT).forEach(item => {
    Object.assign(entryConfig, {[item[0]]: [
      'babel-polyfill',
      'webpack-hot-middleware/client?reload=true',
      'webpack/hot/only-dev-server',
      item[1],
    ]});
  });
} else {
  console.log(chalk.red('You must define a entry'));
}

//Config for output

if (Object.entries(APP_ENTRY_POINT).length > 1) {
  webpackDevOutput = {
    publicPath: `http://${PUBLIC_PATH}/`,
    filename: '[name].[chunkhash].js',
    chunkFilename: "[id].[chunkhash].js",
  };

} else  if (Object.entries(APP_ENTRY_POINT).length === 1){
  webpackDevOutput = {
    publicPath: `http://${PUBLIC_PATH}/`,
    filename: 'assets/[name].[chunkhash].js',
    chunkFilename: "assets/[id].[chunkhash].js",
  };
} else {
  console.log(chalk.red('You must define a entry'));
}

webpackConfig.output = Object.assign(webpackConfig.output, webpackDevOutput);

webpackConfig.plugins.push(
  new DashboardPlugin({port: 3300}),
  new webpack.LoaderOptionsPlugin({
    debug: true
  }),

  new webpack.HotModuleReplacementPlugin(),
  new webpack.DefinePlugin({
    __CONFIG__: JSON.stringify(config.get('app')),
    'process.env': {
      NODE_ENV: JSON.stringify('development'),
    },
  }),
  new BrowserSyncPlugin({
    host: 'localhost',
    port: 3001,
    proxy: `http://localhost:${process.env.PORT}/`,
    open: false,
    reloadDelay: 2500,
  }, {
    reload: false,
  }),
  new StyleLintPlugin({
    context: "src",
    configFile: '.stylelintrc.js',
    files: '**/*.less',
    failOnError: false,
    quiet: false,
    syntax: 'less'
    }
  ),
);

webpackConfig.module.rules = webpackConfig.module.rules.concat(
  {
    test: /\.css|less$/,
    use: [
      {
        loader: "style-loader?modules&localIdentName=[name]__[local]-[hash:base64:5]"
      },
      {
        loader: "css-loader?modules&localIdentName=[name]__[local]-[hash:base64:5]"
      },
      {
        loader: "less-loader?modules&localIdentName=[name]__[local]-[hash:base64:5]"
      },
      {
        loader: 'postcss-loader?modules&localIdentName=[name]__[local]-[hash:base64:5]',
        options: {
          config: {
            path: 'build/config/postcss.config.js'
          }
        }
      }
      ],
  },
);


if (Object.entries(APP_ENTRY_POINT).length > 1) {
  Object.keys(APP_ENTRY_POINT).forEach((name,index) => {
    webpackConfig.plugins.push(
      new HtmlWebpackPlugin({
        filename: `${name}/${name}.html`,
        template: 'public/index.html',
        inject: 'ture',
        chunks: [`${name}/assets/${name}`, 'vendors'],
      }),
    );
    if(index === 0) {
      const serverIndex = config.get('app')['server-index'];
      webpackConfig.plugins.push(
        new OpenBrowserPlugin({
          url: `http://${config.get('vhost')}:${config.get('port')}/${serverIndex ? serverIndex : `${name}/${name}.html`}`,
        }),
      )
    }
  });
} else  if(Object.entries(APP_ENTRY_POINT).length === 1){
  const serverIndex = config.get('app')['server-index'];
  Object.keys(APP_ENTRY_POINT).forEach(name => {
    webpackConfig.plugins.push(
      new HtmlWebpackPlugin({
        filename: `${name}.html`,
        template: 'public/index.html',
        inject: 'body',
        chunks: [name, 'vendors'],
      }),
      new OpenBrowserPlugin({
        url: `http://${config.get('vhost')}:${config.get('port')}/${serverIndex ? serverIndex : `${name}.html`}`,
      }),
    );
  });
} else {
  console.log(chalk.red('You must define a entry'));
}

webpackConfig.devtool = 'cheap-module-eval-source-map';

webpackConfig.entry = entryConfig;

export default webpackConfig;
