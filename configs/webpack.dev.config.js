const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WriteFilePlugin = require('write-file-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
// const CircularDependencyPlugin = require('circular-dependency-plugin')

const plugins = [
  new webpack.DefinePlugin({
    AUTH_COOKIE_PREFIX: 'XStateServer',
    NODE_ENV: 'development'
  }),
  // new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  new webpack.EnvironmentPlugin({
    NODE_ENV: 'development' // use 'development' unless process.env.NODE_ENV is defined
  }),
  new WriteFilePlugin(),
  new BundleAnalyzerPlugin({
    analyzerMode: 'static',
    openAnalyzer: false
  })
  // new CircularDependencyPlugin({
  //   // `onStart` is called before the cycle detection starts
  //   onStart ({ compilation }) {
  //     console.log('start detecting webpack modules cycles')
  //   },
  //   // `onDetected` is called for each module that is cyclical
  //   onDetected ({ module: webpackModuleRecord, paths, compilation }) {
  //     if ((_.find(paths, (p) => p.includes('react-jsonschema-form') || [])).length > 0) {
  //       // skip react json schema
  //       return
  //     }
  //     // `paths` will be an Array of the relative module paths that make up the cycle
  //     // `module` will be the module record generated by webpack that caused the cycle
  //     compilation.errors.push(new Error(paths.join(' -> ')))
  //   },
  //   // `onEnd` is called before the cycle detection ends
  //   onEnd ({ compilation }) {
  //     console.log('end detecting webpack modules cycles')
  //   }
  // })
]

const babelRule = (rcPath) => ({
  test: /\.m?js$/,
  exclude: /(node_modules|bower_components)/,
  use: {
    loader: 'babel-loader',
    options: require(rcPath)
  }
})

const cssRule = {
  test: /\.css$/i,
  use: ['style-loader', 'css-loader']
}

module.exports = [{
  name: 'client',
  devtool: 'eval-cheap-source-map',
  mode: 'development',
  entry: [
    'webpack-hot-middleware/client?path=/__webpack_hmr_client',
    'react-hot-loader/patch',
    path.join(__dirname, '../src/client/main.js')
  ],
  output: {
    path: path.join(__dirname, '../dist/client/'),
    filename: 'client.js',
    publicPath: '/'
  },
  hotOutputPath: '/__webpack_hmr_client',
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  },
  plugins: [
    ...plugins,
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/client/index.tpl.html'),
      inject: 'body',
      filename: 'index.html'
    })
  ],
  module: {
    rules: [
      babelRule(path.join(__dirname, '../src/client/.babelrc.json')),
      cssRule
    ]
  }
}]
