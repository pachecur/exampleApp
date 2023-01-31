/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

const {merge} = require('webpack-merge')
const common = require('./webpack.common.js')

const mode = 'development'

module.exports = merge(common('local'), {
  mode: mode,
  devtool: 'inline-source-map',
  devServer: {
    historyApiFallback: {
      index: '/index.html',
    },
    contentBase: './dist',
    port: 8081,
  },
})
