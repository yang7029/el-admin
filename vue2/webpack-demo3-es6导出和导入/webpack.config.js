const path = require('path');
module.exports = {
	// 指定开发环境
	mode: 'development', // development:是开发环境    none:不指定开发环境，为了解决报错     production:是生产环境
	// 入口
	entry: './src/main.js',
	// 出口文件  需要用到绝对路径，否则会报错
	output: {
		path: path.join(__dirname, './dist/'),
		filename: 'bundle.js',
	},
};
