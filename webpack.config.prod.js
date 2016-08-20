var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var config = {
  entry: [
    './app/Resources/js/index.js'
  ],

  output: {
    path: path.join(__dirname, 'web/dist'),
    filename: 'bundle.js'
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
    new ExtractTextPlugin('bundle.css', { allChunks: true })
  ],

  module: {
    loaders: [{
      test: /\.js?$/,
      include: path.join(__dirname, 'app/Resources/js'),
      loaders: ['react-hot', 'babel']
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader')
    }]
  },

  postcss: [
    require('autoprefixer')
  ],

  resolve: {
    modulesDirectories: ['node_modules', 'components'],
    alias: {
      'react': 'react-lite',
      'react-dom': 'react-lite'
    }
  },
};

module.exports = config;
