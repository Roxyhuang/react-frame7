const path = require('path');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

module.exports = {
  // context: path.join(__dirname, './src'),

  entry: {
    app: [
      'webpack-hot-middleware/client?reload=true',
      './src/main.entry.jsx',
    ],
    // vendors: [
    //   'antd',
    //   'classnames',
    //   'jwt-decode',
    //   'lodash',
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
    path: path.join(__dirname, 'dist'),
    filename: '[name].[hash].min.js',
    publicPath: '/',
    sourceMapFilename: '[name].[hash].js.map',
    chunkFilename: '[id].[hash].min.js',
  },

  devtool: 'cheap-module-eval-source-map',

  plugins: [
    new ProgressBarPlugin(),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      inject: 'body',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin('vendors', '[name].[hash].min.js'),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new ExtractTextPlugin('[name].css'),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development') },
    }),
  ],

  module: {
    loaders: [
      {
        test: /\.scss$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'style-loader!css-loader?modules&localIdentName=[name]__[local]-[hash:base64:5]!sass-loader?sourceMap=true'
      },
      {
        test: /\.scss$/,
        exclude: path.resolve(__dirname, 'src'),
        loader: 'style-loader!css-loader!sass-loader?sourceMap=true'
      },
      {
        test: /\.css$/,
        include: path.join(__dirname, 'src'),
        loader: ExtractTextPlugin.extract('style-loader', '!css-loader!postcss-loader'),
      },
      {
        test: /\.css$/,
        exclude: path.join(__dirname, 'src'),
        loader: 'style!css',
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!less-loader'),
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel'],
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        loader: 'url-loader?prefix=img/&limit=10000',
      },
      {
        test: /\.(woff|woff2|ttf|eot)$/,
        loader: 'url-loader?prefix=font/&limit=10000',
      },
    ],
  },

  postcss: [autoprefixer],

  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
};
