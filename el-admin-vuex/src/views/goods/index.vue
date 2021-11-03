<template>
    <!-- 商品管理 -->
    <div>
        <!-- 搜索表单 -->
        <el-form ref="searchForm" :inline="true" :model="searchMap" class="demo-form-inline" style="margin-top: 20px">
            <el-form-item prop="name">
                <el-input v-model="searchMap.name" placeholder="商品名称" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item prop="code">
                <el-input v-model="searchMap.code" placeholder="商品编号" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item prop="supplierName">
                <!-- readonly原生属性是否只读  在el-input组件中，要监听组件的原生事件，需要使用native    @click.native = 'xxxxx'   -->
                <el-input @click.native="dialogSupplierVisible = true" readonly v-model="searchMap.supplierName" placeholder="选择供应商" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="fetchData">查询</el-button>
                <el-button type="primary" @click="handleAdd">新增</el-button>
                <!-- 直接在这个地方调用这个方法，不用this，因为是在template中，如果重置错误，说明有this，如果重置失败，说明没有prop -->
                <el-button @click="$refs['searchForm'].resetFields()">重置</el-button>
            </el-form-item>
        </el-form>
        <!-- 商品表格 -->
        <el-table :data="list" border style="width: 100%">
            <!-- 注意序号的使用 -->
            <el-table-column type="index" label="序号"> </el-table-column>
            <el-table-column prop="name" label="商品名称"> </el-table-column>
            <el-table-column prop="code" label="商品编码"> </el-table-column>
            <el-table-column prop="spec" label="商品规格"> </el-table-column>
            <el-table-column prop="retailPrice" label="零售价"> </el-table-column>
            <el-table-column prop="purchasePrice" label="进货价"> </el-table-column>
            <el-table-column prop="storageNum" label="库存数量"> </el-table-column>
            <el-table-column prop="supplierName" label="供应商"> </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.row.id)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 商品分页 -->
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[20, 30, 50]" :page-size="pageSzie" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
        <!-- 查询弹出框 -->
        <el-dialog title="提示" :visible.sync="dialogSupplierVisible" width="800px">
            <supplier @option_supplier="optionSupplier" :isDialog="true"></supplier>
        </el-dialog>
        <!-- 新增弹出框 -->
        <el-dialog title="编辑商品" :visible.sync="dialogFormVisible" width="500px">
            <el-form :model="supplierForm" ref="ruleSuppForm" :rules="rules" label-width="100px" label-position="right" style="width: 400px">
                <el-form-item label="商品名称" prop="name">
                    <el-input v-model="supplierForm.name"></el-input>
                </el-form-item>
                <el-form-item label="商品编码" prop="code">
                    <el-input v-model="supplierForm.code"></el-input>
                </el-form-item>
                <el-form-item label="商品规格" prop="spec">
                    <el-input v-model="supplierForm.spec"></el-input>
                </el-form-item>
                <el-form-item label="零售价" prop="retailPrice">
                    <el-input v-model="supplierForm.retailPrice"></el-input>
                </el-form-item>
                <el-form-item label="进货价" prop="purchasePrice">
                    <el-input v-model="supplierForm.purchasePrice"></el-input>
                </el-form-item>
                <el-form-item label="库存数量" prop="storageNum">
                    <el-input v-model="supplierForm.storageNum"></el-input>
                </el-form-item>
                <el-form-item label="供应商" prop="SupplierName">
                    <el-input readonly @click.native="editorOptionSupplier" placeholder="选择供应商" v-model="supplierForm.supplierName"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="supplierForm.id === null ? addNewData('ruleSuppForm') : updateData('ruleSuppForm')">确 定</el-button>
                <!-- <el-button type="primary" @click="addNewData('ruleSuppForm')">确 定</el-button> -->
            </div>
        </el-dialog>
    </div>
</template>

