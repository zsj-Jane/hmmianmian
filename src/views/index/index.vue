<template>
  <el-container class="my-container">
    <el-header class="my-header">
      <div class="left">
        <i class="el-icon-s-fold"></i>
        <img src="./images/logo.png" alt />
        <span>黑马面面</span>
      </div>
      <div class="right">
        <img src="./images/logo.png" alt />
        <span class="name">黑马，您好</span>
        <el-button type="primary" size="mini">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px" class="my-aside">Aside</el-aside>
      <el-main class="my-main">Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {};
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