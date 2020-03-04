<template>
  <el-select v-model="enterprise" placeholder="请选择企业" @change="selChange">
    <el-option
      v-for="(item, index) in businessList"
      :key="index"
      :label="item.name"
      :value="item.id"
    ></el-option>
  </el-select>
</template>

<script>
// 导入获取企业列表
import { businessList } from "@/api/business.js";
export default {
  // 父传子
  props: {
    value: {
      default: ""
    }
  },
  data() {
    return {
      enterprise: this.value,
      // 企业列表数据
      businessList: []
    };
  },
  methods: {
    // 企业下拉框的值的改变事件：子传父
    selChange() {
      this.$emit("input", this.enterprise);
    }
  },
  created() {
    // 获取企业列表数据(启用的)
    businessList({
      status: 1
    }).then(res => {
      this.businessList = res.data.data.items;
    });
  }
};
</script>

<style>
</style>