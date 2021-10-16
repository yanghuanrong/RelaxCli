const path = require('path');
const common = require('./webpack.common.js');
const { merge } = require('webpack-merge');
const Webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const chalk = require('chalk');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { rootDir } = require('../scripts/paths');

module.exports = async function() {
  const webpackConfig = merge(common, {
    mode: 'production',
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
          test: /\.less$/i,
          use: [
            MiniCssExtractPlugin.loader,
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
    // 提取所有的 CSS 到一个文件中
    optimization: {
      splitChunks: {
        cacheGroups: {
          styles: {
            name: 'main',
            type: 'css/mini-extract',
            chunks: 'all',
            enforce: true,
          },
        },
      },
      minimize: true,
      minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '/css/[name].css',
      }),
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
