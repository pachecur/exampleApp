/* eslint-disable */
const path = require('path')
const {defaults} = require('jest-config')
const rootPath = path.join(__dirname, '..')

module.exports = {
  rootDir: rootPath,
  testEnvironment: 'jsdom',
  testTimeout: 50000,
  verbose: true,
  clearMocks: true,
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'scss', 'css'],
  testPathIgnorePatterns: [
    '/node_modules/',
  ],
  moduleNameMapper: {
    "\\.(css|scss|less)$": "identity-obj-proxy",
  },
  collectCoverage: false,
  coveragePathIgnorePatterns: [
    "node_modules/",
  ],
  moduleDirectories: ['node_modules', path.join(rootPath, 'src')],
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
}
