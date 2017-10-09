// Created by Neo_Huang
const express = require('express');
const http = require('http');
const https = require('https');
const webpack = require('webpack');
const proxyMiddleware = require('http-proxy-middleware');
const vhost = require('vhost');
const config = require('../config/client.conf');
const webpackConfig = require('../config/webpack.dev.conf');
const checkVersions = require('./check-versions');

// Check version for npm and node

checkVersions();

const app = express();
const compiler = webpack(webpackConfig);

const devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: '/',
  hot: true,
  historyApiFallback: true,
  inline: true,
  progress: true,
  stats: {
    colors: true,
    chunks: false,
  },
});

// Set a Proxy Server
app.use('/api', proxyMiddleware({
  target: 'http://www.baidu.com',
  changeOrigin: true,
}));

app.use(require('connect-history-api-fallback')());

app.use(devMiddleware);

app.use(require('webpack-hot-middleware')(compiler, {
  log: console.log,
  reload: true,
  path: '/__webpack_hmr',
  heartbeat: 1,
}));

app.use(vhost(config.server.qa.host, app));
app.use('/assets', express.static('../../public'));

if (require.main === module) {
  const server = http.createServer(app);
  server.listen(3000,  () => {
    console.log('Listening on %j', server.address());
  });
}
