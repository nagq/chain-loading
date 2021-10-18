const webpack = require('webpack');
const path = require('path');

const config = {
  devtool: 'source-map',
  entry: [
    'react-hot-loader/patch',
    './example/src/index.js'
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [
      '.js',
      '.jsx'
    ],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      'react-dom': '@hot-loader/react-dom',
      'chain-loading': path.resolve(__dirname, '../src'),
    }
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'public')
  }
};

module.exports = config;
