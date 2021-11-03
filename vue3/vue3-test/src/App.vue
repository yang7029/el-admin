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