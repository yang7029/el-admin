module.exports = {
	devServer: {
		port: 8888, //如果端口号被占用，自动提升 1
		host: 'localhost', //主机名 127.0.0.1  真机 0.0.0.0
		https: false, //协议
		open: true, //启动服务时自动打开浏览器
		// 代理的话只在开发环境产生
		proxy: {
			//开发环境代理配置
			// 需要做代理的前缀
			// '/dev-api': {
			[process.env.VUE_APP_BASE_API]: {
				// 目标服务器地址（就是需要访问这个http://localhost:8001，但是访问不到，所以就需要通过proxy代理到target这个能够访问的地址）
				target: process.env.VUE_APP_server_URL,
				// 开启代理服务器
				changeOrigin: true,
				// '/dev-api' === http://localhost:8001        当请求的地址前缀出现  '/dev-api/db.json'  那么    代理的地址就会换成 'http://localhost:8001(这儿是空的，因为配置了'^/dev-api': '',)/db.json'
				pathRewrite: {
					// '^/dev-api': '', //意思：（^:以什么开头）以 ^ 开头的地址给变成空的
					['^' + process.env.VUE_APP_BASE_API]: '',
				},
			},
		},
	},
	lintOnSave: false, //关闭代码格式检查
	productionSourceMap: false, //打包时不会生成  .map 文件加快打包速度
};
