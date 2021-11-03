# 后台管理项目整理

## 项目的搭建

-   通过 vue create 进行项目的初始化，其中在项目的搭建时，需要注意把`所有的配置文件`进行独立化

-   注意 package.json 中`文件名`不能重复，否则会报错，name 的值注意，如下：

    ```json
    {
      "name": "el-admin",
      "version": "0.1.0",
      "private": true,
      "scripts": {
        "serve": "vue-cli-service serve",
        "build": "vue-cli-service build",
        "lint": "vue-cli-service lint"
      },
      ........
    }
    ```

## axios 的封装

-   在项目中经常会用到 axios 或者是 fetch，来作为请求后端数据接口的工具

-   在项目中，我们一边会用到的方式是吧 axios 挂载到 vue 原型上，但是这样扩展性不强，所以用到的方式是，创建 axios 对象，这样扩展性更强

-   axios 是一个工具，对于一个工具，也可以看做是一个公共使用的方法，在项目中，`公共的方法一般封装在util文件夹下`

-   对于一个工具的使用，第一步往往是下载`npm install axios`

    ```js
    import axios from 'axios'
    //创建axios对象  并且把这个axios对象返回出去，在外面进行调用
    const request = axios.create({
      //请求访问的基地址
      baseURL:'/'
      //请求超时的时间
      timeout: 5000
    })
    //导出这个方法
    export default request
    ```

## api 接口的调试

-   在项目中会用到`请求和数据相分离`的模式，所以需要把每个请求接口都需要定义出来，在单组件中进行数据的操作

-   `在每个项目调用接口之前，必须先测通接口`

-   在一个项目中，根据划分的模块来来定义接口函数，并且引用的时候，也是通过导出函数的方式进行引用，具体的代码如下：

    ```js
    //这个@符号是根目录的意思，注意@后面的斜杠路径
    import request from '@/utils/request.js'

    //导出函数，不是导出默认值
    export function login (username,password){
      //返回这个请求回台的方法,并且在函数中使用
      return request({
        method:'post'
        url:'/user/login'
        data:{
        username   //这种写法是es6写法
        password
      }
      })
    }
    ```

-   在组件中进行引用的方式：

    ```js
    import { logout } from '@/api/login.js';
    logout(传值).then(response => {
    	console.log(response);
    });
    ```

## vue.config.js 配置

-   在 vue.config.js 中都是开发配置，方便开发人员进行开发

-   这个文件中最主要的配置就是`开发阶段的代理配置`

    ```js
    module.exports ={
      devServer:{
        port:8888   //端口号
        host:'localhost'  //主机名
        https:true  //是否开启https
        open: true //在开发环境是否打开浏览器
      }
      lintOnSave:false //关闭代码格式检查eslint
      productionSourceMap:false   //生产环境是否打包 .map文件   不打包 .map文件可以加快打包速度
    }
    ```

### `开发阶段代理配置`

-   代理只在开发环境产生

-   代理产生的原因：浏览器的同源策略，是浏览器限制了请求，所以产生了代理，服务器和服务器之间是没有跨域的问题

