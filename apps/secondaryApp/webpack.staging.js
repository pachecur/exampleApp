/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const {merge} = require('webpack-merge');
const common = require('./webpack.common.js');
module.exports = (env) => {
  const mode = env.mode
  return merge(common('staging'), {
    mode: mode,
  })
}
