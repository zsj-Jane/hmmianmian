<template>
  <div>
    <!-- 顶部卡片 -->
    <el-card class="box-card">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="学科编号">
          <el-input v-model="formInline.rid" class="short"></el-input>
        </el-form-item>
        <el-form-item label="学科名称">
          <el-input v-model="formInline.name" class="normal"></el-input>
        </el-form-item>
        <el-form-item label="创建者">
          <el-input v-model="formInline.username" class="short"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="formInline.state" placeholder="请选择状态" class="normal">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">搜索</el-button>
          <el-button>清除</el-button>
          <el-button type="primary" icon="el-icon-plus">新增学科</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 第二个卡片 -->
    <el-card class="box-card">
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="序号"></el-table-column>
        <el-table-column prop="rid" label="学科编号"></el-table-column>
        <el-table-column prop="name" label="学科名称"></el-table-column>
        <el-table-column prop="address" label="简称"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column prop="time" label="创建时间"></el-table-column>
        <el-table-column prop="state" label="状态"></el-table-column>
        <el-table-column prop="option" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        background
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 行内表单绑定的数据
      formInline: {
        rid: "",
        name: "",
        username: "",
        state: ""
      },
      // 表格绑定的数据源
      tableData: [],
      // 分页器的当前页数
      page: 1,
      // 分页容量
      size: 10,
      // 分页器的数据总量
      total: 0
    };
  },
  methods: {
    // 页容量改变事件
    handleSizeChange(size) {
      console.log(size);
    },
    // 页码改变事件
    handleCurrentChange(page) {
      console.log(page);
    }
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
.el-pagination{
  text-align: center;
  margin-top: 30px;
}
</style>