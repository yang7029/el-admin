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
      <app-home>
      <h1 slot='Dashboard' class="page-header">{{dashboard}}</h1>
      </app-home>
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
