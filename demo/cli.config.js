const path = require('path');

module.exports = {
  title: 'RelaxUI',
  prefix: 'x',
  webpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
  },
};
