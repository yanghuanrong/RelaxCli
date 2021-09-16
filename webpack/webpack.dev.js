const common = require("./webpack.common.js");
const { merge } = require("webpack-merge");

const Webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const FriendlyErrorsWebpackPlugin = require("@soda/friendly-errors-webpack-plugin");

module.exports = function() {
  const port = 9000;

  const webpackConfig = merge(common, {
    mode: "development",
    devtool: "inline-source-map",
    plugins: [
      new VueLoaderPlugin(),
      new Webpack.DefinePlugin({
        BASE_URL: JSON.stringify(`http://localhost:${port}/`),
        "process.env": JSON.stringify(process.env),
      }),
      new FriendlyErrorsWebpackPlugin({
        compilationSuccessInfo: {
          messages: [
            "You application is running here http://localhost:" + port,
          ],
        },
        clearConsole: true,
      }),
    ],
    devServer: {
      compress: true,
      port: port,
      webSocketServer: "ws",
    },
  });

  const compiler = Webpack(webpackConfig);
  const devServerOptions = { ...webpackConfig.devServer };
  const server = new WebpackDevServer(devServerOptions, compiler);
  server.startCallback(() => {
    console.log("Starting server on http://localhost:" + port);
  });
};
