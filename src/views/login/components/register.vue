<template>
  <el-dialog title="用户注册" center :visible.sync="dialogFormVisible" width="603px">
    <el-form :model="form" :rules="rules" ref="regForm">
      <el-form-item label="头像" prop="avatar" :label-width="formLabelWidth">
        <el-upload
          name="image"
          class="avatar-uploader"
          :action="uploadUrl"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          v-model="form.avatar"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon" style="line-height:178px"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="昵称" prop="username" :label-width="formLabelWidth">
        <el-input v-model="form.username" autocomplete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
        <el-input v-model="form.email" autocomplete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="phone" :label-width="formLabelWidth">
        <el-input v-model="form.phone" autocomplete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" :label-width="formLabelWidth">
        <el-input v-model="form.password" autocomplete="off" clearable show-password></el-input>
      </el-form-item>
      <el-form-item label="图形码" prop="imgCode" :label-width="formLabelWidth">
        <el-row>
          <el-col :span="16">
            <el-input v-model="form.imgCode" autocomplete="off" clearable></el-input>
          </el-col>
          <el-col :span="7" :offset="1">
            <img :src="picCodeURL" alt class="img_code" @click="getNewImgCode" />
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="验证码" prop="rcode" :label-width="formLabelWidth">
        <el-row>
          <el-col :span="16">
            <el-input v-model="form.rcode" autocomplete="off" clearable></el-input>
          </el-col>
          <el-col :span="7" :offset="1">
            <el-button @click="getPhoneCode" :disabled="sec!=0">{{sec==0?'获取用户验证码':'还有'+sec+'秒'}}</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="doRegister">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
