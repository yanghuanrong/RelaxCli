const path = require("path");
const { srcDir, distDir, rootDir } = require("../utils/paths");

const Webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

const port = 9000;

module.exports = function() {
  const compiler = Webpack(
    {
      mode: "development",
      entry: path.join(srcDir, "main.js"),
      output: {
        filename: "[name].bundle.js",
        path: distDir,
        clean: true,
      },
      context: rootDir,
      stats: {
        warnings: false,
      },
      watch: true,
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
        new VueLoaderPlugin(),
        new FriendlyErrorsWebpackPlugin({
          compilationSuccessInfo: {
            messages: [
              "You application is running here http://localhost:" + port,
            ],
            notes: [
              "Some additional notes to be displayed upon successful compilation",
            ],
          },
        }),
        new Webpack.DefinePlugin({
          BASE_URL: JSON.stringify(`http://localhost:${port}/`),
          "process.env": JSON.stringify(process.env),
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
      port: port,
      webSocketServer: "ws",
      client: {
        logging: "none",
      },
    },
    compiler
  );

  server.startCallback(() => {
    console.log("Starting server on http://localhost:" + port);
  });
};