-   `同源策略`：协议(http/https)，域名(www.baidu.com .com 就是域名)，端口(http://localhost:8888 后面的 88888)，相同

    ```js
    //最基础的代理配置：
    moule.exports ={
      devServer:{
        ......
        //代理设置
         proxy:{
          //代理的前缀
           '/dev-api:{
           //代理的目标服务器地址
             target:'http://localhost:8001'
           //开启代理服务
           changeOrigin:true
           //当没有以/dev-api开头的前缀地址时，那么代理设置为空
           pathRewrite:{
           '^/dev-api': '  '
         }
           }
         }
      }
    }
    ```

### `开发阶段代理配置升级版`

-   在项目中经常会见到`.env.development`和`env.production`这两个文件，具体讲解如下：

-   `.env.development`:这个文件都是生产环境配置

    ```js
    //配置生产环境的前缀
    VUE_APP_BASE_API = '/pro-api';
    ```

-   `.env.development`:这个文件的配置项都是开发环境的配置

    ```js
    //   只有已  VUE_APP_XXX开头的变量会被  webpack  静态嵌入到项目中使用，process.env.VUE_APP_XXX

    //配置开发环境低地址
    VUE_APP_SERVER_URL = 'https://mock.mengxuegu.com/mock/6107c28df1fafb4ac82859f4';

    //配置开发环境代理前缀
    VUE_APP_BASE_API = '/dev-api';
    ```

### `vue.config.js和request.js中升级配置`

```js
//vue.config.js配置
module.exports ={
  devServer:{
    port:8888
    host:'localhost'
    https:true
    open:true
    proxy:{
    [process.env.VUE_APP_BASE_API]:{
    target:process.env.VUE_APP_SERVER_URL
    changeOrigin: true
    pathRewrite:{
    ['^' + process.env.VUE_APP_BASE_API]: '  '
}
  }
  }
  }
lintOsave:false
productionSourceMap:false
}
```

```js
// request.js 中的配置
import axios from 'axios'
const request = axios.create({
  //这儿得仔细斟酌一下，没弄懂
  baseURL:process.env.VUE_APP_BASE_API
  timeout:5000

 //请求拦截器和响应拦截器的配置

 // 请求拦截器
  request.interceptors.request.use(
  config =>{
  //请求成功的回调函数   必须把这个成功的值返回出去
  return config
},error  => {
  return promise.reject(error)
}
  )

//响应拦截器
request.interceptors.response.use(
  response =>{
    return response
  },
  error =>{
    return promise.reject(error)
  }
)
})

export default request
```

## Element-ui 的使用和配置

-   这个项目采用的是 element-ui 组件库，视频中，采用的是全部引入的方式，但是，在工作中，我们一般用到的是`按需引入`，并且下载这个组件库`npm i element-ui -S`，还有对应的插件名称: `Element UI Snippets`，我们引入在`main.js`，作为全局的来使用，中按需引入如下：

    ```js
    import {Form, FormItem,......} from 'element-ui'

    //注册组件的方式，这样不注册组件的话，报错。。。。。。
    Vue.use(Form)
    Vue.use(FormItem)
    .......
    ```

-   `按需引入`对于项目来说是可以减少体积，但是，对于开发者来说，却不友好，这个不友好的点就是配置，而那个`采坑点`也在于`配置`，在哪里配置(babel.config.js/.babelrc)，怎么配置，是关键，下面直接上代码：

    ```js
    module.exports = {
    	presets: ['@vue/cli-plugin-babel/preset', ['@babel/preset-env', { modules: false }]],
    	plugins: [
    		[
    			'component',
    			{
    				libraryName: 'element-ui',
    				styleLibraryName: 'theme-chalk',
    			},
    		],
    	],
    };
    ```

-   上面一段中提到了`babel.config.js`和`.babelrc`这两个文件，具体参考

    [两者的区别]: :https://blog.csdn.net/weixin_45151873/article/details/118572216?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522162874881816780271541230%2522%252C%2522s

-   通过上述操作，在不引入 css 样式的情况下，按需引入就 ok 了
-   在上述的经验中，我们一般采用的方式`百度(csdn)`和`文档`

## 系统登录管理

-   `src/login/index.vue`在登录页面，一般用到的是`form`表单，因为`form`表单有自动验证的功能

-   `form`表单的几个常用的几个属性，需要了解：

    ```js
    model: 表单的数据对象(动态绑定表单的整个值，需要在data中声明)
    rules: 整个表单的校验规则(动态绑定校验规则，需要在data中声明)
    ref: 获取改表单的form组件(我们经常会用到   `this.$refs`  来获取表单元素，这个值的功能就在这个地方使用)
    prop: 绑定每个表单的规则，这个方法在<el-form-item>中使用
    valid: 每个必填表单项都是true，否则为false
    ```

-   可以在`<el-input>`中更改表单属性，用`type`这个类型，可以把 input 框变成想要的类型，`rules`绑定的这个规则里面的属性，需要介绍三个：

    ```js
    required: 必填项;
    message: 提示信息;
    trigger: 对应的事件(一般是blur);
    // 当上面配置好后，在输入用户名和密码并且失去焦点的时候，会自动校验
    ```

-   在点击`登录`按钮时，会把`ref`绑定的值，进行传递，那么久需要用到`this.$refs`获取表单组件，具体代码：

    ```js
    submitForm(frrname){
      this.$refs[formname].valitaed(valid =>{
        console.log(valid) //这个值是true，那么久获取到了表单

      ......
    ```

    //后面需要走业务逻辑

    ......
    })
    }

    ```

    ```

