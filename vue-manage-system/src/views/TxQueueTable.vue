<template>
    <div>
        <report-page 
        :title="title" 
        :queryCondition="queryCondition" 
        :otherQueryCondition="otherQueryCondition">
        </report-page>
    </div>
</template>

<script>
    import reportPage from '@/components/common/ReportPage'
    import { crudData } from '@/api/common';
    export default {
        name: 'TxQueTable',
        components:{reportPage},
        data() {
            return {
               title:"通讯队列报表",
               queryCondition:[
                    {name:"通讯状态",model:"txStatusId",placeholder:"请选择通讯状态",tag:"select",label:"txStatusDes",key:"txStatusId",list:[]},
                    {name:"通讯类型",model:"txTypeId",placeholder:"请选择通讯类型",tag:"select",label:"txTypeDes",key:"txTypeId",list:[]},
                    {name:"表号",model:"meterGyh",placeholder:"请输入表号",tag:"input"},
                    {name:"通讯日期",model:"dateRange",tag:"date",type:"daterange",beginTime:"beginTime",endTime:"endTime"},
               ],
               otherQueryCondition:{
                    reportlet:"/gprs/tx/txqueue.cpt",
               }
            }
        },
        created() {
           this.getQuerySelectList();
        },
        methods: {
            getQuerySelectList(){
                crudData("/api/txQueueReport").then((res) => {
                    this.queryCondition[0].list = res.txStatus;
                    this.queryCondition[1].list = res.txType;
                })
           }
          
        }
    }

</script>

<style scoped lang="scss">

  
  
</style>
