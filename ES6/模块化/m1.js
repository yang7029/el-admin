// 分别暴露
{
	export let school = '尚硅谷';
	export function teach() {
		console.log('我是个老师');
	}
}
//花括号暴露
{
	let school = '尚硅谷';
	function teach() {
		console.log('我是个老师');
	}
	export { school, teach };
}
// 默认暴露，暴露的是对象
{
	export default {
		school: '尚硅谷',
		teach: function () {
			console.log('我是个老师');
		},
	};

	// 默认调用方法
	m1.default.teach();
}