-   `采坑：message消息提示这个组件是挂载在vue原型上`代码：

    ```js
    // 前面记得引用
    Vue.prototype.$message = Message;
    ```

-   `接口调用`：在调试接口的时候说过，每一个模块就是一个文件夹，所以在项目中，有关所有的登录模块的都是一个文件夹，这也符合单文件组件的思想，在`src/api/login.js`接口中，我们需要这这个文件下调用接口，在组件中处理`数据和业务逻辑`接口调用如下：

    ```js
    //调用接口
    inport {getUserInfo, login} from '@/api/login.js'

    //使用接口

    created:{
      //一般我们不在created中进行业务逻辑的书写，当有需求的时候，我们在methods中进行书写业务代码，在created中进行调用函数
      this.getUserInfo()
    }
    methods:{
      getUserInfo().then(response =>{
        console.log(response)
      })
    }
    ```

## 布局页面

-   `src/components/Layout.vue`在这个页面进行布局展示，但是在布局的时候，得思考一个问题：为什么不放在`src/wiews/xxxxx`下呢？而是放在了`src/components/xxxxx`,，按照我的理解就是，路由组件放在`views`下，公共组件放在`components`下，登录的组件就放在了路由组件下

-   布局组件当然也可以拆封成若干个小组件，这样便于维护，一般拆成若干个小组件，代码如下：

    ```js
    <template>
      // 从这个注册的组件中就能看明白这个是分成了头部，左边导航栏，和主要展示区域三部分
        <div>
            <app-header></app-header>
            <app-navbar></app-navbar>
            <app-main></app-main>
        </div>
    </template>

    <script>
    import AppHeader from './AppHeader';
    import AppNavbar from './AppNavbar';
    import AppMain from './AppMain';

    export default {
        // 组件注册：注册组件的时候，可以用驼峰命名，但是写组件的时候，不能用驼峰命名，需要用到短横线链接
        components: { AppHeader, AppNavbar, AppMain },
    };
    </script>
    ```

-   在上述代码中自己的感觉是`注册组件`的时候出现的，`组件注册错误和路由组件和公共组件之间的区分`

## 页面布局-头部(header)

-   `src/components/AppHeader/index.vue`在头部布局中，常用的标题和和项目的 logo 就不过多介绍，主要介绍的是`下拉菜单组件`

-   目前只写了退出功能，在退出功能中需要注意的是`<el-dropdown command = 'a'>`这个`command`代表了指令，而这个指令是区分是`退出登录还是修改密码`，在这儿，这个`command`的值`a/b`配合`switch`循环语句有了非常大的作用，通过这个`a`和`b`就能进入不同的循环语句执行不同的代码，具体代码：

    ```js
     methods: {
            handleCommand(command) {
                // this.$message('click on item ' + command);
                console.log(command);
                switch (command) {
                    case 'a':
                        this.$message('修改密码');
                        break;
                    case 'b':
                        logout(localStorage.getItem('el-admin-token')).then(response => {
                            // console.log(response.data);
                            const resp = response.data;
                            if (resp.flag) {
                                localStorage.removeItem('el-admin-token');
                                localStorage.removeItem('el-admin-user');
                                this.$router.push('/login');
                            } else {
                                this.$message({
                                    message: '退出失败，请再次尝试',
                                    type: 'warning',
                                });
                            }
                        });
                        break;
                    default:
                        break;
                }
            },
        },
    ```

-   目前功能未完善，需要后面补充

## 页面布局-左导航栏(navbar)

