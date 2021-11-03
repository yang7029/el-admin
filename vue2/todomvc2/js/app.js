const items = [
	{
		id: 1,
		content: "vue",
		completed: false,
	},
	{
		id: 2,
		content: "jave",
		completed: false,
	},
	{
		id: 3,
		content: "python",
		completed: true,
	},
];
// 永久存储数据方法
const STORAGE_KEY = "items_vuejs";
const itemStorage = {
	fetch() {
		return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
	},
	save(items) {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
	},
};

// 注册全局指令显示聚焦,进如页面进行聚焦
Vue.directive("vm-focus", {
	inserted(el, binding) {
		el.focus();
	},
	update(el, binding) {
		if (binding.value) {
			el.focus();
		}
	},
});

let vm = new Vue({
	el: "#todoapp",
	data: {
		title: "title",
		// items,
		items: itemStorage.fetch(),
		currentItem: null, //只能用null，当用数字判断的时候，默认如果为0的话，会自动选中
		filterStatus: "all",
	},
	// 注册自定义指令， 当点击对应的框的时候进行聚焦
	directives: {
		"todo-focus": {
			update(el, binding) {
				if (binding.value) {
					el.focus();
				}
			},
		},
	},
	// 数据持久化
	watch: {
		items: {
			deep: true,
			handler(newValue) {
				// console.log(newValue);
				itemStorage.save(newValue);
			},
		},
	},
	computed: {
		// 过滤数组中的数据通过截取到的hash值
		filterItems() {
			switch (this.filterStatus) {
				case "active":
					return this.items.filter((item) => !item.completed);
					break;
				case "completed":
					return this.items.filter((item) => item.completed);
					break;
				default:
					return this.items;
					break;
			}
		},
		// 对勾双向绑定
		toggleAll: {
			get() {
				return this.remaining === 0;
			},
			set(newStatus) {
				this.items.forEach((item) => {
					item.completed = newStatus;
				});
			},
		},
		// 处理未完成个数，用到计算属性
		remaining() {
			const unItem = this.items.filter((item) => {
				return !item.completed;
			});
			return unItem.length;
		},
	},
	methods: {
		// 按enter进行保存
		finishEdit(item, index, event) {
			// console.log(event.target.value.trim());
			content = event.target.value.trim();
			item.content = content;
			if (!content) {
				this.removeItem(index);
				return;
			}
			this.currentItem = null;
		},
		// esc退出编辑项   是让编辑状态变成不可编辑状态
		cancleEdit() {
			this.currentItem = null;
		},
		// 显示编辑项
		toEdit(item) {
			// console.log(index);
			this.currentItem = item;
		},
		// 移除已经完成的
		removeCompleted() {
			// console.log(123);
			this.items = this.items.filter((item) => {
				// console.log(!item.completed);
				return !item.completed;
			});
		},
		// 移除数据
		removeItem(index) {
			// console.log(index);
			this.items.splice(index, 1);
		},
		// 增加数据
		addItem(event) {
			// console.log("addItem", "被调用了");
			const content = event.target.value.trim();
			if (content.length === 0) return;
			// console.log(content);
			this.items.push({
				id: this.items.length + 1,
				content: content,
				completed: false,
			});
			event.target.value = "";
		},
	},
});

// 通过点击All active componeted 来显示不同的数据
window.onhashchange = function () {
	// 获取到“  #/active  ”  # 包括  #  后的值
	// console.log(window.location.hash);
	// 截取到路由的hash（两位后的值），当截取的路由不为空时，返回截取到的值，为空，返回all
	const hash = window.location.hash.substr(2) || "all";
	vm.filterStatus = hash;
};
window.onhashchange();
