module.exports = {
	devServer: {
		port: 8001,
		// host: 'localhost',
		https: true,
		open: true,
	},
	lintOnSave: false, //关闭格式检查
	outputDir: 'dist2', //打包的默认格式文件名    默认为dist，想要打包到别的目录，需要用得到    outputDir
	assetsDir: 'assest', // 将打包静态文件放到这个文件下   dist文件下 会出现  assest文件，里面是 css img js等文件
	indexPath: 'out/index.html', // 主页面index.html文件打包到out文件下
	productionSourceMap: false, //打包时不会生成 .map文件，加快打包速度
};
