const path = require('path');

module.exports = function override(config) {
  config.resolve = {
    ...config.resolve,
    alias: {
      ...config.resolve.alias,
      'rrd': path.resolve(__dirname, 'node_modules/react-router-dom/dist/main.js')
    }
  };
  return config;
};