const commonConfig = require("./webpack.common.config.js");
const { merge } = require("webpack-merge");

const config = merge(commonConfig, {
  mode: "development",
});

module.exports = config;
