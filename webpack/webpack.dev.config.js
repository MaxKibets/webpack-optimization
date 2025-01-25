const commonConfig = require("./webpack.common.config.js");
const { merge } = require("webpack-merge");
const path = require("path");

const config = merge(commonConfig, {
  output: {
    filename: "bundle.js",
  },
  mode: "development",
  // webpack-dev-server plugin configuration
  devServer: {
    port: 9000,
    static: {
      directory: path.resolve(__dirname, "../dist"),
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
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
});

module.exports = config;
