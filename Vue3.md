# Vue3

## 认识 Vue

-   是一套用于构建用户界面的`渐进式框架`
-   渐进式框架：表示我们可以在项目中一点点的引入和使用 Vue，而不是一定需要全部视同 Vue 来开发整个项目

## Vue3 带来的新变化(源码)

-   源码通过 monorepo 的形式来管理源码
    -   Mono：单个
    -   Repo：repository 仓库
    -   主要将许多的项目代码存储在一个 repositoy 中
    -   这样做的目的是多个包本身相互独立，可以由自己的功能逻辑，单元测试，同时又在同一个仓库下方便管理
    -   模块划分清晰，可维护性，可扩展性强
-   源码使用 TypeScript 来进行重写
    -   在 Vue2.x，vue 使用的是 Flow 来进行类型检测的
    -   Vue3.x 的时候，Vue 的源码全部使用的是 TypeScript 来进行重构，并且 Vue 本身对 TypeScript 支持也更好了

## Vue3 带来的新变化(性能)

-   使用的是 Proxy 进行数据劫持的
    -   在 Vue.2x 使用的是 Object.definePrototype 来进行数据的 getter 和 setter 方法
    -   Vue2.x 数据劫持存在缺陷就是，当给对象添加或者删除属性的时候，是无法劫持和监听的
    -   在学习 Vue2.x 的时候，提供了一些特殊的 API，比如$set或者$delete，事实上都是 hack 方法，也增加了开发者的学习成本
    -   在 Vue3.x 开始，Vue 使用的 Proxy 来实现数据劫持
-   删除了一些不必要的 API
    -   移除了实例上的$on,$off,$once
    -   移除了一些特性，如 filter，内联模板
-   编译方面优化
    -   生成 Block Tree、Slot 编译优化、diff 算法优化

## Vue3 带来的新变化(新的 API)

-   由 Options API 到 Composition API
    -   在 Vue2.x 的时候，会通过 Options API 来描述组件对象
    -   Options API 包括 data、props、methods、computed、生命周期
    -   存在较大的问题是多个逻辑是在不同的地方
        -   比如在 created 中会使用某个 methods 来修改 data 的数据，代码的内聚性非常差
    -   Composition API 可以讲想关联的代码放到同一处，进行处理，二部需要在多个 Options 之间寻找
    -   Hooks 函数增加代码的复用性，在 Vue2.x 的时候，我们通常通过 mixins 在多个组件之间共享逻辑
    -   但是又一个很大的缺陷，mixins 也是由一大堆 Options 组成的，并且多个 mixins 之间还会存在命名冲突的情况
    -   在 Vue3.x 中，我们可以通过 Hooks 函数，将一部分的逻辑独立出去，并且还可以做到响应式

## 如何使用 Vue

-   在页面中通过 CDN 方式来引入
-   `<script src="https://unpkg.com/vue@next"></script>`

```js
<body>
		<div id="app"></div>
		<script src="https://unpkg.com/vue@next"></script>
		<script>
			// 创建对象 在创建的APP中使用
			const why = {
				template: `<h2>Hello world</h2>`,
			};
			// 创建app
			const app = Vue.createApp(why);
			// 挂载 挂载到这个id为app的这个div上
			app.mount('#app');

			// 流程：创建对象，吧对象传入到这个app，通过mount挂载到这个id为app的div上
		</script>
	</body>
```

-   下载 Vue 的 javaScript 文件，通过自己手动引入

```js
	<body>
		<div id="app"></div>
		<script src="./vue.js"></script>
		<script>
			const ybh = {
				template: `<h2>你好，杨先生</h2>`,
			};
			const app = Vue.createApp(ybh);
			app.mount('#app');
		</script>
	</body>
```

-   通过 npm 包管理工具安装使用
-   直接通过 CLI 来创建工程

## 计数器案例(命令式编程和声明式编程)

-   命令式编程(原生)：关注的是怎么去干，需要用逻辑思维需要去一步一步往下写，通过写的命令，去执行
-   生命式编程(vue)：关注的是怎么去声明，逻辑由框架执行

