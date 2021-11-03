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