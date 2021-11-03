import request from '@/utils/request.js';

// 用常量代替前缀，进行拼接，以后改代理的前缀的话，只改一处
const BASE_URI = process.env.VUE_APP_BASE_API;

// 测试 1：直接调用get来进行发松请求
// request.get('/db.json').then(res => {
// 	console.log(res.data);
// });

// 测试 2：以对象配置的方式进行发松请求
// request({
// 	method: 'get',
// 	url: '/db.json',
// }).then(res => {
// 	console.log(res.data);
// });

// 测试 3：返回的数据不再这边操作
export default {
	getList() {
		const req = request({
			method: 'get',
			url: '/db.json',
		});
		return req;
	},
};

// 跨域
// 端口，域名(ip)，协议，只要一个不满足就会跨域
// 前后端分离时，前端和后端的API服务器可能不在同一个主机上，就存在跨域问题，是浏览器限制了跨域访问
// 同源策略：协议 域名 端口 只要有一个不符合就存在跨域
