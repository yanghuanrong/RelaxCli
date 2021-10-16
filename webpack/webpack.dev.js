const path = require('path');
const common = require('./webpack.common.js');
const { merge } = require('webpack-merge');
const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const FriendlyErrorsWebpackPlugin = require('@soda/friendly-errors-webpack-plugin');
const portfinder = require('portfinder');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const chalk = require('chalk');
const { rootDir } = require('../scripts/paths');

module.exports = async function() {
  const port = await portfinder.getPortPromise({ port: 8000, stopPort: 9000 });
  const website = `http://localhost:${port}/`;

  const webpackConfig = merge(common, {
    mode: 'development',
    infrastructureLogging: {
      level: 'none',
    },
    devtool: 'inline-source-map',
    stats: 'errors-only',
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.less$/i,
          use: [
            'style-loader',
            'css-loader',
            'less-loader',
            {
              loader: 'style-resources-loader',
              options: {
                patterns: path.resolve(rootDir, 'src/*.less'),
                injector: 'append',
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new VueLoaderPlugin(),
      new Webpack.DefinePlugin({
        BASE_URL: JSON.stringify(website),
        'process.env': JSON.stringify(process.env),
      }),
      new FriendlyErrorsWebpackPlugin({
        compilationSuccessInfo: {
          messages: ['You application is running here ' + website],
        },
      }),
      //#会打印两条成功信息 https://github.com/webpack/webpack/discussions/12996
      new ProgressBarPlugin({
        format: `  start [:bar] ${chalk.green.bold(':percent')} (:elapsed s)`,
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
    // console.log('Starting server on ' + website);
  });
};
