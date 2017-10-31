import express from 'express';
import http from 'http';
// import https from 'https';
import webpack from 'webpack';
import vhost from 'vhost';
import config from 'config';
import webpackConfig from '../config/webpack.dev.conf';
import checkVersion from '../script/check-versions';

const APP_ENTRY_POINT = config.get('appEntry');

checkVersion();

const app = express();
const compiler = webpack(webpackConfig);

app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
  res.header('X-Powered-By', ' 3.2.1');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});

const devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: '/',
  hot: true,
  historyApiFallback: true,
  inline: true,
  progress: true,
  clientLogLevel: "error",
  compress: true,
  noInfo: false,
  quiet: false,
  stats: {
    colors: true,
    chunks: false,
  },
});

app.use(require('connect-history-api-fallback')());

app.use(devMiddleware);

app.use(require('webpack-hot-middleware')(compiler, {
  log: console.log,
  reload: true,
  path: '/__webpack_hmr',
  heartbeat: 1000,
}));

if (config.get('vhost')) {
  app.use(vhost(`${config.get('vhost')}:${config.get('port')}`, app));
} else {
  app.use(vhost(`${config.get('host')}:${config.get('port')}`, app));
}



if (Object.entries(APP_ENTRY_POINT).length > 1) {
  Object.keys(APP_ENTRY_POINT).forEach((name) => {
    app.use(`/${name}/assets`, express.static('public/assets'));
  });
} else {
  app.use('/assets', express.static('public/assets'));
}

if (require.main === module) {
  const server = http.createServer(app);
  server.listen(3000, () => {
    console.log('Listening on %j', server.address());
  });
}
