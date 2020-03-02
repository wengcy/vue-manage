<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i>{{title}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="el-icon-plus" class="handle-del mr10" @click="handleEdit({},'add')">添加</el-button>
                <el-button type="primary" icon="el-icon-delete" class="handle-del mr10" @click="delAllData">批量删除</el-button>
                <div class="query-box">
                     <span>厂商：</span>
                    <el-input  v-model="query.supplier"  class="handle-input mr10"></el-input>
                </div>
                <div class="query-box">
                     <span>品名：</span>
                    <el-input  v-model="query.name"  class="handle-input mr10"></el-input>
                </div>
                <div class="query-box">
                     <span>涨跌：</span>
                    <el-input  v-model="query.trend"  class="handle-input mr10"></el-input>
                </div>
                <el-button type="primary" icon="el-icon-search" @click="queryData">搜索</el-button>
            </div>
            <el-table :data="tableData" border class="table" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="id" label="id">
                </el-table-column>
                <el-table-column prop="supplier" label="供应商" sortable >
                </el-table-column>
                <el-table-column prop="name" label="姓名">
                </el-table-column>
                <el-table-column prop="price" label="价格" >
                </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.row,'edit')">编辑</el-button>
                        <el-button type="text" icon="el-icon-tickets" @click="handleEdit(scope.row,'show')">查看</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background 
                @current-change="handleCurrentChange" 
                @size-change="handleSizeChange" 
                :page-sizes="[5, 10, 20, 30]"
                :page-size="10"
                layout="total, sizes,prev, pager, next,jumper" :total="totalPage">
                </el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog :title="getDialogTitle" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="50px" :rules="rules">
                <el-form-item label="厂商" prop="supplier">
                     <el-input v-model="form.supplier" :disabled="!isEdit"></el-input>
                </el-form-item>
                <el-form-item label="产品" prop="name">
                    <el-input v-model="form.name" :disabled="!isEdit"></el-input>
                </el-form-item>
                <el-form-item label="涨跌" prop="trend">
                    <el-input v-model="form.trend" :disabled="!isEdit"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer" v-show="isEdit">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="editData('form')">确 定</el-button>
            </span>
            <span slot="footer" class="dialog-footer" v-show="!isEdit">
                <el-button type="primary" @click="editVisible = false">关闭</el-button>
            </span>

        </el-dialog>

        <!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteData">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import { crudData } from '@/api/common';
    export default {
        name: 'basetable',
        data() {
            return {
                title:"基础表格",
                tableData: [],
                multipleSelection: [],
                editVisible: false,
                delVisible: false,
                edit:"add",
                delType:1,//1为单选 2为多选
                totalPage:0,
                id:'',
                form: {
                    id:'',
                    supplier:'',
                    name:'',
                    trend:'',
                    price:'122',
                    density:"0.999",
                    endPrice:'11'
                },
                query: {
                    pageNo:1,
                    pageSize:10,
                    supplier:'',
                    name:'',
                    trend:''
                },
                rules: {
                    supplier: [
                        { required: true, message: '请输入厂商', trigger: 'blur' },
                    ],
                    name: [
                        { required: true, message: '请输入品名', trigger: 'blur' },
                    ],
                    trend: [
                        { required: true, message: '请输入幅度', trigger: 'blur' },
                    ]
                }
            }
        },
        computed:{
            isEdit(){
                if(this.edit == "add" || this.edit == "edit") {
                    return true;
                }else{
                    return false;
                }
            },
            getDialogTitle(){
                let title = "";
                if(this.edit == "add") {
                    title = "添加";
                }else if(this.edit == "edit") {
                    title = "编辑";
                }else {
                    title = "查看";
                }
                return title;
                    
            }
        },
        created() {
            this.queryData();
        },
        methods: {
            //查询数据
            queryData(){
                crudData('/api/price/queryPriceByPage',this.query).then((res) => {
                     this.tableData = res.data;
                    if(res.data.length > 0) {
                        this.totalPage = this.tableData[0].totalPage;
                    }else {
                        this.totalPage = 0;
                    }
                })
            },
            //新增修改数据
            editData(formName) {
                 this.$refs[formName].validate((valid) => {
                    if (valid) {
                         let url = this.edit === "add" ? "/api/price/addPrice" : "/api/price/updatePrice";
                        crudData(url,this.form,'post').then((res) => {
                            console.log('res: ', res);
                            this.editVisible = false;
                            this.query.pageNo = 1;
                            this.$message.success(`${res.message}`);
                            this.queryData();
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            //删除数据
            deleteData() {
                let ids = "";
                if (this.delType == 1) {
                    ids = this.id;
                } else {
                    const length = this.multipleSelection.length;
                    let idsArray = [];
                    for (let i = 0; i < length; i++) {
                        idsArray.push(this.multipleSelection[i].id);
                    }
                    ids = idsArray.join(",");
                }
                crudData('/api/price/deletePrice',{id:ids},'post').then((res) => {
                    this.delVisible = false;
                    this.multipleSelection = [];
                    this.query.pageNo = 1;
                    this.$message.success(res.message);
                    this.queryData();
                })
            },

            //打开删除数据提示款
             delAllData() {
                this.delType = 2;
                this.delVisible = true;
            },

            // 分页导航
            handleCurrentChange(val) {
                this.query.pageNo = val;
                this.queryData();
            },
            handleSizeChange(val){
                this.query.pageNo = 1;
                this.query.pageSize = val;
                this.queryData();

            },
           //编辑弹出框
            handleEdit(row,type) {
                console.log('type: ', type);
                this.edit = type;
                this.form = {
                    id: row.id,
                    supplier: row.supplier,
                    name: row.name,
                    trend: row.trend,
                    price:'122',
                    density:"0.999",
                    endPrice:'11'
                }
                this.editVisible = true;
            },

            //删除弹出框
            handleDelete(index, row) {
                this.delType = 1;
                this.id = row.id;
                this.delVisible = true;
            },
           
            
            //获取多选值
            handleSelectionChange(val) {
                this.multipleSelection = val;
            }
        }
    }

</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 150px;
        display: inline-block;
    }
    .del-dialog-cnt{
        font-size: 16px;
        text-align: center
    }
    .query-box {
        display: inline-block;
    }
    .table{
        width: 100%;
        font-size: 14px;
    }
    .red{
        color: #ff0000;
    }
    .mr10{
        margin-right: 10px;
    }
</style>
