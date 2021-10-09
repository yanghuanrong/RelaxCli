const startServe = require('../../webpack/webpack.dev');
const CompileData = require('../../scripts/examples-route');

module.exports = function() {
  CompileData();
  startServe();
};
