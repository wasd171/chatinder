import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import merge from 'webpack-merge';
import baseConfig from './base';

export default merge(baseConfig, {
  entry: '../app/index.js',

  output: {
    publicPath: '../../dist/'
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: 'css-loader'
        })
      },

      // {
      //   test: /^((?!\.global).)*\.css$/,
      //   loader: ExtractTextPlugin.extract(
      //     'style-loader',
      //     'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
      //   )
      // }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    // new webpack.optimize.UglifyJsPlugin({
    //   compressor: {
    //     screw_ie8: true,
    //     warnings: false
    //   }
    // }),
    new ExtractTextPlugin({
      filename: 'style.css', 
      allChunks: true 
    })
  ],

  target: 'electron-renderer'
});