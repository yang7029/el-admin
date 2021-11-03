# ES6

## let(变量) 关键字

-   变量不能重复声明

```js
let star = '小明';
let star = '老王';
错误：Identifier 'star' has already been declared
```

-   块级作用域 es5：全局，函数，eval(es5 的严格模式)，只能在代码块中有效，在 if else while for 等中有效

```js
{
	let girl = '周扬青';
}
console.log(girl);
错误：girl is not defined
```

-   不存在变量提升：不存在你在变量声明之前使用

```js
console.log(song);
let song = '唱歌达人';
错误：Cannot access 'song' before initialization
```

-   不影响作用域链

```js
{
	let school = '美好的一天';
	function fn() {
		console.log(school);
	}
	fn();
}
错误：没有错误
```

案例：

```js
<style>
		.item {
			width: 50px;
			height: 30px;
			border: 1px salmon solid;
			float: left;
			margin-right: 20px;
		}
	</style>
	<body>
		<div>
			<h2>点击切换颜色</h2>
			<div class="item"></div>
			<div class="item"></div>
			<div class="item"></div>
		</div>
		<script>
      // 根据两个循环var和let做对比
			// 获取div元素
			let items = document.getElementsByClassName('item');
			// console.log(items);
			// console.log(items.length);
			for (var i = 0; i < items.length; i++) {
				// console.log(i);
				items[i].onclick = function () {
					// 修改当前元素的背景
					this.style.background = 'pink';
					// items[i].style.background = 'pink';
					//错误的，因为 i 全局的 当 i 循环完的时候，i 已经变成 3 了，items[3]已经不起作用了，变量进行了提升
					// Cannot read properties of undefined (reading 'style')at HTMLDivElement.items.<computed>.onclick
				};
			}
			console.log(window.i);
			// for (let i = 0; i < items.length; i++) {
			// 	console.log(i);
			// 	// console.log(items.length);
			// 	items[i].style.background = 'pink';
			// }
		</script>
	</body>
```

## const(常量) 关键字

-   值不能修改的量，成为常量
-   const 常量一定要赋初始值

```js
const A
错误：Missing initializer in const declaration
```

-   常量一般使用`大写`(潜规则)

```js
const TOKEN_KEY = 100;
console.log(TOKEN_KEY);
```

-   常量的值不能修改

```js
const SCHOOL = '字节学堂';
SCHOOL = '学堂';
错误：Assignment to constant variable.
```

-   块级作用域

```js
{
	const PLAY = 'ZUI';
}
console.log(PLAY);
错误：PLAY is not defined
```

-   对于数组和对象的`元素`做修改，不算做对常量的修改，不会报错

```js
const TEMA = ['小王八犊子', '大王八犊子', '小犊子', '你是王八犊子'];
TEMA.push('你全家都是王八犊子');
console.log(TEMA)
注意：不会报错
```

## 解构赋值

-   ES6 允许按照一定模式从`数组和对象`中提取`值`，对`变量`进行`赋值`，被称为结构

### 数组结构

-数组结构的本质是通过数组中提取值，然后对变量进行赋值，方便操作

```js
const HOBBY = ['吃饭', '睡觉', '打豆豆'];
let [eat, sleep, doudou] = HOBBY;
console.log(eat);
console.log(sleep);
console.log(doudou);
```

### 对象结构

-   对象结构，一般结构的是方法，但是结构的`变量`和对应的`对象的属性`必须保持一致

```js
const zhao = {
	name: '老赵',
	age: '99',
	xiaoping: function () {
		console.log('我可以演小品');
	},
};
let { name, age, xiaoping } = zhao;
console.log(name);
console.log(age);
console.log(xiaoping);
xiaoping();

// 如果不结构赋值，多次调用对象中函数的话，就会有多次 `zhao` 如果结构赋值的话，`zhao` 只写一次
zhao.xiaoping();
zhao.xiaoping();
zhao.xiaoping();
zhao.xiaoping();
```

## 模板字符串

-   声明 模板字符串也是字符串

```js
// 声明
let str = `我也是字符串`;
console.log(str, typeof str); //string
```

-   可以直接出现换行，以前没有出现模板字符串的时候，都是直接用`+`进行拼接，不需要考虑换行的问题 字符串中出现换行

