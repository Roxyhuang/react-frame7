import config from 'config';
import chalk from 'chalk';
import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import BrowserSyncPlugin from 'browser-sync-webpack-plugin';
import DashboardPlugin from 'webpack-dashboard/plugin';
import StyleLintPlugin from 'stylelint-webpack-plugin';
import OpenBrowserPlugin from 'open-browser-webpack-plugin';

import webpackConfig from './webpack.base.conf';

let PUBLIC_PATH;

if (process.env.NODE_ENV === 'development') {
  PUBLIC_PATH = '.'
} else {
  PUBLIC_PATH = config.get('publicPath');
}

const APP_ENTRY_POINT = config.get('appEntry');

let webpackDevOutput;

let entryConfig = {
  vendors: [
    'react',
    'react-dom',
    'framework7-react'
  ]
};

// Config for Javascript file
if (Object.entries(APP_ENTRY_POINT).length > 1) {

  Object.entries(APP_ENTRY_POINT).forEach(item => {
    Object.assign(entryConfig, {[`${item[0]}/assets/js/${item[0]}`]: [
      'babel-polyfill',
      'webpack-hot-middleware/client?reload=true',
      'webpack/hot/only-dev-server',
      item[1]
    ]});
  });

} else if(Object.entries(APP_ENTRY_POINT).length === 1){
  Object.entries(APP_ENTRY_POINT).forEach(item => {
    Object.assign(entryConfig, {[`assets/js/${item[0]}`]: [
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
    publicPath: `${PUBLIC_PATH}/`,
    filename: '[name].[chunkhash].js',
    chunkFilename: "[id].[chunkhash].js",
  };

} else  if (Object.entries(APP_ENTRY_POINT).length === 1){
  webpackDevOutput = {
    publicPath: `${PUBLIC_PATH}/`,
    filename: '[name].[chunkhash].js',
    chunkFilename: "[id].[chunkhash].js",
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
  new BrowserSyncPlugin({
    host: 'localhost',
    port: 3001,
    proxy: `http://localhost:3000/`,
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
    exclude: path.resolve('node_modules'),
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
  {
    test: /\.css|less$/,
    include: path.resolve('node_modules'),
    use: [
      {
        loader: "style-loader?sourceMap=true"
      },
      {
        loader: "css-loader?sourceMap=true"
      },
      {
        loader: "less-loader?sourceMap=true"
      },
      {
        loader: 'postcss-loader?sourceMap=true',
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
        inject: 'true',
        chunks: [`${name}/assets/js/${name}`, 'vendors'],
      }),
    );
    if(index === 0) {
      const serverIndex = config.get('server-index');
      const opnHost = `http://${config.get('host')}:${config.get('port')}`;

      webpackConfig.plugins.push(
        new OpenBrowserPlugin({
          url: `${opnHost}/${serverIndex ? serverIndex : `${name}/${name}.html`}`,
        }),
      )
    }
  });
} else  if(Object.entries(APP_ENTRY_POINT).length === 1){
  const serverIndex = config.get('server-index');
  const opnHost = `http://${config.get('host')}:${config.get('port')}`;

  Object.keys(APP_ENTRY_POINT).forEach(name => {
    webpackConfig.plugins.push(
      new HtmlWebpackPlugin({
        filename: `${name}.html`,
        template: 'public/index.html',
        inject: 'body',
        chunks: [`assets/js/${name}`, 'vendors'],
      }),
      new OpenBrowserPlugin({
        url: `${opnHost}/${serverIndex ? serverIndex : `${name}.html`}`,
      }),
    );
  });
} else {
  console.log(chalk.red('You must define a entry'));
}

webpackConfig.devtool = 'cheap-module-eval-source-map';

webpackConfig.entry = entryConfig;

export default webpackConfig;
