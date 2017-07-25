const base = require('./base')
const path = require('path')
const merge = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')

const graphql = {
	entry: './src/graphql-to-json.ts',
	output: {
		path: path.join(__dirname, '..'),
		filename: 'graphql-to-json.js'
	},
	target: 'electron-main',
	devtool: false
}

module.exports = merge(base, graphql)
