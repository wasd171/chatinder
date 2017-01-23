/* eslint max-len: 0 */
import webpack from 'webpack';
import merge from 'webpack-merge';
import baseConfig from './webpack.config.base';
import path from 'path'

const port = process.env.PORT || 3000;

export default merge(baseConfig, {
	debug: true,

	// devtool: 'cheap-module-source-map',

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
		loaders: [
			{
				test:    /\.css$/,
				loaders: [
					'style-loader',
					'css-loader?sourceMap'
				]
			}
		]
	},

	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('development')
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			filename: 'vendor.js',
			minChunks: function (module, count) {
				return (
					module.resource &&
					module.resource.indexOf(path.resolve('node_modules')) === 0
					&& module.resource.indexOf(path.resolve('node_modules/md-components')) !== 0
				)
			}
		}),
		new webpack.SourceMapDevToolPlugin({
			filename: '[file].map',
			exclude: [
				'vendor.js'
			],
			module: true,
			columns: false
		}),
	],

	target: 'electron-renderer'
});
