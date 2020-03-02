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
                    <el-select v-model="reportParams.txStatusId" placeholder="请选择通讯状态">
                        <el-option
                        v-for="item in txStatusList"
                        :key="item.txStatusId"
                        :label="item.txStatusDes"
                        :value="item.txStatusId">
                        </el-option>
                    </el-select>
                </div>
                <div>
                    <span>通讯类型：</span>
                    <el-select v-model="reportParams.txTypeId" placeholder="请选择通讯类型">
                        <el-option
                        v-for="item in txTypeList"
                        :key="item.txTypeId"
                        :label="item.txTypeDes"
                        :value="item.txTypeId">
                        </el-option>
                    </el-select>
                </div>
                <div>
                     <span>表号：</span>
                    <el-input  v-model="reportParams.meterGyh" placeholder="请输入表号" class="handle-input mr10"></el-input>
                </div>
                <div>
                    <span>通讯日期：</span>
                    <el-date-picker 
                        v-model="dateRange"
                        @change="selectDateRange"
                        type="daterange"
                        value-format="yyyy-MM-dd"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
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
                txStatusList:{},
                txTypeList:{},
                dateRange:[],
                reportParams: {
                    reportlet:"/gprs/tx/txqueue.cpt",
                    txStatusId:"",
                    txTypeId:"",
                    meterGyh:"",
                    beginTime:"",
                    endTime:""
                },
                height:getWindowSize().height,
            }
        },
        created() {
            this.queryReport();
            this.getQuerySelectList();
        },
        methods: {
            selectDateRange(){
               this.reportParams.beginTime = this.dateRange[0];
               this.reportParams.endTime = this.dateRange[1];
            },
            search(){
                 this.queryReport();
            },
            queryReport(){
                this.src = getReportUrl(this.reportParams);
            },
            getQuerySelectList(){
                crudData("/api/txQueueReport").then((res) => {
                    this.txStatusList = res.txStatus;
                    this.txTypeList = res.txType;
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