```js
let temp = `<ul>
        <li>沈腾</li>
        <li>玛丽</li>
        <li>艾伦</li>
        </ul>`;
console.log(temp);
```

-   变量拼接 直接用模板字符串 `${变量名}xxxxxxxxxxxxxxxxxx` 变量名和字符串拼接

```js
let love = '想想';
let out = `${love}是我心中最好的演员`;
console.log(out);
```

## 对象的简化写法

-   es6 的新特性，可以帮助我们可以减少很多不必要的代码

```js
let name = '杨蜀黍';
let change = function () {
	console.log('杨蜀黍可以改变');
};
const school = {
	name,
	change,
	// 对象里面创建方法，直接可以简写，不需要写function
	imporve() {
		console.log('今天是个好日子');
	},
};
change();
console.log(school);
school.imporve();
```

## 箭头函数

-   声明

```js
let fn = (a, b) => {
	return a + b;
};
let result = fn(10, 20);
console.log(result);
```

-   this 是静态的， this 始终只想函数声明时所在作用域下的 this 的值，简单来说，this 在箭头函数中，不会被改变

```js
function getName() {
	console.log(this.name);
}
let getName2 = () => {
	console.log(this.name);
};
window.name = '老王';
const school = {
	name: '王八蛋',
};
getName();
getName2();

//  通过call改变this指向，箭头函数都不改变
getName.call(school);
getName2.call(school);
```

-   箭头函数不能作为构造实例化对象

```js
let Person = (name, age) => {
	this.name = name;
	this.age = age;
};
let me = new Person('xiao', 30);
console.log(me);
错误：Person is not a constructor

// 构造实例化对象
function Person(name, age) {
	this.name = name;
	this.age = age;
	console.log('yang', this);
}
let me = new Person('yang', 24);
console.log(me);
```

-   不能使用 arguments 对象 arguments 是个特殊的变量，能够保留实参

```js
function fn(a, b, c) {
	console.log('arguments', arguments, typeof arguments);
}
fn(1, 2, 3);
let func = (a, b, c) => {
	console.log(arguments);
};
func(1, 2, 3);
```

-   函数的简写

```js
// 当只有一个参数的时候，括号可以省略
let add = n => {
	return n + n;
};
let result = add(8);
console.log(result);
// 当只有一条语句的时候，需要省略return和大括号，也可以省略小括号
let inc = n => n * n;
console.log(inc(10));
```

案例：

```js
// 两秒后变颜色，从蓝色变成粉色
	<style>
		div {
			width: 200px;
			height: 200px;
			background-color: seagreen;
		}
	</style>
	<body>
		<div id="ad"></div>
		<script>
    案例1：
			let ad = document.getElementById('ad');
			ad.addEventListener('click', function () {
				const _this = this;
				setTimeout(function () {// 只需要吧这儿换成箭头函数，this的指向问题就解决了，直接指向这个函数，那就是ad
					// 定时器的this指向window，所以this这里指向不顶用
					// this.style.background = 'pink';
					_this.style.background = 'pink';
				}, 2000);
			});

      案例2： 从数组中返回偶数元素
			const arr = [10, 34, 33, 3, 75, 89];
			let result = arr.filter(item => {
				if (item % 2 === 0) {
					return true; // 意思是返回是true的值
				} else {
					return false;
				}
			});
			console.log(result);
		</script>
	</body>
```

-   箭头函数的适用性：适合于 this 无关的回调，定时器，数组的方法

## 函数的默认值

-   初始值，给形参赋值，位置在，在最后一位(潜规则)

```js
function fn(a, b, c = 60) {
	console.log(a + b + c);
}
fn(10, 20);
```

-   和结构相结合，注意形参的和实参是同一种数据结构

```js
function context({ host = '1233', username, password, port }) {
	console.log(host);
	console.log(username);
	console.log(password);
	console.log(port);
}
context({
	// host: 'yagbin.com',
	username: 'root',
	password: 123456,
	port: 3306,
});
```

## rest 参数

-   这个得位置是在函数参数的`形参位置`
-   在 es5 中，用于获取函数的实参，采用的是 argumennts，在 es6 中采用 `...rest` 来获取实参
-   es5 中获取参数

