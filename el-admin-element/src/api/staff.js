import request from '@/utils/request.js';

export default {
	search(page, size, staffSearchForm) {
		return request({
			method: 'post',
			url: `/staff/list/search/${page}/${size}`,
			data: staffSearchForm,
		});
	},
	addStaff() {
		return request({
			method: 'post',
			url: '/staff',
		});
	},
	editorStaff(id) {
		return request({
			method: 'get',
			url: `/staff/${id}`,
		});
	},
	update(addStaffForm) {
		return request({
			method: 'put',
			url: `/supplier/${addStaffForm.id}`,
			data: addStaffForm,
		});
	},
	// 删除接口
	deleteData(id) {
		return request({
			method: 'delete',
			url: `/staff/${id}`,
		});
	},
};
