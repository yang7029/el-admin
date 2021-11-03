Vue.component('app-header', {
	template: `
<h2>全局组件---{{header}}</h2>
`,
	data() {
		return {
			header: 'header',
		};
	},
});
