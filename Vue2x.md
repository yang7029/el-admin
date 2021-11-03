# Vuex 状态管理

-   Vuex 是一个专门为 Vue.js 应用程序开发的`状态管理模式`，它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式变化
-   Vue 应用中的每个组件在 data()中封装这自己的数据属性，而这些属性都是私有的，完全隔离的，Vuex 中，属性的声明式共享式的，相互依赖的方式，在多个组件中使用同一个值，简单的方式是用 Vuex 进行集中管理，而不是用组件通信的方式，组件通信的方式对于多层传递不太友好
-   如果我们希望多个组件都能读取到同一状态数据属性，或者不同组件的行为需要更新同一状态数据属性，这就需要一个将共享的状态数据属性进行集中式的管理
-   以上三点就是 Vuex 状态管理所要解决的问题

## 存放状态的地方(state)

-   直接在脚手架中配置`vuex`
-   vuex 的书写规范
    1. 引入 vue 和 vuex
    2. 使用成 vue 的插件
    3. 创建 store
    4. 导出
    5. 在 main.js 中使用
    6. 在 vue 实例中进行注册
-   `state`：就是存放状态的地方，全局就可以进行使用`$store.state.xxxxx`

```js
// 引入 vue 和 vuex
import Vue from 'vue';
import Vuex from 'vuex';

// 使用成 vue 的插件
Vue.use(Vuex);

// 创建 store
const store = new Vuex.Store({
	state: {
		// 存放状态的地方
		count: 1,
	},
});

// 导出
export default store;

// 在 main.js 中使用
import store from './store';

// 在 vue 实例中进行注册
new Vue({
	router,
	store,
	render: h => h(App),
}).$mount('#app');

// 在项目中使用属性
<template>
	<div>
  count:{{ $store.state.count }}
  </div>
</template>;
```

## 改变状态值的地方(mutation)

-   在 store 的 `mutations` 选项中定义方法，才可以改变值的状态
-   在通过`this.$store.commit('mutationName')`触发状态值的改变

```js


const store = new Vuex.Store({
	state: {
		count: 1,
	},
// 在mutations中定义改变状态的函数    需要把改变的 状态 传递到函数中
	mutations: {
		increase(state) {
			state.count++;
		},
	},
});

<template>
    //直接使用vuex    $store.state.count
    <div>
        count:{{ $store.state.count }}

        // 定义需要这个button触发的函数
        <button @click="addcount">加法</button>
    </div>
</template>

<script>
export default {
  methods:{
    addcount(){
      // 在这个函数中触发`mutations`中改变状态的函数
      console.log('this.$store.state.count')
      this.$store.commit('increase')
    }
  }
}
</script>
```

## 提交载荷(paylod)

-   你可以向`this.$store.commit('mutationsName')`传入额外的参数，即`mutation`的载荷`payload`

## 操作复杂逻辑的地方(Action)

-   `Action`是操作复杂逻辑的地方，`mutation`是给`state`进行一个简单的赋值
-   `Action`和`mutation`的不同之处：

    1. Action 提交到的是 mutation，而不是在组件中直接变更状态，通过提交到 mutation 间接的更新 state
    2. 在组件中通过`this.$store.dispatch('actionName')`触发状态值，间接改变
    3. Action 也支持载荷
    4. Action 可以包含任何异步的操作

-   第一种触发方式：根据上下文，直接用 `context.commit('nutationsName')`

```js
// 在action中触发mutation中的函数
	actions: {
    // context：是根据上下文的意思，我也不知道怎么搞，但是，就是这样用的    如果传过来的载荷在action和mutation中的函数都不接收可以运行，但是，只要一方接收了，一方没接收，就会报错   action中也可以进行传递载荷
		add(context, n) {
			context.commit('increase', n);
		},
	},
// 在组件中触发action
addcount() {
            // console.log(this.$store.state.count);
            // this.$store.commit('increase', 10);
            this.$store.dispatch('add', 5);
        },
```

-   第二种触发方式：按需传入`{commit,state}` commit:意思是，直接进行触发 mutations 中的函数`commit('mutationsName')` state:直接可以拿到 state 中的值 他俩是用对象包裹起来的

```js
actions:{
  add({commit,state}){
    console.log(state.count)
    commit('increase',n)
  }
}
```