```js
// 原生
<body>
		<button class="increment">自增</button>
		<h2 class="counter"></h2>
		<button class="decrement">自减</button>
		<script>
			// 1.获取元素
			let counterEl = document.querySelector('.counter');
			let incrementEl = document.querySelector('.increment');
			let decrementEl = document.querySelector('.decrement');
			// 2. 赋初始值
			let count = 0;
			counterEl.innerHTML = count;
			// 3. 监听按钮的点击
			incrementEl.addEventListener('click', () => {
				count += 1;
				counterEl.innerHTML = count;
			});
			decrementEl.addEventListener('click', () => {
				count -= 1;
				counterEl .innerHTML = count;
			});
		</script>
	</body>
// vue
<body>
		<div id="app">
			<button @click="increment">自增</button>
			<h2>{{count}}</h2>
			<button @click="decrement">自减</button>
		</div>
		<script src="./vue/vue.js"></script>
		<script>
			Vue.createApp({
				data() {
					return {
						count: 0,
					};
				},
				methods: {
					increment() {
						this.count++;
					},
					decrement() {
						this.count--;
					},
				},
			}).mount('#app');
		</script>
	</body>
```

## 创建 Vue3.0 工程

-   查看@vue/cli 版本，确保@vue/cli 版本在 4.5.0 以上`vue -V`
-   安装升级`npm install -g @vue/cli`
-   创建`vue create 项目名称`
-   启动`cd 项目目录/npm run serve`

## main.js

-   Vue2 引入的是一个构造函数，Vue3 引入的是是一个叫做 createApp 的工厂函数

```
<!-- vue2 -->
import Vue from 'vue'
import App from './App.vue'
import router from './router'

vue.config.productionTip = false
new Vue({
	router,
	render:(h) =>h(App)
}).$mount('#app')

<!-- vue3 -->
// 引入的是工厂函数
import { createApp } from 'vue';
import App from './App.vue';

// createApp(App).mount('#app');

// 拆解
const app = createApp(App);

// 挂载
app.mount('#app');

// 可以打印app上面的一些东西
console.log(app);

// unmount的应用       卸载unmount
setTimeout(() => {
	app.unmount('#app');
 }, 3000);
```

## App.vue

-   出现了组件名
-   Vue3 组件中的模板可以没有`跟标签`

```js
<template>
	<img alt="Vue logo" src="./assets/logo.png" />
	<HelloWorld msg="Welcome to Your Vue.js App" />
</template>
```

## 常用的 Composition API(组合式 API)

-   后续在理解，理解玩 hooks 函数

## setup 函数

-   理解：Vue3.0 一个新的配置项，值为一个函数
-   setup 是所有`composition API`表演的舞台
-   组件中所用到的：数据，方法，等等，都要在 setup 中配置
-   在模板中直接写在`setup`中声明的值，和 Vue2 是一致的

```js
<template>
    <div>一个人的信息</div>
    <h2>姓名：{{ name }}</h2>
    <h2>年龄：{{ age }}</h2>
    <button @click="sayHello">说话</button>
</template>

<script>
import { h } from 'vue';

export default {
    name: 'App',
    // 此处只是测试一下setup函数，不考虑响应式
    setup() {
        // 数据
        let name = '张三';
        let age = 99;
        // 方法
        function sayHello() {
            alert(`我叫${name}，今年${age}岁了`);
        }
        // ayHello();
        // 返回的是一个对象
        return {
            name,
            age,
            sayHello,
        };
        // 返回的是一个渲染函数
        // return () => {
        //     return h('h1', '尚硅谷');
        // };
    },
};
</script>
```

-   setup 函数的两种返回值：
-   `如果返回一个对象，则对象中的属性，方法，在模板中均可以直接使用（重点关注）`

```js
return {
	name,
	age,
	sayHello,
};
```

-   `如果返回的是一个渲染函数：则可以自定义渲染内容（了解）`

```js
import { h } from 'vue';
// 返回的是一个方法，h这个方法    return('元素，放到页面的元素','元素的内容')     直接用渲染函数渲染整个模板
return () => {
	return h('h1', '尚硅谷');
};
```

-   注意：`重点`
    1. 尽量不要和用 Vue2.x 配置混用
        - Vue2.x 配置（data、methods、computed...）中可以访问到 setup 中的属性方法
        - 但是 setup 不能访问 Vue2.x 配置（data、methods、computed）
        - 如果有重名，setup 优先
    2. setup 不能是一个`async`函数，因为返回值不在是 return 对象，而是 promise，模板看不到 return 对象中的属性

## ref 函数(定义一个响应式的数据，普通类型数据)

-   在`vue`中必须引入`ref`
-   想要实现`响应式`必须用到`ref`函数
-   在 Vue3 中，想把一个普通的字符串改值，需要用到`ref`函数
    -   RefImple(引用实现对象)：reference：引用 implement：实现
-   改变普通的字符串(用的是 getter 和 setter 劫持)
    -   把需要改的值需要用`ref('数据')`包裹
    -   通过`数据.value = xxx`实现响应式改值、
