const path = require('path');
const chalk = require('chalk');
const fs = require('fs-extra');
const validateProjectName = require('validate-npm-package-name');

function create(projectName) {
  const cwd = process.cwd();
  const inCurrent = projectName === '.';
  const name = inCurrent ? path.relative('../', cwd) : projectName;
  const targetDir = path.resolve(cwd, projectName || '.');

  // 验证项目名是否符合规范
  const result = validateProjectName(name);
  if (!result.validForNewPackages) {
    console.error(chalk.red(`Invalid project name: "${name}"`));
    result.errors &&
      result.errors.forEach((err) => {
        console.error(chalk.red.dim('Error: ' + err));
      });
    result.warnings &&
      result.warnings.forEach((warn) => {
        console.error(chalk.red.dim('Warning: ' + warn));
      });
    process.exit(1);
  }

  if (fs.existsSync(targetDir)) {
  }
}

module.exports = (...args) => {
  return create(...args);
};
