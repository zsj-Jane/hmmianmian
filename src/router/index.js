// 1.导入vue
import Vue from 'vue';
// 2.导入路由
import VueRouter from 'vue-router';
// 3.注册路由
Vue.use(VueRouter);
// 4.准备组件
import login from '../views/login/index.vue';
import index from '../views/index/index.vue';
import user from '../views/index/user/index.vue';
// 5.创建路由对象，并配置路由规则
const router= new VueRouter({
    routes:[
        {
            path:'/login',
            component:login
        },
        {
            path:'/index',
            component:index,
            // index的子路由
            children:[
                {
                    path:'user',
                    component:user
                }
            ]
        }
    ]
});
// 6.将路由对象暴露出去
export default router;