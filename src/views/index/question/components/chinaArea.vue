<template>
  <el-cascader
    v-model="city"
    :options="options"
    :props="{ expandTrigger: 'hover' ,value:'label'}"
    @change="handleChange"
  ></el-cascader>
</template>

<script>
// 导入带省市区以及全部选项的省市区联动数据
import { regionDataPlus } from "element-china-area-data";
export default {
  name: "chinaArea",
  props: {
    // 父传子
    value: {
      default: ""
    }
  },
  data() {
    return {
      // 级联选择器的选项 联动数据：城市
      options: regionDataPlus,
      city: this.value
    };
  },
  methods: {
    handleChange() {
      // 子传父
      this.$emit("input", this.city);
    }
  },
  watch: {
    value(val){
      // value的值一旦发生变化，就表示父组件传递了一个新的城市数据过来，需要更新city的值，才能让级联选择器正常显示
      this.city = val;
    }
  },
};
</script>

<style>
</style>