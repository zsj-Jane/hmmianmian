<template>
  <!-- 根标签 -->
  <div class="question-wrap">
    <!-- 顶部卡片 -->
    <el-card class="box-card">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="学科">
          <!-- 学科下拉框组件 -->
          <subjectSelect v-model="formInline.subject"></subjectSelect>
        </el-form-item>
        <el-form-item label="阶段">
          <el-select v-model="formInline.step" placeholder="请选择阶段">
            <el-option label="初级" value="1"></el-option>
            <el-option label="中级" value="2"></el-option>
            <el-option label="高级" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业">
          <!-- 企业下拉框组件 -->
          <businessSelect v-model="formInline.enterprise"></businessSelect>
        </el-form-item>
        <el-form-item label="题型">
          <el-select v-model="formInline.type" placeholder="请选择题型">
            <el-option label="单选" value="1"></el-option>
            <el-option label="多选" value="2"></el-option>
            <el-option label="简答" value="3"></el-option>
          </el-select>
        </el-form-item>
        <br />
        <el-form-item label="难度">
          <el-select v-model="formInline.difficulty" placeholder="请选择难度">
            <el-option label="简单" value="1"></el-option>
            <el-option label="一般" value="2"></el-option>
            <el-option label="困难" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="作者">
          <el-input v-model="formInline.username" placeholder="作者"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="formInline.status" placeholder="请选择状态">
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
            value-format="yyyy-MM-DD"
            v-model="formInline.create_date"
            type="date"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>
        <br />
        <el-form-item label="标题" class="title_item">
          <el-input v-model="formInline.title"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="doSearch">搜索</el-button>
          <el-button>清除</el-button>
          <el-button type="primary" icon="el-icon-plus">新增试题</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 第二个卡片 -->
    <el-card class="box-card">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="index" label="序号" width="126"></el-table-column>
        <el-table-column prop="title" label="题目"></el-table-column>
        <el-table-column prop="subject_name" label="学科·阶段">
          <template slot-scope="scope">
            <!-- 使用局部过滤器 -->
            {{scope.row|formatSubjectStep}}
          </template>
        </el-table-column>
        <el-table-column prop="type" label="题型">
          <template slot-scope="scope">
            <span v-if="scope.row.type==1">单选</span>
            <span v-else-if="scope.row.type==2">多选</span>
            <span v-else>简答</span>
          </template>
        </el-table-column>
        <el-table-column prop="enterprise_name" label="企业"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status===1">启用</span>
            <span v-else style="color:red;">禁用</span>
          </template>
        </el-table-column>
        <el-table-column prop="reads" label="访问量"></el-table-column>
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
  </div>
</template>

<script>
// 导入题库相关接口
import { questionList } from "@/api/question.js";
export default {
  name: "question",
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
      total: 0,     
    };
  },
  methods: {
    // 获取题库列表数据
    getList() {
      questionList({
        page: this.page,
        limit: this.size,
        ...this.formInline
      }).then(res => {
        // 获取题库列表数据
        this.tableData = res.data.data.items;
        this.total = res.data.data.pagination.total;
      });
    },
    // 搜索按钮的点击事件
    doSearch() {
      this.page = 1;
      this.getList();
    },
    // 页容量改变事件
    handleSizeChange(size) {
      // 赋值为改变后的页容量
      this.size = size;
      // 只要页容量改变了，都从第一页开始显示
      this.page = 1;
      // 刷新数据
      this.getList();
    },
    // 当前页码改变事件
    handleCurrentChange(page) {
      // 赋值为改变后的当前页数
      this.page = page;
      // 刷新数据
      this.getList();
    }
  },
  created() {
    // 获取题库列表数据
    this.getList();
  },
  // 局部过滤器
  filters: {
    formatSubjectStep(val) {
      let stepName = "";
      if (val.step == 1) {
        stepName = "初级";
      } else if (val.step == 2) {
        stepName = "中级";
      } else {
        stepName = "高级";
      }
      return val.subject_name + " · " + stepName;
    }
  }
};
</script>

<style lang="less">
.question-wrap {
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
}
</style>