import Vue from 'vue';

// 引入 Element-ui(按需引入)  在 App.vue之前引入，防止 App.vue 里面使用 element-ui
import {
	Form,
	FormItem,
	Input,
	Button,
	Message,
	Dropdown,
	DropdownMenu,
	DropdownItem,
	Menu,
	MenuItem,
	Breadcrumb,
	BreadcrumbItem,
	Table,
	TableColumn,
	Pagination,
	Select,
	Option,
	DatePicker,
	Dialog,
	MessageBox,
} from 'element-ui';

import App from './App.vue';
import router from './router';

// 把 element-ui 当做组件使用
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Button);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Pagination);
Vue.use(Select);
Vue.use(Option);
Vue.use(DatePicker);
Vue.use(Dialog);
Vue.prototype.$message = Message;
Vue.prototype.$MessageBox = MessageBox;

// 权限拦截
import './permission';

// 据环境给开发者提供信息，最原始的状态
// Vue.config.productionTip = false;

// 根据环境给开发者提供信息(阻止生产模式消息)，开发环境：显示提示信息(true)，生产环境：为不提示显示信息(false)，具体操作在浏览器中进行查看
Vue.config.productionTip = process.env.NODE_ENV === 'development';
console.log(process.env.VUE_APP_server_URL); //开发环境：development   生产环境：production

new Vue({
	router,
	render: h => h(App),
}).$mount('#app');

// 问题：子传父，父传子插件没有下载
