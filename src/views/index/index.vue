<template>
  <el-container class="my-container">
    <!-- 顶部通栏 -->
    <el-header class="my-header">
      <!-- 左侧 -->
      <div class="left">
        <!-- 字体图标 -->
        <i
          :class="isCollapse ? 'el-icon-s-unfold': 'el-icon-s-fold'"
          @click="isCollapse=!isCollapse"
        ></i>
        <img src="./images/logo.png" alt />
        <span>黑马面面</span>
      </div>
      <!-- 右侧 -->
      <div class="right">
        <img :src="$store.state.avatar" alt />
        <span class="name">{{$store.state.username}}，您好</span>
        <el-button type="primary" size="mini" @click="doLogout">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <!-- 左侧部分 -->
      <el-aside width="auto" class="my-aside">
        <!-- 导航菜单栏 -->
        <!-- router属性为true，代表启用路由模式，效果：点击菜单会进行路由跳转，以被点击的菜单的跳index属性作为路径跳转 -->
        <el-menu router default-active="1" class="el-menu-vertical-demo" :collapse="isCollapse">
          <el-menu-item index="/index/chart" v-if="['超级管理员', '管理员'].includes($store.state.role)">
            <i class="el-icon-pie-chart"></i>
            <span slot="title">数据概览</span>
          </el-menu-item>
          <el-menu-item index="/index/user" v-if="['超级管理员', '管理员'].includes($store.state.role)">
            <i class="el-icon-user"></i>
            <span slot="title">用户列表</span>
          </el-menu-item>
          <el-menu-item index="/index/question" v-if="['超级管理员', '管理员', '老师', '学生'].includes($store.state.role)">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">题库列表</span>
          </el-menu-item>
          <el-menu-item index="/index/business" v-if="['超级管理员', '管理员', '老师'].includes($store.state.role)">
            <i class="el-icon-office-building"></i>
            <span slot="title">企业列表</span>
          </el-menu-item>
          <el-menu-item index="/index/subject" v-if="['超级管理员', '管理员', '老师', '学生'].includes($store.state.role)">
            <i class="el-icon-notebook-2"></i>
            <span slot="title">学科列表</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <!-- 右侧部分 -->
      <el-main class="my-main">
        <!-- 嵌套路由 -->
        <!-- 子路由的路由出口 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// 导入接口
import { logout } from "@/api/index.js";
// 导入操作token的文件
import { removeToken, getToken } from "@/utilis/token.js";
export default {
  data() {
    return {
      // username: "",
      // avatar: "",
      // 是否折叠左侧导航栏
      isCollapse: false
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
              // 清空vuex
              this.$store.commit('changeUsername','');
              this.$store.commit('changeAvatar','');
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
  beforeCreate() {
    // 如果得到null，表示没有token，即没有登录
    if (getToken() == null) {
      // 错误提示
      this.$message.error("请先登录");
      // 跳转到登录页面
      this.$router.push("/login");
    }
  },
  // created() {
  //   // 获取用户信息
  //   // 带入token给服务器请求
  //   // ajax是异步请求：异步请求要等同步任务执行完毕才执行
  //   getInfo().then(res => {
  //     //   window.console.log(res);
  //     if (res.data.code == 200) {
  //       // token正确
  //       this.username = res.data.data.username;
  //       // 需要拼接基地址和一个/
  //       this.avatar = process.env.VUE_APP_BASE_URL + "/" + res.data.data.avatar;
  //     } else if (res.data.code == 206) {
  //       //如果token有误，错误提示
  //       this.$message.error("登录状态异常，请重新登录");
  //       // 删除token
  //       removeToken();
  //       // 跳转到登录页面
  //       this.$router.push("/login");
  //     }
  //   });
  // }
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
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 5px 0px rgba(63, 63, 63, 0.35);
    .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: 200px;
      min-height: 400px;
    }
  }
  .my-main {
    background: rgba(232, 233, 236, 1);
  }
}
</style>