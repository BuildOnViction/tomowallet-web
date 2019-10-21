const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './main.js',
  output: {
    filename: 'main_bundled.js',
    path: path.resolve(__dirname),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  target: 'node',
  node: {
    __dirname: false,
    __filename: false,
  },
  target: 'electron-main',
};
