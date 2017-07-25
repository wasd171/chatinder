const webpack = require('webpack')
const path = require('path')
// const { TsConfigPathsPlugin } = require('awesome-typescript-loader')
const BabiliPlugin = require('babili-webpack-plugin')
const isDev = require('./isDev')
const HappyPack = require('happypack')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

const commonPlugins = [
	new webpack.DefinePlugin({
		'process.env.NODE_ENV': JSON.stringify(
			process.env.NODE_ENV || 'production'
		)
	}),
	new HappyPack({
		id: 'ts',
		threads: 2,
		loaders: [
			{
				path: 'ts-loader',
				query: { happyPackMode: true }
			}
		]
	})
]
const devPlugins = [new ForkTsCheckerWebpackPlugin()]
const productionPlugins = [new BabiliPlugin()]
const plugins = isDev
	? [...commonPlugins, ...devPlugins]
	: [...productionPlugins, ...commonPlugins]

module.exports = {
	output: {
		path: path.join(__dirname, '..', 'dist')
	},

	// Enable sourcemaps for debugging webpack's output.
	devtool: isDev ? 'source-map' : undefined,

	resolve: {
		// Add '.ts' and '.tsx' as resolvable extensions.
		extensions: ['.ts', '.tsx', '.js', '.json'],
		// plugins: [new TsConfigPathsPlugin()]
		alias: {
			'~': path.resolve(__dirname, '..', 'src')
		}
	},

	module: {
		rules: [
			// All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
			{
				test: /\.tsx?$/,
				loader: 'happypack/loader?id=ts',
				exclude: /node_modules/
			},

			// All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
			{
				enforce: 'pre',
				test: /\.js$/,
				loader: 'source-map-loader',
				exclude: [
					new RegExp(`node_modules\\${path.sep}apollo-client`),
					new RegExp(`node_modules\\${path.sep}graphql-tools`),
					new RegExp(`node_modules\\${path.sep}deprecated-decorator`)
				]
			},

			// Handle .graphql
			{ test: /\.graphql$/, loader: 'graphql-tag/loader' }
		]
	},
	plugins: plugins,
	watch: isDev,
	watchOptions: {
		ignored: /node_modules/
	}
}
