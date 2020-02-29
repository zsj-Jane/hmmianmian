<template>
  <div>
    <!-- 顶部卡片 -->
    <el-card class="box-card">
      <el-form ref="formInline" :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="用户名称" prop="username">
          <el-input v-model="formInline.username" class="normal"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" prop="email">
          <el-input v-model="formInline.email" class="short"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role_id">
          <el-select v-model="formInline.role_id" placeholder="请选择状态" class="normal">
            <el-option label="管理员" value="2"></el-option>
            <el-option label="老师" value="3"></el-option>
            <el-option label="学生" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">搜索</el-button>
          <el-button>清除</el-button>
          <el-button type="primary" icon="el-icon-plus">新增用户</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 第二个卡片 -->
    <el-card class="box-card">
      <!-- 表格 -->
      <el-table border :data="tableData" style="width: 100%">
        <el-table-column type="index" label="序号" width="100"></el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="phone" label="电话"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="role" label="角色"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            {{scope.row.status?'启用':'禁用'}}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template>
            <el-button type="text">编辑</el-button>
            <el-button type="text"></el-button>
            <el-button type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[5,10, 20, 30, 40]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        background
      ></el-pagination>
    </el-card>
    <!-- 新增表单窗口 -->
  </div>
</template>

<script>
// 导入用户列表的接口方法
import { userList } from "@/api/user.js";
export default {
  name: "user",
  components: {},
  data() {
    return {
      // 行内表单绑定的数据
      formInline: {},
      // 表格绑定的数据源
      tableData: [],
      // 分页器的当前页数
      page: 1,
      // 分页容量
      size: 5,
      // 分页器的数据总量
      total: 0,
      // 记录上一次点击的数据
      oldItem: ""
    };
  },
  methods: {
    // 页容量改变事件
    handleSizeChange(size) {
      // console.log(size);
      // 赋值为改变后的页容量
      this.size = size;
      // 只要页容量改变了，都从第一页开始显示
      this.page = 1;
      // 根据新的页容量去重新请求数据
      this.getList();
    },
    // 页码改变事件
    handleCurrentChange(page) {
      // console.log(page);
      // 赋值为改变后的当前页数
      this.page = page;
      // 根据新的页码去重新请求数据
      this.getList();
    },
    // 获取用户列表数据方法
    getList() {
      userList({
        // 与 data中的分页容量、当前页保持一致
        page: this.page,
        limit: this.size,
        // 简写模式:解构赋值
        ...this.formInline
      }).then(res => {
        console.log(res);
        // 设置数据源
        this.tableData = res.data.data.items;
        // 设置数据总量
        this.total = res.data.data.pagination.total;
      });
    }
  },
  created() {
    // 获取用户列表数据
    this.getList();
  }
};
</script>

<style lang="less">
.box-card {
  margin-bottom: 19px;
  .short {
    width: 100px;
  }
  .normal {
    width: 149px;
  }
}
.el-pagination {
  text-align: center;
  margin-top: 30px;
}
</style>