-   `src/components/AppNavbar`在左导航栏中，采用组件的形式（navMenv），进行导航栏的布局，在左导航栏中需要注意的点是`激活路由，默认的路径获取方式，路由的设置方式(index：设置路由的字段)`具体直接上代码：

    ```js
           <!-- :router="true" 需要激活路由，但是直接写不动态绑定是无效的路由     默认的路径需要用 default-active='$route.path'    默认的’/‘会出现刷新之后回到首页-->
            <el-menu :default-active="$route.path" :router="true" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
                <el-menu-item index="/home">
                    <i class="el-icon-menu"></i>
                    <span slot="title">首页</span>
                </el-menu-item>
                <el-menu-item index="/member/">
                    <i class="el-icon-coin"></i>
                    <span slot="title">会员管理</span>
                </el-menu-item>
                <el-menu-item index="/supplier/">
                    <i class="el-icon-s-check"></i>
                    <span slot="title">供应商管理</span>
                </el-menu-item>
                <el-menu-item index="/goods/">
                    <i class="el-icon-sell"></i>
                    <span slot="title">商品管理</span>
                </el-menu-item>
                <!-- /staff/      后面的这个 / 是和路由配置的匹配，不然会和路由不匹配，会丢失 -->
                <el-menu-item index="/staff/">
                    <i class="el-icon-s-custom"></i>
                    <span slot="title">员工管理</span>
                </el-menu-item>
            </el-menu>
    ```

-   在上述的代码中，犯的致命的错误就是，默认获取的路径写死成`/`，这样导致在页面刷新的时候，路由没有动态的获取，而是进行了，默认重置

-   在上述代码中，动态获取路由的方式`$toute.path`和激活路由的方式是`需要动态的绑定`路由设置成`true`

-   左导航组件中激活的路由和本人设置的路由如何进行统一展示的问题，需要注意的点是：`index="/member/"`

## 页面布局-主页面(main)

-   `主页面展示部分`：

    -   `src/views/home|member|supplier|goods|staff`分别建立对应的主页面，具体代码：

        ```js
        <template>
            <div>员工管理</div>
        </template>

        <script>
        export default {};
        </script>

        <style>
        </style>
        ```

-   `主页面路由的配置`：

    -   `src/router/index.js`进行路由的配置，路由的配置中会有`path：路径 component:组件名 name:路由名子 redirect:重定向 children:[子路由] meta:{meta是个对象，简称路由员信息 案例：title：'员工管理'}`具体代码：

        ```js
        import Vue from 'vue';
        import VueRouter from 'vue-router';
        // import Login from '@/views/login/index.vue';
        // 会默认的加载login下面的index.vue文件
        import Login from '@/views/login';
        import Layout from '@/components/Layout.vue';
        import Home from '@/views/home/index.vue';
        Vue.use(VueRouter);

        const children = [
        	{
        		path: '/home',
        		name: 'home',
        		component: Home,
        		meta: { title: '首页' },
        	},
        	{
        		path: '/member/',
        		name: 'member',
        		component: Member,
        		meta: { title: '会员管理' },
        	},
        ];

        const router = new VueRouter({
        	// mode: 'history', //这是判断浏览器里面有没有 # :    #代表哈希
        	base: process.env.BASE_URL,
        	routes,
        });

        export default router;
        ```

-   `导航栏和配置路由对应`在前面的左边导航栏中进行激活路由，动态的进行路由获取，当`主页面main`配置了路由之后，需要和左导航栏进行路由的匹配，进行正确的匹配之后，才能正确的显示对应的`主页面main`

