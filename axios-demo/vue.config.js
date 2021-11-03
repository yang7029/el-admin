module.exports = {
	devServer: {
		port: 8001, //如果端口号被占用，自动提升 1
		host: 'localhost', //主机名 127.0.0.1  真机 0.0.0.0
		https: false, //协议
		open: true, //启动服务时自动打开浏览器
	},
	lintOnSave: false, //关闭代码格式检查
	productionSourceMap: false, //打包时不会生成  .map 文件加快打包速度
};
