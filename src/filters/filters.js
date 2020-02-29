// 导入vue
import Vue from 'vue';
// 导入moment
import moment from 'moment'
// 准备一个全局过滤器
// 参数1：过滤器的名字  参数2：过滤器的具体实现
Vue.filter('formatTime',function(value){
    // value是一个日期，处理成 年-月-日的形式
    // YYYY-MM-DD的格式
    return moment(value).format('YYYY-MM-DD');
})