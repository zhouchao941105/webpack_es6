const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
module.exports = {
	entry: {
		
		index:'./src/index.js'
		// index: ['react-hot-loader/patch','webpack-dev-server/client?http://localhost:8080','webpack/hot/only-dev-server','./src/index.js']
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: "[name].bundle.js",
		// publicPath:'/'
	},
	devtool: false,
	devServer: {
		contentBase: path.join(__dirname,'dist'),
		hot: true,
		// publicPath:'/'
	},
	plugins: [
		// new cleanWebpackPlugin(['dist']),
		new HtmlWebpackPlugin(
			{
				template: './src/index.html',
				title: "react",
				inject: true
			}
		),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin()
	],
	
	module: {
		loaders: [
			{
				test: /\.js|jsx?$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					presets: ['react', 'es2015'],
					// plugins:['react-hot-loader/babel']
				}
			},
			{
				test: /\.html/,
				loader: 'raw-loader'
			},
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader'
			}
		],

	}
}