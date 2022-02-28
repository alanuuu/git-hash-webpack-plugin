const webpack = require('webpack');
const path = require('path');
const GitHashWebpackPlugin = require('../index');

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, './index.js'),
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index.js',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.test': 123,
    }),
    new GitHashWebpackPlugin({
      len: 11,
      webpack,
    }),
  ],
};