-   改变对象(用的是 proxy 进行劫持)
    -   把需要改的对象添加`ref({xxx:xxx})`
    -   通过`对象.value.属性名 = xxx`改值
-   在模板读取中，直接进行`<div>{{xxx}}</div>/<div>{{object.xxx}}</div>`

```js
<template>
    <div>一个人的信息</div>
    <h2>姓名：{{ name }}</h2>
    <h2>年龄：{{ age }}</h2>
    <h2>工作种类：{{ job.type }}</h2>
    <h2>薪水：{{ job.salary }}</h2>
    <button @click="changeInfo">修改个人信息</button>
</template>

<script>
import { ref } from 'vue';
export default {
    name: 'App',
    // 此处只是测试一下setup函数，不考虑响应式
    setup() {
        // 数据
        let name = ref('张三');
        let age = ref(99);
        let job = ref({
            type: '前端工程师',
            salary: '80k',
        });
        // 方法
        function changeInfo() {
            name.value = '李四';
            age.value = 66;

            job.value.type = '后端工程师';
            job.value.salary = '100k';
            console.log(name, age, job);
        }
        // 返回的是一个对象
        return {
            name,
            age,
            job,
            changeInfo,
        };
    },
};
</script>
```

-   备注：
    -   接收的数据可以是简单数据类型，也可以是对象类型
    -   基本数据类型：响应式依然依靠的是`Object.definPrototype()`的`get`和`set`
    -   对象类型数据：内部求助了 Vue3.0 中的一个新函数----`reactive`函数

## reactive 函数(对象类型数据)

-   reactive 不处理基本数据(处理对象和数组)
-   作用：定义一个`对象类型`的响应式数据(基本类型不用 reactive，要用 ref)
-   语法：`const 代理对象 = reactive(源对象)` 接收一个对象（数组），返回一个代理对象(proxy 对象)
-   reactive 定义的响应式是更深层次的
-   内部基于 ES6 的 proxy 实现，通过代理对象操作源对象内部数据

```js
<template>
    <div>一个人的信息</div>
    <h2>姓名：{{ name }}</h2>
    <h2>年龄：{{ age }}</h2>
    <h2>工作种类：{{ job.type }}</h2>
    <h2>薪水：{{ job.salary }}</h2>
    <h2>测试更深层次的对象：{{ job.a.b.c }}</h2>
    <h2>reactive更改数组：{{ hobby }}</h2>
    <button @click="changeInfo">修改个人信息</button>
</template>

<script>
import { ref, reactive } from 'vue';
export default {
    name: 'App',
    // 此处只是测试一下setup函数，不考虑响应式
    setup() {
        // 数据
        let name = ref('张三');
        let age = ref(99);
        let job = reactive({
            type: '前端工程师',
            salary: '80k',
            a: {
                b: {
                    c: 666,
                },
            },
        });
        let hobby = ['抽烟', '喝酒', '烫头'];
        // 方法
        function changeInfo() {
            name.value = '李四';
            age.value = 66;
            // 用reactive修改对象，不需要用value，直接拿值
            job.type = '后端工程师';
            job.salary = '100k';
            // 用reactive修改更深层次的对象，直接往下点就可以，没有用到value
            job.a.b.c = 999;
            // 更改数组，通过下标直接更改
            hobby[0] = '学习';
        }
        // 返回的是一个对象
        return {
            name,
            age,
            job,
            hobby,
            changeInfo,
        };
    },
};
</script>
```

-   注意：后面进行 reactive 进行重写，把握普通数据的`value`

## reactive 和 ref 对比

-   从定义的角度
    -   ref 用来定义：`基本数据类型`
    -   reactive 用来定义：`对象(或数组)类型数据`
    -   备注：ref 可以用来定义`对象(或数组)类型数据`，但是内部会通过 reactive 转为代理对象
-   从原理的角度
    -   ref 通过`Object.definePrototype()`的`set`和`get`来实现响应式(数据劫持)
    -   reactive 通过使用`Proxy`来实现响应式(数据劫持)，并且通过`Reflect`操作`源对象`内部的数据
-   从使用的角度
    -   ref 定义数据：操作数据需要`.value`，读取数据时模板中不需要`.value`
    -   reactive 定义数据：操作数据和读取数据，均不需要`.value`
-   一般使用的话，是把数据封装到一个对象中，然后用用`reactive`进行数据代理响应

## setup 函数的两个注意点

-   setup 执行的时机
    -   在 beforeCreate 之前执行一次，this 是 undefined

