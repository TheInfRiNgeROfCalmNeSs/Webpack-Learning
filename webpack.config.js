var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var rimraf = require('rimraf')
var HtmlWebpackPlugin = require('html-webpack-plugin')

const NODE_ENV = process.env.NODE_ENV || 'development'

module.exports = {
	context: path.resolve(__dirname, './src'),
	entry: {
		home: './home',
		about: './about',
		common: './common'
	},
	output: {
		path: path.resolve(__dirname, 'dist/assets'),
		publicPath: '/assets/',
		filename: '[name].[chunkhash].js',
		chunkFilename: '[id].[chunkhash].js',
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
				use: ExtractTextPlugin.extract({use: "css-loader!stylus-loader?resolve url"})
			},
			{
				test: /\.(ttf|eot|woff|woff2|svg)$/,
				loader: "file-loader",
				options: {
					name: '[path][name].[hash:6].[ext]'
				}
			},
			{
				test: /\.(png|jpg)$/,
				loader: 'url-loader',
				options: {
					name: '[path][name].[hash:6].[ext]',
					outputPath: 'images/',
					limit: 32
				}
			}
		]
	},
	resolve: {
		modules: ['node_modules'],
		extensions: ['.js', ".styl"]
	},
	resolveLoader: {
		modules: ['node_modules'],
		extensions: ['.js'],
		moduleExtensions: ['*-loader', '*']
	},
	plugins: [
		{
			apply: (compiler) => {
				rimraf.sync(compiler.options.output.path)
			}
		},
		new ExtractTextPlugin({filename: "[name].[contenthash].css", allChunks: true}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'common'
		}),
		new HtmlWebpackPlugin({
			filename: './about2.html',
			chunks: ['common', 'about']
		})
	]
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