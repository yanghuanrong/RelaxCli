const startServe = require('../../webpack/webpack.dev');
const compileData = require('../../scripts/examples-route');
const autoFile = require('./auto-file');

module.exports = function() {
  autoFile();
  compileData();
  startServe();
};
