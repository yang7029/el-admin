import request from '@/utils/request.js';

export default {
	getSupplierList() {
		return request({
			method: 'get',
			url: '/supplier/list',
		});
	},
	supplierSearch(size, page, searchMap) {
		return request({
			method: 'post',
			url: `/supplier/list/search/${page}/${size}`,
			data: searchMap,
		});
	},
	addNewSupplier(supplierForm) {
		return request({
			method: 'post',
			url: '/supplier',
			data: supplierForm,
		});
	},
	// 查询接口
	suppEditor(id) {
		return request({
			method: 'get',
			url: `/supplier/${id}`,
		});
	},
	// 对应的数据更新接口
	update(supplierForm) {
		return request({
			method: 'put',
			url: `/supplier/${supplierForm.id}`,
			data: supplierForm,
		});
	},
	// 删除接口
	deleteData(id) {
		return request({
			method: 'delete',
			url: `/supplier/${id}`,
		});
	},
};