-   `主页面公共头部展示区域`:

    -   `src/components/AppMain/index.vue | link.vue`这个里面需要注意的是`router-view`暴露的出口

    -   `link.vue`:这个文档里面需要用到面包屑，在面包屑中需要动态的展示各个页面的名字，这个名字获取的方式在`路由员中进行设置和获取(meta)`获取的代码`{{$route.meta.title}}`前面已经设置了这个 title，现在直接进行获取展示

    -   这个面包屑中有一个`to`属性，`是路由跳转的对象`，和`meta`是一一对应的，当跳转到某个页面时，某个页面显示对应的`meta`具体代码：

        ```js
        <template>
            <el-breadcrumb separator="/">
                <!-- 此处用的是路由元信息 -->
                <el-breadcrumb-item class="line" :to="{ path: $route.path }">{{ $route.meta.title }}</el-breadcrumb-item>
            </el-breadcrumb>
        </template>

        <script>
        export default {};
        </script>

        <style>
        .el-breadcrumb {
            height: 10px;
            padding: 20px;
            border-radius: 4px;
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        }
        .line {
            border-left: 3px solid #31c17b;
            padding-left: 10px;
        }
        </style>

        ```

    -   `index.vue`在这个文档中进行组件的注册，并判断当 home 页时，不显示面包屑，根据动态获取的路由来判断

        ```js
        <template>
            <div class="main">
                <!-- v-show 在此处写的原因是先加载到home页面，已经判断完成了，但是后面的link是还没有执行，写入到引入的link组件里面，会重新加载一遍 -->
                <app-link v-show="$route.path !== '/home'"></app-link>
                <router-view></router-view>
            </div>
        </template>

        <script>
        import AppLink from './Link.vue';
        export default {
            components: {
                AppLink,
            },
        };
        </script>

        <style>
        </style>
        ```

        -   在上述代码中，看到`<router-view></router-view>`路由暴露的出口(这是配置路由暴露出口位置)，具体怎么区分组件暴露的出口，自己查找答案和`App.vue`中暴露的进行区分

## 权限校验

`src/permission.js`中进行权限的校验，可以看出这个文件夹位置的特殊性，路由权限验证，一般用到的前置钩子函数`beforeEach(to,from,next)=> {.....}`分为以下几种情况：

1. 没有获取到 token

2. 没有获取到 token

    2.1 去 login 页还是不去 login 页，具体代码：(记得在 main 中引用)

    ```js
    /**
     *
     *
     * 路由权限验证权限验证：
     * Vue Router 中有前置钩子函数beforeEach(to, from, next =>{})
     * 在路由跳转之前进行判断，是否登录，登录过，访问非登录页面，没有登录过，不能访问非登录页面，回到登录页
     *
     * to：要去的目标地址
     * from：要离开的目标地址
     * next：是一个方法，可以指定路由地址，进行路由跳转，也可以是一个对象，指定跳转的对象
     *
     *
     **/

    import router from './router/index';
    import { getUserInfo } from './api/login';
    router.beforeEach((to, from, next) => {
    	const token = localStorage.getItem('el-admin-token');
    	console.log(token);
    	if (!token) {
    		// 没有获取到token，判断一下是不是去到login页面。 去到的页面不是login页面，就让他去到login页面，如果去到的是login页面，直接next()
    		if (to.path !== '/login') {
    			next({ path: '/login' });
    		} else {
    			next();
    		}
    	} else {
    		// 获取到token，判断一下是不是去到login页面，，如果是去到login页面，直接next()，否则
    		if (to.path === '/login') {
    			next();
    		} else {
    			// 如果是到别的页面，那么就需要token进行获取用户信息
    			getUserInfo(token).then(response => {
    				const resp = response.data;
    				if (resp.flag) {
    					localStorage.setItem('el-admin-user', JSON.stringify(resp.data));
    					next();
    				} else {
    					next({ path: '/login' });
    				}
    			});
    		}
    	}
    });
    ```

## 会员管理

`/src/views/member/index.vue`

-   `表格`中需要注意的点是，`:data`是个数组，是从后台返回的值，通过双向绑定到`el-table`上，`prop`，prop 属性来对应对象中的键名就可以填入每行数据，`label`用来定义表格的列名，`width`用来定义表格的宽度

```js
// 表格
 <el-table :data="list" style="width: 100%" border>
    <el-table-column type="index" label="序号" width="60"> </el-table-column>
    <el-table-column prop="cardNum" label="会员卡号"> </el-table-column>
    <el-table-column prop="name" label="会员姓名"> </el-table-column>
</el-table>
```

