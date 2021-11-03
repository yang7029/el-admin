import request from '@/utils/request.js';

export default {
	search(page, size, searchMap) {
		return request({
			method: 'post',
			url: `/goods/list/search/${page}/${size}`,
			data: searchMap,
		});
	},
	addNewGoods(supplierForm) {
		return request({
			method: 'post',
			url: '/goods',
			data: supplierForm,
		});
	},
	getById(id) {
		return request({
			method: 'get',
			url: `/goods/${id}`,
		});
	},
	update(supplierForm) {
		return request({
			method: 'put',
			url: `/goods/${supplierForm.id}`,
			data: supplierForm,
		});
	},
	deleteById(id) {
		return request({
			method: 'delete',
			url: `/goods/${id}`,
		});
	},
};
