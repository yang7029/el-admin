const fs = require('fs');
const p = new Promise((resolve, reject) => {
	fs.readFile('./resource/为学.md', 'utf-8', (err, data) => {
		resolve(data);
	});
});
p.then(value => {
	// console.log(value);
	return new Promise((resolve, reject) => {
		fs.readFile('./resource/热风.md', 'utf-8', (err, data) => {
			resolve([value, data]);
		});
	});
})
	.then(value => {
		return new Promise((resolve, reject) => {
			fs.readFile('./resource/观书有感.md', 'utf-8', (err, data) => {
				// resolve(data);
				value.push(data);
				resolve(value);
			});
		});
	})
	.then(value => {
		console.log(value);
	});
