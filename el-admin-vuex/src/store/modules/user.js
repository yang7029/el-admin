import { getToken, setToken, getUser, setUser, removeToken } from '@/utils/auth.js';
import { login, getUserInfo, logout } from '@/api/login.js';

const user = {
	state: {
		token: getToken(),
		user: getUser(),
	},
	mutations: {
		SET_TOKEN(state, token) {
			state.token = token;
			setToken(token);
		},
		SET_USER(state, user) {
			state.user = user;
			setUser(user);
		},
	},
	actions: {
		// 登录获取token
		Login({ commit }, form) {
			// 异步操作    resoleve是处理成功的通知    reject是处理失败的通知
			return new Promise((resolve, reject) => {
				login(form.username.trim(), form.password)
					.then(response => {
						const resp = response.data; //获取到的是响应的data数据
						commit('SET_TOKEN', resp.data.token);
						// 通过组件已经将token更新成功
						resolve(resp);
					})
					.catch(error => {
						reject(error);
					});
			});
		},
		// 通过token获取用户信息
		GetUserInfo({ commit, state }) {
			return new Promise((resolve, reject) => {
				getUserInfo(state.token)
					.then(response => {
						const respUser = response.data;
						console.log('respUser', respUser);
						commit('SET_USER', respUser.data);
						resolve(respUser);
					})
					.catch(error => {
						reject(error);
					});
			});
		},
		// 退出
		Logout({ commit, state }) {
			return new Promise((resolve, reject) => {
				logout(state.token)
					.then(response => {
						const resp = response.data;
						commit('SET_TOKEN', null);
						commit('SET_USER', null);
						removeToken();
						resolve(resp);
					})
					.catch(error => {
						reject(error);
					});
			});
		},
	},
	getters: {},
};

export default user;
