const base = require('./base')
const merge = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')

const main = {
	entry: './src/server.ts',
	output: {
		filename: 'main.js'
	},
	target: 'electron',
	externals: [
		nodeExternals({
			whitelist: ['emojione']
		})
	]
}

module.exports = merge(base, main)
