<template>
  <el-dialog center title="编辑学科" :visible.sync="dialogFormVisible" width="600px">
    <el-form :model="form" :rules="rules" ref="form">
      <el-form-item label="学科编号" prop="rid" :label-width="formLabelWidth">
        <el-input v-model="form.rid" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="学科名称" prop="name" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="学科简称" :label-width="formLabelWidth">
        <el-input v-model="form.short_name" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="学科简介" :label-width="formLabelWidth">
        <el-input v-model="form.intro" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="学科备注" :label-width="formLabelWidth">
        <el-input v-model="form.remark" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="doEdit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
// 导入编辑学科的方法
import { subjectEdit } from "@/api/subject.js";
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
        rid: [{ required: true, message: "学科编号不能为空", trigger: "blur" }],
        name: [{ required: true, message: "学科名称不能为空", trigger: "blur" }]
      },
    };
  },
  methods: {
    // 确定按钮的点击事件
    doEdit() {
      subjectEdit(this.form).then(res => {
        // window.console.log(res);
        if (res.data.code == 200) {
          // 成功提示
          this.$message.success("编辑成功");
          // 关闭编辑对话框
          this.dialogFormVisible = false;
          // 刷新表格数据
          this.$parent.getList();
        } else {
          // 错误提示
          this.$message.error(res.data.message);
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