<template>
  <!-- 根标签 -->
  <div class="question-wrap">
    <!-- 顶部卡片 -->
    <el-card class="box-card">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="学科">
          <el-select v-model="formInline.subject" placeholder="请选择学科">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="阶段">
          <el-select v-model="formInline.step" placeholder="请选择阶段">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业">
          <el-select v-model="formInline.enterprise" placeholder="请选择企业">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="题型">
          <el-select v-model="formInline.type" placeholder="请选择题型">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <br />
        <el-form-item label="难度">
          <el-select v-model="formInline.difficulty" placeholder="请选择难度">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="作者">
          <el-input v-model="formInline.username" placeholder="作者"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="formInline.status" placeholder="请选择状态">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <el-input v-model="formInline.create_date" placeholder="选择日期"></el-input>
        </el-form-item>
        <br />
        <el-form-item label="标题" class="title_item">
          <el-input v-model="formInline.title"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">查询</el-button>
          <el-button>清除</el-button>
          <el-button type="primary" icon="el-icon-plus">新增试题</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 第二个卡片 -->
    <el-card class="box-card">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="title" label="题目"></el-table-column>
        <el-table-column prop="subject" label="学科.阶段"></el-table-column>
        <el-table-column prop="type" label="题型"></el-table-column>
        <el-table-column prop="enterprise" label="企业"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column prop="status" label="状态"></el-table-column>
        <el-table-column prop="address" label="访问量"></el-table-column>
        <el-table-column label="操作"></el-table-column>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 跟行内表单绑定的数据
      formInline: {},
      // 跟表格绑定的数据源
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
    // 页容量改变事件
    handleSizeChange(size) {
      // 赋值为改变后的页容量
      this.size = size;
      // 只要页容量改变了，都从第一页开始显示
      this.page = 1;
    },
    // 当前页码改变事件
    handleCurrentChange(page) {
      // 赋值为改变后的当前页数
      this.page = page;
    },
  }
};
</script>

<style lang="less">
.el-card:first-child .el-card__body {
  padding-left: 0;
  padding-top: 22px;
}
.el-form-item {
  .el-form-item__label {
    padding-right: 30px;
    padding-left: 30px;
  }
  &:not(:last-child) {
    .el-form-item__content {
      width: 217px;
    }
  }
  &.title_item {
    .el-form-item__content {
      width: 388px;
    }
  }
}
</style>