-   `编辑删除操作`需要用到模板对象`template`

```js
<el-table-column label="操作">
                <template slot-scope="scope">
                    <!-- 用scope.row的话可以可以获取到没行的数据，就是list中的每个对象 -->
                    <el-button size="mini" @click="handleEdit(scope.row.id)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.row.id, scope.row)">删除</el-button>
                </template>
            </el-table-column>
```

    1.`编辑按钮`：需要调用的是和`新增按钮`同一个表单，表单弹出之后，通过`id`进行传到后端，响应回来数据，然后在进行数据的`回显`，在编辑中，需要注意的是`前端表单的校验`通过`rules`进行校验

```js
  rules: {
                cardNum: [{ required: true, message: '卡号不能为空', trigger: 'blur' }],
                name: [{ required: true, message: '姓名不能为空', trigger: 'blur' }],
                payType: [{ required: true, message: '支付类型不能为空', trigger: 'change' }],
            },
```

    2.`删除按钮`：是通过`id`进行删除，然后进行数据的更新

-   `分页功能`详解

    1. `@size-change="handleSizeChange"`：每页显示的`总条数`改变的时候会触发的函数(每页显示的条数)
    2. `@current-change="handleCurrentChange"`：`当前页`面改变的时候触发的函数(就是从一页面条到二页面触发的函数)
    3. `:current-page="currentPage"`：表示当前页面显示的是第几页面
    4. `:page-sizes="[10, 20, 30, 50]"`：表示当前也可供选择的条数(每个页面显示多少条数据)
    5. `:page-size="pageSize"`：默认显示的条数为十条
    6. `layout="total, sizes, prev, pager, next, jumper"`：分页布局的几个按钮
    7. `:total="total"`：总的条数

```js
 <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
```

`handleSizeChange`：如果当前页面条数进行改变之后，需要重新对页面中的当前页条数赋值，重新调用 table 数据渲染的这个函数，重新请求数据，进行渲染
`handleCurrentChange`：当前页面改变之后，需要重新对页面中的当前页赋值，重新调用 table 数据渲染这个函数，重新请求数据，进行渲染

-   `条件查询`：条件查询中需要注意的是表单中的数据双向绑定`:model=“searchMap”`是个对象，每一项中需要通过表单中的数据双向绑定其属性值`v-model="searchMap.xxxxx"`,`:inline=true`表示在一行显示，`ref`：是整个表单的名字

```js
 <el-form ref="searchForm" :inline="true" :model="searchMap" class="demo-form-inline" style="margin-top: 20px">
            <el-form-item prop="cardNum">
                <el-input v-model="searchMap.cardNum" placeholder="会员卡号" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item prop="cname">
                <el-input v-model="searchMap.cname" placeholder="会员名称" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item prop="payType">
                <el-select v-model="searchMap.payType" placeholder="支付类型" style="width: 200px">
                    <!-- payTypeOptions：这个数据不是data中的数据，会报错，需要变成data中的数据    :value：表示要提交的值，但是显示的是name -->
                    <el-option v-for="option in payTypeOptions" :key="option.type" :label="option.name" :value="option.type"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="birthday">
                <!-- value-format:绑定日期的格式 -->
                <el-date-picker value-format="yyyy-MM-dd" v-model="searchMap.birthday" type="date" placeholder="选择日期" style="width: 200px"> </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="fetchData">查询</el-button>
                <el-button type="primary" @click="handleAdd">新增</el-button>
                <el-button @click="resetForm('searchForm')">重置</el-button>
            </el-form-item>
        </el-form>
```

-   `查询按钮`：查询按钮，需要的是把需要查询的值进行传递，传递到后台，进行数据的过滤展示