```js
    name: 'Demo',
    // 此处只是测试一下setup函数，不考虑响应式
    beforeCreate() {
        console.log('---beforeCreate---');
    },
    setup() {
        console.log('---setup---', this);
        // 数据
        let person = reactive({
            name: '老王',
            age: 99,
        });
        // 返回的是一个对象
        return {
            person,
        };
    },
};
```

-   setup 的参数
    -   props：值为`对象`，包含：组件外部传递过来的，且组件内部声明接收了的属性
        -   往 setup 中传值，是为了方便处理数据

```js
// 父组件
<template>
    <div>
        <Demo msg="hello" school="尚硅谷"></Demo>
    </div>
</template>

<script>
import Demo from './components/Demo.vue';
export default {
    components: {
        Demo,
    },
};
// 子组件
<template>
    <div>一个人的信息</div>
    <h2>姓名：{{ person.name }}</h2>
    <h2>年龄：{{ person.age }}</h2>
    <h2>{{ msg }}</h2>
</template>

<script>
import { reactive } from 'vue';
export default {
    name: 'Demo',
    props: ['msg', 'school'],
    setup(props) {
        console.log(props);
				console.log(props.msg);
        console.log(props.school);
        // 数据
        let person = reactive({
            name: '老王',
            age: 99,
        });
        // 返回的是一个对象
        return {
            person,
        };
    },
};
</script>
```

-   context：上下文发，配合组件传值
    -   attrs：值为`对象`，包含：外部组件传递过来，但没有在 props 配置中声明的属性，相当于`this.$attrs`如果 props 接收，attrs 里面没有值
-   父组件给子组件传值：

```js
// 父组件 省略引用注册
<Demo  msg="hello" school="尚硅谷"></Demo>
// 子组件 子组件中的template直接可以用msg
props: ['msg', 'school'],
// 在setup中的传值
setup(props){
	console.log(props)
	// 直接可以拿到值
	console.log(props.msg)
}

```

-   emit：分发自定义事件的函数，相当于`this.$emit`
-   子组件给父组件传值：

```js
// 父组件 中省略引用和注册
 <Demo @hobby="showHobbyMsg"></Demo>
//  父组件中触发自定义的事件，接收值
function showHobbyMsg(value) {
  alert(`你好啊，我得到的值${value}`);
}
// 子组件
<button @click="test">点击触发</button>
// 要声明触发的自定义事件
emits:['hobby']
// 子组件中触发自定义的函数
function test() {
	// 触发自定义的事件，传值
	context.emit('hobby', 999);
}
```

-   slots：收到插槽内容，相当于`this.$slots`

```js
// 没有名字的插槽，父组件中
<Demo>
	<span>slot传值</span>
</Demo>
// 子组件中
<template>
<slot></slot>
</template>

// 有名字的插槽
// 父组件红用template包裹   注意v-slot写的位置
<Demo >
   <template v-slot:divInfo>
    <div>防静电咖啡机啦</div>
  </template>
</Demo>
// 子组件中 用name
<slot name="divInfo"></slot>
```

## 计算属性

-   vue2 中的计算属性

```js
// template
<h2>全名：{{ fullName }}</h2>
// 计算属性
computed: {
    fullName() {
        return this.person.firstName + this.person.lastName;
    },
},
```

-   vue3 中的计算属性
-   引入组合式 APIcomputed

```js
// 计算属性的简写形式(没有考虑到计算属性被修改的情况)
<template>
    <div>一个人的信息</div>
    <h2>姓：<input type="text" v-model="person.firstName" /></h2>
    <h2>名：<input type="text" v-model="person.lastName" /></h2>
    <h2>全名：{{ fullName }}</h2>
</template>

<script>
import { reactive, computed } from 'vue';
export default {
    name: 'Demo',
    setup() {
        // 数据
        let person = reactive({
            firstName: '张',
            lastName: '三',
            age: 99,
        });

				// 完整形式
				  person.fullName = computed({
            get() {
                return person.firstName + '-' + person.lastName;
            },
            set(value) {
                console.log(value);
                let arr = value.split('-');
                console.log(arr);
                person.firstName = arr[0];
                person.lastName = arr[1];
            },
        });
        // 返回的是一个对象
        return {
            person,
            fullName,
        };
    },
};
</script>

// 进化部分  因为全名也是这个person这个对象身上的一个属性，所以，把计算属性放到person这个身上
// template
 <h2>全名：{{ person.fullName }}</h2>
//  computed
person.fullName = computed(() => {
  return person.firstName + person.lastName;
        });
// 返回的是一个对象
	return {
     person,
};
```

### 注意：

-   跟 Vue2 中的计算属性一致，有`get`和`set`两个属性，`get`:是进行一个数据的获取，`set`:是进行一个数据的设置

