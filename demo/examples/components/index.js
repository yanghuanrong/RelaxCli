const ctx = require.context('./', true, /\.vue$/);

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
    app.component(component.name, component);
  });
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

const demo = {
  install,
};

export default demo;
