import webpack from 'webpack'
import path from 'path';
import autoprefixer from 'autoprefixer'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

export default {
	module:    {
		noParse: [
			/node_modules[\/\\]localforage[\/\\]dist[\/\\]localforage\.js/,
			/node_modules[\/\\]json-schema[\/\\]lib[\/\\]validate\.js/
		],
		loaders: [{
			test:    /\.jsx?$/,
			loaders: ['babel-loader'],
			exclude: /node_modules/
		}, {
			test:   /\.json$/,
			loader: 'json-loader'
		}, {
			test: /\.(eot|ttf|woff|woff2)$/,
			loader: 'file?name=public/fonts/[name].[ext]'
		}, {
			test: /\.png$/,
			loader: 'url-loader'
		}]
	},
	output:    {
		path:          path.join(__dirname, 'dist'),
		filename:      'bundle.js',
		libraryTarget: 'commonjs2'
	},
	resolve:   {
		extensions:   ['', '.js', '.jsx', '.json'],
		packageMains: ['webpack', 'browser', 'web', 'browserify', ['jam', 'main'], 'main'],
		alias: {
			'react': 'inferno-compat',
			'react-dom': 'inferno-compat',
			'react-dom/server': 'inferno-compat',
			'app': path.join(__dirname, 'app'),
			'superagent': 'superagent/lib/client.js',
			'emitter': 'component-emitter',
			'reduce': 'reduce-component'
		}
	},
	plugins:   [
		new webpack.ProvidePlugin({
			"window.React": "inferno-compat",
			'Inferno': 'inferno',
			'jQuery': 'jquery',
			'window.emojione': 'app/shims/emojione.js'
		})
	],
	externals: [
		// put your node 3rd party libraries which can't be built with webpack here
		// (mysql, mongodb, and so on..)
	]
};
