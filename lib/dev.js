const webpack = require('webpack');
const path = require('path');
const { srcDir, distDir, rootDir } = require('../utils/paths');

module.exports = function () {
  console.log(process.cwd());
  console.log(path.join(process.cwd(), 'src', 'main.js'));
  console.log(path.join(process.cwd(), 'src', 'main.js'));

  webpack(
    {
      entry: path.join(srcDir, 'main.js'),
      context: rootDir,
      output: {
        path: distDir,
        filename: 'bundle.js',
      },
    },
    () => {}
  );
};
