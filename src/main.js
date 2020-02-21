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
// 创建Vue实例，挂载到ip为app的div上
new Vue({
  // 路由对象挂载到vue实例中
  router,
  render: h => h(App),
}).$mount('#app')