```js
// es5获取实参的方法   arguments(对象)
function fn(a, b) {
	console.log(arguments, typeof arguments);
	console.log(arguments[0]);
	console.log(arguments[1]);
}
fn(10, 20);
```

-   es6 中获取参数

```js
//  es6获取实参的方法 rest     虽然是对象，但是可以用数组的方法
function func(...args) {
	console.log(args, typeof args);
}
func('username', 'password', 'root');

// rest参数必须要放到参数的最后
function fn1(a, b, ...args) {
	console.log(a);
	console.log(b);
	console.log(args);
}
fn1(1, 2, 3, 4, 5, 6, 7, 8, 9);
```

## 扩展运算符

-   扩展运算符的位置在函数`实参`的位置，注意跟`...rest`参数的区别(形参位置)

-   扩展运算符能将`数组`转换为都好分割的`参数序列`

```js
const hobby = ['吃饭', '睡觉', '打豆豆'];
function fn() {
	console.log(arguments);
}
fn(hobby);
// 扩展运算符，注意跟把数组传进去的区别
fn(...hobby);
```

-   扩展运算符案例
-   数组的合并：可以使用`concat`和`...xxx`(放到数组中)
-   数组的克隆：直接吧需要克隆的数组用`...xxx`(放到数组中)
-   将伪数组转为真正的数组，伪数组看起来想数组，其实是对象，案例在下面，自行打印查看，把需要转的伪数组放到数组中用扩展运算符`...xxx`，转为数组之后，就可以用数组真正的方法

```js
// 数组的合并
const play = ['跳绳', '手游', '端游'];
const song = ['挪威的森林', '成都', '好日子'];
// 第一种方式  使用  concat
const arr = play.concat(song);
console.log(arr);
// 第二种方式 使用 扩展运算符
const arr1 = [...play, ...song];
console.log(arr1);
// 数组的克隆
const cloneArr = [...play];
console.log(cloneArr);
// 将伪数组转为真正的数组，就可以用数组的一些方法
let divs = document.querySelectorAll('div');
console.log(divs, typeof divs);
const divsArr = [...divs];
console.log(divsArr, typeof divsArr);
```

## Symbol 数据类型

-   ES6 引入了一种新的数据类型 Symbol，表示独一无二的值，他是 JavaScript 语言的第七种数据类型，是一种类似于字符串的数据类型、
-   Symbol 的特点：
    1. Symbol 的值是唯一的，用来解决命名冲突问题
    2. Symbol 的值不能与其他数据类型进行数据运算
    3. Symbol 定义的对象属性不能使用 `for...in` 进行循环遍历，但是可以使用 `Reflect.ownKeys` 来获取对象所有的键名
    4. 七种数据类型：USONB undefined string Symbol object null number boolean

```js
		// 第一种方式创建Symbol
			let s = Symbol();
			console.log(s, typeof s);
			// 往Symbol中田间字符串，为的是方便理解，Symbol的值是唯一的，不能相等，函数的形式创建
			let s2 = Symbol('yang');
			let s3 = Symbol('yang');
			console.log(s2 === s3);
			// 第二种方式穿件Symbol，这个值是相等的，函数对象的形式创建
			let s4 = Symbol.for('123');
			let s5 = Symbol.for('123');
			console.log(s4 === s5);
			// 不能与其他数据类型进行运算
			let res = s + 100;
			console.log(res);
			错误： Cannot convert a Symbol value to a number
```

-   Symbol 的使用：是向对象中添加属性和方法，因为对象中的属性和方法是独一无二的(Symbol 的值是独一无二的)，当原来的对象中重复的名字的时候，就不会和最初的属性重复，因为是 Symbol 类型的数据，具有唯一性

```js
// 第一种方式：通过另一个对象的形式添加
let game = {
	name: '王小二',
	up() {
		console.log('我可以');
	},
	down() {
		console.log('我是乡下的');
	},
};
let method = {
	up: Symbol(),
	down: Symbol(),
};
game[method.up] = () => {
	console.log('今天的天气有点好啊');
};
game[method.down] = () => {
	console.log('雨下来了');
};
console.log(game);

// 第二种方式：直接在自己的需要的对象中添加
const hobby = {
	name: '小明',
	[Symbol('say')]: () => {
		console.log('123');
	},
	[Symbol('song')]: () => {
		console.log('456');
	},
};
console.log(hobby);
```

