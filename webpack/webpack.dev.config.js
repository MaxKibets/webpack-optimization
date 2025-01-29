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
        exclude: /\.module\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.css$/,
        include: /\.module\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[local]--[md4:hash:7]",
              },
            },
          },
        ],
      },
      {
        test: /\.(jpg|png|svg)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            // if the file is less than 10kb, it will be converted to base64,
            // else it will be copied to the dist/images folder
            maxSize: 10 * 1024,
          },
        },
        generator: {
          filename: "images/[name][ext]",
        },
      },
    ],
  },
});

module.exports = config;
