// 1.导入vue
import Vue from 'vue';
// 导入NProgress的包
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
// 导入操作token的文件
import { removeToken } from '@/utilis/token';
// 导入获取用户信息的文件
import { getInfo } from '@/api/index';
// element-ui按需导入
import { Message } from 'element-ui'
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
// 6.导航守卫(写在创建路由对象之后)
// 前置守卫
router.beforeEach((to, from, next) => {
    // 路由跳转之前调用的回调函数
    // to:对象，去哪里  from:对象，从哪来  
    /* next:
        一个函数，表示放行，调用代表放行，不调用代表不放行，
        不传参数，就代表原来要到哪去就放行到哪
        传了参数，就代表放行到要传的参数的路径上去
    */
    // to and from are both route objects. must call `next`.
    // 开启进度条
    NProgress.start();
    // token真假判断前置
    if (to.path == '/login') {
        // 如果是跳转到登录页面，直接放行
        next();
    } else {
        // 别的页面进行token真假判断
        getInfo().then(res => {
            if (res.data.code == 200) {
                // 表示token正确，调用next跳转函数
                next();
            } else if (res.data.code == 206) {
                // 错误提示(this.$message.error()是在vue中使用的，要在js文件中使用，需要单独引用)
                Message.error('登录状态异常，请重新登录');
                // 删除token
                removeToken();
                // 跳转到登录页面
                next('/login');
            }
        });
    }
})
// 后置守卫
router.afterEach(() => {
    // 路由跳转之后调用的回调函数
    // to:对象，去哪里  from:对象，从哪来
    // to and from are both route objects.
    // 进来以后结束进度条
    NProgress.done();
})
// 7.将路由对象暴露出去
export default router;