-   计算属性：是自动监听`依赖`值的变化，从而`动态返回`内容
-   在模板中直接写这个计算属性的函数

##

-   Vue2 中的监视

```js
// template
<h2>当前求和为：{{ sum }}</h2>
// 监视器
watch: {
// 立即监视
  mmedaite: true,
// 深度监视
  deep: true,
  sum: {
    handler(newValue, oldValue) {
        console.log(newValue, oldValue);
    },
  },
},
```

-   Vue3 中的监视`watch('需要监视的值',(newValue,oldValue)=>{},{监视的配置})`

```js
<template>
    <h2>当前求和为：{{ sum }}</h2>
    <button @click="increase">自增</button>
    <br />
    <h2>{{ msg }}</h2>
    <button @click="msgIncrease">加感叹号</button>
    <br />
    <h2>姓名:{{ person.name }}</h2>
    <h2>年龄:{{ person.age }}</h2>
    <h2>年龄:{{ person.job.jb.salary }}k</h2>
    <button @click="person.name += '~'">加姓名</button>
    <button @click="person.age++">加年龄</button>
    <button @click="person.job.jb.salary++">加薪水</button>
</template>

<script>
import { ref, reactive, watch } from 'vue';
export default {
    name: 'Demo',
    // watch: {
    //     // 立即监视
    //     immedaite: true,
    //     // 深度监视
    //     deep: true,
    //     sum: {
    //         handler(newValue, oldValue) {
    //             console.log(newValue, oldValue);
    //         },
    //     },
    // },
    setup() {
        let sum = ref(0);
        let msg = ref('你好');
        let person = reactive({
            name: '张三',
            age: 90,
            job: {
                jb: {
                    salary: 30,
                },
            },
        });

        function increase() {
            sum.value++;
        }
        function msgIncrease() {
            msg.value += '!';
        }
        // 情况一：监视ref所定义的一个响应式数据
        watch(sum, (newValue, oldValue) => {
            console.log(newValue, oldValue);
        });
        // 情况一：监视ref所定义的多个响应式数据
        // watch([sum, msg], (newValue, oldValue) => {
        //     console.log(newValue, oldValue);
        // });
        // 情况三：监视reactive所定义的一个响应式数据，全部属性
        // 注意：此处无法正确获取oldValue，无法正确获取
        // 注意：开启深度监视(deep)配置没有效果
        // watch(person, (newValue, oldValue) => {
        //     console.log(newValue, oldValue);
        // });
        // 情况四：监视reactive所定义的一个响应式数据中的某个属性
        // 注意：监视对象中的某个属性值`watch(()=>{return 对象中的某个属性},(newValue，oldValue)=>{})`
        // watch(
        //     () => {
        //         return person.age;
        //     },
        //     (newValue, oldValue) => {
        //         console.log(newValue, oldValue);
        //     }
        // );
        // 情况五：监视reactive所定义的一个响应式数据中的某些属性
        // watch(
        //     [
        //         () => {
        //             return person.name;
        //         },
        //         () => {
        //             return person.age;
        //         },
        //     ],
        //     (newValue, oldValue) => {
        //         console.log(newValue, oldValue);
        //     }
        // );
        // 情况六：监视多层次，需要用到deep，是起作用的
        watch(
            person.job,
            (newValue, oldValue) => {
                console.log(newValue, oldValue);
            },
            { deep: true }
        );
        return {
            sum,
            msg,
            person,
            increase,
            msgIncrease,
        };
    },
};
</script>
```

## watchEffect

-   不知道监视的谁，在 watchEffect 中调用那个值，就会监测出来
-   watch：要指明监视的属性，也要指明监视的回调
-   watchEffect：不用指明监视的那个属性，监视的回调中用到那个属性，就监视那个属性

```js
<template>
    <h2>当前求和为：{{ sum }}</h2>
    <button @click="increase">自增</button>
</template>

<script>
import { ref, watchEffect } from 'vue';
export default {
    name: 'Demo',

    setup() {
        let sum = ref(0);

        function increase() {
            sum.value++;
        }
        watchEffect(() => {
            const x1 = sum.value;
            console.log(x1);
        });

        return {
            sum,
            increase,
        };
    },
};
</script>
```

## 生命周期

-   Vue3 中没有`销毁`这个概念，取而代之的是`取消挂载`
-   通过配置项了解声明周期钩子函数

