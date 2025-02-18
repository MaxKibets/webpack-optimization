const express = require("express");
const app = express();
const path = require("path");

if (process.env.NODE_ENV === "dev") {
  console.log("dev mode running");
  const webpackDevMiddleware = require("webpack-dev-middleware");
  const configuration = require("../webpack/webpack.dev.config");
  const webpack = require("webpack");
  const webpackCompiler = webpack(configuration);

  app.use(
    webpackDevMiddleware(webpackCompiler, configuration.devServer.devMiddleware)
  );

  const webpackHotMiddleware = require("webpack-hot-middleware");
  app.use(webpackHotMiddleware(webpackCompiler));
}

app.get("/", (req, res) => {
  const indexPage = path.resolve(__dirname, "../dist/index.html");

  res.sendFile(indexPage);
});

app.use("/static", express.static(path.resolve(__dirname, "../dist")));

app.listen(3001, () => {
  console.log("Server is running on port http://localhost:3001");
});
