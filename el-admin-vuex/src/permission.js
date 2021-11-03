/**
 *
 *
 * 路由权限验证权限验证：
 * Vue Router 中有前置钩子函数beforeEach(to, from, next =>{})
 * 在路由跳转之前进行判断，是否登录，登录过，访问非登录页面，没有登录过，不能访问非登录页面，回到登录页
 *
 * to：要去的目标地址
 * from：要离开的目标地址
 * next：是一个方法，可以指定路由地址，进行路由跳转，也可以是一个对象，指定跳转的对象
 *
 *
 **/

import router from './router/index';
import { getUserInfo } from './api/login';
import store from './store';
router.beforeEach((to, from, next) => {
	// const token = localStorage.getItem('el-admin-token');
	const token = store.state.user.token;
	console.log('token', token);
	if (!token) {
		// 没有获取到token，判断一下是不是去到login页面。 去到的页面不是login页面，就让他去到login页面，如果去到的是login页面，直接next()
		if (to.path !== '/login') {
			next({ path: '/login' });
		} else {
			next();
		}
	} else {
		// 获取到token，判断一下是不是去到login页面，，如果是去到login页面，直接next()，否则
		if (to.path === '/login') {
			next();
		} else {
			// const userInfo = localStorage.getItem('el-admin-user');
			const userInfo = store.state.user.user;
			console.log('userInfo', userInfo);
			if (userInfo) {
				next();
			} else {
				console.log('获取用户信息');
				store
					.dispatch('GetUserInfo')
					.then(response => {
						if (response.flag) {
							next();
						} else {
							next({ path: '/login' });
						}
					})
					.catch(error => {});
			}
		}
	}
});
