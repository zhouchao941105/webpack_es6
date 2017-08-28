const path = require('path');
const HtmlWebpackPlugin=require('html-webpack-plugin');
const cleanWebpackPlugin=require('clean-webpack-plugin');
const webpack=require('webpack');
module.exports = {
	entry: {
		// 'webpack-dev-server/client?localhost:8080',
		// 'webpack/hot/dev-server',
		index:'./src/index.js',
		print:'./src/print.js'
	},
	
	devtool:'inline-source-map',
	devServer:{
		contentBase:'./dist',
		// hot:true
	},
	plugins:[
		new cleanWebpackPlugin(['dist']),
		new HtmlWebpackPlugin({
			title:'123',
			// template:'./dist/index.html'
		}),
		// new webpack.HotModuleReplacementPlugin()
	],
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: "[name].bundle.js"
	},
	module: { 
		loaders: [
			{
				test: path.join(__dirname, 'src'),
				loader: 'babel-loader',
				query: {
					presets: ['es2015']
				}
			},
			{
				test:'/\.html$/',
				loader:'raw-loader'
			}
		],
		
	}
}