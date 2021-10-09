const fs = require("fs-extra");
const path = require("path");
const chokidar = require("chokidar");
const ejs = require("ejs");
const { packagesDir } = require("../../scripts/paths");
const compileData = require("../../scripts/examples-route");
const { rootDir } = require("../../scripts/paths");
const { prefix } = require(path.resolve(rootDir, "ui.config.js"));

module.exports = function() {
  const RegName = /(?!.*\\).*/;

  chokidar
    .watch(packagesDir)
    .on("addDir", (path) => {
      if (isEmptyDir(path)) {
        const name = path.match(RegName)[0];
        createFile("../template/component/index.vue", name);
        createFile("../template/component/index.js", name);
        createFile("../template/component/index.md", name, `${prefix}-${name}`);
        compileData();
      }
    })
    .on("unlinkDir", (path) => {
      console.log(`Directory ${path} has been removed`);
    });
};

function createFile(path, name, tagName) {
  const ext = path.match(/[a-z]+$/);
  const componentName = firstToUpper(name);
  const data = fs.readFileSync(path);
  const html = ejs.render(data.toString(), { name: componentName, tagName });
  const filePath = `${packagesDir}/${name}/index.${ext}`;
  fs.ensureFileSync(filePath);
  fs.writeFileSync(filePath, html, { encoding: "utf8" });
}

function isEmptyDir(fPath) {
  var pa = fs.readdirSync(fPath);
  if (pa.length === 0) {
    return true;
  } else {
    return false;
  }
}

function firstToUpper(str) {
  return str
    .trim()
    .toLowerCase()
    .replace(str[0], str[0].toUpperCase());
}
