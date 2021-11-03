const items = [
	{
		id: 1,
		content: "vue",
		complete: false,
	},
	{
		id: 2,
		content: "java",
		complete: false,
	},
	{
		id: 3,
		content: "python",
		complete: true,
	},
];
// 存储数据
const STORAGE_KEY = "items_vuejs";
const itemStorage = {
	fetch: function () {
		return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
	},
	save: function (items) {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
	},
};
// 注册全局指令
// 自定义指令不要加上   v-    在使用的时候用  v-  使用
Vue.directive("app-focus", {
	// el:表示作用到那个元素
	// binding:用来获取app-focus的值
	inserted(el, binding) {
		el.focus();
	},
	update(el, binding) {
		if (binding.value) {
			el.focus();
		}
	},
});

let app = new Vue({
	el: "#todoapp",
	data: {
		title: "TODO",
		// items,
		items: itemStorage.fetch(),
		currentItem: null,
		filrerStatus: "all",
	},
	// 注册自定义指令
	directives: {
		"todo-focus": {
			update(el, binding) {
				if (binding.value) {
					el.focus();
				}
			},
		},
	},
	// 定义监听器
	watch: {
		// 修改这个这个数组数据可以这样写，但是修改对象中的某个属性，监听不到
		// items(newValue) {
		// 	console.log("watch", newValue);
		// },
		// 深度监听，当对象中的属性值发生变化之后，普通监听是监听不到的，需要deep：true，深度监听
		items: {
			deep: true,
			// newItem是个对象
			handler(newItem) {
				console.log("watch", newItem, typeof newItem);
				itemStorage.save(newItem);
			},
		},
	},
	// 过滤数组中的数据 用的是filter 重点是filter的使用
	computed: {
		filterItems() {
			switch (this.filrerStatus) {
				// 过滤出未完成的
				case "active":
					return this.items.filter((item) => !item.complete);
					break;
				// 过滤出已完成的
				case "completed":
					return this.items.filter((item) => item.complete);
					break;
				// 过滤出所有的
				default:
					return this.items;
					break;
			}
		},
		toggleAll: {
			// 当任务列表更新之后，更新箭头
			get() {
				// 计算属性调用别的计算属性，需要用到this
				console.log("get", this.remaining);
				return this.remaining === 0;
			},
			set(newStatus) {
				this.items.forEach((item) => {
					item.complete = newStatus;
				});
			},
		},
		remaining() {
			// filters过滤未完成的项
			// unItems返回的是未完成的任务项，是一个数组
			const unItems = this.items.filter(function (item) {
				return !item.complete;
			});
			return unItems.length;
		},
	},
	methods: {
		finishEdit(item, index, event) {
			// console.log("finishEdit", item);
			const content = event.target.value.trim();
			// console.log(content);
			item.content = content;
			if (!content) {
				this.removeItem(index);
				return;
			}
			this.currentItem = null;
		},
		// esc退出编辑项
		cancleEdit() {
			console.log(13);
			// 失去编辑状态
			this.currentItem = null;
		},
		// 编辑项，最难的是怎么让编辑项显示
		toEdit(item) {
			console.log(item);
			this.currentItem = item;
		},
		removeComplete() {
			// 当有return时候，并没有别的代码可以执行的是时候，可以写成以下样式
			this.items = this.items.filter((item) => !item.complete);
		},
		removeItem(index) {
			console.log(index);
			this.items.splice(index, 1);
		},
		addItem(event) {
			const content = event.target.value.trim();
			if (content.length === 0) {
				return;
			}
			const id = items.length + 1;
			this.items.push({
				id,
				content,
				complete: false,
			});
			event.target.value = "";
		},
	},
});

// 获取路由变化
window.onhashchange = function () {
	console.log(window.location.hash);
	// 截取路由的hash，当截取路由的hash不为空时返回截取的值，为空是返回all
	const hash = window.location.hash.substr(2) || "all";
	// 状态值一旦改变，就会直接赋值给filterStatus
	// 可以定义计算属性，当hash的值变化后，可以通过hash来过滤不同的数据
	app.filrerStatus = hash;
};
// 第一次访问页面时，就调用函数，让状态值生效
window.onhashchange();