-   Symbol 的内置属性，ES6 还提供了 11 个 Symbol 值，指向内部使用的方法

```js
具体参见：
https://blog.csdn.net/c__dreamer/article/details/81873087?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522163428595916780269859877%2522%252C%2522scm%2522%253A%252220140713.130102334..%2522%257D&request_id=163428595916780269859877&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~sobaiduend~default-2-81873087.pc_search_es_clickV2&utm_term=symbol+%E5%86%85%E7%BD%AE%E5%80%BC&spm=1018.2226.3001.4187
```

## 迭代器(Iterator)

-   迭代器是一种接口，为各种不同的数据结构提供统一的访问机制，任何说一句结构只要部署 `Iterator 接口(指的是对象中的属性)`，`就可以完成遍历操作`
-   ES6 创造了一种新的遍历命令`for...of`循环，Iterator 接口主要提供`for..of`消费
-   原生具备 Iterator 接口的数据(for of 遍历)
    1. Array
    2. arguments
    3. Set
    4. Map
    5. String
    6. TypeArray
    7. NodeList
-   工作原理
    1. 创建一个指针对象，指向当前数据结构的起始位置
    2. 第一次调用对象的 next 方法，指针自动指向数据结构的第一个成员
    3. 接下来不断调用 next 方法，指正一直向后移动，直到指向指向最后一个成员
    4. 每调用 next 方法返回一个包含 value 和 done 的对象
-   `for...in`：遍历出来的是键值 `for...of`：遍历出来的是属性

```js
// 遍历的对比
const xiyou = ['唐僧', '孙悟空', '猪八戒', '沙僧'];
for (let v of xiyou) {
	console.log(v);
}
for (let v in xiyou) {
	console.log(v);
}
//工作原理
let iterator = xiyou[Symbol.iterator]();
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
```

## 迭代器案例

-   `需要自定义遍历数据的时候，就要想到迭代器`

```js
// 遍历(for...of)一个对象，但是要返回对象中数组的值
const banji = {
	name: '终极一班',
	stus: ['xiaoming', 'laowang', 'dapeng', 'dingzi'],
};

// 案例缺失没明白
```

## 生成器(迭代器，生成器，状态不好，没看懂)

## Promise

-   Promise 是 ES6 引入的异步编程的新的解决方案，语法上 Promise 是一个构造器函数，用来封装异步操作，并可以获取其成功和失败的结果，Promise 就是为了解决回调地狱的问题

-   Promise 的基本用法：把异步任务封装在`Promise`对象里面，通过`resolve`和`reject`这两个函数来改变这个`对象`的状态，当成功的时候，调用的是`then`方法中的第一个回调函数，失败的时候，调的是 then 方法中的第二个回调函数
-   通过对`resolve`和`reject`传值，可以设置这个对象成功和失败的值

```js
<script>
			const P = new Promise(function (resolve, reject) {
				// 封装异步的操作
				setTimeout(function () {
					// 成功调用的函数
					// let data = '读取用户数据';
					// resolve(data);
					// 失败调用的函数
					let data = '读取用户数据失败';
					reject(data);
				}, 2000);
			});
			// Promise 的then方法

			P.then(
				function (value) {
					console.log(value);
				},
				function (reason) {
					console.log(reason);
				}
			);
		</script>
```

-   Promise 封装读取文件

```js
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
```

-   Promise 封装 AJAX 请求

```js
<script>
			// 接口地址：https://api.apiopen.top/getJoke
			const p = new Promise((resolve, reject) => {
				// 1. 创建对象
				const xhr = new XMLHttpRequest();
				// 2. 初始化
				xhr.open('GET', 'https://api.apiopen.top/getJoke');
				// 3. 发送
				xhr.send();
				// 4. 绑定事件，处理响应结果
				xhr.onreadystatechange = () => {
					//  判断状态
					if (xhr.readyState === 4) {
						// 判断响应状态码
						if (xhr.status >= 200 && xhr.status < 300) {
							// console.log(xhr.response);
							resolve(xhr.response);
						} else {
							// console.error(xhr.status);
							reject(xhr.status);
						}
					}
				};
			});

			p.then(
				value => {
					console.log(value);
				},
				reason => {
					console.log(reason);
				}
			);
		</script>
```

