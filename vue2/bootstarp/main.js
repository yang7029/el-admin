let vm = new Vue({
	el: '#app',
	// template: '</app>', // 简写
	// vue 实例中的template选项中引用了组件后，会将这个组件的渲染结果替换  #app 的标签元素
	template: '<app></app>', //template模板会渲染body中id='app'的根组件
	components: {
		app: App,
	},
});
