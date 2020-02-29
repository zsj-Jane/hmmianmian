// 导入vue
import Vue from 'vue'
// 导入根组件
import App from './App.vue'
// 是否提示生产信息
Vue.config.productionTip = false
// 导入路由对象
import router from './router/index';
// 导入Element-ui
import ElementUI from 'element-ui';
// 导入Element-ui的样式
import 'element-ui/lib/theme-chalk/index.css';
// 注册Element-ui
Vue.use(ElementUI);
// 导入基础样式
import './style/base.css'
// 导入vuex对象
import store from './store/index';
// 导入全局过滤器
// 这个文件只需要保证能够执行里面的代码就行，简单导入
import '@/filters/filters.js';
// 创建Vue实例，挂载到ip为app的div上
new Vue({
  // 路由对象挂载到vue实例中
  router,
  // vuex对象挂载到vue实例中
  store,
  render: h => h(App),
}).$mount('#app')