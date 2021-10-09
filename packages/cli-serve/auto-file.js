const fs = require('fs-extra');
const path = require('path');
const chokidar = require('chokidar');
const ejs = require('ejs');
const { packagesDir } = require('../../scripts/paths');
const compileData = require('../../scripts/examples-route');
const { rootDir } = require('../../scripts/paths');
const { prefix } = require(path.resolve(rootDir, 'cli.config.js'));
const chalk = require('chalk');
const RegName = /(?!.*\\).*/;

module.exports = function() {
  chokidar
    .watch(packagesDir)
    .on('addDir', initTemplate)
    .on('unlinkDir', deleteTemplate);
};

// 新建文件夹初始化模版
function initTemplate(path) {
  if (isEmptyDir(path)) {
    const name = path.match(RegName)[0];
    createFile('index.vue', name);
    createFile('index.js', name);
    createFile('index.md', name, `${prefix}-${name}`);
    createFile('index.less', name, `${prefix}-${name}`);
    applyLess(name);
    compileData();
  }
}

// 删除文件夹移除模版
function deleteTemplate(path) {
  const name = path.match(RegName)[0];
  compileData();
  removeLess(name);
}

// 追加less引入
function applyLess(name) {
  const filePath = path.join(rootDir, `src/relax.less`);
  const data = fs.readFileSync(filePath);
  const content = data.toString() + `@import '../packages/${name}/index.less';`;
  fs.writeFileSync(filePath, content);
}

// 移除less引入
function removeLess(name) {
  const filePath = path.join(rootDir, `src/relax.less`);
  const data = fs.readFileSync(filePath);
  const content = data
    .toString()
    .replace(`@import '../packages/${name}/index.less';`, '');
  fs.writeFileSync(filePath, content);
}

// 创建组件模版
function createFile(path, name, tagName) {
  const ext = path.match(/[a-z]+$/);
  const componentName = firstToUpper(name);
  const data = fs.readFileSync(`../template/component/${path}`);
  const html = ejs.render(data.toString(), { name: componentName, tagName });
  const filePath = `${packagesDir}/${name}/index.${ext}`;
  fs.ensureFileSync(filePath);
  fs.writeFileSync(filePath, html, { encoding: 'utf8' });
  console.log(chalk.green(`Tips: ${name}组件 ${ext} 文件创建成功`));
}

// 判断文件夹是否为空
function isEmptyDir(fPath) {
  var pa = fs.readdirSync(fPath);
  if (pa.length === 0) {
    return true;
  } else {
    return false;
  }
}

// 首字母转大写
function firstToUpper(str) {
  return str
    .trim()
    .toLowerCase()
    .replace(str[0], str[0].toUpperCase());
}
