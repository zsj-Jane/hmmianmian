// 1.导入vue
import Vue from 'vue';
// 2.导入路由
import VueRouter from 'vue-router';
// 3.注册路由
Vue.use(VueRouter);
// 4.准备组件
import login from '../views/login/index.vue';
import index from '../views/index/index.vue';
import chart from '../views/index/chart/chart.vue';
import user from '../views/index/user/user.vue';
import question from '../views/index/question/question.vue';
import business from '../views/index/business/business.vue';
import subject from '../views/index/subject/subject.vue'
// 5.创建路由对象，并配置路由规则
const router = new VueRouter({
    routes: [
        {
            path: '/login',
            component: login
        },
        {
            path: '/index',
            component: index,
            // index的子路由，子路由一般不加/
            children: [
                // 数据概览
                { path: 'chart', component: chart },
                // 用户列表
                { path: 'user', component: user },
                // 题库列表
                { path: 'question', component: question },
                // 企业列表
                { path: 'business', component: business },
                // 学科列表
                { path: 'subject', component: subject }
            ]
        }
    ]
});
// 6.将路由对象暴露出去
export default router;