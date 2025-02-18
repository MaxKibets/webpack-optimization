import "webpack-hot-middleware/client";
import { renderApp } from "./index.js";

module?.hot.accept("./index.js", () => {
  console.log("accepting the updated index.js module");
  renderApp();
});
