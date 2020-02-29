<template>
  <div>
    <!-- 顶部卡片 -->
    <el-card class="box-card">
      <el-form ref="formInline" :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="学科编号" prop="rid">
          <el-input v-model="formInline.rid" class="short"></el-input>
        </el-form-item>
        <el-form-item label="学科名称" prop="name">
          <el-input v-model="formInline.name" class="normal"></el-input>
        </el-form-item>
        <el-form-item label="创建者" prop="username"> 
          <el-input v-model="formInline.username" class="short"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="formInline.status" placeholder="请选择状态" class="normal">
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="doSearch">搜索</el-button>
          <el-button @click="clearSearch">清除</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="$refs.subjectAdd.dialogFormVisible=true">新增学科</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 第二个卡片 -->
    <el-card class="box-card">
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="rid" label="学科编号"></el-table-column>
        <el-table-column prop="name" label="学科名称"></el-table-column>
        <el-table-column prop="short_name" label="简称"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column prop="create_time" label="创建时间"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status===1">启用</span>
            <span v-else style="color:red;">禁用</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              type="text"
              @click="changeStatus(scope.row)"
            >{{scope.row.status===1?'禁用':'启用'}}</el-button>
            <el-button type="text" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
    <subjectAdd ref="subjectAdd"></subjectAdd>
  </div>
</template>

<script>
// 导入学科列表的相关接口方法的文件
import { subjectList, subjectStatus } from "@/api/subject.js";
// 导入新增学科
import subjectAdd from './components/subjectAdd';
export default {
  components:{
    subjectAdd
  },
  data() {
    return {
      // 行内表单绑定的数据
      formInline: {
        rid: "",
        name: "",
        username: "",
        status: ""
      },
      // 表格绑定的数据源
      tableData: [],
      // 分页器的当前页数
      page: 1,
      // 分页容量
      size: 5,
      // 分页器的数据总量
      total: 0
    };
  },
  methods: {
    // 给搜索添加点击事件
    doSearch(){
      console.log(this.formInline);
      this.getList();
    },
    // 清除筛选的点击事件
    clearSearch(){
      // 表单对象的重置方法：要想表单有重置方法，需要给每一项添加prop属性，属性值与表单对象的属性名一一对应
      this.$refs.formInline.resetFields();
      // 根据最新的表单内容重新调用请求
      // 从第一页开始重新获取所有数据
      this.page=1;
      this.getList();
    },
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
    // 获取学科列表数据方法
    getList() {
      subjectList({
        // 与 data中的分页容量、当前页保持一致
        page: this.page,
        limit: this.size,
        // name:this.formInline.name,
        // rid:this.formInline.rid,
        // username:this.formInline.username,
        // status:this.formInline.status,
        // 简写模式:解构赋值
        ...this.formInline
      }).then(res => {
        // 设置数据源
        this.tableData = res.data.data.items;
        // 设置数据总量
        this.total = res.data.data.pagination.total;
      });
    },
    // 学科状态修改的点击事件
    changeStatus(item) {
      subjectStatus({
        id: item.id
      }).then(() => {
        // 刷新表格：重新获取表格数据
        this.getList();
      });
    }
  },
  created() {
    // 获取学科列表数据
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