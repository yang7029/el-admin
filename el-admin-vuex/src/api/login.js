// 用户登录请求

import request from '@/utils/request.js';

// 登录认证
export function login(username, password) {
	return request({
		method: 'post',
		url: '/user/login',
		data: {
			username,
			password,
		},
	});
}

// 响应用户信息
export function getUserInfo(token) {
	return request({
		method: 'get',
		// token 需要携带参数进行拼接。用模板字符串进行拼接 /${token}
		url: `/user/info/${token}`,
	});
}

// 退出登录
export function logout(token) {
	return request({
		method: 'post',
		url: `/user/logout`,
		data: {
			token,
		},
	});
}
