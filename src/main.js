// 导入vue
import Vue from 'vue'
// 导入根组件
import App from './App.vue'
// 是否提示生产信息
Vue.config.productionTip = false
// 导入路由对象
import router from './router/index';
new Vue({
  // 路由对象挂载到vue实例中
  router,
  render: h => h(App),
}).$mount('#app')
