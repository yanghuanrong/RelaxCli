const path = require("path");

module.exports = {
  title: "Demo",
  prefix: "x",
  webpack: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
  },
};
