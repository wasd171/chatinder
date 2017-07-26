const webpack = require('webpack')
const base = require('./base')
const merge = require('webpack-merge')
const path = require('path')

const dll = {
	entry: {
		vendor: [
			'date-fns',
			'emojione',
			'emojionearea',
			'he',
			'jquery',
			'lodash.trim',
			'material-ui',
			'mobx',
			'mobx-react',
			'mobx-utils',
			'mobx-state-tree',
			'raven-js',
			'react',
			'react-dom',
			'react-image-gallery',
			'react-router',
			'react-router-dom',
			'react-tap-event-plugin',
			'react-virtualized',
			'react-waypoint',
			'simplebar',
			'styled-components',
			'tinder-modern',
			'is-reachable'
		]
	},
	output: {
		filename: '[name].js',
		libraryTarget: 'commonjs2'
	},
	target: 'electron-renderer',
	plugins: [
		new webpack.DllPlugin({
			path: path.join(base.output.path, '[name]-manifest.json')
		})
	]
}

module.exports = merge(base, dll)
