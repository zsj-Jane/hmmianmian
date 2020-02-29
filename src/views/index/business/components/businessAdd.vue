<template>
  <el-dialog center title="新增企业" :visible.sync="dialogFormVisible" width="600px">
    <el-form :model="form" :rules="rules" ref="form">
      <el-form-item label="企业编号" prop="eid" :label-width="formLabelWidth">
        <el-input v-model="form.eid" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="企业名称" prop="name" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="企业简称" prop="short_name" :label-width="formLabelWidth">
        <el-input v-model="form.short_name" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="企业简介" prop="intro" :label-width="formLabelWidth">
        <el-input v-model="form.intro" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="企业备注" :label-width="formLabelWidth">
        <el-input v-model="form.remark" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="doAdd">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
// 导入新增企业的方法
import { businessAdd } from "@/api/business.js";
export default {
  data() {
    return {
      // 对话框是否显示
      dialogFormVisible: false,
      // 跟表单绑定的对象
      form: {},
      // 表单标签宽度
      formLabelWidth: "110px",
      // 表单验证规则
      rules: {
        eid: [{ required: true, message: "企业编号不能为空", trigger: "blur" }],
        name: [{ required: true, message: "企业名称不能为空", trigger: "blur" }],
        short_name: [{ required: true, message: "企业简称不能为空", trigger: "blur" }],
        intro: [{ required: true, message: "企业简介不能为空", trigger: "blur" }],
      }
    };
  },
  methods: {
    // 确定按钮的点击事件
    doAdd() {
      // 做整个表单验证
      this.$refs.form.validate(v => {
        if (v) {
          // window.console.log("全部通过");
          // businessAdd({...this.form})
          // 优化：this.form本来就是一个对象
          businessAdd(this.form).then(res => {
            // window.console.log(res);
            if (res.data.code == 200) {
              // 成功提示
              this.$message.success("新增企业成功");
              // 关闭对话框
              this.dialogFormVisible = false;
              // 重置表单内容
              this.$refs.form.resetFields();
              // 刷新表格数据
              this.$parent.getList();
            } else {
              // 错误提示
              this.$message.error(res.data.message);
            }
          });
        }
      });
    }
  }
};
</script>

<style lang="less">
.el-dialog__close {
  color: rgba(255, 255, 255, 1) !important;
}
</style>