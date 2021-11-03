<template>
    <div class="navbar">
        <!-- :router="true" 需要激活路由，但是直接写不动态绑定是无效的路由     默认的路径需要用 default-active='$route.path'  ongoing默认的’/‘会出现刷新之后回到首页-->
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
    </div>
</template>

<script>
export default {};
</script>

<style>
.el-menu {
    border-right: none;
}
</style>