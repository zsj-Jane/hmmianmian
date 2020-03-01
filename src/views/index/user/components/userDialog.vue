<template>
  <el-dialog center :title="isAdd?'新增用户':'编辑用户'" :visible.sync="dialogFormVisible" width="447px">
    <el-form :model="form" :rules="rules" ref="form">
      <el-form-item label="用户名" prop="username" :label-width="formLabelWidth">
        <el-input v-model="form.username" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
        <el-input v-model="form.email" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="电话" prop="phone" :label-width="formLabelWidth">
        <el-input v-model="form.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="角色" prop="role_id" :label-width="formLabelWidth">
        <el-select v-model="form.role_id" placeholder="请选择角色">
          <el-option label="管理员" value="2"></el-option>
          <el-option label="老师" value="3"></el-option>
          <el-option label="学生" value="4"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态" :label-width="formLabelWidth">
        <el-select v-model="form.status" placeholder="请选择状态">
          <el-option label="启用" value="1"></el-option>
          <el-option label="禁用" value="0"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="用户备注" :label-width="formLabelWidth">
        <el-input v-model="form.remark" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="save">保 存</el-button>
    </div>
  </el-dialog>
</template>

<script>
// 导入新增用户,编辑用户的方法
import { userAdd, userEdit } from "@/api/user.js";
export default {
  name: "userDialog",
  data() {
    return {
      // 对话框是否显示
      dialogFormVisible: false,
      // 跟表单绑定的对象
      form: {},
      // 表单标签宽度
      formLabelWidth: "90px",
      // 表单验证规则
      rules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" }
        ],
        email: [
          { required: true, message: "邮箱不能为空", trigger: "blur" },
          {
            pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
            message: "邮箱格式不正确",
            trigger: "blur"
          }
        ],
        phone: [
          { required: true, message: "电话不能为空", trigger: "blur" },
          {
            pattern: /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/,
            message: "电话格式不正确",
            trigger: "blur"
          }
        ],
        role_id: [{ required: true, message: "角色不能为空", trigger: "change" }]
      },
      // 判断是否为新增页面，true则为新增页面，false则为编辑页面
      isAdd: true
    };
  },
  methods: {
    // 确定按钮的点击事件
    save() {
      // 做整个表单验证
      this.$refs.form.validate(v => {
        if (v) {
          // window.console.log("全部通过");
          if (this.isAdd) {
            // 调用新增用户的接口
            // businessAdd({...this.form})
            // 优化：this.form本来就是一个对象
            userAdd(this.form).then(res => {
              // window.console.log(res);
              if (res.data.code == 200) {
                // 成功提示
                this.$message.success("新增用户成功");
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
          } else {
            // 调用编辑用户的接口
            userEdit(this.form).then(res => {
              // window.console.log(res);
              if (res.data.code == 200) {
                // 成功提示
                this.$message.success("编辑用户成功");
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