<template>
  <div>
    <!-- 顶部卡片 -->
    <el-card class="box-card">
      <el-form ref="formInline" :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="企业编号" prop="eid">
          <el-input v-model="formInline.eid" class="short"></el-input>
        </el-form-item>
        <el-form-item label="企业名称" prop="name">
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
          <el-button type="primary" icon="el-icon-plus" @click="showAdd">新增企业</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 第二个卡片 -->
    <el-card class="box-card">
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="eid" label="企业编号"></el-table-column>
        <el-table-column prop="name" label="企业名称"></el-table-column>
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
    <!-- 新增企业对话框 -->
    <!-- 编辑企业对话框 -->
    <businessDialog ref="businessDialog"></businessDialog>
  </div>
</template>

<script>
// 导入获取企业列表信息接口
import { businessList, businessStatus, businessDel } from "@/api/business.js";
// 导入新增企业、编辑企业的组件
import businessDialog from "./components/businessDialog";
export default {
  name: "business",
  components: {
    // 新增企业、编辑企业
    businessDialog
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
      oldItem: "",
      // 标记刚刚点击的是否为新增
      isClickedAdd :false,
      // 点击新增前改动过的编辑表单数据
      tempForm:{}
    };
  },
  methods: {
    // 获取企业列表信息
    getList() {
      businessList({
        // 与 data中的分页容量、当前页保持一致
        page: this.page,
        limit: this.size,
        ...this.formInline
      }).then(res => {
        window.console.log(res);
        this.tableData = res.data.data.items;
        this.total = res.data.data.pagination.total;
      });
    },
    // 搜索按钮的点击事件
    doSearch() {
      // window.console.log(this.formInline);
      this.page=1;
      // 刷新数据
      this.getList();
    },
    // 清除筛选的点击事件
    clearSearch() {
      this.$refs.formInline.resetFields();
      this.page = 1;
      this.getList();
    },
    // 新增企业的点击事件
    showAdd() {
      // 打开对话框
      this.$refs.businessDialog.dialogFormVisible = true;
      // 标记为新增状态
      this.$refs.businessDialog.isAdd = true;
      // 在新增之前把改动的数据先保存起来
      this.tempForm = this.$refs.businessDialog.form;
      // 清空表单数据
      this.$refs.businessDialog.form = {};
      // 标记是否刚刚点过新增 改为true
      this.isClickedAdd = true;
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
    // 编辑按钮的点击事件
    handleEdit(item) {
      // 打开对话框
      this.$refs.businessDialog.dialogFormVisible = true;
      // 标记状态为编辑企业
      this.$refs.businessDialog.isAdd = false;
      if (item != this.oldItem) {
        // 读取当前行的表单内容
        this.$refs.businessDialog.form = { ...item };
        this.oldItem=item;
      }else if(this.isClickedAdd){
        // 把之前的form值取出来重新赋值
        this.$refs.businessDialog.form = this.tempForm;
      }
    },
    // 修改企业状态的点击事件
    changeStatus(item) {
      businessStatus({
        id: item.id
      }).then(() => {
        // 刷新表格数据
        this.getList();
      });
    },
    // 删除按钮的点击事件
    handleDelete(item) {
      businessDel({
        id: item.id
      }).then(res => {
        if (res.data.code == 200) {
          // 成功提示
          this.$message.success("删除企业成功");
          // 当前数据源（当前页的数据）只剩一条数据时，并且当前页不为第一页时，要刷新上一页的数据
          if (this.tableData.length == 1 && this.page != 1) {
            // 表示上一页
            this.page--;
          }
          // 默认刷新当前页的表格数据
          this.getList();
        } else {
          this.$message.error(res.data.message);
        }
      });
    }
  },
  created() {
    // 获取企业列表信息
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