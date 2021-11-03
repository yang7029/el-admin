import request from '@/utils/request.js';

export default {
	// 获取会员列表
	getMemberlist() {
		return request({
			method: 'get',
			url: '/member/list',
		});
	},
	// 获取分页数据
	search(page, size, searchMap) {
		return request({
			method: 'post',
			url: `/member/list/search/${page}/${size}`,
			data: searchMap,
		});
	},
	add(pojo) {
		return request({
			method: 'post',
			url: '/member',
			data: pojo,
		});
	},
	getById(id) {
		return request({
			method: 'get',
			// 动态的拼接地址用反引号和$进行拼接
			url: `/member/${id}`,
		});
	},
	update(pojo) {
		return request({
			method: 'put',
			url: `/member/${pojo.id}`,
			data: pojo,
		});
	},
	deleteById(id) {
		return request({
			method: 'delete',
			url: `/member/${id}`,
		});
	},
};
