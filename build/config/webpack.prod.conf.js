import config from 'config';
import chalk from 'chalk';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import SaveAssetsJson from 'assets-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import StyleLintPlugin from 'stylelint-webpack-plugin';

import webpackConfig from './webpack.base.conf';
import STYLE_CONFIG from '../../.stylelintrc';

const PUBLIC_PATH = config.get('publicPath');
console.log(PUBLIC_PATH);

const webpackProdOutput = {
  publicPath: PUBLIC_PATH,
  filename: 'assets/[name].[chunkhash].js',
  chunkFilename: "assets/[id].[chunkhash].js",
};

const html = config.get('html');

const htmlPlugins = html.map((page) =>
  new HtmlWebpackPlugin({
    title: page.title,
    template: `src/assets/template/${page.template}`,
    inject: 'body',
    filename: page.filename,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      conservativeCollapse: true,
    }
  })
);