<script>
import goodsApi from '@/api/goods.js';
import Supplier from '@/views/supplier/index.vue';
export default {
    components: { Supplier },
    data() {
        return {
            list: [],
            total: 0, //总的条数
            pageSzie: 10, //请求的条数
            currentPage: 1, //当前页
            searchMap: {
                name: '',
                code: '',
                supplierName: '',
                supplierID: null,
            }, //需要传递搜索的值
            dialogSupplierVisible: false, //弹出选择供应商
            dialogFormVisible: false, //编辑窗口
            rules: {
                name: [{ required: true, message: '供应商名称不能为空', trigger: 'blur' }],
                code: [{ required: true, message: '商品编码不能为空', trigger: 'blur' }],
                retailPrice: [{ required: true, message: '零售价不能为空', trigger: 'blur' }],
            },
            supplierForm: {
                id: null,
                name: '',
                code: '',
                spec: '',
                retailPrice: '',
                purchasePrice: '',
                storageNum: '',
                supplierName: '',
                supplierID: null,
            },
            isEdit: false, //是否为编辑窗口
        };
    },
    created() {
        this.fetchData();
    },
    methods: {
        fetchData() {
            goodsApi.search(this.pageSzie, this.currentPage, this.searchMap).then(response => {
                const resp = response.data.data;
                this.total = resp.total;
                this.list = resp.rows;
                // console.log(this.list);
            });
        },
        // 编辑
        handleEdit(id) {
            console.log(id);
            this.handleAdd();
            goodsApi.getById(id).then(response => {
                const resp = response.data;
                if (resp.flag) {
                    this.supplierForm = resp.data;
                }
            });
        },
        // 删除
        handleDelete(id) {
            // console.log(id, row);
            // 按需引入提示框，MessageBox需要挂载到vue原型上，总共有四种类型 msgbox按照以下的方式引入错误),alert,confirm,prompt,具体参见element ui全局方式引入
            this.$MessageBox
                .confirm('确定要删除吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                })
                .then(() => {
                    console.log('确定');
                    // 成功的函数
                    goodsApi.deleteById(id).then(response => {
                        const resp = response.data;
                        console.log(resp);
                        if (resp.flag) {
                            this.$message({
                                message: resp.message,
                                type: 'success',
                            });
                            this.fetchData();
                        } else {
                            this.$message({
                                message: resp.message,
                                type: 'warning',
                            });
                        }
                    });
                })
                .catch(() => {
                    console.log('取消');
                });
        },
        // 分页总条数
        handleSizeChange(val) {
            // console.log(`每页 ${val} 条`);
            this.pageSzie = val;
            this.fetchData();
        },
        // 分页当前页
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            // this.currentPage = val;
            this.fetchData();
        },
        // 子传父：在父组件中自定义事件和自定义函数，在子组件中进行触发这个定义的事件(触发的是’@click‘这个值，不是自定义的函数（就是click等于后面的值）)，在父组件中触发这个自定义的函数(就是click等于号后面的函数)
        // 父传子:在服组件中自定义属性，在子组件中用props接收，然后在template中直接使用
        //在子组件中的template模板中，通过激活单选行，用函数来管理激活的新数据和久数据，因为这个table表单当初判断了是在父组件中弹出的列表，还是在子组件中弹出的列表，又因为父组件中采用了这个子组件的表格，所以用了子传父的数据通信方式，在子组件中采用的是触发自定义的事件，并传递对应的数据，在父组件中通过自定义的函数接收传递过来的数据，在父组件中进行显示
        optionSupplier(currentRow) {
            console.log('currentRow', currentRow);
            if (this.isEdit) {
                // 是编辑窗口打开的选择供应商
                this.supplierForm.supplierName = currentRow.name;
                this.supplierForm.supplierID = currentRow.id;
            } else {
                // 是搜索区域选择的供应商
                // console.log('parent', currentRow.name);
                this.searchMap.supplierName = currentRow.name;
                this.searchMap.supplierID = currentRow.id;
            }
            this.isEdit = false; // 注意重新赋值false，不然先打开的是选择供应商，一直就是选择供应商，后面的搜索区域的供应商没法选择
            this.dialogSupplierVisible = false;
        },
        handleAdd() {
            this.dialogFormVisible = true;
            // this.supplierForm = {};
            this.$nextTick(() => {
                this.$refs['ruleSuppForm'].resetFields();
            });
        },
        addNewData(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    goodsApi.addNewGoods(this.supplierForm).then(response => {
                        const resp = response.data;
                        if (resp.flag) {
                            this.dialogFormVisible = false;
                            this.fetchData();
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
        editorOptionSupplier() {
            this.isEdit = true; //当前是通过编辑窗口的选择供应商打开的窗口
            this.dialogSupplierVisible = true;
        },
        updateData(formName) {
            console.log('更新');
            this.$refs[formName].validate(valid => {
                if (valid) {
                    goodsApi.update(this.supplierForm).then(response => {
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