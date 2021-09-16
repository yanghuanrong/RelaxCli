const path = require('path');

const common = require('./webpack.common.js');

const { merge } = require('webpack-merge');
const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const FriendlyErrorsWebpackPlugin = require('@soda/friendly-errors-webpack-plugin');
const portfinder = require('portfinder');

module.exports = async function() {
  const port = await portfinder.getPortPromise({ port: 8000, stopPort: 9000 });
  const website = `http://localhost:${port}/`;

  const webpackConfig = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    stats: 'errors-only',
    plugins: [
      new VueLoaderPlugin(),
      new Webpack.DefinePlugin({
        BASE_URL: JSON.stringify(website),
        'process.env': JSON.stringify(process.env),
      }),
      new FriendlyErrorsWebpackPlugin({
        compilationSuccessInfo: {
          messages: ['You application is running here' + website],
        },
        clearConsole: true,
      }),
    ],
    devServer: {
      compress: true,
      port: port,
    },
  });

  const compiler = Webpack(webpackConfig);
  const devServerOptions = { ...webpackConfig.devServer };
  const server = new WebpackDevServer(devServerOptions, compiler);
  server.startCallback(() => {
    // console.log('Starting server on http://localhost:' + port);
  });
};
