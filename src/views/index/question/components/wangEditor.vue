<template>
  <!-- <div ref="editor"></div> -->
  <div>
    <div class="toolbar" ref="toolbar"></div>
    <div class="content" ref="content"></div>
  </div>
</template>

<script>
// 导入富文本编辑器
import wangEditor from "wangeditor";
export default {
  name:"wangEditor",
  props: {
      value:{
          type:String,
          default:""
      }
  },
  data() {
    return {
      editor: {}
    };
  },
  mounted() {
    // 实例化编辑器对象，并传入div Dom对象中
    // let editor = new wangEditor(this.$refs.editor);
    // 自定义样式
    this.editor = new wangEditor(this.$refs.toolbar, this.$refs.content);
    // 只要内容发生变化就触发的事件 监听富文本值的改变事件
    this.editor.customConfig.onchange = (html)=> {
      // html 即变化之后的内容
      this.$emit('input',html);
    };
    this.editor.create();
    this.editor.txt.html(this.value);
  },
  methods: {
    // 获取富文本编辑器的内容
    getContent() {
      return this.editor.txt.html();
    },
    // 设置富文本编辑器的内容
    setContent(val) {
      this.editor.txt.html(val);
    }
  }
};
</script>

<style>
.toolbar {
  border: 1px solid #ccc;
}
.content {
  border: 1px solid #ccc;
  height: 50px;
}
</style>