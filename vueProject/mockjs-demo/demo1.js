// 数据模板定义规范   DTD

const Mock = require('mockjs');
const data = Mock.mock({
	// 生成数组
	'numberList|10': [
		{
			// 生成数字
			'id|+1': 1, //让id自增1
			'age|1-120': 1, //生成随机数1-120的数
			'salary|6000-8000.1-3': 6500, //随机成成6000-8000之间的小数点1-3位的数
			// 生成字符串
			'name|1-3': '小梦', //随机生成1-3个小梦
			'phone|11': '8', //生成11个8
			// 生成Boolean
			'status| 1': false, //随机生成true或者false，并且概率都是二分之一的
			'open|2-4': true, // 生成的概率  true:4/(2+4)      false:2/(2+4)
			// 生成对象
			'order|2': {
				id: 1,
				age: 19,
				name: '小花花',
			},
			'order1|2-3': {
				id: 1,
				age: 19,
				name: '小花花',
			},
			// 生成正则表达式     正则表达式没有引号
			idCard: /\d{15}|\d{18}/,
		},
	],
});
console.log(JSON.stringify(data, null, 2));
