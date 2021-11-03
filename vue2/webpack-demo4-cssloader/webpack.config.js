const path = require('path');
// 打包对应的index.html到dist文件
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
	// 指定开发环境
	mode: 'development', // development:是开发环境    none:不指定开发环境，为了解决报错     production:是生产环境
	// 入口
	entry: './src/main.js',
	// 实时打包编译
	devServer: {
		contentBase: './dist',
	},
	// 配置插件
	plugins: [
		new HtmlWebpackPlugin({
			// 会将指定的模板页面打包到与bundle.js同级目录下
			template: './index.html',
		}),
	],
	// 出口文件  需要用到绝对路径，否则会报错
	output: {
		path: path.join(__dirname, './dist/'),
		filename: 'bundle.js',
	},
	// 打包对应的模块
	module: {
		rules: [
			// 打包css模块
			{
				test: /\.css$/, // 打包的规则，是个正则表达式，不需要带引号
				use: ['style-loader', 'css-loader'], //先加载css-loader在加载style-loader
			},
			// 打包images和icon
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: ['file-loader'],
			},
		],
	},
};
