var path = require('path')
var utils = require('./utils')
var projectRoot = path.resolve(__dirname, '../')

module.exports = {
  output: {
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.vue'],
    fallback: [path.join(__dirname, '../node_modules')],
    alias: {
      'src': path.resolve(__dirname, '../src'),
      'src-docs': path.resolve(__dirname, '../src-docs'),
      'focus-trap': path.resolve(__dirname, 'node_modules/focus-trap/index.js')
    },
    modulesDirectories: ['node_modules', 'shared']
  },
  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')],
    alias: {
      "markdown-highlight-custom": path.join(__dirname, "./markdown-highlight-custom")
    }
  },
  module: {
    preLoaders: [
      {
        test: /\.vue$/,
        loader: 'eslint',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'eslint',
        include: projectRoot,
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.html$/,
        loader: 'vue-html'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.md$/,
        loader: 'html!markdown-highlight-custom'
      }
    ]
  },
  eslint: {
    formatter: require('eslint-friendly-formatter')
  },
  vue: {
    autoprefixer: false,
    loaders: utils.cssLoaders()
  },
  postcss: function () {
    return [
      require('autoprefixer')({ browsers: ['last 2 versions'] })
    ]
  }
}
