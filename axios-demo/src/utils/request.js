import axios from 'axios';

// 用create创建一个axios对象，并且把这个对象返回出来              这个方式是自定义的方式
const request = axios.create({
	baseURL: '/',
	timeout: 5000,
});
// 通过上述方式，我们可以更好的扩展功能

// 请求拦截器
request.interceptors.request.use(
	config => {
		// 请求成功的回调函数
		return config;
	},
	error => {
		// 出现异常的回调
		return promises.reject(error);
	}
);

// 响应拦截器
request.interceptors.response.use(
	response => {
		return response;
	},
	error => {
		// 出现异常的回调
		return promises.reject(error);
	}
);

// 测试请求是否成功
// request.get('/db.json').then(res => {
// 	console.log(res.data);
// });

export default request;
