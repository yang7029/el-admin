<template>
    <div>
        <!-- 查询表单 -->
        <el-form ref="searchForm" :model="searchMap" :inline="true" class="demo-ruleForm" style="margin-top: 20px">
            <el-form-item prop="name"> <el-input v-model="searchMap.name" placeholder="供应商名称" style="width: 200px"></el-input> </el-form-item>
            <el-form-item prop="linkman"> <el-input v-model="searchMap.linkman" placeholder="联系人" style="width: 200px"></el-input> </el-form-item>
            <el-form-item prop="mobile"> <el-input v-model="searchMap.mobile" placeholder="联系电话" style="width: 200px"></el-input> </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="fetchData">查询</el-button>
                <el-button type="primary" @click="addEditorData">新增</el-button>
                <el-button @click="resetForm('searchForm')">重置</el-button>
            </el-form-item>
        </el-form>
        <!-- 列表 -->
        <el-table :data="supplierList" border style="width: 100%" height="380">
            <el-table-column type="index" prop="index" label="序号" width="60"> </el-table-column>
            <el-table-column prop="name" label="供应商名称"> </el-table-column>
            <el-table-column prop="linkman" label="联系人"> </el-table-column>
            <el-table-column prop="mobile" label="联系电话"> </el-table-column>
            <el-table-column prop="remark" label="备注"></el-table-column>
            <el-table-column prop="address" label="操作">
                <!-- 重点 -->
                <template slot-scope="scope">
                    <!-- 用scope.row的话可以可以获取到没行的数据，就是中supplierList的每个对象 -->
                    <el-button size="mini" @click="handleEdit(scope.row.id)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
        <!-- 点击新增页面表格 -->
        <el-dialog title="供应商编辑" width="500px" :visible.sync="dialogFormVisible">
            <el-form :model="supplierForm" ref="ruleSuppForm" :rules="rules" label-width="100px" label-position="right" style="width: 400px">
                <el-form-item label="供应商名称" prop="name">
                    <el-input v-model="supplierForm.name"></el-input>
                </el-form-item>
                <el-form-item label="联系人" prop="linkman">
                    <el-input v-model="supplierForm.linkman"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" prop="mobile">
                    <el-input v-model="supplierForm.mobile"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="remark">
                    <el-input v-model="supplierForm.remark" type="textarea" :autosize="{ minRows: 2, maxRows: 4 }" placeholder="请输入地址"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="supplierForm.id === null ? addNewData('ruleSuppForm') : updateData('ruleSuppForm')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import SupplierApi from '@/api/supplier.js';
export default {
    data() {
        return {
            supplierList: [],
            total: 0,
            currentPage: 1,
            pageSize: 10,
            searchMap: {
                name: '',
                linkman: '',
                mobile: '',
            },
            dialogFormVisible: false,
            supplierForm: {
                id: null,
                name: '',
                linkman: '',
                mobile: '',
                remark: '',
            },
            rules: {
                name: [{ required: true, message: '供应商名称不能为空', trigger: 'blur' }],
                linkman: [{ required: true, message: '联系人不能为空', trigger: 'blur' }],
            },
        };
    },
    created() {
        this.fetchData();
    },
    methods: {
        // 请求数据
        fetchData() {
            SupplierApi.supplierSearch(this.pageSize, this.currentPage, this.searchMap).then(response => {
                // console.log(response);
                const resp = response.data;
                // console.log(resp);
                this.total = resp.data.total;
                this.supplierList = resp.data.rows;
            });
        },
        // 点击编辑
        handleEdit(id) {
            // console.log(id);
            this.addEditorData();
            SupplierApi.suppEditor(id).then(response => {
                const resp = response.data;
                if (resp.flag) {
                    this.supplierForm = resp.data;
                }
            });
        },
        // 编辑的确定按钮
        updateData(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    SupplierApi.update(this.supplierForm).then(response => {
                        const resp = response.data;
                        if (resp.flag) {
                            this.fetchData();
                            this.dialogFormVisible = false;
                        }
                    });
                } else {
                }
            });
        },
        // 点击删除
        handleDelete(id) {
            // console.log(id);
            this.$MessageBox
                .confirm('确定要删除吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                })
                .then(() => {
                    SupplierApi.deleteData(id).then(response => {
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
        // 每页更新
        handleSizeChange(val) {
            // console.log(`每页 ${val} 条`);
            this.pageSize = val;
            this.fetchData();
        },
        // 当前页更新
        handleCurrentChange(val) {
            // console.log(`当前页: ${val}`);
            this.currentPage = val;
            this.fetchData();
        },
        // 重置按钮
        resetForm(formName) {
            // console.log('chongzhi ');
            this.$refs[formName].resetFields();
        },
        // 新增按钮
        addEditorData() {
            // console.log('新增');
            this.dialogFormVisible = true;
            // this.supplierForm = {};
            this.$nextTick(() => {
                this.$refs['ruleSuppForm'].resetFields();
            });
        },
        // 新增按钮确定提交
        addNewData(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    SupplierApi.addNewSupplier(this.supplierForm).then(response => {
                        console.log(response);
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
    },
};
</script>

<style>
</style>