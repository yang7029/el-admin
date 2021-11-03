// 数据占位符定义规范
const Mock = require('mockjs');
const data = Mock.mock({
	'numberList|5': [
		{
			'id|+1': 1,
			// 名字站位符
			name: '@Cname',
			// 小数站位符
			price: '@float',
			// 布尔占位符
			status: '@boolean',
			// 日期占位符------日期
			birthday: '@date',
			// 日期占位符------日期改变样式
			today: '@date("yyyy/MM/dd")',
			// 日期占位符------日期时分秒
			createDate: '@datetime',
			// 日期占位符------日期时分秒，改变时分秒
			createDate: '@datetime("yyyy/MM/dd" HH:mm:ss)',
			// 图像占位符
			pic: '@image("200x100","#4A7BF7","hello")',
			// 文本标题占位符
			title: '@title',
			ctitle: '@ctitle(10,40)',
			// 文本占位符
			content: '@sentence',
			ccontent: '@csentence(200,300)',
			// 名字占位符
			first: '@cfirst',
			last: '@clast',
			// 网络占位符
			url: '@url("https", "mengxugu")',
			// 域名占位符
			domain: '@domain',
			// ip占位符
			ip: '@ip',
			// email占位符
			email: '@email',
			// 区域站位符
			area: '@region',
			// 地址站位符
			address: '@county(true)',
			// 邮政编码
			zipCode: '@zip',
			// 手机号
			'phone|11': '@integer(0,9)',
		},
	],
});
// 转换成json字符串
console.log(JSON.stringify(data, null, 2));
// 转换成对象
console.log(JSON.parse(JSON.stringify(data, null, 2)));
