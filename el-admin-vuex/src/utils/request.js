import axios from 'axios';

// 引入loading 在这个loading中，是请求的时候进行loading显示
import { Loading, Message } from 'element-ui';
const loading = {
	loadingInstance: null, // Loading实例
	open: function () {
		// 打开加载
		// console.log('加载中', this.loadingInstance);
		if (this.loadingInstance === null) {
			// 创建单例, 防止切换路由重复加载
			// console.log('创建加载实例..');
			this.loadingInstance = Loading.service({
				text: '拼命加载中',
				target: '.main', // 效果显示区域
				background: 'rgba(0, 0, 0, 0.5)', // 加载效果
			});
		}
	},
	close: function () {
		// 关闭加载
		if (this.loadingInstance !== null) {
			this.loadingInstance.close();
			// console.log('结束加载');
		}
		this.loadingInstance = null; // 关闭后实例重新赋值null, 下次让它重新创建
	},
};

// 用create创建一个axios对象，并且把这个对象返回出来              这个方式是自定义的方式
const request = axios.create({
	// db.json => 通过 axios => '/dev-api/db.json'  通过代理转发（vue.config.js） 先匹配代理的前缀 => [process.env.VUE_APP_BASE_API] 就会找到http://localhost:8001/db.json => 还会替换成空的
	// baseURL: '/dev-api',
	// baseURL: '/',
	baseURL: process.env.VUE_APP_BASE_API,
	timeout: 5000,
});
// 通过上述方式，我们可以更好的扩展功能

// 请求拦截器
request.interceptors.request.use(
	config => {
		loading.open(); // 打开加载效果
		return config;
	},
	error => {
		loading.close(); // 关闭加载效果
		return Promise.reject(error);
	}
);

// 响应拦截器
request.interceptors.response.use(
	response => {
		loading.close(); // 关闭加载效果

		// 处理异常
		const resp = response.data;
		// console.log(resp.code);
		if (resp.code !== 2000) {
			Message({
				message: resp.message || '系统异常',
				type: 'warning',
				duration: 5 * 1000,
			});
		}
		return response;
	},
	error => {
		loading.close(); // 关闭加载效果
		Message({
			message: error.message,
			type: 'error',
		});
		return promises.reject(error);
	}
);

export default request;
