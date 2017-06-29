const { join } = require('path')
const { TsConfigPathsPlugin } = require('awesome-typescript-loader')

module.exports = {
	output: {
		path: join(__dirname, '..', 'dist')
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
				exclude: [/node_modules\/apollo-client/]
			},

			// Handle .graphql
			{ test: /\.graphql$/, loader: 'graphql-tag/loader' }
		]
	}
}