```js
// Demo.vue
<template>
    <h2>当前求和为：{{ sum }}</h2>
    <button @click="increase">自增</button>
</template>

<script>
import { ref } from 'vue';
export default {
    name: 'Demo',

    setup() {
        let sum = ref(0);

        function increase() {
            sum.value++;
        }

        return {
            sum,
            increase,
        };
    },
    // 通过配置项了解生命周期钩子函数
    // 数据初始化前后
    beforeCreate() {
        console.log('-----beforeCreate-----');
    },
    created() {
        console.log('-----created-----');
    },
    // 挂载前后
    beforeMount() {
        console.log('-----beforeMount-----');
    },
    mounted() {
        console.log('-----mounted-----');
    },
    // 数据更新前后
    beforeUpdate() {
        console.log('-----beforeUpdate-----');
    },
    updated() {
        console.log('-----updated-----');
    },
    // 卸载前后
    beforeUnmount() {
        console.log('-----beforeUmount-----');
    },
    unmounted() {
        console.log('-----unmounted-----');
    },
};
// App.vue
<template>
    <div>
        <button @click="vShowDemo = !vShowDemo">切换</button>
        <Demo v-if="vShowDemo"> </Demo>
    </div>
</template>

<script>
import Demo from './components/Demo.vue';
import { ref } from 'vue';
export default {
    components: {
        Demo,
    },
    setup() {
        let vShowDemo = ref(true);
        return {
            vShowDemo,
        };
    },
};
</script>
</script>
```

-   通过组合式 PAI 了解生命周期钩子函数(注意前两个的变化和所有书写的变化)
-   组合式 API 中注意 on 的写法
-   注意在 vue 中引入
-   beforeCreate ===> setup()
-   created ===> setup()
-   beforeMount ===> onBeforeMount()
-   mounted ===> onMounted()
-   beforeUpdate ===> onBeforeUpdate()
-   updated ===> onUpdated()
-   beforeUnmount===>onBeforeUnmount()
-   unmounted ===> onUnmounted()

```js
 setup() {
        let sum = ref(0);

        function increase() {
            sum.value++;
        }
        // 通过组合式API书写生命周期钩子，注意前两个的变化
        onBeforeMount(() => {
            console.log('---onBeforeMount---');
        });
        onMounted(() => {
            console.log('---onMounted---');
        });
        onBeforeUpdate(() => {
            console.log('---onBeforeUpdate---');
        });
        onUpdated(() => {
            console.log('---onUpdated---');
        });
        onBeforeUnmount(() => {
            console.log('---onBeforeUnmount---');
        });
        onUnmounted(() => {
            console.log('---onUnmounted---');
        });
        return {
            sum,
            increase,
        };
    },
	}
```

## 自定义 hook 函数

-   什么是 hook 函数？----本质是一个函数，把 setup 函数中使用的 Composition API 进行了封装
-   类似于 Vue2 中的`mixin`
-   自定义 hook 的优势：复用代码，让 setup 中的逻辑更清晰易懂
    ``js
-   hooks 函数，说白了就是把 setup 中的逻辑代码抽出来，然后，进行封装

```js
src / hooks / userPoint(hooks函数一般use开头`useXxxxx`);
// 需要引入用的东西
import { reactive, onMounted, onBeforeUnmount } from 'vue';

function savePoint() {
	// 实现鼠标打点功能
	// 数据
	let point = reactive({
		x: 0,
		y: 0,
	});
	// 方法
	function savePoint(event) {
		point.x = event.pageX;
		point.y = event.pageY;
		console.log(point.x, point.y);
	}
	// 钩子函数
	onMounted(() => {
		window.addEventListener('click', savePoint);
	});
	onBeforeUnmount(() => {
		window.removeEventListener('click', savePoint);
	});
	// 需要把定义的数据返回出去
	return point;
}
// 进行默认导出
export default savePoint;

// Demo进行引用
import usePoint from '../../hooks/usePoint';
// 调用这个函数 并接收hooks函数返回的数据
let point = usePoint();
// 进行返回这个数据
return {
	sum,
	point,
	increase,
};
// 在template中使用
<h2>当前点击鼠标的坐标为x:{{ point.x }}，y:{{ point.y }}</h2>
```

## toRef 和 toRefs

-   作用：创建一个 ref 对象，其 value 指向另一个对象中的某个属性
-   语法：`const name = toRef(person,'name')`
-   应用：要将响应式对象中的某个属性单独提供给外部使用时
-   扩展：`toRefs`与`toref`功能一致，但可以批量创建多个 ref 对象，语法：`torefs(person)`
-   toRef 是为了拆分对象中的个别属性，进行数据的`return`出去，，避免在 template 中进行拆解语法
-   但是得注意 toRef 的位置在 return 出去的对象中

