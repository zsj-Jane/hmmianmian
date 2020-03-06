<template>
  <div class="option-box">
    <el-radio v-if="isRadio" :label="label"></el-radio>
    <el-checkbox v-else :label="label"></el-checkbox>
    <el-input v-model="selfText" @input="onInput"></el-input>
    <el-upload
      class="avatar-uploader"
      :action="uploadUrl"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
export default {
  props:{
    label:String,
    text:String,
    image:String,
    isRadio:{
      type:Boolean,
      default:true
    }
  },
  data() {
    return {
      // 图片路径
      imageUrl: this.image,
      // 输入框文本
      selfText: this.text,
      // 上传路径
      uploadUrl:process.env.VUE_APP_BASE_URL+'/question/upload',
    };
  },
  methods: {
    // 只要输入框内容变化就会触发的事件
    onInput() {
        this.$emit('update:text',this.selfText);
    },
    // 选项中 上传成功的事件
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      // 将上传成功后，响应的图片地址 赋值给父组件
      this.$emit('update:image',res.data.url);
    },
    // 选项中 上传前的事件
    beforeAvatarUpload(file) {
      const isImage = file.type === "image/jpeg"||"image/png"||"image/gif";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isImage) {
        this.$message.error("上传头像图片只能是 图片 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isImage && isLt2M;
    }
  }
};
</script>

<style lang="less">
.option-box {
  display: flex;
  align-items: center;
  margin-top: 45px;
  .el-checkbox:last-of-type{
    margin-right: 30px;
  }
  .el-input {
    width: 476px;
    margin-right: 20px;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>