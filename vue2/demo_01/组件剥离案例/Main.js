Vue.component('app-main', {
	template: `
  <div>
    <ul>
      <li>全局组件---{{win}}</li>
      <li>全局组件---{{win}}{{start}}</li>
      <li>全局组件---{{win}}{{settings}}</li>
      </ul>
    </div>
  `,
	data() {
		return {
			win: 'Win触屏版测试用例',
			start: '初始化流程',
			settings: '设置页',
		};
	},
});