-   Promise.prototype.then 方法的返回值
    1. 调用 then 方法 then 方法的返回结果是 Promise 对象，对象的状态是由对调函数的执行结果决定的
    2. 如果回调函数中返回的结果是非 Promise 类型的属性，状态为成功，返回值为对象的成功值
    3. 如果返回的是 Promise 对象， Promise 对象的状态为成功，那么返回的值为该对象成功的值
    4. 抛出错误
    5. 链式调用

```js
	<script>
			const p = new Promise((resolve, reject) => {
				let str = '今天的天气还是比较好的';
				resolve(str);
			});
			const result = p.then(
				value => {
					// coensole.log(value);
					// 返回的是非 Promise 对象
					// return value;
					// 返回的是 promise
					return new Promise((resolve, reject) => {
						resolve('下午茶是柚子');
					});
					// 抛出错误
					// throw new Error('出错了');
				},
				reason => {
					console.log('失败了');
				}
			);
			console.log(result);
      // 链式调用
			p.then().then().then();
		</script>
```

-   Promise.prototype.catch 方法
-   对于 `catch` 方法来说，作用和`p.then()`中的第二个参数效果是一样的

```js
		<script>
			const p = new Promise((resolve, reject) => {
				let str = '出错了';
				reject(str);
			});
			p.then(
				value => {},
				reason => {
					console.warn(reason);
				}
			);
			p.catch(reason => {
				console.error(reason);
			});
		</script>
```

## Set

-   ES6 提供了新的数据结构`Set`。类似于数组，但是成员的值都是唯一的，集合实现了 `iteartor` 接口，所以可以使用`扩展用算符`和`for...of`进行遍历
-   集合属性的方法：
    1. size：返回集合的元素个数
    2. add：增加一个新的元素，返回当前的集合
    3. delete：删除元素，返回 boolean 值
    4. has：检测集合中是否包含某个元素，，返回 boolean 值
    5. clear：清空
-   声明 Set

```js
// 声明一个Set  类型是一个对象
let s = new Set();
console.log(s, typeof s);
```

-   Set 初始值，一般是数组
-   Set 还有数组去重的作用

```js
let s2 = new Set(['大事', '小事', '坏事', '好事', '小事']);
console.log(s2);
// size 方法
console.log(s2.size);
// add方法
console.log(s2.add('喜事'));
// delete方法
console.log(s2.delete('大事'));
console.log(s2);
// has方法
console.log(s2.has('123'));
console.log(s2.has('喜事'));
// clear方法
s2.clear();
console.log(s2);
// 遍历
for (let v of s2) {
	console.log(v);
}
```

## Map

-   ES6 提供了新的数据结构`Map`。类似于对象，也是键值对的集合，但是`键`不限于字符串，各种类型的值(包括对象，都可以当做键)，Map 也实现了 `iteartor` 接口，所以可以使用`扩展用算符`和`for...of`进行遍历
-   Map 属性的方法：
    1. size：返回集合的元素个数
    2. set：增加一个新的元素，返回当前的 Map
    3. get：返回键名，对象的键值
    4. has：检测 Map 中是否包含某个元素，，返回 boolean 值
    5. clear：清空
-   Map 的声明使用

```js
<script>
			// Map声明
			let m = new Map();
			// 增加各种类型的值
			m.set('name', 'laowang');
			m.set('age', '24');
			m.set('hobby', '跳舞');
			m.set('change', () => {
				console.log('今天是美好的一天！！！');
			});
			m.set('key', [1, 2, 3, 4, 5, 6, 7, 8, 9]);
			console.log(m);
			// 返回元素的个数
			console.log(m.size);
			// 获取键名和键值
			console.log(m.get('change'));
			let key = {
				school: 'fdsjalf',
			};
			m.set(key, ['上海', '北京', '广州']);
			console.log(m.get(key));
			// 删除
			m.delete('name');
			console.log(m);
			// 清空
			// m.clear();
			// console.log(m);
			for (let v of m) {
				console.log(v);
			}
		</script>
```

## Class 类

-   ES6 提供了更接近传统语法的写法，引入了 Class(类)这个概念，作为对象的模板。通过 Class 关键字，可以定义类，基本上 ES6 的 Class 可以看做是个语法糖，它的大部分功能 ES5 都能够做到，新的 Class 写法只是让原型的写法更清晰，更面向对象编程的语法而已
-   calss 声明类
-   constructor 定义构造函数的初始化

