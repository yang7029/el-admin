import Vue from 'vue';
import VueRouter from 'vue-router';
// import Login from '@/views/login/index.vue';
// 会默认的加载login下面的index.vue文件
import Login from '@/views/login';
import Layout from '@/components/Layout.vue';
import Home from '@/views/home/index.vue';
import Member from '@/views/member/index.vue';
import Supplier from '@/views/supplier/index.vue';
import Goods from '@/views/goods/index.vue';
import Staff from '@/views/staff/index.vue';

Vue.use(VueRouter);

const children = [
	{
		path: '/home',
		name: 'home',
		component: Home,
		meta: { title: '首页' },
	},
	{
		path: '/member/',
		name: 'member',
		component: Member,
		meta: { title: '会员管理' },
	},
	{
		path: '/supplier/',
		name: 'supplier',
		component: Supplier,
		meta: { title: '供应商管理' },
	},
	{
		path: '/goods/',
		name: 'goods',
		component: Goods,
		meta: { title: '商品管理' },
	},
	{
		path: '/staff/',
		name: 'staff',
		component: Staff,
		meta: { title: '员工管理' },
	},
];

const routes = [
	{
		path: '/login',
		name: 'login', //路由的名称
		component: Login, // 组件名
	},
	{
		path: '/',
		name: 'Layout', //路由的名称
		component: Layout, // 组件名
		redirect: '/home',
		// 第一种方式 ： 可以实现子路由，但是后面添加路由的话，路由套路由的话，会很麻烦，用第二中方式
		children,
		// 	// 第二种方式：
		// 	children: [
		// 		{
		// 			path: '/home',
		// 			component: Home,
		// 			name: 'home',
		// 			meta: { title: '首页' },
		// 		},
		// 	],
		// },
		// {
		// 	path: '/member',
		// 	component: Layout,
		// 	children: [
		// 		{
		// 			path: '/',
		// 			component: Member,
		// 			name: 'member',
		// 			meta: { title: '会员管理' },
		// 		},
		// 	],
		// },
		// {
		// 	path: '/supplier',
		// 	component: Layout,
		// 	children: [
		// 		{
		// 			path: '/',
		// 			component: Supplier,
		// 			name: 'supplier',
		// 			meta: { title: '供应商管理' },
		// 		},
		// 	],
		// },
		// {
		// 	path: '/goods',
		// 	component: Layout,
		// 	children: [
		// 		{
		// 			path: '/',
		// 			component: Goods,
		// 			name: 'goods',
		// 			meta: { title: '商品管理' },
		// 		},
		// 	],
		// },
		// {
		// 	path: '/staff',
		// 	component: Layout,
		// 	children: [
		// 		{
		// 			path: '/',
		// 			component: Staff,
		// 			name: 'staff',
		// 			meta: { title: '员工管理' },
		// 		},
		// 	],
	},
];

const router = new VueRouter({
	// mode: 'history', //这是判断浏览器里面有没有 # :    #代表哈希
	base: process.env.BASE_URL,
	routes,
});

export default router;
