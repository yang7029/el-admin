<template>
    <div class="header">
        <a href="#/">
            <img class="logo" src="@/assets/logo.gif" />
            <span class="compony">信息管理系统</span>
        </a>
        <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link"> 下拉菜单<i class="el-icon-arrow-down el-icon--right"></i> </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-edit-outline" command="a">修改密码</el-dropdown-item>
                <el-dropdown-item icon="el-icon-user-solid" command="b">退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script>
import { logout } from '@/api/login.js';
export default {
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
};
</script>

<style>
.logo {
    vertical-align: middle;
    padding: 0px 10px 0px 40px;
    width: 40px;
}
.compony {
    position: absolute;
    color: #fff;
}
.el-dropdown {
    float: right;
    margin-right: 40px;
}
.el-dropdown-link {
    color: #fff;
    cursor: pointer;
}
</style>