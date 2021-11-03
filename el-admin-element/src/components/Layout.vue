<template>
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

<style>
.header {
    position: absolute;
    line-height: 50px;
    top: 0px;
    left: 0px;
    right: 0px;
    background-color: #2d3a4b;
}
.navbar {
    position: absolute;
    width: 230px;
    top: 50px;
    left: 0px;
    bottom: 0px;
    /* 出现滚动条 */
    overflow-y: auto;
    background-color: #545c64;
}
.main {
    position: absolute;
    top: 50px;
    left: 230px;
    right: 0px;
    bottom: 0px;
    /* 出现滚动条 */
    overflow-y: auto;
}
</style>