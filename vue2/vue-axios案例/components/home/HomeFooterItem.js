(function () {
	const template = `
  <tr>
    <td>{{emp.id}}</td>
    <td>{{emp.name}}</td>
    <td>{{emp.salary}}</td>
    <td><a href="#" @click='delempItem'>删除</a></td>

  </tr>
  `;
	window.HomeFooterItem = {
		template,
		props: {
			emp: {
				type: Object,
				required: true,
			},
			deleteEmp: Function,
			index: Number,
		},
		methods: {
			delempItem() {
				this.deleteEmp(this.index);
			},
		},
	};
})();
