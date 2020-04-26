const {resolve} = require('path')
const DependencyExtractionWebpackPlugin = require('@wordpress/dependency-extraction-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const LiveReloadPlugin = require('webpack-livereload-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const WebpackBar = require('webpackbar')

/**
 * Webpack utilities
 */
const isProduction = process.env.NODE_ENV === 'production'

/**
 * Webpack Configuration
 */
module.exports = {
  entry: {
    editor: resolve(__dirname, 'resources/assets/scripts/editor/block.js'),
    public: resolve(__dirname, 'resources/assets/scripts/public/index.js'),
  },
  output: {
    path: resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.css'],
    modules: [resolve(__dirname, 'node_modules')],
  },
  optimization: {
    minimizer: [new UglifyJsPlugin()],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: resolve(__dirname, 'node_modules'),
        loaders: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /\.css$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              url: false,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              parser: 'postcss-scss',
            },
          },
        ],
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$/i,
        loader: 'file-loader?name=/img/[name].[ext]',
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack', 'url-loader'],
      },
    ],
  },
  plugins: [
    new DependencyExtractionWebpackPlugin({
      injectPolyfill: false,
      useDefaults: true,
      outputFormat: 'json',
    }),
    new LiveReloadPlugin({
      port: 3000,
    }),
    new MiniCssExtractPlugin({
      chunkFilename: '[id].css',
    }),
    new FriendlyErrorsWebpackPlugin(),
    new WebpackBar(),
  ],
  stats: 'errors-only',
}
