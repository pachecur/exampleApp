/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

const path = require('path')
const dotenv = require('dotenv')
const fs = require('fs')
const webpack = require('webpack')
const {ModuleFederationPlugin} = require("webpack").container
const HtmlWebpackPlugin = require('html-webpack-plugin')

var secondaryAppPackage = require('../secondaryApp/package.json')


const envServers = {
  ['development']: 'localhost',
  ['local']: 'localhost',
}

const stagingPort = 8079

const apps = {
  secondaryApp: {port: 8081, version: secondaryAppPackage.version},
}

module.exports = (mode, server) => {
  const currentPath = path.join(__dirname, '..', '..')
  const basePath = currentPath + '/.env'
  const envPath = basePath + '.' + mode
  const finalPath = fs.existsSync(envPath) ? envPath : basePath
  const fileEnv = dotenv.config({path: finalPath}).parsed

  const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(fileEnv[next])
    return prev
  }, {})

  const serverURL = envServers[server]

  const remotes = Object.keys(apps).reduce((prev, app) => {
    const appServer = server === 'staging' ? `${serverURL}:${stagingPort}/${app}` : `${serverURL}:${apps[app].port}`
    const url = `${app}@http://${appServer}/remoteEntry.js?v=${apps[app].version}`
    return {
      ...prev,
      [app]: url,
    }
  }, {})

  return {
    entry: './src/index',
    output: {
      path: path.join(__dirname, '/dist'),
      filename: '[name].[fullhash].js',
      publicPath: '/',
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
        name: "mainApp",
        remotes,
        shared: {
          "react": {singleton: true, eager: true, requiredVersion: "17.0.2"},
          "react-dom": {singleton: true, eager: true, requiredVersion: "17.0.2"},
          "react-router-dom": {singleton: true, eager: true, requiredVersion: "5.2.0"},
          "babel-polyfill": {singleton: true, eager: true, requiredVersion: "6.26.0"},
        },
      }),
      new HtmlWebpackPlugin({
        template: './src/index.html',
      }),
      new webpack.DefinePlugin(envKeys),
    ],
  }
}
