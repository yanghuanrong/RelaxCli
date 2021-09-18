const common = require('./webpack.common.js');
const { merge } = require('webpack-merge');
const Webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const chalk = require('chalk');

module.exports = async function() {
  const webpackConfig = merge(common, {
    mode: 'production',
    plugins: [
      new VueLoaderPlugin(),
      new Webpack.DefinePlugin({
        BASE_URL: JSON.stringify('./'),
        'process.env': JSON.stringify(process.env),
      }),

      //#会打印两条成功信息 https://github.com/webpack/webpack/discussions/12996
      new ProgressBarPlugin({
        format: `  build [:bar] ${chalk.green.bold(':percent')} (:elapsed s)`,
      }),
    ],
  });

  Webpack(webpackConfig, (err, stats) => {
    if (err) {
      console.error(err);
      return;
    }
  });
};