```js
	<script>
			// es5
			{
        // 原型对象
				function Phone(brand, price) {
					this.brand = brand;
					this.price = price;
				}

				// 添加方法 添加到的地方是原型上
				Phone.prototype.hobby = function () {
					console.log('我的爱好是打电话');
				};

				// 实例化对象   实例对象
				const result = new Phone('huawei', 5999);
				result.hobby();
				console.log(result);
			}

			// es6 class类方法
			{
				class Phone {
					// 构造方法 名字不能修改固定    constructor是自动执行的，当我们的 new 一个新的实例对象的时候，会执行的函数
					constructor(brand, price) {
						this.brand = brand;
						this.price = price;
					}
					// 添加方法  直接这样写，不能使用es5的完整形式
					hobby() {
						console.log('我的爱好是睡觉，我上辈子没有睡够');
					}
				}
				// 进行实例化
				let shouji = new Phone('1+', 19999);
				shouji.hobby();
				console.log(shouji);
			}
		</script>
```

-   extends 继承类
-   super 调用父级构造方法

```js
		<script>
			// 定义父类
			class Phone {
				// 构造方法
				constructor(brand, price) {
					this.brand = brand;
					this.price = price;
				}
				// 父类成员属性
				hobby() {
					console.log('我可以改变世界');
				}
			}
			// 定义子类 继承父类的一些属性元素   extends
			class SmartPhone extends Phone {
				//  构造方法，需要把父类的一些参数传递过来，如果不传递过来，会报错
				constructor(brand, price, color, size) {
					// 用super()进行触发 父类的一些属性和方法
					super(brand, price);
					this.color = color;
					this.size = size;
				}
				photo() {
					console.log('我最不想的就是拍照');
				}
				playGame() {
					console.log('我其实一般玩游戏');
				}
				hobby() {
					console.log('今天的天气还不错');
				}
			}
			let oppo = new SmartPhone('oppo', 5999, 'black', '6.6nic');
			console.log(oppo);
			oppo.photo();
		</script>
```

-   static 定义静态方法和属性
    1. 对于 class 类中静态定义的方法，只属于原型对象，不属于实例对象 关键字是 static

```js
<script>
			class Phone {
				static name = '手机';
				static change() {
					console.log('我可以改变世界');
				}
			}
			let nokia = new Phone();
			console.log(nokia.name); //undefined
			console.log(Phone.name); //手机
			Phone.change(); //正常输出
		</script>
```

-   父类方法重写：在子类中声明一个和父类同名的方法

```js
		<script>
			class Father {
				constructor(name, age) {
					this.name = name;
					this.age = age;
				}
				hobby() {
					console.log('完美的日子，今天的下午茶是酸奶');
				}
			}
			class Son extends Father {
				constructor(name, age, color, xiaoming) {
					super(name, age);
					this.color = color;
					this.xiaoming = xiaoming;
				}
				song() {
					console.log('我今天唱了一首歌');
				}
				// 对父类中的方法和属性进行重写：在子类中命名和父类中相同的元素
				name = '老杨';
				hobby() {
					console.log('onCall');
				}
			}
			let littleSon = new Son('老王', 99, 'yellow', '狗蛋');
			console.log(littleSon);
			littleSon.hobby();
		</script>
```

## 对象方法的扩展

-   Object.is 判断两个值是否完全相等
-   Object.assign 对象的合并，没有的增加属性，有的合并属性，后面的把前面的进行合并
-   Object.setPrototypeOf 设置原型对象 和 Object.getPrototypeOf 获取原型对象

```js
	<script>
			// Object.is
			console.log(Object.is(120, 120));
			console.log(Object.is(NaN, NaN));
			// Object.assign
			const config1 = {
				username: 'xiaoming',
				password: 'root',
				port: 3360,
			};
			const config2 = {
				username: 'loawang',
				password: 'admin',
				test: 'test',
			};
			console.log(Object.assign(config2, config1));
			// Object.setPrototypeOf
			const school = {
				name: '第一中学',
			};
			const cities = {
				xiaoqu: ['北京', '上海', '广州'],
			};
			Object.setPrototypeOf(school, cities);
			console.log(school);
			console.log(Object.getPrototypeOf(school));
		</script>
```

