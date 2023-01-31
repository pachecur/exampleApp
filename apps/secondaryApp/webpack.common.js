/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

const path = require('path')
const webpack = require('webpack')
const {ModuleFederationPlugin} = require("webpack").container;
const packageJsonDeps = require('./package.json').devDependencies

const appName = 'secondaryApp'
const urls = {
  ['development']: 'http://localhost:8081/',
  ['local']: 'http://localhost:8081/',
}

module.exports = (mode) => {

  return {
    entry: './src/App',
    output: {
      path: path.join(__dirname, '/dist'),
      filename: '[name].[fullhash].js',
      publicPath: urls[mode],
      clean: true,
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.json'],
      alias: {
      },
    },
    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
      ],
    },
    plugins: [
      new ModuleFederationPlugin({
        name: appName,
        library: {type: "var", name: appName},
        filename: "remoteEntry.js",
        exposes: {
          // expose each component
          "./App": "./src/App",
        },
        shared: {
          "react": {singleton: true, requiredVersion: packageJsonDeps["react"]},
          "react-dom": {singleton: true, requiredVersion: packageJsonDeps["react-dom"]},
          "react-router-dom": {singleton: true, requiredVersion: packageJsonDeps["react-router-dom"]},
          "babel-polyfill": {singleton: true},
        },
      }),
      new webpack.DefinePlugin({}),
    ],
  }
}
