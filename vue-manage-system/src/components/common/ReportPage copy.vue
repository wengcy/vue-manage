<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> {{title}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <div v-for="item in queryCondition" :key="item.model">
                    <span>{{item.name}}：</span>
                     <el-input  v-if="item.type === 'input'" :placeholder="item.placeholder" v-model="query[item.model]"  class="handle-input mr10"></el-input>
                    <el-select v-else-if="item.type === 'select'" :placeholder="item.placeholder" v-model="query[item.model]" class="handle-input mr10">
                        <el-option
                        v-for="list in item.list"
                        :key="list[item.key]"
                        :label="list[item.label]"
                        :value="list[item.key]">
                        </el-option>
                    </el-select>
                     <el-date-picker v-else-if="item.type === 'dateRange'"
                        v-model="query[item.model]"
                        type="daterange"
                        @change="selectDateRange"
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
        props:{
            title: {
                type: String,
                default:"表格模板"
            },
            queryCondition: {
                type: Array,
                default: () => {
                    return []
                }
            },
            otherQueryCondition: {
                type: Object,
                default: () => {
                    return {}
                }
            }
         },
        data() {
            return {
                src:"",
                query:{
                },
                height:getWindowSize().height,
            }
        },
        created() {
            //合并参数
            Object.assign(this.query, this.otherQueryCondition);
            this.queryReport();
        },
        methods: {
            selectDateRange(){
               this.query.beginTime = this.query.dateRange[0];
               this.query.endTime = this.query.dateRange[1];
            },
            search(){
                 this.queryReport();
            },
            queryReport(){
                this.src = getReportUrl(this.query);
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
