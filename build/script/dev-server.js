// Created by Neo_Huang
import express from 'express';
import http from 'http';
import https from 'https';
import webpack from 'webpack';
import proxyMiddleware from 'http-proxy-middleware';
import vhost from 'vhost';
import config from 'config';
import webpackConfig from '../config/webpack.dev.conf';

// Check version for npm and node

const app = express();
const compiler = webpack(webpackConfig);

const devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: '/',
  hot: true,
  historyApiFallback: true,
  inline: true,
  progress: true,
  clientLogLevel: "error",
  compress: true,
  noInfo: true,
  quiet: true,
  stats: {
    colors: true,
    chunks: false,
  },
});

app.use(require('connect-history-api-fallback')());
//
app.use(devMiddleware);
//
app.use(require('webpack-hot-middleware')(compiler, {
  log: console.log,
  reload: true,
  path: '/__webpack_hmr',
  heartbeat: 1,
}));
//
app.use(vhost(`${config.get('vhost')}:${config.get('port')}`, app));
app.use('/assets', express.static('../../public/assets'));
//
if (require.main === module) {
  const server = http.createServer(app);
  server.listen(3000,  () => {
    console.log('Listening on %j', server.address());
  });
}
