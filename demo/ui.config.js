const path = require('path');

module.exports = {
  title: 'Demo',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
};
