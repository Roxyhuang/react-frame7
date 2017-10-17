import path from 'path';
import config from 'config';
import webpack from 'webpack';
import chalk from 'chalk';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import SaveAssetsJson from 'assets-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import ProgressBarPlugin from 'progress-bar-webpack-plugin';

import StyleLintPlugin from 'stylelint-webpack-plugin';

import webpackConfig from './webpack.base.conf';

const PUBLIC_PATH = config.get('publicPath');
const APP_ENTRY_POINT = config.get('appEntry');

let webpackProdOutput;

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
    Object.assign(entryConfig, {[`${item[0]}/assets/${item[0]}`]: [item[1]]});
  });

} else if(Object.entries(APP_ENTRY_POINT).length === 1){
  Object.entries(APP_ENTRY_POINT).forEach(item => {
    Object.assign(entryConfig, {[item[0]]: [item[1]]});
  });
} else {
  console.log(chalk.red('You must define a entry'));
}

//Config for output

if (Object.entries(APP_ENTRY_POINT).length > 1) {
  webpackProdOutput = {
    publicPath: PUBLIC_PATH,
    filename: '[name].[chunkhash].js',
    chunkFilename: "[id].[chunkhash].js",
  };

} else  if (Object.entries(APP_ENTRY_POINT).length === 1){
  webpackProdOutput = {
    publicPath: PUBLIC_PATH,
    filename: 'assets/[name].[chunkhash].js',
    chunkFilename: "assets/[id].[chunkhash].js",
  };
} else {
  console.log(chalk.red('You must define a entry'));
}

webpackConfig.output = Object.assign(webpackConfig.output, webpackProdOutput);

webpackConfig.devtool = 'source-map';

webpackConfig.entry = entryConfig;

webpackConfig.module.rules = webpackConfig.module.rules.concat({});

webpackConfig.plugins.push(
  new ProgressBarPlugin(),
  // new CopyWebpackPlugin([{
  //   from: 'public/assets/*',
  //   to: '/assets/'
  // }]),
  new webpack.DefinePlugin({
    __CONFIG__: JSON.stringify(config.get('app')),
    'process.env': {
      NODE_ENV: JSON.stringify('production')
    },
  }),
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false,
  }),
  new webpack.IgnorePlugin(/un~$/),
  new webpack.optimize.UglifyJsPlugin({
    sourceMap: true,
  }),
  // new webpack.optimize.CommonsChunkPlugin({
  //   name: 'common',
  //   filename: 'assets/common-[hash].js',
  //   minChunks: optimizationMinChunks,
  // }),
  // new SaveAssetsJson({
  //   // path: path.join(__dirname, 'dist'),
  //   filename: 'dist/assets/assets.json',
  //   prettyPrint: true,
  //   metadata: {
  //     version: '1.0.0',
  //   },
  // }),
  new StyleLintPlugin({
    context: "src",
    configFile: '.stylelintrc.js',
    files: '**/*.less',
    failOnError: false,
    quiet: false,
    syntax: 'less'
  }),
);

// Config for Html file and other plugins
if (Object.entries(APP_ENTRY_POINT).length > 1) {
  Object.keys(APP_ENTRY_POINT).forEach(name => {
    webpackConfig.plugins.push(
      new HtmlWebpackPlugin({
        filename: `${name}/${name}.html`,
        template: 'public/index.html',
        inject: 'body',
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true
          // more options:
          // https://github.com/kangax/html-minifier#options-quick-reference
        },
        // chunks: [name],
        // necessary to consistently work with multiple chunks via CommonsChunkPlugin
        // chunksSortMode: 'dependency'
      }),
      new SaveAssetsJson({
        // path: path.join(__dirname, 'dist'),
        filename: `dist/${name}/assets/assets.json`,
        prettyPrint: true,
        metadata: {
          version: '1.0.0',
        },
      }),
    );
  });
} else  if(Object.entries(APP_ENTRY_POINT).length === 1){
  Object.keys(APP_ENTRY_POINT).forEach(name => {
    webpackConfig.plugins.push(
      new HtmlWebpackPlugin({
        filename: `${name}.html`,
        template: 'public/index.html',
        inject: 'body',
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true
          // more options:
          // https://github.com/kangax/html-minifier#options-quick-reference
        },
        // chunks: [name],
        // necessary to consistently work with multiple chunks via CommonsChunkPlugin
        // chunksSortMode: 'dependency'
      }),
      new SaveAssetsJson({
        // path: path.join(__dirname, 'dist'),
        filename: 'dist/assets/assets.json',
        prettyPrint: true,
        metadata: {
          version: '1.0.0',
        },
      }),
    );
  });
} else {
  console.log(chalk.red('You must define a entry'));
}

export default webpackConfig;

