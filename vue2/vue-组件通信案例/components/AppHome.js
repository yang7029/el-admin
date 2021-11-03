(function () {
	const template = `
  <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2main">
  <!--右边上半区域-->
  <!--<h1 class="page-header">Dashboard</h1> -->
	<slot name='Dashboard'></slot>
  <app-hometop :hobbies='hobbies' @delete_hobby='deleteHobby'></app-hometop>
  <!--右边下半区域-->
  <h2 class="sub-header">Section title</h2>
  <app-homefooter :empList='empList' :deleteEmp='deleteEmp'></app-homefooter>
</div>

  `;
	window.AppHome = {
		template,
		components: {
			'app-hometop': AppHomeTop,
			'app-homefooter': AppHomeFooter,
		},
		data() {
			return {
				hobbies: ['吃饭', '睡觉', '打豆豆', '看书'],
				empList: [
					{ id: 0, name: '大王1', salary: '80001' },
					{ id: 1, name: '大王2', salary: '80002' },
					{ id: 2, name: '大王3', salary: '80003' },
					{ id: 3, name: '大王4', salary: '80004' },
					{ id: 4, name: '大王5', salary: '80005' },
				],
			};
		},
		// 父传子（传过来的是整个数据，在子组件中进行使用）可以传递属性和函数，多个需要逐层传递，中间需要接收     重点：在哪里声明的数据，在哪里修改数据，不要在子组件中修改父组件的值
		methods: {
			deleteEmp(index) {
				// 从这个数组中删除带  id  的项数，并删除一个
				this.empList.splice(index, 1);
			},
			// 子传父（传过来的是下标，通过下边更改股组件中的数据），父组件通过自定义事件，通过注册的子组件传递对应更改数据的方法，在子组件中用this.$emit.函数进行触发
			deleteHobby(index) {
				this.hobbies.splice(index, 1);
			},
		},
	};
})();
