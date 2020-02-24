<template>
  <el-container class="my-container">
    <el-header class="my-header">
      <div class="left">
        <i class="el-icon-s-fold"></i>
        <img src="./images/logo.png" alt />
        <span>黑马面面</span>
      </div>
      <div class="right">
        <img :src="avatar" alt />
        <span class="name">{{username}}，您好</span>
        <el-button type="primary" size="mini" @click="doLogout">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px" class="my-aside">Aside</el-aside>
      <el-main class="my-main">Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
// 导入接口
import { getInfo, logout } from "@/api/index.js";
// 导入删除token的文件
import { removeToken } from "@/utilis/token.js";
export default {
  data() {
    return {
      username: "",
      avatar: ""
    };
  },
  methods: {
    //   退出登录
    doLogout() {
      this.$confirm("您将退出本系统，是否继续退出", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          logout().then(res => {
            if (res.data.code == 200) {
              // 退出成功提示
              this.$message.success("退出成功!");
              // 删除本地token
              removeToken();
              // 跳转到登录页面
              this.$router.push("/login");
            }
          });
        })
        .catch(() => {
          // 取消退出提示
          this.$message({
            type: "success",
            message: "取消退出!"
          });
        });
    }
  },
  created() {
    //   获取用户信息
    getInfo().then(res => {
      //   window.console.log(res);
      this.username = res.data.data.username;
      //   需要拼接基地址和一个/
      this.avatar = process.env.VUE_APP_BASE_URL + "/" + res.data.data.avatar;
    });
  }
};
</script>

<style lang="less">
.my-container {
  height: 100%;
  .my-header {
    height: 60px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 5px 0px rgba(63, 63, 63, 0.35);
    display: flex;
    justify-content: space-between;
    .left {
      height: 100%;
      display: flex;
      align-items: center;
      i {
        font-size: 24px;
        margin-right: 22px;
        margin-left: 4px;
      }
      img {
        width: 33px;
        height: 28px;
        margin-right: 11px;
      }
      span {
        font-size: 22px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: rgba(73, 161, 255, 1);
      }
    }
    .right {
      height: 100%;
      display: flex;
      align-items: center;
      img {
        width: 43px;
        height: 43px;
        margin-right: 9px;
      }
      span.name {
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: rgba(99, 99, 99, 1);
        margin-right: 38px;
      }
    }
  }
  .my-aside {
    background-color: red;
  }
  .my-main {
    background-color: skyblue;
  }
}
</style>