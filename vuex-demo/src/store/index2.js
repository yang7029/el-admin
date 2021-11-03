import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// 抽取模块
const home = {
	state: {
		count: 1,
	},

	mutations: {
		increase(state, n) {
			state.count += n;
		},
		subtraction() {
			this.state.count--;
		},
	},

	actions: {
		add(context, n) {
			context.commit('increase', n);
		},
		sub({ commit, state }) {
			console.log('yang', state.count);
			commit('subtraction', n);
		},
	},

	getters: {
		desc(state) {
			if (state.count < 50) {
				return '吃饭';
			} else if (state.count < 100) {
				return '睡觉';
			} else {
				return '打豆豆';
			}
		},
	},
};

const goods = {
	state: {},
	mutations: {},
	actions: {},
	getters: {},
};

const store = new Vuex.Store({
	modules: {
		home,
		goods,
	},
});

export default store;
