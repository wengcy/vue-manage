<template>
    <div>
       <table-page 
        :title="title" 
        :url="url"
        :columns="columns" 
        :queryCondition="queryCondition"
        :rules="rules"
        :formCondition="formCondition" 
        >
       </table-page>

    </div>
</template>

<script>
    import tablePage from '@/components/common/TablePage'
    export default {
        name: 'basetable',
        components:{tablePage},
        data() {
            return {
                title:"通用表格",
                url:{
                    add:"/api/price/addPrice",
                    update:"/api/price/updatePrice",
                    query:"/api/price/queryPriceByPage",
                    delete:"/api/price/deletePrice"
                },
                columns:[
                    {label:"id",prop:"id"},
                    {label:"供应商",prop:"supplier",sortable:true},
                    {label:"品名",prop:"name"},
                    {label:"幅度",prop:"trend"}
                ],
                queryCondition:[
                    {name:"供应商",model:"supplier",placeholder:"请输入供应商",tag:"input"},
                    {name:"兴趣",model:"loveList",checkList:[],tag:"checkbox",label:"label",key:"value",list:[
                         {
                            label:"读书",
                            value:"1"
                        },
                         {
                            label:"练字",
                            value:"2"
                        }
                    ]},
                    {name:"性别",model:"sex",tag:"radio",label:"label",key:"value",list:[
                         {
                            label:"男",
                            value:"男"
                        },
                         {
                            label:"女",
                            value:"女"
                        }
                    ]},
                     {name:"是否上班",model:"sb",tag:"radio",label:"label",key:"value",list:[
                         {
                            label:"是",
                            value:"1"
                        },
                         {
                            label:"否",
                            value:"0"
                        }
                    ]},
                    {name:"品名",model:"name",placeholder:"请输入供应商",tag:"input",type:"textarea"},
                    {name:"日期",model:"date",placeholder:"请选择日期",tag:"date",type:"date"},
                    {name:"日期范围",model:"dateRange",tag:"date",type:"daterange",beginTime:"beginTime",endTime:"endTime"},
                    {name:"幅度",model:"trend",placeholder:"请选择幅度",tag:"select",label:"label",key:"value",list:[
                        {
                            label:"涨",
                            value:"涨"
                        },
                         {
                            label:"跌",
                            value:"跌"
                        },
                         {
                            label:"平",
                            value:"平"
                        }
                    ]}
                ],
                formCondition:[
                    {name:"供应商",model:"supplier",placeholder:"请输入供应商",tag:"input"},
                    {name:"品名",model:"name",placeholder:"请输入供应商",tag:"input"},
                    {name:"幅度",model:"trend",placeholder:"请选择幅度",tag:"select",label:"label",key:"value",list:[
                        {
                            label:"涨",
                            value:"涨"
                        },
                         {
                            label:"跌",
                            value:"跌"
                        },
                         {
                            label:"平",
                            value:"平"
                        }
                    ]
                    }
                ],
                rules: {
                    supplier: [
                        { required: true, message: '请输入厂商', trigger: 'blur'},
                    ],
                    name: [
                        { required: true, message: '请输入品名', trigger: 'blur'},
                    ],
                    trend: [
                        { required: true, message: '请选择幅度', trigger: 'change'},
                    ]
                }
            }
        },
        methods: {
        }
    }

</script>

<style scoped>
</style>
