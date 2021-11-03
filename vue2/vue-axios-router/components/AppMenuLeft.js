(function () {
	const template = `
  <div class="col-sm-3 col-md-2 sidebar">
						<ul class="nav nav-sidebar">
						<!-- router默认渲染出来的是a标签，如果是需要router-link渲染出来的是别的标签，给他添加 tag 属性 -->
						<!-- 可以在每个router-link上使用  active-class  激活css类名，或者在  VueRouter 中使用   linkActiveClass   来全局配置css类名  -->
							<router-link to='/' tag='li' exact><a href="#">首页</a></router-link>
							<router-link to='/news' tag='li' exact><a href="#">新闻管理</a></router-link>
							<router-link to='/about' tag='li' exact><a href="#">关于我们</a></router-link>
						</ul>
						</div>
  `;
	// components("组件名"，{
	//   template:``,
	//   data() {
	//     return {

	//     }
	//   },
	// })
	window.AppMenuLeft = {
		template,
		data() {
			return {};
		},
	};
})();
