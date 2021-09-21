const path = require('path');

// 项目文件路径
const rootDir = path.join(process.cwd());
const srcDir = path.join(rootDir, 'src');
const distDir = path.join(rootDir, 'dist');
const examplesDir = path.join(rootDir, 'examples');

module.exports = {
  rootDir,
  srcDir,
  distDir,
  examplesDir,
};