-   `新增按钮`：新增按钮中，会出现一个新增的表单，当然这个表单刚开始是隐藏的，通过`false`和`true`进行控制`this.dialogFormVisible = true`，
    `有一个重要的问题`：当每次新增完成后和别的操作后，需要进行清空，当下次进行新增的时候，表格处于一个全新的状态，这个全新的状态是(上次的值进行清空)
    `解决上述问题的两种方式：` 1. 就是把弹出来的表格中进行数据双向绑定的对象值变成空对象 2.就是使用异步事件`this.$nextTick=(() =>{})`当弹出来的表单渲染结束后，才会执行这个异步函数的回调，正常的逻辑是弹出窗口后，需要加载 dom，，应该加载完成之后，进行调用方法进行数据清空，需要找到这个表单的名字（注意区分传递接收过来的值和，找到这个表单的名字）

```js
handleAdd() {
            this.dialogFormVisible = true;
            // 下面用this.$nextTick表单输入不上内容，两种解决方案。一种是把pojo直接清空，一种是给每个item添加prop属性
            // this.pojo = {};
            // // 异步事件，当表单渲染结束之后，它里面的回调函数才会执行，弹出窗口后，需要加载dom应该等待他加载完dom之后，在进行调用resetFields方法，进行重置表单和清除样式
            this.$nextTick(() => {
                //     // 这个是写死的pojoForm
                this.$refs['pojoForm'].resetFields();
            });
        },
```

-   `重置按钮`：重置的是整个查询功能中的表单，需要把表单名字从`template`中进行传递过来，重置的每一项必须要有`prop=“xxxxx”`否则会重置不了

```js
 resetForm(formName) {
            console.log('解放路打算');
            this.$refs[formName].resetFields();
        },
```

-   `通过id进行区分是新增按钮弹出来的表单提交还是编辑弹出来的表单提交`：传递的都是表单中的数据

```html
<el-button type="primary" @click="pojo.id === null ? addDate('pojoForm') : updateData('pojoForm')">确 定</el-button>
```

```js
        updateData(formName) {
            // console.log('updateData');
            this.$refs[formName].validate(valid => {
                if (valid) {
                    memberApi.update(this.pojo).then(response => {
                        // console.log(response);
                        const resp = response.data;
                        if (resp.flag) {
                            this.fetchData();
                            this.dialogFormVisible = false;
                        } else {
                            this.$message({
                                message: resp.message,
                                type: 'warning',
                            });
                        }
                    });
                } else {
                    return false;
                }
            });
        },
```

-   `本地过滤器`：这里为什么会用到过滤器呢？因为后台给我们返回的是`"payType|1": ['1', '2', '3', '4'],`通过后端返回的数据，我们需要用数字对应汉字，把对需要的值返回出去，完整额过滤器，后面项目可以借鉴

```js
            <el-table-column prop="payType" label="支付类型">
                <!-- 这里用到了template类型 -->
                <template slot-scope="scope">
                    <span>{{ scope.row.payType | payTypeFilter}}</span>
                </template>
            </el-table-column>

// 支付类型
// 过滤器中不能使用当前实例this，所以不能定义在data中，后面操作值的时候会报错
const payTypeOptions = [
    { type: '1', name: '现金' },
    { type: '2', name: '支付宝' },
    { type: '3', name: '微信' },
    { type: '4', name: '银行卡' },
];

    // 本地过滤器    返回的值需要用到，在函数中用到
    filters: {
        // val得到的是过滤的值
        payTypeFilter(val) {
            console.log(val);
            const objType = payTypeOptions.find(item => {
                // 这个数组的每一项找到的值的type和要过滤的val值是否相等，相等的话全部返回出去
                return item.type === val;
            });
            // console.log(objType);
            // 在判断这个值是否为空，如果不为空，显示这个每一项的name，否则显示null，在把这个值返回出去，过滤器中都是返回出去的值
            return objType ? objType.name : null;
        },
    },
```

## 供应商管理

`/src/views/supplier/index.vue`通过`会员管理`，大部分的增删改查都已经能够完成，但是有些知识点，是重复的，所以就没必要重复，从本节和以后的章节，都会记载不一样的知识点和思路，进行完善，和上面的会员管理一模一样。

## 商品管理

`/src/views/goods/index.vue`通过`会员管理`和`供应商管理`两个项目模块的学习，基础的差不多了

