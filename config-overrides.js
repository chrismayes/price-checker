const path = require('path');

module.exports = {
  webpack: function (config) {
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        'rrd': path.resolve(__dirname, 'node_modules/react-router-dom/dist/main.js'),
      },
    };
    return config;
  },
  jest: function (config) {
    config.setupFilesAfterEnv = ['<rootDir>/src/setupTests.ts'];
    config.transform = {
      '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest',
    };
    config.transformIgnorePatterns = [
      '/node_modules/(?!axios)/',
    ];
    config.moduleFileExtensions = [
      'ts',
      'tsx',
      'js',
      'jsx',
      'json',
      'node',
    ];
    config.testEnvironment = 'jsdom';
    config.moduleNameMapper = {
      '^rrd$': '<rootDir>/node_modules/react-router-dom/dist/main.js',
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    };
    return config;
  },
};