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
          <el-button
            type="primary"
            icon="el-icon-plus"
            @click="$refs.subjectAdd.dialogFormVisible=true"
          >新增学科</el-button>
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
        <el-table-column prop="create_time" label="创建时间">
          <template slot-scope="scope">
            <!-- 把创建日期用全局过滤器过滤显示 -->
            {{scope.row.create_time | formatTime}}
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status===1">启用</span>
            <span v-else style="color:red;">禁用</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" v-if="childrenRoutes[3].meta.roles.includes($store.state.role)">
          <template slot-scope="scope">
            <el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button
              type="text"
              @click="changeStatus(scope.row)"
            >{{scope.row.status===1?'禁用':'启用'}}</el-button>
            <el-button type="text" @click="handleDelete(scope.row)" v-if="childrenRoutes[0].meta.roles.includes($store.state.role)">删除</el-button>
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
    <subjectEdit ref="subjectEdit"></subjectEdit>
  </div>
</template>

<script>
// 导入学科列表的相关接口方法的文件
import { subjectList, subjectStatus,subjectDel } from "@/api/subject.js";
// 导入新增学科组件
import subjectAdd from "./components/subjectAdd";
// 导入编辑学科组件
import subjectEdit from "./components/subjectEdit";
// 导入index子路由规则
import childrenRoutes from '@/router/childrenRoutes.js';
export default {
  name:"subject",
  components: {
    // 新增学科组件
    subjectAdd,
    // 编辑学科组件
    subjectEdit
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
      oldItem:"",
      // index子路由规则
      childrenRoutes
    };
  },
  methods: {
    // 给搜索添加点击事件
    doSearch() {
      console.log(this.formInline);
      this.page=1;
      // 刷新数据
      this.getList();
    },
    // 清除筛选的点击事件
    clearSearch() {
      // 表单对象的重置方法：要想表单有重置方法，需要给每一项添加prop属性，属性值与表单对象的属性名一一对应
      this.$refs.formInline.resetFields();
      // 根据最新的表单内容重新调用请求
      // 从第一页开始重新获取所有数据
      this.page = 1;
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
    },
    // 编辑按钮的点击事件
    handleEdit(item) {
      // 显示编辑学科对话框
      this.$refs.subjectEdit.dialogFormVisible = true;
      if (item!=this.oldItem) {
        // 如果当前行不是上一次点击的那一行时
        // 将当前编辑行的数据 赋值给 编辑学科表单
        // 拷贝一个新的对象：解决当编辑使，同时会修改页面表格数据的问题，原因为对象传值是地址传值
        this.$refs.subjectEdit.form = { ...item };
        // 并把记录的上一行数据记录成当前数据
        this.oldItem = item;
      }
    },
    // 删除按钮的点击事件
    handleDelete(item){
      subjectDel({
        id:item.id
      }).then(res=>{
        window.console.log(res);
        if (res.data.code==200) {
          // 成功提示
          this.$message.success('删除学科成功');
          // 当前数据源（当前页的数据）只剩一条数据时，并且当前页不为第一页时，要刷新上一页的数据
          if(this.tableData.length==1&&this.page!=1){
            // 表示上一页
            this.page--;
          }
          // 刷新表格数据（默认刷新当前页）
          this.getList();
        }else{
          // 错误提示
          this.$message.error(res.data.message);
        }
      })
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