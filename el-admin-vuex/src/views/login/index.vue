<template>
    <div class="login-container">
        <el-form ref="ruleForm" :rules="rules" :model="form" label-width="80px" class="login-form">
            <h2 class="login-title">后台管理系统</h2>
            <el-form-item label="账户" prop="username">
                <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="form.password" type="password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')"> 登录 </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { getUserInfo, login } from '@/api/login.js';
// model : 绑定整个表单model值
// rules : 整个表单校验规则
// ref ：获取该表单form组件
// prop : 绑定每个表单的规则，写在el-form-item上
// validate : 对整个表单进行校验的方法
// valid : 每个必填表单项都提交为true,否则为false

// 登录流程
// 1.点击登录：先要获取token
// 2.然后带上token调取后端的第二个接口，后端获取到token之后，会把token对应的用户信息，进行响应前端
export default {
    data() {
        return {
            form: {
                username: '',
                password: '',
            },
            rules: {
                username: [
                    // required:必填项    message:提示信息   trigger:对应的事件(失去焦点的时候触发)
                    {
                        required: true,
                        message: '用户名不能为空',
                        trigger: 'blur',
                    },
                ],
                password: [
                    {
                        required: true,
                        message: '密码不能不能为空',
                        trigger: 'blur',
                    },
                ],
            },
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.$store
                        .dispatch('Login', this.form)
                        .then(response => {
                            console.log(response.flag);
                            // 通知成功的时候，执行的地方
                            if (response.flag) {
                                this.$router.push('/');
                            } else {
                                this.$message({
                                    type: 'warning',
                                    message: response.message,
                                });
                            }
                        })
                        .catch(error => {
                            // 通知失败异常捕获
                            console.log(error);
                        });
                } else {
                    console.log('验证失败');
                    return false;
                }
            });
        },
    },
};
</script>

<style scoped>
.login-form {
    width: 470px;
    /* 上下间隙150px, 左右自动 */
    margin: 290px auto;
    /*透明背景色*/
    background-color: rgb(255, 255, 255, 0.8);
    padding: 30px;
    /* 圆角 */
    border-radius: 20px;
}
.login-container {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: #2d3a4b;
}
/* 标题 */
.login-title {
    text-align: center;
    color: #606266;
}
</style>
