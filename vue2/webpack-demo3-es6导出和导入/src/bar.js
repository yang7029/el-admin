// ES6导出一个默认成员
export default function () {
	console.log('123');
}

// 只能导出一个非默认成员，意识就是只能用一个default，不然会报错
// export default "hellow"

// ES6导出非默认成员
export const X = 'XXX';
export const Y = 'YYY';
export function add(a, b) {
	return a + b;
}
