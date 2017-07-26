const webpack = require('webpack')
const base = require('./base')
const merge = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')
const { StatsWriterPlugin } = require('webpack-stats-plugin')
const isDev = require('./isDev')
const path = require('path')

const devPlugins = [
	new StatsWriterPlugin({
		filename: 'stats-main.json',
		fields: null
	})
]

const plugins = isDev ? devPlugins : []

const main = {
	entry: './src/server.ts',
	output: {
		filename: 'main.js'
	},
	target: 'electron',
	externals: (context, request, callback) => {
		if (/about-window/.test(request)) {
			callback(null, 'commonjs ' + request)
		} else {
			callback()
		}
	},
	plugins
}

module.exports = merge(base, main)
