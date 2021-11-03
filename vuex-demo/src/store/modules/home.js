// 抽取成模块
const state = {
	count: 1,
};

const getters = {
	desc(state) {
		if (state.count < 50) {
			return '吃饭';
		} else if (state.count < 100) {
			return '睡觉';
		} else {
			return '打豆豆';
		}
	},
};

const mutations = {
	increase(state, n) {
		state.count += n;
	},
	subtraction(state, n) {
		state.count -= n;
	},
};

const actions = {
	add(context, n) {
		context.commit('increase', n);
	},
	sub({ commit, state }) {
		console.log('yang', state.count);
		commit('subtraction', n);
	},
};

export default {
	state,
	getters,
	mutations,
	actions,
};
