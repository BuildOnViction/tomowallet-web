const webpack = require('webpack');
const path = require('path');
const common = require('./webpack.common.js');

module.exports = common({
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist/electron'),
    filename: '[name].[contenthash].js',
    publicPath: './',
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
  ],
  // target: 'node',
  // externals: {
  //   fs: 'commonjs fs',
  // },
  // node: {
  //   fs: false,
  //   net: true,
  //   child_process: true,
  // },
  node: {
    __dirname: false,
    __filename: false,
  },
  performance: {
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
});
