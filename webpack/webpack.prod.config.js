const commonConfig = require("./webpack.common.config.js");
const { merge } = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const config = merge(commonConfig, {
  output: {
    filename: "[name].[contenthash:12].js",
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.css$/,
        include: /\.module\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[hash:base64]",
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    // extracts css into separate file
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash:12].css",
    }),
  ],
});

module.exports = config;
