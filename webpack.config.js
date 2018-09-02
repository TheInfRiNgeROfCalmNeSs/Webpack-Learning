var path = require('path')
var webpack = require('webpack')

const NODE_ENV = process.env.NODE_ENV || 'development'

module.exports = {
	context: path.resolve(__dirname, './src'),
	entry: {
		main: './main'
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
	],
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			{
				test: /\.jade$/,
				loader: "pug-loader"
			},
			{
				test: /\.css$/,
				loader: "style-loader!css-loader"
			},
			{
				test: /\.styl$/,
				loader: "style-loader!css-loader!stylus-loader?resolve url"
			},
			{
				test: /\.(ttf|eot|woff|woff2|svg)$/,
				loader: "file-loader",
				options: {
					name: '[path][name].[ext]'
				}
			},
			{
				test: /\.(png|jpg)$/,
				loader: 'url-loader',
				options: {
					name: '[path][name].[ext]',
					outputPath: 'images/',
					limit: 32
				}
			}
		],
		noParse: [/moment.js/]
	},
	resolve: {
		modules: ['node_modules'],
		extensions: ['.js', ".styl"]
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