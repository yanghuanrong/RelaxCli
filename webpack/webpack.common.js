const path = require('path');

const { srcDir, distDir, rootDir } = require('../scripts/paths');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const pkg = require(path.resolve(rootDir, 'package.json'));

module.exports = {
  entry: {
    app: path.join(srcDir, 'main.js'),
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
      '@': srcDir,
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
      template: path.join(rootDir, 'public', 'index.html'),
      title: pkg.name,
      inject: 'body',
    }),
  ],
};
