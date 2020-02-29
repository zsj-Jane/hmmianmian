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
          <el-select v-model="formInline.role_id" placeholder="请选择角色" class="normal">
            <el-option label="角色" value=""></el-option>
            <el-option label="管理员" value="2"></el-option>
            <el-option label="老师" value="3"></el-option>
            <el-option label="学生" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="doSearch">搜索</el-button>
          <el-button @click="clearSearch">清除</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="showAdd">新增用户</el-button>
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
            <span v-if="scope.row.status===1">启用</span>
            <span v-else style="color:red;">禁用</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button
              type="text"
              @click="changeStatus(scope.row)"
            >{{scope.row.status===1?'禁用':'启用'}}</el-button>
            <el-button type="text" @click="handleDelete(scope.row)">删除</el-button>
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
    <!-- 对话框 -->
    <userDialog ref="userDialog"></userDialog>
  </div>
</template>

<script>
// 导入用户列表的接口方法
import { userList,userStatus,userDel } from "@/api/user.js";
// 导入新增用户、编辑用户的组件
import userDialog from "./components/userDialog";
export default {
  name: "user",
  components: {
    userDialog
  },
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
      oldItem: null
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
    },
    // 搜索按钮的点击事件
    doSearch() {
      this.page = 1;
      this.getList();
    },
    // 清除按钮的点击事件
    clearSearch() {
      this.$refs.formInline.resetFields();
      this.page = 1;
      this.getList();
    },
    // 新增用户按钮的点击事件
    showAdd() {
      this.$refs.userDialog.dialogFormVisible = true;
      this.$refs.userDialog.isAdd = true;
      // 清空表单数据
      this.$refs.userDialog.form={};
    },
    // 编辑按钮的点击事件
    handleEdit(item) {
      this.$refs.userDialog.dialogFormVisible = true;
      this.$refs.userDialog.isAdd = false;
      if (item != this.oldItem) {
        this.$refs.userDialog.form = { ...item };
        this.oldItem = item;
      }
    },
    // 修改用户状态
    changeStatus(item){
      userStatus({
        id:item.id
      }).then(()=>{
        // 刷新数据
        this.getList();
      })
    },
    // 删除按钮的点击事件
    handleDelete(item){
      userDel({
        id:item.id
      }).then(res=>{
        // window.console.log(res);
        if(res.data.code==200){
          // 成功提示
          this.$message.success('删除用户成功');
          // 当前数据源（当前页的数据）只剩一条数据时，并且当前页不为第一页时，要刷新上一页的数据
          if(this.tableData.length==1&&this.page!=1){
            // 表示上一页
            this.page--;
          }
          // 默认刷新当前页数据
          this.getList();
        }else{
          // 错误提示
          this.$message.error(res.data.message);
        }
      })
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