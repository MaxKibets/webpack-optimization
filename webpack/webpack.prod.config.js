const commonConfig = require("./webpack.common.config.js");
const { merge } = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { PurgeCSSPlugin } = require("purgecss-webpack-plugin");
const glob = require("glob");
const path = require("path");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

const config = merge(commonConfig, {
  output: {
    filename: "js/[name].[contenthash:12].js",
  },
  mode: "production",
  optimization: {
    minimize: true,
    minimizer: [
      "...", // this will use default minimizer (TerserPlugin for JS)
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: ["default", { discardComments: { removeAll: true } }],
        },
      }),
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: [
              ["imagemin-mozjpeg", { quality: 40 }],
              ["imagemin-pngquant", { quality: [0.65, 0.9], speed: 4 }],
              ["imagemin-gifsicle", { interlaced: true }],
              [
                "imagemin-svgo",
                {
                  plugins: [
                    {
                      name: "preset-default",
                      params: {
                        overrides: { removeViewBox: false },
                        addAttributesToSVGElement: {
                          params: {
                            attributes: [
                              { xmlns: "http://www.w3.org/2000/svg" },
                            ],
                          },
                        },
                      },
                    },
                  ],
                },
              ],
            ],
          },
        },
        generator: [
          {
            type: "asset",
            preset: "webp-custom-name",
            implementation: ImageMinimizerPlugin.imageminGenerate,
            options: {
              plugins: ["imagemin-webp"],
            },
          },
        ],
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
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
          filename: "images/[name].[contenthash:12][ext]",
        },
        // use: [
        //   {
        //     loader: "image-webpack-loader",
        //     options: {
        //       mozjpeg: {
        //         quality: 40,
        //       },
        //       pngquant: {
        //         quality: [0.65, 0.9],
        //         speed: 4,
        //       },
        //     },
        //   },
        // ],
      },
    ],
  },
  plugins: [
    // extracts css into separate file
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash:12].css",
    }),
    new PurgeCSSPlugin({
      paths: glob.sync(`${path.join(__dirname, "../src")}/**/*`, {
        nodir: true,
      }),
    }),
  ],
});

module.exports = config;
