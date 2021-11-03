import request from '@/utils/request.js';

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
