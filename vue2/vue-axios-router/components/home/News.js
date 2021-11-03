(function () {
	const template = ` <!--右边主页面区域-->
  <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
    <div class="header clearfix">
    <nav>
      <ul class="nav nav-pills">
      <router-link to='/news/sport' tag="li">
      <a>体育</a>
      </router-link>
      <router-link to='/news/tech' tag="li">
      <a>科技</a>
      </router-link>
      </ul>
    </nav>
    <hr>
    </div>	
    <!--此处渲染 /news/... 的子路由对应的组件在这块-->
    <router-view></router-view> 
</div>`;
	window.News = {
		template,
	};
})();
