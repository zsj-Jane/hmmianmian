<template>
  <el-select v-model="subject" placeholder="请选择学科" @change="selChange">
    <el-option v-if="isSearch" value="">所有学科</el-option>
    <el-option
      v-for="(item, index) in subjectList"
      :key="index"
      :label="item.name"
      :value="item.id"
    ></el-option>
  </el-select>
</template>

<script>
// 导入获取学科列表
import { subjectList } from "@/api/subject.js";
export default {
  name: "subjectSelect",
  props: {
    // 父传子,并且使用v-model，默认props使用value
    value: {
        // 默认值为空
        default:""
    },
    isSearch:{
      type:Boolean,
      default:false
    }
  },
  data() {
    return {
      subject: this.value,
      // 学科列表数据
      subjectList: []
    };
  },
  watch: {
    // 监听学科下拉框的值，只要下拉框的值改变了，这里subject的值跟着改变
    value(val){
      this.subject=val;
    }
  },
  methods: {
    //   企业下拉框的值改变事件
      selChange(){
        // 子传父,事件名必须为input，因为用了v-model
        this.$emit('input',this.subject);
      }
  },
  created() {
    // 获取学科列表数据(启用的)
    subjectList({
      status: 1
    }).then(res => {
      this.subjectList = res.data.data.items;
    });
  }
};
</script>

<style>
</style>