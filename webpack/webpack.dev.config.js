const commonConfig = require("./webpack.common.config.js");
const { merge } = require("webpack-merge");
const path = require("path");

const config = merge(commonConfig, {
  mode: "development",
  // webpack-dev-server plugin configuration
  devServer: {
    port: 9000,
    static: {
      directory: path.resolve(__dirname, ".."),
    },
    devMiddleware: {
      index: "index.html",
      writeToDisk: true,
    },
    client: {
      overlay: true,
    },
    liveReload: false,
  },
});

module.exports = config;
