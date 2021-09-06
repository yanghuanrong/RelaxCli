#!/usr/bin/env node

const { program } = require('commander');
const chalk = require('chalk');

// 版本信息
program.version(`${require('../package').version}`);

// 创建项目
program
  .command('create <name>')
  .description('创建项目')
  .action((name) => {
    require('../lib/create')(name);
  });

// 运行项目
program
  .command('serve')
  .description('运行项目')
  .action(() => {
    require('../lib/dev')();
  });

// 输入错误给出提示
program.on('command:*', ([cmd]) => {
  program.outputHelp();
  console.log();
  console.log(`  ` + chalk.red(`Unknown command ${chalk.yellow(cmd)}.`));
  console.log();
  process.exitCode = 1;
});

program.parse(process.argv);
