/* eslint-disable */
var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './src/index'
  ],
	resolve: {
    root: [ path.resolve(__dirname, 'src/js') ],
		extensions: ['', '.js']
	},
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['react-hot', 'babel'],
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      },
      {
        test: /\.png/,
        loader: "file?name=[name].[ext]"
      },
      {
        test: /\.jpg/,
        loader: "file?name=[name].[ext]"
      },
      {
        test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.otf($|\?)|\.svg($|\?)/,
        loader: 'url-loader'
      }
    ]
  }
};
