const webpack = require('webpack')
const path = require('path')
const base = require('./base')
const merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { StatsWriterPlugin } = require('webpack-stats-plugin')
const isDev = require('./isDev')

const commonPlugins = [
	new webpack.DllReferencePlugin({
		context: '.',
		manifest: require(path.join(base.output.path, 'shared-manifest.json')),
		sourceType: 'commonjs2',
		name: path.join(base.output.path, 'shared.js')
	}),
	new webpack.DllReferencePlugin({
		context: '.',
		manifest: require(path.join(base.output.path, 'vendor-manifest.json')),
		sourceType: 'commonjs2',
		name: path.join(base.output.path, 'vendor.js')
	}),
	new ExtractTextPlugin('styles.css'),
	new CopyWebpackPlugin([
		{
			from: 'src/index.html',
			to: 'index.html'
		},
		{
			from: 'node_modules/emojione/assets/png',
			to: 'emoji'
		}
	])
]
const plugins = isDev
	? [
			...commonPlugins,
			new StatsWriterPlugin({
				filename: 'stats-renderer.json',
				fields: null
			})
		]
	: commonPlugins

const renderer = {
	entry: './src/client.ts',
	output: {
		filename: 'renderer.js'
	},
	target: 'electron-renderer',
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					use: ['css-loader', 'resolve-url-loader']
				})
			},
			{
				test: /\.(woff2)(\?[a-z0-9=&.]+)?$/,
				loader: 'file-loader',
				options: {
					name: 'fonts/[name].[ext]?[hash]'
				}
			},
			{
				test: /\.(ttf|eot|svg|woff)(\?[a-z0-9=&.]+)?$/, // Needs to be used with caution
				loader: 'skip-loader'
			}
		]
	},
	plugins
}

module.exports = merge(base, renderer)
