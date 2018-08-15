var path = require('path')
var webpack = require('webpack')

const NODE_ENV = process.env.NODE_ENV || 'development'

module.exports = {
	context: path.resolve(__dirname, './src'),
	entry: {
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
		}),
		new webpack.ProvidePlugin({
			concat: "lodash/concat"
		})
	],
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			{
				test: /old.js$/,
				loader: "imports-loader?workSettings=>{delay:500}!exports-loader?Work"
			}
		],
		noParse: [/moment.js/]
	},
	resolve: {
		modules: ['node_modules'],
		extensions: ['.js'],
		alias: {
			old: path.resolve(__dirname, 'vendor/old/dist/old')
		}
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