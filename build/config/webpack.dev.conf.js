const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const autoprefixer = require('autoprefixer');

const ROOT_PATH = path.resolve(__dirname, '../../');
const APP_PATH = path.resolve(ROOT_PATH, 'src');
const BUILD_PATH = path.resolve(ROOT_PATH, '/dist');
const APP_FILE = path.resolve(APP_PATH, 'main.entry.jsx');


module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: {
    app: APP_FILE
    // app: [
    //   'webpack-hot-middleware/client?reload=true',
    //   APP_FILE,
    // ],
    // vendors: [
    //   'antd',
    //   'classnames',
    //   'jwt-decode',
    //   'query-string',
    //   'react',
    //   'react-addons-transition-group',
    //   'react-dom',
    //   'react-redux',
    //   'react-router',
    //   'react-router-redux',
    //   'react-router-scroll',
    //   'recharts',
    //   'redux',
    //   'redux-actions',
    //   'redux-thunk',
    //   'reselect',
    //   'whatwg-fetch',
    // ],
  },
  output: {
    publicPath: '/',
    path: BUILD_PATH,
    filename: '[name].js',
    sourceMapFilename: '[name].[hash].js.map',
    chunkFilename: '[name].[chunkhash:5].min.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /^node_modules$/,
        loaders: ['react-hot-loader', 'babel-loader'],
        include: [APP_PATH]
      },
      {
        test: /\.css$/,
        exclude: /^node_modules$/,
        loaders: ['style', 'css', 'autoprefixer'],
        include: [APP_PATH]
      },
      {
        test: /\.less$/,
        exclude: /^node_modules$/,
        loaders: ['style', 'css', 'autoprefixer', 'less'],
        include: [APP_PATH]
      },
      {
        test: /\.scss$/,
        exclude: /^node_modules$/,
        loader: 'style-loader!css-loader?modules&localIdentName=[name]__[local]-[hash:base64:5]!sass-loader?sourceMap=true',
        include: [APP_PATH],
      },
      {
        test: /\.(eot|woff|svg|ttf|woff2|gif|appcache)(\?|$)/,
        exclude: /^node_modules$/,
        loader: 'file-loader?name=[name].[ext]',
        include: [APP_PATH]
      }, {
        test: /\.(png|jpg|gif)$/,
        exclude: /^node_modules$/,
        loader: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]',
        include: [APP_PATH]
      }, {
        test: /\.jsx$/,
        exclude: /^node_modules$/,
        loaders: ['react-hot-loader', 'babel-loader'],
        include: [APP_PATH]
      }]
  },
  // postcss: [autoprefixer],
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    }),
    new ProgressBarPlugin(),
    new HtmlWebpackPlugin({
      filename: '/dist/index.html',
      template: 'public/index.html',
      hash: false,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  // resolve: {
  //   extensions: ['', '.js', '.jsx', '.less', '.scss', '.css'],
  // }
};