```js
<template>
    <h4>{{ person }}</h4>
    <h2>姓名:{{ name }}</h2>
    <h2>年龄:{{ age }}</h2>
    <h2>年龄:{{ salary }}k</h2>
    <button @click="name += '~'">加姓名</button>
    <button @click="age++">加年龄</button>
    <button @click="salary++">加薪水</button>
    <h2>{{ name2 }}</h2>
</template>

<script>
import { reactive, toRef } from 'vue';
export default {
    name: 'Demo',
    setup() {
        let person = reactive({
            name: '张三',
            age: 90,
            job: {
                jb: {
                    salary: 30,
                },
            },
        });
        // 这个输出的是单单的字符串
        // const name1 = person.name;
        // console.log('name1', name1);
        // 这个输出的是ref对象，就会变成响应式的
        const name2 = toRef(person, 'name');
        console.log('name2', name2);
        return {
            person,
            name: toRef(person, 'name'),
            age: toRef(person, 'age'),
            salary: toRef(person.job.jb, 'salary'),
            name2,
        };
    },
};
</script>
```

-   toRefs 可以批量处理一个对象中的所有属性

```js
<template>
    <h4>{{ person }}</h4>
    <h2>姓名:{{ name }}</h2>
    <h2>年龄:{{ age }}</h2>
    <h2>年龄:{{ salary }}k</h2>
    <button @click="name += '~'">加姓名</button>
    <button @click="age++">加年龄</button>
    <button @click="salary++">加薪水</button>
    <h2>{{ name2 }}</h2>
</template>

<script>
import { reactive, toRefs } from 'vue';
export default {
    name: 'Demo',
    setup() {
        let person = reactive({
            name: '张三',
            age: 90,
            job: {
                jb: {
                    salary: 30,
                },
            },
        });
        const x = toRefs(person);
        console.log(x);

        return {
            ...toRefs(person),
        };
    },
};
</script>
```

## shallowReactive 和 shallowRef

-   shallowReactive：只处理对象最外层属性的响应式(浅响应式)，只处理第一层的响应式，更深层次的响应式不进行处理
-   shallowRef：只处理基本数据类型的响应式，不进行对象的响应式处理，如果是传入的基本类型和`ref`没有什么区别，但是传入的是对象类型，，那么不进行处理
-   什么时候用：
    -   如果有一个对象数据，结构比较深，但是变化的只是外层属性的变化=====》shallowReactive
    -   如果有一个对象数据，后续功能不会修改该对象中的数据，而是生新的对象来替换=====》shallowRef

```js
<template>
    <h4>{{ person }}</h4>
    <h2>姓名:{{ name }}</h2>
    <h2>年龄:{{ age }}</h2>
    <h2>年龄:{{ salary }}k</h2>
    <h2>当前的X{{ x }}</h2>
    <button @click="name += '~'">加姓名</button>
    <button @click="age++">加年龄</button>
    <button @click="salary++">加薪水</button>
    <button @click="x++">点击加X</button>
</template>

<script>
import { reactive, toRef, toRefs, ref, shallowReactive, shallowRef } from 'vue';
export default {
    name: 'Demo',
    setup() {
        // let x = shallowRef(0);
        // let person = shallowReactive({ 只考虑第一层的数据
        let person = reactive({
            name: '张三',
            age: 90,
            job: {
                jb: {
                    salary: 30,
                },
            },
        });

        return {
            x,
            person,
            name: toRef(person, 'name'),
            age: toRef(person, 'age'),
            salary: toRef(person.job.jb, 'salary'),
        };
    },
};
</script>
```

## readonly 和 shallowReadonly

-   readonly：让一个响应式数据变成只读(深只读)，就是别人的数据，你不能改，但是你想用改了的，就用这个 readonly
    `person= readonly(person)`把只读的属性，赋值给以个新的变量，就可以用了
-   shallowReadonly：让一个响应式变成只读的(浅只读)
-   应用场景：不希望数据被修改时

```js
<template>
    <h4>{{ person }}</h4>
    <h2>姓名:{{ name }}</h2>
    <h2>年龄:{{ age }}</h2>
    <h2>薪水:{{ salary }}k</h2>
    <h2>当前的X{{ x }}</h2>
    <button @click="name += '~'">加姓名</button>
    <button @click="age++">加年龄</button>
    <button @click="salary++">加薪水</button>
    <button @click="x++">点击加X</button>
</template>

<script>
import { reactive, toRef, ref, readonly, shallowReadonly } from 'vue';
export default {
    name: 'Demo',
    setup() {
        let x = ref(0);
        // let person = shallowReactive({ 只考虑第一层的数据
        let person = reactive({
            name: '张三',
            age: 90,
            job: {
                jb: {
                    salary: 30,
                },
            },
        });
        // person= readonly(person)
        person = shallowReadonly(person);

        return {
            x,
            person,
            name: toRef(person, 'name'),
            age: toRef(person, 'age'),
            salary: toRef(person.job.jb, 'salary'),
        };
    },
};
</script>
```

