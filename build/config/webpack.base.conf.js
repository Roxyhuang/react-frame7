import chalk from 'chalk';
import path from 'path';
import webpack from 'webpack';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import config from 'config';
import fs from 'fs';

process.traceDeprecation = false;

// Environment variable injection
// ================================================================================
const version = JSON.parse(fs.readFileSync('package.json', 'utf8')).version;
process.env.PACKAGE_VERSION = version;

// Defining config variables
// ================================================================================
const BUILD_PATH = path.join(__dirname, '../../dist');
const APP_ENTRY_POINT = config.get('appEntry');

const COMMON_LOADERS = [
  {
    test: /\.(js|jsx)?$/,
    exclude: /node_modules/,
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      plugins: ['transform-runtime', 'transform-decorators-legacy'],
    },
  },
  {
    test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'application/font-woff',
        }
      }
    ],
  },
  {
    test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'application/font-woff',
        }
      }
    ],
  },
  {
    test: /\.[ot]tf(\?v=\d+\.\d+\.\d+)?$/,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'application/octet-stream',
        }
      }
    ],
  },
  {
    test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'application/vnd.ms-fontobject',
        }
      }
    ],
  },
  {
    test: /\.js|jsx$/,
    enforce: "pre",
    loader: "eslint-loader"
  }
];

// Export
// ===============================================================================
const webpackConfig = {
  output: {
    path: BUILD_PATH,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css'],
    modules: [
      path.join(__dirname, 'src'),
      path.join(__dirname, 'assets'),
      path.join(__dirname, 'src'),
      "node_modules"
    ],
    alias: {},
  },
  plugins: [
    new webpack.IgnorePlugin(/vertx/), // https://github.com/webpack/webpack/issues/353
    new CaseSensitivePathsPlugin(),
  ],
  module: {
    rules: COMMON_LOADERS,
  },
  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  externals: {
    // console:true,
    // fs:'{}',
    // tls:'{}',
    // net:'{}'
    'zepto': 'Zepto',
    'frame7': 'Framework7',
  },
};

if (Object.entries(APP_ENTRY_POINT).length > 1) {
  Object.keys(APP_ENTRY_POINT).forEach((name,index) => {
    if(index === 0) {
      webpackConfig.plugins.push(
        new webpack.optimize.CommonsChunkPlugin({ name:'vendors',  filename: `${name}/assets/[name].[hash].js`}),
      );
      webpackConfig.module.rules.push(
        {
          test: /\.(?:ico|gif|png|jpg|jpeg|webp|svg)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                hash: 'sha512',
                digest: 'hex',
                name: `${name}/assets/img/[hash].[ext]`,
                publicPath: `http://${config.get('publicPath')}/`,
              }
            },
            {
              loader: 'image-webpack-loader',
              options: {
                query: {
                  mozjpeg: {
                    progressive: true,
                  },
                  gifsicle: {
                    interlaced: true,
                  },
                  optipng: {
                    optimizationLevel: 7,
                  },
                  pngquant: {
                    quality: '65-90',
                    speed: 4
                  }
                },
              }
            }
          ],
        },
      )
    }
  });

} else  if(Object.entries(APP_ENTRY_POINT).length === 1){
    webpackConfig.plugins.push(
      new webpack.optimize.CommonsChunkPlugin({ name:'vendors',  filename: 'assets/[name].[hash].js'}),
    );
  webpackConfig.module.rules.push(
    {
      test: /\.(?:ico|gif|png|jpg|jpeg|webp|svg)$/i,
      use: [
        {
          loader: 'file-loader',
          options: {
            hash: 'sha512',
            digest: 'hex',
            name: 'assets/img/[hash].[ext]',
            publicPath: `http://${config.get('publicPath')}/`,
          }
        },
        {
          loader: 'image-webpack-loader',
          options: {
            query: {
              mozjpeg: {
                progressive: true,
              },
              gifsicle: {
                interlaced: true,
              },
              optipng: {
                optimizationLevel: 7,
              },
              pngquant: {
                quality: '65-90',
                speed: 4
              }
            },
          }
        }
      ],
    },
  )
} else {
  console.log(chalk.red('You must define a entry'));
}

export default webpackConfig;
