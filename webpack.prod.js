const webpack = require('webpack');
const path = require('path');
const common = require('./webpack.common.js');
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = common({
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist/prod'),
    filename: '[name].[contenthash].js',
    publicPath: '/',
  },
  devtool: false,
  optimization: {
    moduleIds: 'hashed',
    minimize: true,
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
  plugins: [
    new webpack.IgnorePlugin(/^\.\/(?!english)/, /bip39\/src\/wordlists$/),
    new CopyWebpackPlugin(
      [{ from: 'public'}],
    ),
  ],
  performance: {
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
});
