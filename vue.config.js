const path = require("path");
const fs = require("fs");
function resolve(p) {
  const res = path.resolve(__dirname, p);
  return res;
}
function getPath(p) {
  const res = {
    entry: "",
    template: ""
  };
  res.entry = resolve(`src/${p}/main.js`);
  res.template = resolve(`src/${p}/index.html`);
  return res;
}
module.exports = {
  configureWebpack: config => {
    const terserWebpackPlugin = config.optimization.minimizer[0];
    terserWebpackPlugin.options.test = /^a.js/;
    const terserOptions = terserWebpackPlugin.options.terserOptions;
    config.resolve.alias["@"] = resolve(`./src/${process.env.ENV_file}`);
    fs.writeFile("test-cofig.json", JSON.stringify(config));
  },

  pages: {
    index: {
      ...getPath(process.env.ENV_file)
    }
  },
  publicPath: "./",
  outputDir: `dist/${process.env.ENV_file}`
};
