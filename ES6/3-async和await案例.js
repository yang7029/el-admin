const fs = require('fs');

function weixue() {
	return new Promise((resolve, reject) => {
		fs.readFile('./resource/为学.md', 'utf-8', (err, data) => {
			if (err) reject(err);
			resolve(data);
		});
	});
}

function refeng() {
	return new Promise((resolve, reject) => {
		fs.readFile('./resource/热风.md', 'utf-8', (err, data) => {
			if (err) reject(err);
			resolve(data);
		});
	});
}
function guanshu() {
	return new Promise((resolve, reject) => {
		fs.readFile('./resource/观书有感.md', 'utf-8', (err, data) => {
			if (err) reject(err);
			resolve(data);
		});
	});
}

// 重点是调用的函数和函数的返回值不能重名
async function main() {
	let aa = await weixue();
	let bb = await refeng();
	let cc = await guanshu();
	console.log(aa);
	console.log(bb);
	console.log(cc);
}

main();
