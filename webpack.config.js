const webpack = require('webpack');
const path = require('path');

const config = {
  mode: 'production',
  entry: [
    './src/index.js'
  ],
  output: {
    path: path.resolve(__dirname, 'lib'),
    publicPath: '/',
    filename: 'index.js',
    library: {
      root: 'ChainLoading',
      amd: 'ChainLoading',
      commonjs: 'chain-loading',
    },
    libraryTarget: 'umd',
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
    modules: [
      'src',
      'node_modules',
    ],
    extensions: ['.js', '.jsx'],
  }
};

module.exports = config;
