// 读取的文件是resource中的数据
const fs = require('fs');
// fs.readFile('./resource/为学.md', 'utf-8', (err, data) => {
// 	if (err) throw err;
// 	console.log(data);
// });

// 使用Promise封装
const p = new Promise((resolve, reject) => {
	fs.readFile('./resource/为学.md', 'utf-8', (err, data) => {
		if (err) reject(err);
		resolve(data);
	});
});
p.then(
	value => {
		console.log(value);
	},
	reason => {
		console.log(reason);
	}
);
