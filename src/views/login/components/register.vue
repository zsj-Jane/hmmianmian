<template>
  <el-dialog title="用户注册" center :visible.sync="dialogFormVisible" width="603px">
    <el-form :model="form" :rules="rules">
      <el-form-item label="昵称" prop="nickname" :label-width="formLabelWidth">
        <el-input v-model="form.nickname" autocomplete="off" clearable></el-input>
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
      <el-form-item label="图形码" :label-width="formLabelWidth">
        <el-row>
          <el-col :span="16">
            <el-input v-model="form.imgCode" autocomplete="off" clearable></el-input>
          </el-col>
          <el-col :span="7" :offset="1">
            <img :src="picCodeURL" alt class="img_code" @click="getNewImgCode" />
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="验证码" :label-width="formLabelWidth">
        <el-row>
          <el-col :span="16">
            <el-input v-model="form.code" autocomplete="off" clearable></el-input>
          </el-col>
          <el-col :span="7" :offset="1">
            <el-button @click="getPhoneCode" :disabled="sec!=0">{{sec==0?'获取用户验证码':'还有'+sec+'秒'}}</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
// import axios from 'axios'
// 导入发送短信验证请求的方法
import sendSMS from "../../../api/register";
export default {
  data() {
    return {
      // 是否显示对话框
      dialogFormVisible: false,
      // 设置文字宽度
      formLabelWidth: "65px",
      // 图形验证码的接口地址
      picCodeURL: process.env.VUE_APP_BASE_URL + "/captcha?type=sendsms",
      // 倒计时秒数
      sec: 0,
      // 跟表单元素双向绑定的对象
      form: {
        nickname: "",
        email: "",
        phone: "",
        password: "",
        imgCode: "",
        code: ""
      },
      // 规则对象
      rules: {
        nickname: [
          { required: true, message: "昵称不能为空", trigger: "blur" }
        ],
        email: [
          { required: true, message: "邮箱不能为空", trigger: "blur" },
          {
            pattern: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/,
            message: "邮箱格式不正确",
            trigger: "blur"
          }
        ],
        phone: [
          { required: true, message: "手机号码不能为空", trigger: "blur" },
          {
            pattern: /0?(13|14|15|17|18|19)[0-9]{9}/,
            message: "手机号格式不正确",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 5, max: 14, message: "密码长度在5-14之间", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    // 图形验证码 图片的点击事件
    getNewImgCode() {
      // 浏览器缓存机制：当请求路径一致时，会把上次请求的结果拿来用
      // 解决办法：
      //    1、随机数 Math.random()
      //    2、时间戳（用得多一点） Date.now()
      this.picCodeURL =
        process.env.VUE_APP_BASE_URL + "/captcha?type=sendsms" + Date.now();
    },
    // 获取手机验证码 按钮的点击事件
    getPhoneCode() {
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
</style>