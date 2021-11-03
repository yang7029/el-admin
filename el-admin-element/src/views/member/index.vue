<template>
    <div>
        <!-- 条件查询 -->
        <el-form ref="searchForm" :inline="true" :model="searchMap" class="demo-form-inline" style="margin-top: 20px">
            <el-form-item prop="cardNum">
                <el-input v-model="searchMap.cardNum" placeholder="会员卡号" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item prop="cname">
                <el-input v-model="searchMap.cname" placeholder="会员名称" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item prop="payType">
                <el-select v-model="searchMap.payType" placeholder="支付类型" style="width: 200px">
                    <!-- payTypeOptions：这个数据不是data中的数据，会报错，需要变成data中的数据    :value：表示要提交的值，但是显示的是name -->
                    <el-option v-for="option in payTypeOptions" :key="option.type" :label="option.name" :value="option.type"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="birthday">
                <!-- value-format:绑定日期的格式 -->
                <el-date-picker value-format="yyyy-MM-dd" v-model="searchMap.birthday" type="date" placeholder="选择日期" style="width: 200px"> </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="fetchData">查询</el-button>
                <el-button type="primary" @click="handleAdd">新增</el-button>
                <el-button @click="resetForm('searchForm')">重置</el-button>
            </el-form-item>
        </el-form>
        <!--  :data 为动态绑定的值     border 为边框，头部的边框会去掉 -->
        <el-table :data="list" style="width: 100%" border>
            <!-- label:显示的是头部标题     prop:显示的是数据字段名   width:显示的边框的宽度 -->
            <el-table-column type="index" label="序号" width="60"> </el-table-column>
            <el-table-column prop="cardNum" label="会员卡号"> </el-table-column>
            <el-table-column prop="name" label="会员姓名"> </el-table-column>
            <el-table-column prop="birthday" label="会员生日"> </el-table-column>
            <el-table-column prop="phone" label="手机号码"> </el-table-column>
            <el-table-column prop="integral" label="可用积分"> </el-table-column>
            <el-table-column prop="money" label="开卡金额"> </el-table-column>
            <el-table-column prop="payType" label="支付类型">
                <!-- 这里用到了template类型 -->
                <template slot-scope="scope">
                    <span>{{ scope.row.payType | payTypeFilter }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="address" label="会员地址"> </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <!-- 用scope.row的话可以可以获取到没行的数据，就是list中的每个对象 -->
                    <el-button size="mini" @click="handleEdit(scope.row.id)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.row.id, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 实现分页功能 -->
        <!-- size-change: 每页显示的总条数改变会触发  current-change:当前页改变的时候触发     current-page:表示默认的页面   page-sizes:表示当前页显示可供选择的条数   page-size:默认显示的条数  total:显示总的条数 layout:组件布局-->
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
        <!-- 新增按钮表单 -->
        <el-dialog title="会员编辑" width="500px" :visible.sync="dialogFormVisible">
            <el-form :rules="rules" ref="pojoForm" label-width="100px" label-position="right" style="width: 400px" :model="pojo">
                <el-form-item label="会员卡号" prop="cardNum">
                    <el-input v-model="pojo.cardNum"></el-input>
                </el-form-item>
                <el-form-item label="会员姓名" prop="name">
                    <el-input v-model="pojo.name"></el-input>
                </el-form-item>
                <el-form-item label="会员生日" prop="birthday">
                    <!-- value-format:绑定日期的格式 -->
                    <el-date-picker value-format="yyyy-MM-dd" v-model="pojo.birthday" type="date" placeholder="会员生日" style="width: 200px"> </el-date-picker>
                </el-form-item>
                <el-form-item label="手机号码" prop="phone">
                    <el-input v-model="pojo.phone"></el-input>
                </el-form-item>
                <el-form-item label="开卡金额" prop="money">
                    <el-input v-model="pojo.money"></el-input>
                </el-form-item>
                <el-form-item label="可用积分" prop="integral">
                    <el-input v-model="pojo.integral"></el-input>
                </el-form-item>
                <el-form-item label="支付类型" prop="payType">
                    <el-select v-model="pojo.payType" placeholder="支付类型" style="width: 200px">
                        <!-- payTypeOptions：这个数据不是data中的数据，会报错，需要变成data中的数据    :value：表示要提交的值，但是显示的是name -->
                        <el-option v-for="option in payTypeOptions" :key="option.type" :label="option.name" :value="option.type"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="会员地址" prop="address">
                    <el-input type="textarea" v-model="pojo.address"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <!-- <el-button type="primary" @click="addDate('pojoForm')">确 定</el-button> -->
                <el-button type="primary" @click="pojo.id === null ? addDate('pojoForm') : updateData('pojoForm')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import memberApi from '@/api/member.js';
// 支付类型
// 过滤器中不能使用当前实例this，所以不能定义在data中，后面操作值的时候会报错
const payTypeOptions = [
    { type: '1', name: '现金' },
    { type: '2', name: '支付宝' },
    { type: '3', name: '微信' },
    { type: '4', name: '银行卡' },
];
export default {
    data() {
        return {
            list: [],
            total: 0, //总条数
            currentPage: 1, //当前页码
            pageSize: 10, //每页显示的总条数
            searchMap: {
                cardNum: '',
                cname: '',
                payType: '',
                birthday: '',
            }, //条件查询绑定的值
            payTypeOptions,
            pojo: {
                id: null,
                cardNum: '',
                name: '',
                birthday: '',
                phone: '',
                money: '',
                integral: '',
                payType: '',
                address: '',
            },
            rules: {
                cardNum: [{ required: true, message: '卡号不能为空', trigger: 'blur' }],
                name: [{ required: true, message: '姓名不能为空', trigger: 'blur' }],
                payType: [{ required: true, message: '支付类型不能为空', trigger: 'change' }],
            },
            dialogFormVisible: false,
        };
    },
    created() {
        this.fetchData();
    },
    // 本地过滤器    返回的值需要用到，在函数中用到
    filters: {
        // val得到的是过滤的值
        payTypeFilter(val) {
            console.log(val);
            const objType = payTypeOptions.find(item => {
                // 这个数组的每一项找到的值的type和要过滤的val值是否相等，相等的话全部返回出去
                return item.type === val;
            });
            // console.log(objType);
            // 在判断这个值是否为空，如果不为空，显示这个每一项的name，否则显示null，在把这个值返回出去，过滤器中都是返回出去的值
            return objType ? objType.name : null;
        },
    },
    methods: {
        fetchData() {
            // memberApi.getMemberlist().then(response => {
            memberApi.search(this.pageSize, this.currentPage, this.searchMap).then(response => {
                const resp = response.data;
                this.list = resp.data.rows;
                console.log(this.list);
                this.total = resp.data.total;
                // console.log(resp);
            });
        },
        handleSizeChange(val) {
            this.pageSize = val;
            // console.log(`每页 ${val} 条`);
            this.fetchData();
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            // console.log(`当前页: ${val}`);
            this.fetchData();
        },
        // 重置按钮      重置按钮<el-form-item> 必须要有prop='xxxxx'
        resetForm(formName) {
            console.log('解放路打算');
            this.$refs[formName].resetFields();
        },
        handleAdd() {
            this.dialogFormVisible = true;
            // 下面用this.$nextTick表单输入不上内容，两种解决方案。一种是把pojo直接清空，一种是给每个item添加prop属性
            // this.pojo = {};
            // // 异步事件，当渲染结束之后，它里面的回调函数才会执行，弹出窗口后，需要加载dom应该等待他加载完dom之后，在进行调用resetFields方法，进行重置表单和清除样式
            this.$nextTick(() => {
                //     // 这个是写死的pojoForm
                this.$refs['pojoForm'].resetFields();
            });
        },
        addDate(formName) {
            console.log('addDate');
            this.$refs[formName].validate(val => {
                // console.log(val);
                if (val) {
                    // console.log(val);
                    memberApi.add(this.pojo).then(response => {
                        // console.log(response);
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

        updateData(formName) {
            // console.log('updateData');
            this.$refs[formName].validate(valid => {
                if (valid) {
                    memberApi.update(this.pojo).then(response => {
                        // console.log(response);
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
        handleEdit(id) {
            // 为什么调用这个函数呢？而不是调用this.dialogFormVisible = true;这个呢？考虑到一个是清空，一个是加载完毕
            this.handleAdd();
            // this.dialogFormVisible = true;
            memberApi.getById(id).then(response => {
                const resp = response.data;
                if (resp.flag) {
                    this.pojo = resp.data;
                }
            });
        },
        handleDelete(id, row) {
            // console.log(id, row);
            // 按需引入提示框，MessageBox需要挂载到vue原型上，总共有四种类型 msgbox按照以下的方式引入错误),alert,confirm,prompt,具体参见element ui全局方式引入
            this.$MessageBox
                .confirm('确定要删除吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                })
                .then(() => {
                    // console.log('确定');
                    // 成功的函数
                    memberApi.deleteById(id).then(response => {
                        // console.log(response);
                        const resp = response.data;
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
    },
};
</script>

<style>
</style>