<template>
  <div class="chart_wrap">
    <!-- 顶部卡片 -->
    <el-card class="box-card">
      <ul>
        <li>
          <span class="circle">{{topData.increment_users}}</span>
          <span>今日新增用户</span>
        </li>
        <li>
          <span class="circle">{{topData.total_users}}</span>
          <span>总用户量</span>
        </li>
        <li>
          <span class="circle">{{topData.increment_questions}}</span>
          <span>新增试题</span>
        </li>
        <li>
          <span class="circle">{{topData.total_questions}}</span>
          <span>总试题量</span>
        </li>
        <li>
          <span class="circle">{{topData.total_done_questions}}</span>
          <span>总刷题量</span>
        </li>
        <li>
          <span class="circle">{{topData.personal_questions}}</span>
          <span>人均刷题量</span>
        </li>
      </ul>
    </el-card>
    <!-- 第二个卡片 -->
    <el-card class="box-card">
      <div ref="pie" class="pie"></div>
    </el-card>
  </div>
</template>

<script>
// 导入数据概览的接口方法
import { chartData, chartStatistics } from "@/api/chart.js";
// 导入echarts
import echarts from "echarts";
export default {
  name: "chart",
  data() {
    return {
      topData: ""
    };
  },
  created() {
    // 获取面板数据
    chartData().then(res => {
      // console.log(res);
      this.topData = res.data.data;
    });
  },
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(this.$refs.pie);
    // 获取 企业题目数据统计
    chartStatistics().then(res => {
      // window.console.log(res);
      // 把响应数据中的企业名取出来，组成一个新的数组
      let names = res.data.data.map(item => {
        return item.name;
      });
      // 指定图表的配置项和数据
      var option = {
        title: {
          text: "整体数据",
          left: "left"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          right: 10,
          data: names
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "30",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: res.data.data
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    });
  }
};
</script>

<style lang="less">
.chart_wrap {
  ul {
    padding: 0;
    margin: 0;
    list-style: none;
    display: flex;
    justify-content: space-around;
    li {
      display: flex;
      // 修改主轴方向为y轴
      flex-direction: column;

      .circle {
        width: 99px;
        height: 99px;
        border: 2px solid rgba(0, 134, 250, 1);
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 35px;
        font-family: SimHei;
        font-weight: 400;
        color: rgba(0, 134, 250, 1);
        margin-bottom: 10px;
      }
      &:nth-child(3),
      &:nth-child(4) {
        .circle {
          border: 2px solid rgba(247, 97, 55, 1);
          color: rgba(247, 98, 56, 1);
        }
      }
      &:nth-child(5),
      &:nth-child(6) {
        .circle {
          border: 2px solid rgba(85, 205, 120, 1);
          color: rgba(85, 205, 120, 1);
        }
      }
      span {
        // 文本水平居中
        text-align: center;
      }
    }
  }
  .pie {
    height: 571px;
  }
}
</style>