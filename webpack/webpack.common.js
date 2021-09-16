const path = require("path");

const { srcDir, distDir, rootDir } = require("../scripts/paths");

const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    app: path.join(srcDir, "main.js"),
  },
  output: {
    filename: "[name].bundle.js",
    path: distDir,
    clean: true,
  },
  context: rootDir,
  stats: {
    warnings: false,
  },
  watchOptions: {
    ignored: /node_modules/,
  },
  resolve: {
    alias: {
      "@": srcDir,
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: "vue-loader",
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.less$/i,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "less-loader",
            options: {
              lint: true,
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(rootDir, "public", "index.html"),
      inject: "body",
    }),
  ],
};
