const productionConfig = require("./webpack.prod.config.js");
const { merge } = require("webpack-merge");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = merge(productionConfig, {
  plugins: [
    new BundleAnalyzerPlugin({ analyzerMode: "server", openAnalyzer: true }),
  ],
});