## 派生属性 (getter)

-   有时候我们需要从 store 中的 state 中派生出一些状态
-   getter 类似于计算属性的 get 对象
-   组件中读取`$store.getters.xxxxx`
-   案例：

```js
	// 派生成属性getters
	getters: {
		desc(state) {
			if (state.count < 50) {
				return '吃饭';
			} else if (state.count < 100) {
				return '睡觉';
			} else {
				return '打豆豆';
			}
		},
	},

// getters：派生属性测试
  <input type="text" v-model="$store.getters.desc" />
```

## 模块(module)

-   由于使用单一状态树，应用的所有状态会集中到一个比较大的对象
-   当应用变得非常的复杂的时候，store 对象就有可能变得非常的臃肿
-   为了解决以上问题，Vuex 允许我们将 store 分割成模块(module)
-   每个模块都拥有自己的 state，mutation，action，getter 等
-   代码模型：

```js
const moduleA = {
  state:{...},
  mutations:{...},
  actions:{...},
  getters:{...}
}

const moduleB = {
  state:{...},
  mutations:{...},
  actions:{...},
  getters:{...}
}

const store = new Vuex.Store({
  modules:{
    a:moduleA
    b:moduleB
  }
})

// 只是获取的状态变了，别的mutation，action，getter，没有变，不需要加
store.state.a.xxx   // -> moduleA的状态
store.state.b.xxx   // -> moduleB的状态
    <div>
        <!-- count:{{ $store.state.count }} -->
        count:{{ $store.state.home.count }}
        <button @click="addcount">加法</button>
        <button @click="inccount">减法</button>
        getters：派生属性测试
        <input type="text" v-model="$store.getters.desc" />
    </div>
```

## 标准项目结构

-   如果所有的状态都写在一个 js 文件中，这个 js 必定会很臃肿，Vuex 并不是限制你的代码结构，但是它建议你按照以下代码结构来构建项目结构

```js
_____________________
|---- index.html
|---- main.js
|---- api
  |---- ...  // 抽取出来的api
|---- components
  |---- App.vue
  |---- ...
|---- store
  |---- index.js          # 组装模块并导出 store 的地方
  |---- action.js         # 跟级别的 action       比较通用的actions需要用到的
  |---- mutations.js      # 跟级别的mutation
  |---- modules
    |---- cart.js         # 购物车模块             如果只是某个模块使用，那么久放到modules中
    |---- product.js      # 产品模块
_________________________
```

-   项目结构拆分

`store/modules/home.js`

```js
const state = {},
const getters = {},
const mutations = {},
const actions = {}

export default {
  state,
  getters,
  mutations,
  actions
}

`store/index.js`

import Vue from 'vue';
import Vuex from 'vuex';
import home from './modules/home';
import goods from './modules/goods';

Vue.use(Vuex);

const store = new Vuex.Store({
	modules: {
		home,
		goods,
	},
});

export default store;
通过这样分开写，能有有效的避免错误，这样的话在映入modules的时候，能够有效的避免错误`$store.state.模块名.属性值`   模块名就是Vuex中的模块名(home，goods)，是从别的地方引入的
```

## 注意

-   在`mutations`中，如果要改变状态的值，可以不用传递`state`，直接使用`this.state.xxxxx`

```js
	mutations: {
		increase(state) {
			state.count++;
		},
		subtraction() {
			this.state.count--;
		},
	},
```

-   注意`提交载荷`传递过来的值，必须第一位是`state`

```js
// 传递载荷
    addcount() {
      console.log(this.$store.state.count);
      this.$store.commit('increase', 10);
    },
// 处理接收过来的载荷
		increase(state, n) {
			// state.count++;
			state.count += n;
		},
// 错误的演示
  	increase(n) {
			this.state.count += n;    //  错误
		},
```

-   当你在某个组件中改变了值，但是又在别的组件中引用了这个属性，在别的组件中引用的这个值也会变化

-   在 template 模板中不需要带上`this`，而是直接使用`$store.state.xxxx`

-   在`methods`的函数中需要带上`this`，使用`this.$store.state.count`

-   Vuex 只在路由切换的时候能够保留数据，但是浏览器属性之后，数据是不会保留的，要通过 localStorage(需要手动清空)和 sessionStorage(关闭浏览器的时候清空) 进行保存
