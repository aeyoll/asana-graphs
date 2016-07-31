var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var config = {
  entry: [
    'webpack-dev-server/client?http://127.0.0.1:3000',
    'webpack/hot/only-dev-server',
    './app/Resources/js/index.js',
  ],

  output: {
    path: path.join(__dirname, 'web/dist'),
    filename: 'bundle.js',
    publicPath: 'http://127.0.0.1:3000/static/'
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
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
    modulesDirectories: ['node_modules', 'components']
  },
};

module.exports = config;
