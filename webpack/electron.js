import webpack from 'webpack';
import merge from 'webpack-merge';
import baseConfig from './base';

export default merge(baseConfig, {
	devtool: 'source-map',

	entry: '../main/index.js',
	// entry: ['./main/index.js'],

	output: {
		path:     __dirname,
		filename: '../main.js'
	},

	resolve: {
		alias: {
			'superagent': 'superagent/lib/node/index.js'
		}
	},

	plugins: [
		// new webpack.optimize.UglifyJsPlugin({
		// 	compressor: {
		// 		warnings: false
		// 	}
		// }),
		new webpack.BannerPlugin({
			banner: 'require("source-map-support").install();',
			raw: true, 
			entryOnly: false
		}),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production')
			}
		})
	],

	target: 'electron-main',

	node: {
		__dirname:  false,
		__filename: false
	},

	externals: [
		'roboto-fontface',
		'source-map-support',
		'font-awesome',
		'tinder',
		'node-fetch',
		'emojione'
	],


});