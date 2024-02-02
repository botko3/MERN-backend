import path from 'path';
import { fileURLToPath } from 'url';
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack'); // 用于访问内置插件

const _filenameNew = fileURLToPath(import.meta.url);
const _dirname=path.dirname(_filenameNew);

const path = require('path');

module.exports = {
  mode:'production',
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-first-webpack.bundle.js',
  },
  module: {
    rules: [{ test: /\.txt$/, use: 'raw-loader' }],
  },
};