const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { merge } = require('webpack-merge');
const { distDir, rootDir, examplesDir } = require('../scripts/paths');
const pkg = require(path.resolve(rootDir, 'package.json'));
const { title, webpack } = require(path.resolve(rootDir, 'cli.config.js'));

module.exports = merge(webpack, {
  entry: {
    app: path.join(examplesDir, 'entry.js'),
  },
  output: {
    filename: 'js/[name].bundle.js',
    path: distDir,
    clean: true,
  },
  context: rootDir,
  watchOptions: {
    ignored: '**/node_modules',
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
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[hash][ext][query]',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'font/[hash][ext][query]',
        },
      },
      {
        test: /\.md$/i,
        use: ['vue-loader', path.resolve(__dirname, '../scripts/md-loader.js')],
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
