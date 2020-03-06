<template>
  <div class="videoUpload">
    <el-upload
      class="avatar-uploader"
      :action="uploadUrl"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传视频格式文件,且不超过2MB</div>
    </el-upload>

    <!-- 预览视频 -->
    <video :src="videoUrl" controls></video>
  </div>
</template>

<script>
export default {
  name: "videoUpload",
  props:['video'],
  data() {
    return {
      // 视频上传的接口路径
      uploadUrl: process.env.VUE_APP_BASE_URL + "/question/upload",
      // 上传后用来预览视频的路径
      videoUrl: ""
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.videoUrl = URL.createObjectURL(file.raw);
      this.$emit('update:video',res.data.url);
    },
    beforeAvatarUpload(file) {
      const isVideo = file.type === "video/mp4";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isVideo) {
        this.$message.error("上传视频只能是 mp4 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传视频片大小不能超过 2MB!");
      }
      return isVideo && isLt2M;
    }
  }
};
</script>

<style>
</style>