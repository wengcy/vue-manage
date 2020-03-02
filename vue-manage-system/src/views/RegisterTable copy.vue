<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 基础表格</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        
        <div class="container">
            <div class="handle-box">
                <div>
                    <span>通讯状态：</span>
                    <el-select v-model="reportParams.changJiaId" placeholder="请选择厂家">
                        <el-option
                        v-for="item in changJiaList"
                        :key="item.changJiaId"
                        :label="item.changJiaDes"
                        :value="item.changJiaId">
                        </el-option>
                    </el-select>
                </div>
                <div>
                     <span>表号：</span>
                    <el-input  v-model="reportParams.meterGyh" placeholder="请输入表号" class="handle-input mr10"></el-input>
                </div>
                <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
            </div>
        </div>
        <iframe :src="src" width="100%" :height="height"></iframe>
    </div>
</template>

<script>
    import { crudData } from '@/api/common';
    import {getWindowSize,getReportUrl} from '@/utils/util'
    export default {
        name: 'basetable',
        data() {
            return {
                src:"",
                changJiaList:{},
                reportParams: {
                    reportlet:"/gprs/tx/regist.cpt",
                    changJiaId:"",
                    meterGyh:"",
                },
                height:getWindowSize().height,
            }
        },
        created() {
            this.queryReport();
            this.getQuerySelectList();
        },
        methods: {
            search(){
                 this.queryReport();
            },
            queryReport(){
                this.src = getReportUrl(this.reportParams);
            },
            getQuerySelectList(){
                crudData("/api/registerReport").then((res) => {
                    this.changJiaList = res.changJia;
                })
           }
        }
    }

</script>

<style scoped lang="scss">
.container {
    padding: 30px;
    background: #fff;
    border: none;
    border-radius: 0px; 
    .handle-box {
        >div {
            display:inline-block;
            margin-right: 10px;
            margin-bottom: 10px;
            .handle-input {
                     width: 200px;
                    display: inline-block;
            }
        }
    }
}
iframe {
    background: #fff;
    border:none;
}
  
  
</style>
