<template>
  <div class="login-wrap">
    <!-- 左侧登录盒子 -->
    <div class="login-box">
      <!-- 标题栏 -->
      <div class="title-box">
        <img src="./images/login_logo.png" alt class="logo" />
        <span class="left-tit">黑马面面</span>
        <span class="line"></span>
        <span class="right-tit">用户登录</span>
      </div>
      <el-form :model="form" :rules="rules" ref="loginForm" label-width="41px">
        <el-form-item prop="phone">
          <el-input v-model="form.phone" prefix-icon="el-icon-user" clearable></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" prefix-icon="el-icon-lock" show-password clearable></el-input>
        </el-form-item>
        <el-form-item prop="captcha">
          <el-row>
            <el-col :span="17">
              <el-input v-model="form.captcha" prefix-icon="el-icon-key" clearable></el-input>
            </el-col>
            <el-col :span="7">
              <img :src="imgUrl" alt class="code" @click="changeImgCode"/>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item prop="agree">
          <el-checkbox v-model="form.agree">
            <span class="agree">
              我已阅读并同意
              <el-link type="primary">用户协议</el-link>和
              <el-link type="primary">隐私条款</el-link>
            </span>
          </el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="btn-box" @click="doLogin">登录</el-button>
          <el-button type="primary" class="btn-box" @click="showReg">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 右侧图片 -->
    <img src="./images/login_banner_ele.png" alt />

    <!-- 注册对话框 -->
    <reg ref="reg"></reg>
  </div>
</template>

<script>
// 导入注册组件
import reg from './components/register';
// 导入用户登录方法
import {login} from '@/api/login.js';
export default {
  components:{
    reg
  },
  data() {
    return {
      // 登录验证码的图片地址
      imgUrl:process.env.VUE_APP_BASE_URL+"/captcha?type=login",
      // 表单数据
      form: {
        phone: "",
        password: "",
        captcha: "",
        agree: false
      },
      // 规则对象
      rules: {
        phone: [{ required: true, message: "手机号不能为空", trigger: "blur" }],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" }
        ],
        captcha: [
          { required: true, message: "验证码不能为空", trigger: "blur" }
        ],
        agree: [
          // 多选框没有失去焦点，只有值改变事件
          // 因为checkbox其实他不可能值为空，除非你强行赋值为空
          // 所以我们不能拿值是否为空来做验证了
          // { required:true, message:'必须勾选同意用户协议',trigger:"change"},

          // 只有值为true才满足条件，否则代表不匹配
          {
            pattern: /true/,
            message: "必须勾选同意用户协议",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    // 登录的点击事件
    doLogin() {
      // 找到表单对象，调用validate方法
      this.$refs.loginForm.validate(v => {
        if (v) {
          login({
            phone:this.form.phone,
            password:this.form.password,
            code:this.form.captcha
          }).then(res=>{
            window.console.log(res);
            if(res.data.code==200){
              // 存储token
              window.localStorage.setItem('token',res.data.data.token);
              // 登录成功提示
              this.$message.success('登录成功');
              // 跳转页面到首页
              this.$router.push('/index');
            }else{
              // 错误提示
              this.$message.error(res.data.message);
            }
          })
        }
      });
    },
    // 注册的点击事件
    showReg(){
      this.$refs.reg.dialogFormVisible=true;
    },
    // 登录验证码 图片的点击事件
    changeImgCode(){
      // 点击刷新，切换验证码
      this.imgUrl = process.env.VUE_APP_BASE_URL+"/captcha?type=login&t="+Date.now();
    }
  }
};
</script>

<style lang="less">
.login-wrap {
  width: 100%;
  height: 100%;
  background: linear-gradient(
    225deg,
    rgba(20, 147, 250, 1),
    rgba(1, 198, 250, 1)
  );
  //   弹性布局
  display: flex;
  //   主轴排列：左右间距一样
  justify-content: space-around;
  //   侧轴：垂直居中
  align-items: center;

  .login-box {
    width: 478px;
    height: 550px;
    padding-right: 41px;
    // 把内间距内聚（默认是外扩）
    box-sizing: border-box;
    background: rgba(245, 245, 245, 1);

    .title-box {
      display: flex;
      align-items: center;
      margin-top: 50px;
      margin-left: 48px;
      margin-bottom: 43px;

      .logo {
        width: 22px;
        height: 17px;
        margin-right: 16px;
      }
      .left-tit {
        font-size: 24px;
        font-family: SourceHanSansCN;
        font-weight: 400;
        color: rgba(12, 12, 12, 1);
        margin-right: 14px;
      }
      .line {
        width: 1px;
        height: 28px;
        background: rgba(199, 199, 199, 1);
        margin-right: 12px;
      }
      .right-tit {
        font-size: 22px;
        font-family: PingFangSC;
        font-weight: 400;
        color: rgba(12, 12, 12, 1);
      }
    }

    .code {
      width: 100%;
      height: 40px;
      vertical-align: middle;
    }
    .agree {
      display: flex;
      align-items: center;
    }
    .btn-box {
      width: 100%;
      &:nth-child(2) {
        margin-left: 0;
        margin-top: 26px;
      }
    }
  }
}
</style>