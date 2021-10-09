import pkg from "../package.json";
// import config from "../ui.config";
const ctx = require.context("../packages", true, /\index.js$/);

const components = {};

for (const path of ctx.keys()) {
  const file = ctx(path).default;
  applyComponentsCode(file);
}

function applyComponentsCode(file) {
  const key = file.name;
  components[key] = file;
}

function install(app) {
  Object.keys(components).forEach((key) => {
    const component = components[key];
    app.component("x" + component.name, component);
  });
}

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

const UI = {
  version: pkg.version,
  install,
  ...components,
};

export default UI;
