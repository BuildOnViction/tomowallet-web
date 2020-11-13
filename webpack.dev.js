const path = require('path');
const common = require('./webpack.common.js');
const express = require('express')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = common({
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist/dev'),
    filename: '[name].[contenthash].js',
    publicPath: '/',
  },
  devtool: 'source-map',
  devServer: {
    historyApiFallback: true,
    contentBase: 'dist',
    https: false,
    setup (app) {
      app.use('/privacy.wasm/',
        express.static(path.join(__dirname, 'public', 'privacy.wasm')));
    }
  },
  plugins: [
    new CopyWebpackPlugin(
      [{ from: 'public'}],
    ),
  ],
  optimization: {
    moduleIds: 'hashed',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  performance: {
    hints: false,
  },
});
