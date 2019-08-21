const path = require('path');
const common = require('./webpack.common.js');

module.exports = common({
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist/dev'),
    filename: 'tomowallet_bundle.js',
    publicPath: '/',
  },
  devtool: 'source-map',
  devServer: {
    historyApiFallback: true,
    contentBase: 'dist',
    https: true,
  },
  performance: {
    hints: false,
  },
});
