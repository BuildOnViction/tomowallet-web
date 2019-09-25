const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const dotenv = require('dotenv');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

module.exports = options => {
  // // Get the root path (assuming your webpack config is in the root of your project!)
  // const currentPath = path.join(__dirname);

  // // Create the fallback path (the production .env)
  // const envPath = currentPath + '/.env';

  // // Set the path parameter in the dotenv config
  // const fileEnv = dotenv.config({ path: envPath }).parsed;

  // // reduce it to a nice object, the same as before
  // const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
  //   prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
  //   return prev;
  // }, {});

  return {
    mode: options.mode,
    entry: options.entry,
    output: Object.assign(
      {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index_bundle.js',
        publicPath: '/',
      },
      options.output,
    ),
    optimization: options.optimization,
    devtool: options.devtool,
    devServer: options.devServer,
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.(png|jpeg|svg|ttf|woff|eot)$/,
          use: {
            loader: 'file-loader',
          },
        },
        {
          test: /\.(css|scss)$/,
          use: [
            {
              loader: 'style-loader',
            },
            {
              loader: 'css-loader',
            },
            {
              loader: 'sass-loader',
            },
          ],
        },
      ],
    },
    node: Object.assign(
      {
        fs: 'empty',
        net: 'empty',
        child_process: 'empty',
      },
      options.node,
    ),
    plugins: [
      // new webpack.DefinePlugin(envKeys),
      new HtmlWebpackPlugin({
        template: './public/index.html',
        filename: './index.html',
      }),
      new MomentLocalesPlugin({
        localesToKeep: ['fr'],
      }),
      new webpack.optimize.ModuleConcatenationPlugin(),
    ].concat(options.plugins || []),
    target: options.target || 'web',
    externals: options.externals,
    performance: options.performance || {},
  };
};
