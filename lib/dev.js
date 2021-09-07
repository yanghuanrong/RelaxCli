const path = require('path');
const { srcDir, distDir, rootDir } = require('../utils/paths');

const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
module.exports = function() {
  const compiler = Webpack(
    {
      mode: 'development',
      entry: path.join(srcDir, 'main.js'),
      context: rootDir,
      stats: {
        warnings: false,
      },
      watch: true,
      module: {
        rules: [
          {
            test: /\.vue$/,
            use: 'vue-loader',
          },
        ],
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: path.join(srcDir, 'index.html'),
          inject: 'body',
        }),
        new VueLoaderPlugin(),
        new FriendlyErrorsWebpackPlugin({
          compilationSuccessInfo: {
            messages: ['You application is running here http://localhost:3000'],
            notes: [
              'Some additional notes to be displayed upon successful compilation',
            ],
          },
        }),
      ],
    },
    (err) => {
      if (err) {
        console.error(err.stack || err);
        if (err.details) {
          console.error(err.details);
        }
        return;
      }
    }
  );

  const server = new WebpackDevServer(
    {
      compress: true,
      port: 9000,
      webSocketServer: 'ws',
      hot: true,
      client: {
        logging: 'none',
      },
    },
    compiler
  );

  server.startCallback(() => {
    console.log('Starting server on http://localhost:9000');
  });
};
