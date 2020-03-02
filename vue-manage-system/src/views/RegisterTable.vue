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
        name: 'RegisterTable',
        components:{reportPage},
        data() {
            return {
               title:"注册报表",
               queryCondition:[
                    {name:"厂家",model:"changJiaId",placeholder:"请输入厂家",tag:"select",label:"changJiaDes",key:"changJiaId",list:[]},
                    {name:"表号",model:"meterGyh",placeholder:"请输入表号",tag:"input"},
               ],
               otherQueryCondition:{
                    reportlet:"/gprs/tx/regist.cpt"
               }
            }
        },
        created() {
           this.getQuerySelectList();
        },
        methods: {
            getQuerySelectList(){
                crudData("/api/registerReport").then((res) => {
                    this.queryCondition[0].list = res.changJia;
                })
           }
          
        }
    }

</script>