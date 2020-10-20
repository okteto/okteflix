const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const appPath = path.join(__dirname, '/src');

module.exports = {
  context: appPath,
  mode: 'development',
  devtool: 'source-map',
  entry: ['./index.jsx'],
  output: {
    filename: 'app.[contenthash].js',
    path: path.resolve(path.join(__dirname, '/dist')),
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
    modules: [
      path.resolve(path.join(__dirname, '/node_modules')),
      path.resolve(appPath)
    ],
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      use: 'babel-loader',
      exclude: /node_modules/
    }, {
      test: /\.css$/i,
      use: ['style-loader', 'css-loader']
    }, {
      test: /\.(png|jpg|svg)$/,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 100000,
          },
        }
      ]
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    port: 80,
    host: '0.0.0.0',
    hot: true,
    sockPort: 443,
    disableHostCheck: true,
    watchOptions: {
      poll: true
    },
    proxy: {
      '/api': 'http://movies-api:8080'
    }
  }
};
