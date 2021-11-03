import Vue from 'vue';
import Vuex from 'vuex';

// vuex 是个插件，所以要用插件的形式进行注册
Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		// 存放状态的地方
		count: 1,
	},

	// 给属性赋值的地方 不写业务逻辑，不写业务逻辑
	mutations: {
		increase(state, n) {
			// state.count++;
			state.count += n;
		},
		subtraction() {
			this.state.count--;
			// this.state.count -= n; // 这种是错误的载荷，当有传递过来载荷时，第一位默认是`state`，下面就不能用到this
			// state.count -= n;
		},
	},

	// 操作复杂属性，和处理异步的地方  写业务逻辑的地方    触发的是action不是mutation，两个触发的值不一样
	actions: {
		// context:代表的是根据上下文进行触发，直接这样写的，不需要明白
		// 逻辑：在mutations中对state进行赋值，在action中进行触发mutations中的函数，在template中用函数触发，action中定义的函数
		add(context, n) {
			context.commit('increase', n);
		},
		sub({ commit, state }) {
			console.log('yang', state.count);
			commit('subtraction', n);
		},
	},

	// 派生成属性getters
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
});

// 默认导出
export default store;
