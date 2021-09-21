const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { merge } = require('webpack-merge');

const {
  distDir,
  rootDir,
  examplesDir,
  publicDir,
} = require('../scripts/paths');
const pkg = require(path.resolve(rootDir, 'package.json'));
const { title, ...config } = require(path.resolve(rootDir, 'ui.config.js'));

module.exports = merge(config, {
  entry: {
    app: path.join(examplesDir, 'entry.js'),
  },
  output: {
    filename: '[name].bundle.js',
    path: distDir,
    clean: true,
  },
  context: rootDir,
  watchOptions: {
    ignored: /node_modules/,
  },
  resolve: {
    extensions: ['.js', '.json', '.vue'],
    alias: {
      crypto: false,
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less$/i,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(examplesDir, 'index.html'),
      title: title || pkg.name,
      inject: 'body',
    }),
  ],
});
