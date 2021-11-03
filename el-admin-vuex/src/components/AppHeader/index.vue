<template>
    <div class="header">
        <a href="#/">
            <img class="logo" src="@/assets/logo.gif" />
            <span class="compony">信息管理系统</span>
        </a>
        <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link"> {{ user.name }} <i class="el-icon-arrow-down el-icon--right"></i> </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-edit-outline" command="a">修改密码</el-dropdown-item>
                <el-dropdown-item icon="el-icon-user-solid" command="b">退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <!-- 修改密码弹出框 -->
        <el-dialog title="修改密码" :visible.sync="dialogFormVisible" width="400px">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" style="width: 300px">
                <el-form-item label="原密码" prop="oldPass">
                    <el-input type="password" v-model="ruleForm.oldPass"></el-input>
                </el-form-item>

                <el-form-item label="新密码" prop="newPass">
                    <el-input type="password" v-model="ruleForm.newPass"></el-input>
                </el-form-item>

                <el-form-item label="确认密码" prop="checkPass">
                    <el-input type="password" v-model="ruleForm.checkPass"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                    <el-button @click="$refs['ruleForm'].resetFields()">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import { logout } from '@/api/login.js';
import passwordApi from '@/api/password.js';
export default {
    data() {
        // 在return上面自定义校验规则     校验原来的密码是否正确
        const validateoldPass = (rule, value, callback) => {
            // console.log(rule);
            // console.log(value);
            // console.log(callback);
            // 这个是获取到的用户的id，在return中的user中进行获得的w，this.user.id
            console.log(this.user.id);
            passwordApi.checkPwd(this.user.id, value).then(response => {
                const resp = response.data;
                if (resp.flag) {
                    console.log(resp);
                    // 验证通过
                    callback();
                } else {
                    // 验证不通过
                    callback(new Error(resp.message));
                }
            });
        };
        // 校验确认密码是否和新输入的密码是否一致
        const validatecheckPass = (rule, value, callback) => {
            // 判断新的确认密码和输入的新的密码是否一致
            if (value !== this.ruleForm.newPass) {
                callback(new Error('两次输入的密码不一致'));
            } else {
                callback();
            }
        };
        return {
            user: this.$store.state.user.user,
            dialogFormVisible: false,
            ruleForm: {
                oldPass: '',
                newPass: '',
                checkPass: '',
            },
            rules: {
                oldPass: [
                    { required: true, message: '原密码不能为空', trigger: 'blur' },
                    // 自定义校验的
                    { validator: validateoldPass, trigger: 'blur' },
                ],
                newPass: [{ required: true, message: '新密码不能为空', trigger: 'blur' }],
                checkPass: [
                    { required: true, message: '确认密码不能为空', trigger: 'blur' },
                    { validator: validatecheckPass, trigger: 'change' },
                ],
            },
        };
    },
    methods: {
        handleCommand(command) {
            // this.$message('click on item ' + command);
            // console.log(command);
            switch (command) {
                case 'a':
                    // this.$message('修改密码');
                    this.handlePassword();
                    break;
                case 'b':
                    this.handleLogout();
                    break;
                default:
                    break;
            }
        },
        handleLogout() {
            this.$store
                .dispatch('Logout')
                .then(response => {
                    if (response.flag) {
                        this.$router.push('/login');
                    } else {
                        this.$message({
                            type: 'warning',
                            message: response.message,
                        });
                    }
                })
                .catch(error => {});
        },
        handlePassword() {
            this.dialogFormVisible = true;
            this.$nextTick(() => {
                this.$refs['ruleForm'].resetFields();
            });
        },
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    // 传入的是用户的id和确认密码，为了以防万一，输入的新密码不正确
                    passwordApi.updatePwd(this.user.id, this.ruleForm.checkPass).then(response => {
                        const resp = response.data;
                        this.$message({
                            message: resp.message,
                            type: resp.flag ? 'success' : 'warning',
                        });
                        if (resp.flag) {
                            // 退出的话，从新登录
                            this.handleLogout();
                            this.dialogFormVisible = false;
                        }
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
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