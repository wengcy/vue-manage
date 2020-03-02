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
        name: 'ReadMeterTable',
        components:{reportPage},
        data() {
            return {
               title:"抄表报表",
               queryCondition:[
                    {name:"表号",model:"meterGyh",placeholder:"请输入表号",tag:"input"},
                    {name:"抄表日期",model:"dateRange",tag:"date",type:"daterange",beginTime:"beginTime",endTime:"endTime"},
               ],
               otherQueryCondition:{
                    reportlet:"/gprs/tx/readmeter.cpt",
               }
            }
        }
    }

</script>

<style scoped lang="scss">

  
  
</style>
