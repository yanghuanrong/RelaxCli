const path = require('path');

// 项目根目录路径
const rootDir = path.join(process.cwd());

// 项目源码路径
const srcDir = path.join(rootDir, 'src');

// 项目打包路径
const distDir = path.join(rootDir, 'dist');

module.exports = {
  rootDir,
  srcDir,
  distDir,
};
