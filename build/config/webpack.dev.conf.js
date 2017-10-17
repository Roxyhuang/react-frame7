import config from 'config';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import BrowserSyncPlugin from 'browser-sync-webpack-plugin';
import DashboardPlugin from 'webpack-dashboard/plugin';
import StyleLintPlugin from 'stylelint-webpack-plugin';
import precss from 'precss';
import postcssCssnext from 'postcss-cssnext';

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

// const htmlPlugins =
//   new HtmlWebpackPlugin({
//     title: '111',
//     // template: `src/assets/template/${page.template}`,
//     template: `public/index.html`,
//     inject: 'body',
//     filename: 'index.html',
//   });

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
    // Prevents BrowserSync from automatically opening up the app in your browser
    open: false,
    reloadDelay: 2500,
  }, {
    // Disable BrowserSync's browser reload/asset injections feature because
    // Webpack Dev Server handles this for us already
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
  // You can config some dev web-config
//   {
//   test: /\.css$/,
//   use: [
//     {
//       loader: 'style-loader',
//     },
//     {
//       loader: 'css-loader',
//       options: {sourceMap: true, importLoaders: 1}
//     },
//     {
//       loader: 'postcss-loader',
//       options: {
//         sourceMap: true,
//         // https://github.com/postcss/postcss-loader/issues/92
//         // https://github.com/postcss/postcss-loader/issues/8
//         plugins: () => [
//           precss(),
//           postcssCssnext({
//             browsers: ['last 2 versions', 'ie >= 9'],
//             compress: true,
//           }),
//         ],
//       },
//     },
//   ],
// }
);

// webpackConfig.plugins = webpackConfig.plugins.concat(htmlPlugins);
// Config for Html file and other plugins
if (Object.entries(APP_ENTRY_POINT).length > 1) {
  Object.keys(APP_ENTRY_POINT).forEach(name => {
    webpackConfig.plugins.push(
      new HtmlWebpackPlugin({
        filename: `${name}/${name}.html`,
        template: 'public/index.html',
        inject: 'body',
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
      }),
    );
  });
} else {
  console.log(chalk.red('You must define a entry'));
}

webpackConfig.devtool = 'cheap-module-eval-source-map';

// webpackConfig.entry = {
//   app: [
//     'babel-polyfill',
//     'webpack-hot-middleware/client?reload=true',
//     'webpack/hot/only-dev-server',
//     `./${APP_ENTRY_POINT}`,
//   ],
//   vendors: [
//     'react',
//     'react-dom',
//     'framework7-react'
//   ],
// };

webpackConfig.entry = entryConfig;

export default webpackConfig;
