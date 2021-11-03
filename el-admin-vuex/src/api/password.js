import request from '@/utils/request';

export default {
	// 校验密码   userId:账户id   pwassword:密码
	checkPwd(userId, password) {
		return request({
			method: 'post',
			url: '/user/pwd',
			data: {
				userId,
				password,
			},
		});
	},

	// 修改密码   userId:用户的id    password:修改的新密码

	updatePwd(userId, password) {
		return request({
			method: 'put',
			url: '/user/pwd',
			data: {
				userId,
				password,
			},
		});
	},
};