## 模块化

-   模块化是指将一个很大的程序文件，拆分成许多小的文件，然后在将这个小文件组合起来
-   模块化的好处：
    1. 放置命名冲突
    2. 代码复用率搞
    3. 高维护性
-   ES6 之前的模块化规范：

    1. CommonJS ==> NodeJS Browserify
    2. AMD ==> requrieJS
    3. CMD ==> seaJS

-   ES6 模块化的语法

    -   模块功能主要是由两个命令构成：export 和 import
    -   export 命令用于规定模块的对外接口
    -   import 命令用于输入其他模块提供的功能

-   基本使用

```js
// js文件 在Chrome中会报错，因为是Chrome的安全机制，在别的浏览器可以
export let school = '尚硅谷';
export function teach() {
	console.log('我是个老师');
}
// 在另一个js文件中引入
import * as m1 from './m1';
console.log(m1);
// 执行
<script type="module" src="./export.js"></script>;
```

-   暴露语法的使用

```js
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
```

-   引入语法汇总

```js
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
```

## ECMASript 7 新特性

-   includes：用来检测数组中是否包含某个元素，返回布尔类型值
-   指数操作符：`**`，用来实现幂运算，功能与 Math.pow 相同

```js
// includes
let mingzhu = ['西游记', '三国演义', '红楼梦', '水浒传'];
console.log(mingzhu.includes('西游记'));
console.log(mingzhu.includes('金瓶梅'));

// **  幂方
console.log(2 ** 10);
console.log(10 ** 2);
console.log(Math.pow(10, 2));
```

## ECMASript 8 新特性

-   async 和 await
    1. async 和 await 两种语法的结合，可以让异步代码同步化
-   async 函数
    1. async 函数的返回值为 Promise
    2. Promise 对象结果又 async 函数执行的返回值决定

```js
// async函数
async function fn() {
	// 如果返回的是一个不是promise的对象，那么执行的结果是成功的Promise状态
	// return '尚硅谷';
	// 如果返回的是一个promise，那么外层的async函数会按照里面的函数的值返回，如果里面的值返回的是成功的状态，那么外层的函数得到的是成功的状态，反之，成立
	return new Promise((resolve, reject) => {
		resolve('成功');
		// reject('失败了');
	});
}
let result = fn();
console.log(result);
result.then(
	value => {
		console.log(value);
	},
	reason => {
		console.log(reason);
	}
);
```

-   await 函数
    1. await 函数必须写在 async 函数中
    2. await 右侧的表达式一般为 Promise 对象
    3. await 返回的是 Promise 成功的值
    4. await 的 Promise 失败了，就会抛出异常，需要通过 try...catc 捕获处理

```js
const p = new Promise((resolve, reject) => {
	// resolve('成功的值');
	reject('读取值失败了');
});
async function fn() {
	try {
		let result = await p;
		console.log(result);
	} catch (e) {
		console.log(e);
	}
}
fn();
```

-   async 和 await 读取文件

```js
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
```

## 私有属性

-   前面带有#号，是个人私有，别人无法调用

```js
class Father {
	// 共有属性
	name;
	age;
	// 私有属性
	#weight;
	#height;
	constructor(name, age, wieght) {
		this.name = name;
		this.age = age;
		this.#weight = wieght;
	}
	hobby() {
		console.log('123');
	}
}
const result = new Father('laowang', 99, '65kg');
console.log(result);
```

## Promise.all([xxxxx,xxxxx])和 Promise.allSettled([xxxx,xxxx])

-   用来处理批量异步任务的场景

```js
const p1 = new Promise((resolve, reject) => {
	setTimeout(() => {
		resolve('获取商品数据-----1');
	}, 2000);
});

const p2 = new Promise((resolve, reject) => {
	setTimeout(() => {
		reject('获取商品数据------2');
	}, 2000);
});
// 错误的会执行错误的，正确的会执行正确的 返回的值和状态都有，返回的值个执行个的
const result = Promise.allSettled([p1, p2]);
console.log(result);
// 如果返回的Promise有一个错误，那么状态是失败的
const res = Promise.all([p1, p2]);
console.log(res);
```
