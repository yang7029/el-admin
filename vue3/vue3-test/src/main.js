// 引入的是工厂函数
import { createApp } from 'vue';
import App from './App.vue';

// createApp(App).mount('#app');

// 拆解
const app = createApp(App);

// 挂载
app.mount('#app');

// 可以打印app上面的一些东西
// console.log(app);

// unmount的应用       卸载unmount
// setTimeout(() => {
// 	app.unmount('#app');
// }, 3000);