-   `新增按钮-选择供应商`：readonly 原生属性是否只读 在 el-input 组件中，要监听组件的原生事件，需要使用 native @click.native = 'xxxxx'，其中还有`表格的复用思想`

```js
     <el-form-item prop="supplierName">
                <!-- readonly原生属性是否只读  在el-input组件中，要监听组件的原生事件，需要使用native    @click.native = 'xxxxx'   -->
                <el-input @click.native="dialogSupplierVisible = true" readonly v-model="searchMap.supplierName" placeholder="选择供应商" style="width: 200px"></el-input>
    </el-form-item>
```

-   `表格复用的思想`：子传父：复用的是供应商管理，需要把供应商管理这个组件变成商品管理的子组件，在父组件中自定义事件和自定义函数，在子组件中触发这个自定义事件，在父组件中使用这个自定义函数，当注册成功之后，把需要复用的东西方需要放在`dialog`这个组件中，这个组件初始化是隐藏，点击选择供应商的时候，弹出这`dialog`，通过`isEdit`判断是编辑窗口选择的供应商还是搜索区域选择的供应商
    父传子：通过`dialog=true`来判断子组件在父组件中显示的是弹框还是组件
    // 子传父：在父组件中自定义事件和自定义函数，在子组件中进行触发这个定义的事件(触发的是’@click‘这个值，不是自定义的函数（就是 click 等于后面的值）)，在父组件中触发这个自定义的函数(就是 click 等于号后面的函数)
    // 父传子:在服组件中自定义属性，在子组件中用 props 接收，然后在 template 中直接使用
    //在子组件中的 template 模板中，通过激活单选行，用函数来管理激活的新数据和久数据，因为这个 table 表单当初判断了是在父组件中弹出的列表，还是在子组件中弹出的列表，又因为父组件中采用了这个子组件的表格，所以用了子传父的数据通信方式，在子组件中采用的是触发自定义的事件，并传递对应的数据，在父组件中通过自定义的函数接收传递过来的数据，在父组件中进行显示

```js
// 需要弹出的dialog
  <el-dialog title="提示" :visible.sync="dialogSupplierVisible" width="800px">
// 注册的组件
<supplier @option_supplier="optionSupplier":isDialog="true">
</supplier>
</el-dialog>

// 子组件中需要触发的自定义函数
 currentChangeTable(currentRow) {
            // alert('hello');
            // console.log('children', currentRow);
            this.$emit('option_supplier', currentRow);
        }
// 子组件中需要执行的函数
 <el-table :highlight-current-row="isDialog" @current-change="currentChangeTable" :data="supplierList" border style="width: 100%">

// 父组件中需要执行的函数
 optionSupplier(currentRow) {
            if (this.isEdit) {
                // 是编辑窗口打开的选择供应商
                this.supplierForm.supplierName = currentRow.name;
                this.supplierForm.supplierID = currentRow.id;
            } else {
                // 是搜索区域选择的供应商
                // console.log('parent', currentRow.name);
                this.searchMap.supplierName = currentRow.name;
                this.searchMap.supplierID = currentRow.id;
            }
            this.isEdit = false; // 注意重新赋值false，不然先打开的是选择供应商，一直就是选择供应商，后面的搜索区域的供应商没法选择
            this.dialogSupplierVisible = false;
        },
```

## 供应商管理

`/src/views/staff/index.vue`：跟会员管理一模一样

## Vuex 项目改造

## 项目开发阶段

1. 学习阶段(最初的笔记和大量的小案例) /vue
2. axios 测试(封装 api) /axios-demo
3. mock 学习阶段(mockjs 的用法) /vueProject
4. 最初的简易版本(没有进行复杂的数据传递的版本) /el-admin-template
5. 完成阶段(没有经过 Vuex 改造) /el-admin
6. Vuex 学习阶段(文件内学习文档) /Vuex-demo
7. Vuex 版本改造(初始化项目，登录，获取用户信息，退出) /el-admin-vuex
8. el-admin(vuex 版本) 项目打包完成，需要上传到阿里云服务器

以上都是自己整理的文档，需要自取，请注明出处！！！
