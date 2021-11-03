(function () {
	const template = `<div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2main">
  <!--右边上半区域-->
  <h1 class="page-header">Dashboard</h1>
  <app-hometop></app-hometop>
  <!--右边下半区域-->
  <h2 class="sub-header">Section title</h2>
  <app-homefooter></app-homefooter>
</div>`;
	window.AppHome = {
		template,
		components: {
			'app-hometop': AppHomeTop,
			'app-homefooter': AppHomeFooter,
		},
	};
})();
