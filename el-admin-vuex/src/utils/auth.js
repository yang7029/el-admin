const TOKEN_KEY = 'el-admin-token';
const USER_KEY = 'el-admin-user';

// 获取token
export function getToken() {
	return localStorage.getItem(TOKEN_KEY);
}

// 保存token
export function setToken(token) {
	return localStorage.setItem(TOKEN_KEY, token);
}

// 获取用户信息
export function getUser() {
	return JSON.parse(localStorage.getItem(USER_KEY));
}

// 保存用户信息
export function setUser(user) {
	localStorage.setItem(USER_KEY, JSON.stringify(user));
}

// 移除用户信息
export function removeToken() {
	localStorage.removeItem(TOKEN_KEY);
	localStorage.removeItem(USER_KEY);
}
