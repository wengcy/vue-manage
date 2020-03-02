<template>
  <div>
    <el-select v-model="frequencyEditForm.weekCheckList" multiple>
      <el-option
        v-for="(item, index) in weekList"
        :key="index"
        :value="item.value"
        :label="item.label"
      >
       <span class="check"></span>
       <span style="margin-left: 8px">{{item.label}}</span>
      </el-option>
    </el-select>
  </div>
</template>

<script>
import tablePage from "@/components/common/TablePage";
export default {
  name: "basetable",
  components: { tablePage },
  data() {
    return {
      frequencyEditForm: {
        weekCheckList: []
      },
      weekList: [
        {
          value: "星期一",
          label: "周一",
          isCheck: false
        },
        {
          value: "星期二",
          label: "周二",
          isCheck: false
        },
        {
          value: "星期三",
          label: "周三",
          isCheck: false
        },
        {
          value: "星期四",
          label: "周四",
          isCheck: false
        },
        {
          value: "星期五",
          label: "周五",
          isCheck: false
        },
        {
          value: "星期六",
          label: "周六",
          isCheck: false
        },
        {
          value: "星期日",
          label: "周日",
          isCheck: false
        }
      ]
    }
  },
  methods:{
      
    }
};
</script>

<style scoped>
.el-select-dropdown.is-multiple .el-select-dropdown__item.selected::after{
    content: "";
}


.el-select-dropdown.is-multiple .el-select-dropdown__item.selected .check{
    background-color: #409eff;
    border-color: #409eff;
}


.el-select-dropdown.is-multiple .el-select-dropdown__item.selected .check:after{
    transform: rotate(45deg) scaleY(1);
}

.el-select-dropdown.is-multiple .el-select-dropdown__item .check::after{
    box-sizing: content-box;
    content: "";
    border: 1px solid #fff;
    border-left: 0;
    border-top: 0;
    height: 7px;
    left: 4px;
    position: absolute;
    top: 1px;
    transform: rotate(45deg) scaleY(0);
    width: 3px;
    transition: transform .15s ease-in .05s;
    transform-origin: center;
}

.el-select-dropdown.is-multiple .el-select-dropdown__item .check{
    display: inline-block;
    position: relative;
    top:2px;
    border: 1px solid #dcdfe6;
    border-radius: 2px;
    box-sizing: border-box;
    width: 14px;
    height: 14px;
    background-color: #fff;
    z-index: 1;
    transition: border-color .25s cubic-bezier(.71,-.46,.29,1.46),background-color .25s cubic-bezier(.71,-.46,.29,1.46);
}
</style>
