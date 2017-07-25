const webpack = require('webpack')
const base = require('./base')
const merge = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')
const { StatsWriterPlugin } = require('webpack-stats-plugin')
const isDev = require('./isDev')
const path = require('path')

const commonPlugins = [
	new webpack.DllReferencePlugin({
		context: '.',
		manifest: require(path.join(base.output.path, 'shared-manifest.json')),
		sourceType: 'commonjs2',
		name: path.join(base.output.path, 'shared.js')
	})
]

const devPlugins = [
	new StatsWriterPlugin({
		filename: 'stats-main.json',
		fields: null
	})
]

const plugins = isDev ? [...commonPlugins, ...devPlugins] : commonPlugins

const main = {
	entry: './src/server.ts',
	output: {
		filename: 'main.js'
	},
	target: 'electron',
	plugins
}

module.exports = merge(base, main)
