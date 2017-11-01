import config from 'config';
import webpack from 'webpack';
import chalk from 'chalk';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import SaveAssetsJson from 'assets-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

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
    Object.assign(entryConfig, {[`${item[0]}/assets/js/${item[0]}`]: [item[1]]});
  });

} else if(Object.entries(APP_ENTRY_POINT).length === 1){
  Object.entries(APP_ENTRY_POINT).forEach(item => {
    Object.assign(entryConfig, {[`assets/js/${item[0]}`]: [item[1]]});
  });
} else {
  console.log(chalk.red('You must define a entry'));
}
//Config for output

if (Object.entries(APP_ENTRY_POINT).length > 1) {
  webpackProdOutput = {
    publicPath: `${PUBLIC_PATH}/`,
    filename: '[name].[chunkhash].js',
    chunkFilename: `${Object.entries(APP_ENTRY_POINT)[0][0]}/assets/js/[id].[chunkhash].js`,
  };

} else  if (Object.entries(APP_ENTRY_POINT).length === 1){
  webpackProdOutput = {
    publicPath: `${PUBLIC_PATH}/`,
    filename: '[name].[chunkhash].js',
    chunkFilename: "assets/js/[id].[chunkhash].js",
  };
} else {
  console.log(chalk.red('You must define a entry'));
}

webpackConfig.output = Object.assign(webpackConfig.output, webpackProdOutput);

webpackConfig.devtool = 'source-map';

webpackConfig.entry = entryConfig;

webpackConfig.module.rules = webpackConfig.module.rules.concat({});

webpackConfig.plugins.push(
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false,
  }),
  new webpack.IgnorePlugin(/un~$/),
  new webpack.optimize.UglifyJsPlugin({
    sourceMap: true,
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

webpackConfig.module.rules = webpackConfig.module.rules.concat(
  {
    test: /\.css|less$/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader?modules&localIdentName=[name]__[local]-[hash:base64:5]',
      use: [
        'css-loader?modules&localIdentName=[name]__[local]-[hash:base64:5]',
        'less-loader?modules&localIdentName=[name]__[local]-[hash:base64:5]',
        {
          loader: 'postcss-loader?modules&localIdentName=[name]__[local]-[hash:base64:5]',
          options: {
            config: {
              path: 'build/config/postcss.config.js'
            }
          }
        }
      ]
    })
  },
);

// Config for Html file and other plugins
if (Object.entries(APP_ENTRY_POINT).length > 1) {
  Object.keys(APP_ENTRY_POINT).forEach((name, index) => {
    if(index === 0) {
      webpackConfig.plugins.push(
        new ExtractTextPlugin({

          filename: `${name}/assets/css/global.[chunkhash].css`,
          disable: false,
          allChunks: true,
        }),
      )
    }
    webpackConfig.plugins.push(
      new HtmlWebpackPlugin({
        filename: `${name}/${name}.html`,
        template: 'public/index.html',
        inject:'true',
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true
        },
        chunks: [`${name}/assets/js/${name}`, 'vendors'],
      }),
      new SaveAssetsJson({
        // path: path.join(__dirname, 'dist'),
        filename: `dist/${name}/assets/assets.json`,
        prettyPrint: true,
        metadata: {
          version: process.env.PACKAGE_VERSION,
        },
      }),
      new CopyWebpackPlugin([{
        from: 'public/assets/',
        to: `${name}/assets/`
      }]),
    );
  });
} else  if(Object.entries(APP_ENTRY_POINT).length === 1){
  Object.keys(APP_ENTRY_POINT).forEach(name => {
    webpackConfig.plugins.push(
      new HtmlWebpackPlugin({
        filename: `${name}.html`,
        template: 'public/index.html',
        inject:'true',
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true
        },
        chunks: [`assets/js/${name}`, 'vendors'],
      }),
      new ExtractTextPlugin({
        filename: 'assets/css/global.[chunkhash].css',
        disable: false,
        allChunks: true,
      }),
      new SaveAssetsJson({
        // path: path.join(__dirname, 'dist'),
        filename: 'dist/assets/assets.json',
        prettyPrint: true,
        metadata: {
          version: process.env.PACKAGE_VERSION,
        },
      }),
      new CopyWebpackPlugin([{
        from: 'public/assets/',
        to: 'assets/'
      }]),
    );
  });
} else {
  console.log(chalk.red('You must define a entry'));
}

export default webpackConfig;

