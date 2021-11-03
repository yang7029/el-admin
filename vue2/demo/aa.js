const week = [
	{ aa: '星期一', bb: '1' },
	{ aa: '星期二', bb: '2' },
	{ aa: '星期三', bb: '3' },
	{ aa: '星期四', bb: '4' },
	{ aa: '星期五', bb: '5' },
	{ aa: '星期六', bb: '6' },
	{ aa: '星期七', bb: '7' },
];
const number = ['1', '2', '3', '4', '5', '6', '7'];
let num = 0;
number.map(res => {
	window.num = res;
	week.map(val => {
		if (val.bb === window.num) {
			console.log(val.aa);
		}
	});
});
