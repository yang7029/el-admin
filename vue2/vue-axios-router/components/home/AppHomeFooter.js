(function () {
	const template = `<div class="table-responsive">
  <table class="table table-striped">
    <thead>
      <tr>
        <th>ID</th>
        <th>姓名</th>
        <th>工资</th>
        <th>操作</th>
      </tr>
    </thead>
    <tbody>
    <homefooter-item v-for="(emp,index) in empList" :key="emp.id" :emp="emp" :deleteEmp='deleteEmp' :index='index'></homefooter-item>
    </tbody>
  </table>
</div>`;
	window.AppHomeFooter = {
		template,
		components: {
			'homefooter-item': HomeFooterItem,
		},
		props: {
			empList: Array,
			deleteEmp: Function,
		},
		data() {
			return {};
		},
	};
})();