// import axios from 'axios'
// 导入发送短信验证请求的方法，注册账号请求
// import {sendSMS} from "../../../api/register";
// 路径导入简化，@符号表示/src目录
import { sendSMS, register } from "@/api/register";
export default {
  data() {
    return {
      // 是否显示对话框
      dialogFormVisible: false,
      // 设置文字宽度
      formLabelWidth: "65px",
      // 要上传图片的接口地址
      uploadUrl: process.env.VUE_APP_BASE_URL + "/uploads",
      // 上传成功后的头像图片的临时路径
      imageUrl: "",
      // 图形验证码的接口地址
      picCodeURL: process.env.VUE_APP_BASE_URL + "/captcha?type=sendsms",
      // 倒计时秒数
      sec: 0,
      // 跟表单元素双向绑定的对象
      form: {
        // 头像
        avatar: "",
        // 昵称
        username: "",
        // 邮箱
        email: "",
        // 手机号码
        phone: "",
        // 密码
        password: "",
        // 图形码
        imgCode: "",
        // 手机验证码
        rcode: ""
      },
      // 规则对象
      rules: {
        // 头像
        avatar: [
          { required: true, message: "头像不能为空", trigger: "change" }
        ],
        // 昵称
        username: [
          { required: true, message: "昵称不能为空", trigger: "blur" }
        ],
        // 邮箱
        email: [
          { required: true, message: "邮箱不能为空", trigger: "blur" },
          {
            pattern: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/,
            message: "邮箱格式不正确",
            trigger: "blur"
          }
        ],
        // 手机号码
        phone: [
          { required: true, message: "手机号码不能为空", trigger: "blur" },
          {
            pattern: /0?(13|14|15|17|18|19)[0-9]{9}/,
            message: "手机号格式不正确",
            trigger: "blur"
          }
        ],
        // 密码
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 5, max: 14, message: "密码长度在5-14之间", trigger: "change" }
        ],
        // 图像验证码
        imgCode: [
          { required: true, message: "图形码不能为空", trigger: "blur" },
          { len: 4, message: "图形码长度为4位", trigger: "blur" }
        ],
        // 手机验证码
        rcode: [
          { required: true, message: "验证码不能为空", trigger: "blur" },
          { len: 4, message: "验证码长度为4位", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    // 注册，表单验证
    doRegister() {
      // 验证表单所有元素
      this.$refs.regForm.validate(v => {
        if (v) {
          register({
            username: this.form.username,
            phone: this.form.phone,
            email: this.form.email,
            avatar: this.form.avatar,
            password: this.form.password,
            rcode: this.form.rcode
          }).then(res => {
            // window.console.log(res);
            if (res.data.code == 200) {
              // 提示注册成功
              this.$message.success("注册成功");
              // 注册成功，关闭对话框
              this.dialogFormVisible = false;
              // 重置注册表单（只能重置表单元素，其他的需要另外写）
              this.$refs.regForm.resetFields();
              // 头像的预览的清空需要另外设置
              this.imageUrl="";
            }else{
              this.$message.error(res.data.message);
            }
          });
        }
      });
    },
    // 图形验证码 图片的点击事件
    getNewImgCode() {
      // 浏览器缓存机制：当请求路径一致时，会把上次请求的结果拿来用
      // 解决办法：
      //    1、随机数 Math.random()
      //    2、时间戳（用得多一点） Date.now()
      this.picCodeURL =
        process.env.VUE_APP_BASE_URL + "/captcha?type=sendsms&t=" + Date.now();
    },
    // 获取手机验证码 按钮的点击事件
    getPhoneCode() {
      // 判断手机号码格式是否正确
      if (!/0?(13|14|15|17|18|19)[0-9]{9}/.test(this.form.phone)) {
        // 提示手机号码不合法
        this.$message.error("手机号码格式不正确");
        return;
      }
      // 判断图形验证码输入格式是否正确
      if (this.form.imgCode.length != 4) {
        // 提示图形验证码格式不正确
        return this.$message.error("验证码长度不匹配");
      }
      // 当手机号码和图形验证码都正确的情况下，执行手机验证码请求的代码
      this.sec = 60;
      // 倒计时，每隔一秒，秒数减1
      let timeID = setInterval(() => {
        this.sec--;
        if (this.sec == 0) {
          clearInterval(timeID);
        }
      }, 1000);
      // 发送请求获取验证码,调用封装方法
      sendSMS({
        code: this.form.imgCode,
        phone: this.form.phone
      }).then(res => {
        //成功回调
        window.console.log(res);
        if (res.data.code == 200) {
          // alert('获取验证码成功，验证码为'+res.data.data.captcha);
          this.$message.success(
            "获取验证码成功，验证码为" + res.data.data.captcha
          );
        } else {
          // alert(res.data.message);
          this.$message.error(res.data.message);
        }
      });
    },
    // 上传之前调用的函数
    // 作用：对上传文件做判断，成功才上传，否则给错误提示
    beforeAvatarUpload(file) {
      // 判断上传的文件类型
      const isImg = file.type === "image/jpeg" || "image/png" || "image/gif";
      // 判断上传文件的大小，1M=1024KB，1kb=1024B
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isImg) {
        this.$message.error("上传头像图片只能是图片格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      // 当既满足格式要求，又满足大小要求，就上传
      return isImg && isLt2M;
    },
    // 上传之后调用的回调函数
    handleAvatarSuccess(res, file) {
      //res为响应体，file中有上传成功后的图片信息
      // 把图片转换成临时路径 用于图片预览
      this.imageUrl = URL.createObjectURL(file.raw);
      // 上传成功后，给表单的头像元素 赋值 图片在服务器中的路径
      this.form.avatar = res.data.file_path;
      // 对头像上传的表单字段进行校验
      this.$refs.regForm.validateField("avatar");
    }
  }
};
</script>

<style lang="less">
.el-dialog__header {
  background: linear-gradient(to right, #0ac1f2, #1d92f2);
  .el-dialog__title {
    font-size: 18px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(254, 254, 254, 1);
  }
}
.img_code {
  width: 100%;
  height: 40px;
  vertical-align: middle;
}
.avatar-uploader {
  text-align: center;
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
</style>