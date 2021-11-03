(function () {
	const template = `
  <div id='app'>
  <!--头部导航区域-->
  <app-navbar></app-navbar>
  <!--核心区域:分左右两边-->
  <div class="container-fluid">
    <div class="row">
      <!--左边菜单栏区域-->
      <app-menuleft></app-menuleft>
      </div>

      <!--右边主页面区域: 分上下两个区域-->
      <!--keep-alive用于组件缓存，其实组件在跳转的时候，是组件进行了销毁，但是用keep-alive就组件没有进行销毁，在vue插件中看效果，缓存下来的是灰色的-->
    <keep-alive>
    
      <router-view>
      <h1 slot='Dashboard' class='page-header'>{{dashboard}}</h1></router-view>
      </keep-alive>
    </div>
  </div>
  </div>
  `;
	window.App = {
		template,
		data() {
			return {
				dashboard: '仪表盘',
			};
		},
		components: {
			'app-navbar': AppNavBar,
			'app-menuleft': AppMenuLeft,
			'app-home': AppHome,
		},
	};
})();
