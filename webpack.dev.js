const path = require('path');
const common = require('./webpack.common.js');

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
    https: true,
  },
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
