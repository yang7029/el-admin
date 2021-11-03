// 引入语法汇总
// 通用的导入方式
{
	import * as m1 from './m1';
	console.log(m1);
}
// 结构赋值的形式
{
	import { school, teach } from './m1';
	console.log(school, teach);
	// 取别名   school 的别名叫 guifu
	import { school as guifu, teach } from './m1';
	console.log(guifu);
	console.log(teach);
}
// 简便暴露
{
	import m1 from './m1';
	console.log(m1);
}
