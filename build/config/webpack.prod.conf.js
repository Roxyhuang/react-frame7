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
import STYLE_CONFIG from '../../.stylelintrc';

const PUBLIC_PATH = config.get('publicPath');
const APP_ENTRY_POINT = `${config.get('jsSourcePath')}/Main.jsx`;

const webpackProdOutput = {
  publicPath: PUBLIC_PATH,
  filename: 'assets/[name].[chunkhash].js',
  chunkFilename: "assets/[id].[chunkhash].js",
};

const html = config.get('html');

const htmlPlugins = html.map((page) =>
  new HtmlWebpackPlugin({
    title: page.title,
    // template: `src/assets/template/${page.template}`,
    template: `public/index.html`,
    inject: 'body',
    filename: page.filename,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      conservativeCollapse: true,
    }
  })
);

webpackConfig.output = Object.assign(webpackConfig.output, webpackProdOutput);

webpackConfig.devtool = 'source-map';

webpackConfig.entry = {
  app: [
    'babel-polyfill',
    'webpack-hot-middleware/client?reload=true',
    'webpack/hot/only-dev-server',
    `./${APP_ENTRY_POINT}`,
  ],
  vendors: [
    'react',
    'react-dom',
    'framework7-react'
  ],
};

webpackConfig.module.rules = webpackConfig.module.rules.concat({

});

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
  // how you want your code to be optimized
  // all configurable
  new webpack.IgnorePlugin(/un~$/),
  new webpack.optimize.UglifyJsPlugin({
    sourceMap: true,
  }),
  // new webpack.optimize.CommonsChunkPlugin({
  //   name: 'common',
  //   filename: 'assets/common-[hash].js',
  //   minChunks: optimizationMinChunks,
  // }),
  new SaveAssetsJson({
    // path: path.join(__dirname, 'dist'),
    filename: 'dist/assets/assets.json',
    prettyPrint: true,
    metadata: {
      version: '1.0.0',
    },
  }),
  new StyleLintPlugin({
    context: "src",
    configFile: '.stylelintrc.js',
    files: '**/*.less',
    failOnError: false,
    quiet: false,
    syntax: 'less'
  }),
);

webpackConfig.plugins = webpackConfig.plugins.concat(htmlPlugins);

export default webpackConfig;

