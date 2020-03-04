<template>
  <el-dialog class="questionAdd" fullscreen title="新增题库" :visible.sync="dialogFormVisible">
    <el-form :model="form" :rules="rules" ref="form">
      <el-form-item label="学科" prop="subject" :label-width="formLabelWidth">
        <!-- 学科下拉框组件 -->
        <subjectSelect v-model="form.subject"></subjectSelect>
      </el-form-item>

      <el-form-item label="阶段" prop="step" :label-width="formLabelWidth">
        <el-select v-model="form.step" placeholder="请选择阶段">
          <el-option label="初级" value="1"></el-option>
          <el-option label="中级" value="2"></el-option>
          <el-option label="高级" value="3"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="企业" prop="enterprise" :label-width="formLabelWidth">
        <!-- 企业下拉框组件 -->
        <businessSelect v-model="form.enterprise"></businessSelect>
      </el-form-item>
      <el-form-item label="城市" prop="city" :label-width="formLabelWidth">
        <!-- 城市组件 -->
        <chinaArea v-model="form.city" class="city"></chinaArea>
      </el-form-item>
      <el-form-item label="题型" prop="type" :label-width="formLabelWidth">
        <el-radio-group v-model="form.type">
          <el-radio :label="1">单选</el-radio>
          <el-radio :label="2">多选</el-radio>
          <el-radio :label="3">简答</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="难度" prop="difficulty" :label-width="formLabelWidth">
        <el-radio-group v-model="form.difficulty">
          <el-radio :label="1">简单</el-radio>
          <el-radio :label="2">一般</el-radio>
          <el-radio :label="3">困难</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <!-- 分割线 -->
        <el-divider></el-divider>
      </el-form-item>
      <el-form-item label="试题标题" :label-width="formLabelWidth">
        <wangEditor v-model="form.title"></wangEditor>
      </el-form-item>
      <el-form-item :label-width="formLabelWidth"></el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="save">保 存</el-button>
    </div>
  </el-dialog>
</template>

<script>
// 导入城市(省市区)组件
import chinaArea from "./chinaArea.vue";
// 导入富文本编辑 组件
import wangEditor from './wangEditor.vue';
export default {
  name: "questionAdd",
  components: {
    // 城市(省市区)组件
    chinaArea,
    // 富文本编辑 组件
    wangEditor
  },
  data() {
    return {
      // 对话框是否显示
      dialogFormVisible: false,
      // 跟表单绑定的对象
      form: {},
      // 表单标签宽度
      formLabelWidth: "100px",
      // 表单验证规则
      rules: {}
    };
  },
  methods: {
    // 确定按钮的点击事件
    save() {
      // 做整个表单验证
      this.$refs.form.validate(v => {
        if (v) {
          window.console.log("全部通过");
        }
      });
    }
  }
};
</script>

<style lang="less">
.questionAdd {
  .el-form{
    width: 832px;
    margin: 0 auto;
  }
  .el-select {
    width: 364px;
  }
  .el-form-item__label {
    padding-right: 41px;
  }
  .city {
    width: 364px;
  }
  .el-divider{
    width: 832px;
    margin:48px auto;
  }
}
</style>