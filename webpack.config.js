const {resolve} = require('path')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const DependencyExtractionWebpackPlugin = require('@wordpress/dependency-extraction-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
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
  mode: isProduction ? 'production' : 'development',
  devtool: 'inline-source-map',
  entry: {
    ['editor']: [
      resolve(__dirname, 'resources/assets/scripts/editor/block.js'),
      resolve(__dirname, 'resources/assets/styles/editor.css'),
    ],
    ['public']: [
      resolve(__dirname, 'resources/assets/scripts/public/index.js'),
      resolve(__dirname, 'resources/assets/styles/public.css'),
    ],
  },
  output: {
    path: resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.js', '.json', '.css'],
    modules: [resolve(__dirname, 'node_modules')],
  },
  optimization: {
    minimizer: isProduction ? [new UglifyJsPlugin()] : [],
  },
  stats: {
    all: false,
    assets: true,
    errors: true,
    timings: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: resolve(__dirname, 'node_modules'),
        loaders: [
          'babel-loader',
          'eslint-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
						loader: 'file-loader',
						options: {
							name: '[name].css',
						},
          },
          { loader: 'extract-loader' },
          { loader: 'css-loader' },
          { loader: 'postcss-loader' },
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
    new CleanWebpackPlugin(),
    new DependencyExtractionWebpackPlugin({
      injectPolyfill: false,
      useDefaults: true,
      outputFormat: 'json',
    }),
    new FriendlyErrorsWebpackPlugin(),
    new ManifestPlugin({
      output: {
        publicPath: resolve(__dirname, 'dist'),
      },
    }),
    new WebpackBar(),
    ...(! isProduction
      ? [
        new BrowserSyncPlugin({
          host: 'localhost',
          port: 3000,
          files: [{
            match: [
              './dist/*.js',
              './dist/*.css',
            ],
          }],
        }, {
          reload: false,
        }),
      ]
      : [/** dev only plugins */]
    ),
  ],
}
