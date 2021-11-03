import Vue from 'vue';
import Vuex from 'vuex';
import home from './modules/home';
import goods from './modules/goods';

Vue.use(Vuex);

const store = new Vuex.Store({
	modules: {
		home,
		goods,
	},
});

export default store;
