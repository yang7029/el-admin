<template>
    <div>
        <!-- 搜索表单 -->
        <el-form ref="searchForm" :model="staffSearchForm" :inline="true">
            <el-form-item prop="username">
                <el-input v-model="staffSearchForm.username" placeholder="姓名" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item prop="name">
                <el-input v-model="staffSearchForm.name" placeholder="账户" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="fetchData">查询</el-button>
                <el-button type="primary" @click="addStaffInfo('searchForm')">新增</el-button>
                <el-button type="primary" @click="resetForm('searchForm')">重置</el-button>
            </el-form-item>
        </el-form>
        <!-- tabe表单 -->
        <el-table :data="list" border style="width: 100%">
            <el-table-column label="序号" type="index"> </el-table-column>
            <el-table-column prop="account" label="账户"> </el-table-column>
            <el-table-column prop="name" label="姓名"> </el-table-column>
            <el-table-column prop="age" label="年龄"> </el-table-column>
            <el-table-column prop="phone" label="电话"> </el-table-column>
            <el-table-column prop="salary" label="薪酬"> </el-table-column>
            <el-table-column prop="hiredate" label="入职时间"> </el-table-column>
            <el-table-column prop="operation" label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.row.id)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页功能    current-page:表示的是当前的页码    page-sizes:显示的每页显示多少条数据    page-size默认显示10，可以根据page-sizes中的值进行设置默认值     total:表示总的数量 -->
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
        <!-- 新增列表 -->
        <el-dialog title="员工编辑" width="500px" :visible.sync="dialogFormVisible">
            <el-form :rules="rules" ref="ruleStaffForm" :model="addStaffForm" label-width="100px" label-position="right" style="width: 400px">
                <el-form-item label="账户" prop="account">
                    <el-input v-model="addStaffForm.account"></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="addStaffForm.name"></el-input>
                </el-form-item>
                <el-form-item label="年龄" prop="age">
                    <el-input v-model="addStaffForm.age"></el-input>
                </el-form-item>
                <el-form-item label="电话" prop="phone">
                    <el-input v-model="addStaffForm.phone"></el-input>
                </el-form-item>
                <el-form-item label="薪酬" prop="salary">
                    <el-input v-model="addStaffForm.salary"></el-input>
                </el-form-item>
                <el-form-item label="入职时间" prop="hiredate">
                    <el-date-picker v-model="addStaffForm.hiredate" type="date" placeholder="选择日期"> </el-date-picker>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addStaffForm.id === null ? addStaffData('ruleStaffForm') : addDitorStaff('ruleStaffForm')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import staffApi from '@/api/staff.js';
export default {
    data() {
        return {
            list: [],
            total: 0, //总数
            currentPage: 1, //当前页数
            pageSize: 10, // 当前页显示的条数
            staffSearchForm: {
                username: '',
                name: '',
            },
            dialogFormVisible: false,
            addStaffForm: {
                id: null,
                account: '',
                name: '',
                age: '',
                phone: '',
                salary: '',
                hiredate: '',
            },
            rules: {
                account: [{ required: true, message: '账户不能为空', trigger: 'blur' }],
                name: [{ required: true, message: '姓名不能为空', trigger: 'blur' }],
            },
            judge: {},
        };
    },
    created() {
        this.fetchData();
    },
    methods: {
        // 编辑按钮
        handleEdit(id) {
            this.addStaffInfo();
            // this.addStaffForm = row;
            staffApi.editorStaff(id).then(response => {
                // console.log(response);
                const resp = response.data;
                // console.log(resp);
                if (resp.flag) {
                    this.addStaffForm = resp.data;
                }
            });
        },
        addDitorStaff(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    staffApi.update(this.addStaffForm).then(response => {
                        const resp = response.data;
                        if (resp.flag) {
                            this.$message({
                                message: resp.message,
                                type: 'success',
                            });
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
        // 删除按钮
        handleDelete(id) {
            this.$MessageBox
                .confirm('确定要删除吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                })
                .then(() => {
                    staffApi.deleteData(id).then(response => {
                        const resp = response.data;
                        if (resp.flag) {
                            this.$message({
                                type: 'success',
                                message: '删除成功!',
                            });
                        }
                        this.fetchData();
                    });
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除',
                    });
                });
        },
        // 页面数据初始化，翻页，查询接口
        fetchData() {
            staffApi.search(this.currentPage, this.pageSize, this.staffSearchForm).then(response => {
                const resp = response.data;
                console.log(resp);
                if (resp.flag) {
                    this.list = resp.data.rows;
                    this.total = resp.data.total;
                } else {
                    this.$message({
                        type: 'warning',
                        message: resp.message,
                    });
                }
            });
        },
        // 当每页的显示数量变化的时候触发的函数
        handleSizeChange(val) {
            console.log('y', val);
            this.pageSize = val;
            this.fetchData();
        },
        // 当前页变化触发的函数
        handleCurrentChange(val) {
            console.log('bin', val);
            this.currentPage = val;
            this.fetchData();
        },
        // 点击新增按钮
        addStaffInfo() {
            this.dialogFormVisible = true;
            // this.addStaffForm = {};
            // this.$refs[formName].resetFields();
            this.$nextTick(() => {
                this.$refs['ruleStaffForm'].resetFields();
            });
        },
        // 新增确定按钮
        addStaffData(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    staffApi.addStaff().then(response => {
                        const resp = response.data;
                        if (resp.flag) {
                            this.$message({
                                message: resp.message + ',初始密码：123456',
                                type: 'success',
                            });
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
        // 重置按钮
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
    },
};
</script>

<style>
.el-form {
    margin-top: 20px;
}
</style>