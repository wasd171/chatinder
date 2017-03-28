/* eslint max-len: 0 */
import webpack from 'webpack';
import merge from 'webpack-merge';
import baseConfig from './base';
import path from 'path'
import BabiliPlugin from 'babili-webpack-plugin'

const port = process.env.PORT || 3000;

export default merge(baseConfig, {
	entry: {
		app: [
			`webpack-hot-middleware/client?path=http://localhost:${port}/__webpack_hmr`,
			'./app/index'
		]
	},

	output: {
		publicPath: `http://localhost:${port}/dist/`
	},

	module: {
		rules: [
			{
				test:    /\.css$/,
				use: [
					{
						loader: 'style-loader'
					},
					{
						loader: 'css-loader',
						options: {
							sourceMap: true
						}
					}
				]
			}
		]
	},

	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin (),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('development')
		}),
		// new BabiliPlugin(),
		// new webpack.optimize.CommonsChunkPlugin({
		// 	name: 'vendor',
		// 	filename: 'vendor.js',
		// 	minChunks: function (module, count) {
		// 		return (
		// 			module.resource &&
		// 			module.resource.indexOf(path.resolve('node_modules')) === 0
		// 		)
		// 	}
		// }),
		new webpack.SourceMapDevToolPlugin({
			filename: '[file].map',
			// exclude: [
			// 	'vendor.js'
			// ],
			module: true,
			columns: false
		}),
	],

	target: 'electron-renderer'
});