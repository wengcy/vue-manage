<template>
    <div class="formItem">
        <el-input  :type="item.type" v-if="item.tag === 'input'" :placeholder="item.placeholder" v-model="formObj[item.model]"  class="handle-input mr10"></el-input>
        <el-select v-else-if="item.tag === 'select'" :placeholder="item.placeholder" v-model="formObj[item.model]" class="handle-input mr10">
            <el-option
            v-for="list in item.list"
            :key="list[item.key]"
            :label="list[item.label]"
            :value="list[item.key]">
            </el-option>
        </el-select>
        <el-date-picker v-else-if="item.tag === 'date'"
            :placeholder="item.placeholder"
            v-model="formObj[item.model]"
            :type="item.type"
            @change="(val)=>selectDateRange(val,item.beginTime,item.endTime)"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
        </el-date-picker>
        <el-checkbox-group  v-else-if="item.tag === 'checkbox'" v-model="item.checkList" @change="(val)=>getCheckBoxValue(val,item.model)">
            <el-checkbox  v-for="list in item.list"
                :key="list[item.key]" :label="list[item.key]"> {{list[item.label]}}
            </el-checkbox>
        </el-checkbox-group>
        <el-radio-group v-else-if="item.tag === 'radio'" v-model="formObj[item.model]">
            <el-radio v-for="list in item.list"
                :key="list[item.key]" :label="list[item.key]">{{list[item.label]}}</el-radio>
        </el-radio-group>
      
</div>
</template>
<script>
export default {
    name: 'formShow',
    props:{
        item: {
            type: Object,
            default: () => {
                return {}
            }
        },
        formObj: {
            type: Object,
            default: () => {
                return {}
            }
        }
    },
    methods:{
        getCheckBoxValue(value,model){
            this.formObj[model] = value;
        },
        selectDateRange(value,beginTime,endTime){
            if(Array.isArray(value)) {
                this.formObj[beginTime] = value[0];
                this.formObj[endTime] = value[1];
            }
          
        }
    }
}
</script>
<style scoped>
    .formItem {
        display: inline-block;
    }
  
    .mr10{
        margin-right: 10px;
    }

    .handle-input {
        width: 150px;
        display: inline-block;
    }
</style>