## toRaw 和 markRaw

-   toRaw：就是将一个`reactive`生成的响应式对象，转为普通对象，只能是 reactive 做成的对象，ref 的不行
-   使用场景：用于读取响应式对象对应的普通对象，对这个普通对象的所有操作，不会引起页面更新

-   markRaw：标记一个对象，使其不会永远成为一个响应式对象
-   使用场景：有些值不应该被设置成响应式，例如复杂的第三方库。当渲染具有不可变数据源的大列表的时候，跳过响应式转换可以提高性能
    https://www.bilibili.com/video/BV1Zy4y1K7SH?p=161&spm_id_from=pageDriver

## customRef

-   作用：创建一个自定义的 ref，并对其依赖项跟踪和更新触发进行显示控制
-   案例：官网案例，很经典，未听懂

## provide 和 inject

-   作用：实现`祖孙间数据传递`(跨级组件)
-   套路：父组件有一个`provide`选项来提供数据，子组件有一个`injct`选项来使用这些数据

```js
// 父组件
<template>
    <div class="app">
        <h3>我是App组件(祖)我的车叫：{{ name }}，价格：{{ price }}</h3>
        <Child></Child>
    </div>
</template>

<script>
import Child from './components/Child.vue';
import { reactive, toRefs, provide } from 'vue';
export default {
    name: 'App',
    components: {
        Child,
    },
    setup() {
        let car = reactive({
            name: '奔驰',
            price: '40W',
        });
        // 给自己的后代传递组件 provide('传递的名字'，传递的数据)
        provide('car', car);
        return {
            ...toRefs(car),
        };
    },
};
</script>

<style>
.app {
    background-color: aqua;
    padding: 10px;
}
</style>

// 后代组件
<template>
    <div class="son">
        <h3>我是Son组件(孙),{{ car.name }}---{{ car.price }}</h3>
    </div>
</template>

<script>
import { inject } from 'vue';
export default {
    name: 'Son',
    setup() {
        let car = inject('car');
        // console.log('car', car.name, car.price);
        return {
            car,
        };
    },
};
</script>

<style>
.son {
    background-color: salmon;
    padding: 10px;
}
</style>
```

## 响应式数据的判断

-   ifRef:检查一个值是否为一个 ref 对象
-   isReactive:检查一个对象是否是由 reactive 创建的响应式代理
-   isReadonly：检查一个对象是否由 readonly 创建的只读代理
-   iProxy：检查一个对象是否是由 reactive 或者 readonly 方法创建的代理
-   返回 boolean

## 新的组件

-   Fragment

    1. 在 vue2 中：组件必须有一个根标签
    2. 在 vue3 中：组件可以没有跟标签，内部会将多个标签包含在一个 Fragment 虚拟的元素中
    3. 好处：减少标签层级，减少内存占用

-   Teleport
    1. 什么是 Teleport？---- 是一种能够将我们的`组件html结构`移动到指定位置的技术
    2. 用 eleport 包裹的整个`html`可以随便实现定位到那个元素中，不需要使用定位就可以实现
    3. <teleport to="直接可以写元素">。。。</teleport>

```js
<teleport to="body">
    <h4>{{ person }}</h4>
    <h2>姓名:{{ name }}</h2>
    <h2>年龄:{{ age }}</h2>
    <h2>年龄:{{ salary }}k</h2>
    <h2>当前的X{{ x }}</h2>
    <button @click="name += '~'">加姓名</button>
    <button @click="age++">加年龄</button>
    <button @click="salary++">加薪水</button>
    <button @click="x++">点击加X</button>
</teleport>
```

-   Suspense
    1. 没有听懂

## Vue3 中的调整

-   全局 API 的改变从`Vue.config.xxx/Vue.use/Vue.prototype...`变成`app.config.xxx/app.use/app.config.globalProperties`

-   data 必须是个函数
-   移除 keyCode 作为 v-on 的修饰符，同时也不在支持 congig.keyCodes
-   移除 v-on.native 修饰符
-   移除过滤器 filter
-   Vue3 地址：https://www.bilibili.com/video/BV1Zy4y1K7SH?p=136
