var path = require('path')
var webpack = require('webpack')

const NODE_ENV = process.env.NODE_ENV || 'development'

module.exports = {
	context: path.resolve(__dirname, './src'),
	entry: {
		/*home: './home',
		about: './about'*/
		app: './app'
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/',
		filename: '[name].js',
		library: "[name]"
	},
	watch: NODE_ENV == 'development',
	watchOptions: {
		aggregateTimeout: 100
	},
	devtool: NODE_ENV == 'development' ? "cheap-inline-module-source-map" : null,
	plugins: [
		new webpack.DefinePlugin({
			NODE_ENV: JSON.stringify(NODE_ENV)
		})
		//new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /ru|en-gb/)
		//new webpack.IgnorePlugin(/^\.\/zn-tw.js$/, /locale$/)
		/*,
		new webpack.optimize.CommonsChunkPlugin({
			name: "commons",
			chunks: ["home", "about"]
		})*/
	],
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			}
		],
		noParse: [/moment.js/]
	},
	externals: {
		lodash: "_"
	},
	resolve: {
		modules: ['node_modules'],
		extensions: ['.js']
	},
	resolveLoader: {
		modules: ['node_modules'],
		extensions: ['.js'],
		moduleExtensions: ['*-loader', '*']
	}
}

if(NODE_ENV == 'production') {
	module.exports.plugins.push(
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false,
				drop_console: true,
				unsafe: true
			}
	    })
	)
}