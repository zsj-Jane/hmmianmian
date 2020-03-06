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
          <el-radio label="1">单选</el-radio>
          <el-radio label="2">多选</el-radio>
          <el-radio label="3">简答</el-radio>
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
      <el-form-item label="单选" v-if="form.type==1" :label-width="formLabelWidth">
        <el-radio-group v-model="form.single_select_answer">
          <!-- 选项组件 -->
          <optionItem
            v-for="(item, index) in form.select_options"
            :key="index"
            :label="item.label"
            :text.sync="item.text"
            :image.sync="item.image"
            :isRadio="true"
          ></optionItem>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="多选" v-else-if="form.type==2" :label-width="formLabelWidth">
        <el-checkbox-group v-model="form.multiple_select_answer">
          <optionItem
            v-for="(item, index) in form.select_options"
            :key="index"
            :label="item.label"
            :text.sync="item.text"
            :image.sync="item.image"
            :isRadio="false"
          ></optionItem>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="简答" v-else :label-width="formLabelWidth">
        <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="form.short_answer"></el-input>
      </el-form-item>
      <el-form-item>
        <!-- 分割线 -->
        <el-divider></el-divider>
      </el-form-item>
      <el-form-item label="解析视频" :label-width="formLabelWidth">
        <!-- 视频上传组件 -->
        <videoUpload :video.sync="form.video" ></videoUpload>
      </el-form-item>
      <el-form-item>
        <!-- 分割线 -->
        <el-divider></el-divider>
      </el-form-item>
      <el-form-item label="答案解析" :label-width="formLabelWidth">
        <wangEditor v-model="form.answer_analyze"></wangEditor>
      </el-form-item>
      <el-form-item>
        <!-- 分割线 -->
        <el-divider></el-divider>
      </el-form-item>
      <el-form-item label="试题备注" :label-width="formLabelWidth">
        <el-input v-model="form.remark"></el-input>
      </el-form-item>
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
import wangEditor from "./wangEditor.vue";
// 导入选项组件
import optionItem from "./optionItem.vue";
// 导入视频上传组件
import videoUpload from './videoUpload.vue';
export default {
  name: "questionAdd",
  components: {
    // 城市(省市区)组件
    chinaArea,
    // 富文本编辑 组件
    wangEditor,
    // 选项组件
    optionItem,
    // 视频上传组件
    videoUpload,
  },
  data() {
    return {
      // 对话框是否显示
      dialogFormVisible: false,
      // 跟表单绑定的对象
      form: {
        // 设置题型默认值为 单选
        type: "1",
        // 单选题绑定答案
        single_select_answer: "",
        // 多选题绑定答案
        multiple_select_answer: [],
        // 简答题绑定答案
        short_answer: "",
        // 跟选项绑定的数组：选项，介绍，图片介绍
        select_options: [
          {
            label: "A",
            text: "狗不理",
            image: ""
          },
          {
            label: "B",
            text: "猫不理",
            image: ""
          },
          {
            label: "C",
            text: "麻花",
            image: ""
          },
          {
            label: "D",
            text: "炸酱面",
            image: ""
          }
        ],
        // 存视频地址
        video:"",
      },
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
  .el-form {
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
  .el-divider {
    width: 832px;
    margin: 48px auto;
  }
  .avatar-uploader{
    text-align: left;
  }
}
</style>