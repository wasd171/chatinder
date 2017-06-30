const webpack = require('webpack')
const path = require('path')
const { TsConfigPathsPlugin } = require('awesome-typescript-loader')
const BabiliPlugin = require('babili-webpack-plugin')

const { NODE_ENV } = process.env
const isDev = NODE_ENV === 'development'

module.exports = {
	output: {
		path: path.join(__dirname, '..', 'dist')
	},

	// Enable sourcemaps for debugging webpack's output.
	devtool: 'source-map',

	resolve: {
		// Add '.ts' and '.tsx' as resolvable extensions.
		extensions: ['.ts', '.tsx', '.js', '.json'],
		plugins: [new TsConfigPathsPlugin()]
	},

	module: {
		rules: [
			// All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
			{
				test: /\.tsx?$/,
				loader: 'awesome-typescript-loader',
				options: { transpileOnly: true }
			},

			// All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
			{
				enforce: 'pre',
				test: /\.js$/,
				loader: 'source-map-loader',
				exclude: [new RegExp(`node_modules\\${path.sep}apollo-client`)]
			},

			// Handle .graphql
			{ test: /\.graphql$/, loader: 'graphql-tag/loader' }
		]
	},
	plugins: [
		!isDev ? new BabiliPlugin() : null,
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(NODE_ENV || 'production')
		})
	],
	watch: isDev,
	watchOptions: {
		ignored: /node_modules/
	}
}
