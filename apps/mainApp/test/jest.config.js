/* eslint-disable */
const path = require('path')
const {defaults} = require('jest-config')

module.exports = {
  rootDir: path.join(__dirname, '..'),
  testEnvironment: 'jsdom',
  verbose: true,
  clearMocks: true,
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'scss', 'css'],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/applications/',
  ],
  moduleNameMapper: {
    '\\.(css|scss|less)$': 'identity-obj-proxy',
  },
  collectCoverage: false,
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/src/contexts',
    '/applications/'
  ],
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
}
