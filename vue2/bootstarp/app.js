(function () {
	const template = `
  <div id='app'>
    <!--头部导航区域-->
    <app-navebar></app-navebar>
    <!--核心区域:分左右两边-->
    <div class="container-fluid">
      <div class="row">
        <!--左边菜单栏区域-->
        <app-menuleft></app-menuleft>
        <!--右边主页面区域: 分上下两个区域-->
        <app-home></app-home>
      </div>
    </div>
  </div>
  `;
	window.App = {
		template,
		components: {
			'app-navebar': AppNaveBar,
			'app-menuleft': AppMenuLeft,
			'app-home': AppHome,
		},
	};
})();
