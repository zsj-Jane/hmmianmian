// 1.导入vue
import Vue from 'vue';
// 导入NProgress的包
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
// 导入操作token的文件
import { removeToken } from '@/utils/token';
// 导入获取用户信息的文件
import { getInfo } from '@/api/index';
// element-ui按需导入
import { Message } from 'element-ui'
// 导入vuex对象
import store from '@/store/index.js';
// 导入index的子路由规则
import children from './childrenRoutes';
// 2.导入路由
import VueRouter from 'vue-router';
// 3.注册路由
Vue.use(VueRouter);
// 4.准备组件
import login from '../views/login/index.vue';
import index from '../views/index/index.vue';
// 5.创建路由对象，并配置路由规则
const router = new VueRouter({
    routes: [
        {
            // 路由重定向
            path: '/',
            redirect: '/login'
        },
        {
            path: '/login',
            component: login,
            // 路由元信息:给某个路由打标签
            meta: {
                title: '登录',
                roles: ['超级管理员', '管理员', '老师', '学生']
            }
        },
        {
            path: '/index',
            component: index,
            meta: {
                title: '首页',
                roles: ['超级管理员', '管理员', '老师', '学生']
            },
            // index的子路由规则，子路由一般不加/
            children
        }
    ]
});
// 6.导航守卫(写在创建路由对象之后)
// 定义路由白名单数组，存放一些不需要做权限验证的路径，遇到这些白名单里的路径就直接跳转
let whiteUrl = ['/login'];
// 前置守卫（准备进入到某个页面触发）
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
    if (whiteUrl.includes(to.path)) {
        // 如果是跳转到路由白名单中包含的路径，直接放行
        next();
    } else {
        // 别的页面进行token真假判断
        getInfo().then(res => {
            if (res.data.code == 200) {
                // 判断当前登录账号的用户状态是否为 启用
                if (res.data.data.status == 1) {
                    // 将服务器返回的 用户名 取出来存在vuex对象中
                    store.commit('changeUsername', res.data.data.username);
                    // 将服务器返回的 头像 取出来存在vuex对象中
                    store.commit('changeAvatar', process.env.VUE_APP_BASE_URL + "/" + res.data.data.avatar);
                    // 将服务器返回的角色 取出来保存在vuex对象中
                    store.commit('changeRole',res.data.data.role);
                    // 只有从登录页面跳转过来的，才提示登录成功
                    if (from.paht == '/login') {
                        // 登录成功提示
                        Message.success('登录成功');
                    }
                    // 判断要去的页面的可访问角色中，是否包含当前登录账号的角色
                    if (to.meta.roles.includes(res.data.data.role)) {
                        // 表示token正确、状态为启用、拥有访问权限，调用next跳转函数
                        next();
                    } else {
                        // 警告提示
                        Message.warning('该账号没有访问权限，请与管理员联系');
                        // 手动结束进度条
                        NProgress.done();
                        // 没有权限访问，就跳转回原来的页面
                        next(from.path);
                    }
                } else {
                    // 禁用警告
                    Message.warning('账号被禁用，请与管理员联系！');
                    // 手动结束进度条(因为本来要进入index页面，但是token出错了，进度条没有结束，要手动结束)
                    NProgress.done();
                    // 跳转到登录页面
                    next('/login');
                }

            } else {
                // 错误提示(this.$message.error()是在vue中使用的，要在js文件中使用，需要单独引用)
                Message.error('登录状态异常，请重新登录');
                // 删除token
                removeToken();
                // 手动结束进度条(因为本来要进入index页面，但是token出错了，进度条没有结束，要手动结束)
                NProgress.done();
                // 跳转到登录页面
                next('/login');
            }
        });
    }
})
// 后置守卫（已经进入到某个页面触发）
router.afterEach((to) => {
    // 路由跳转之后调用的回调函数
    // to:对象，去哪里  from:对象，从哪来
    // to and from are both route objects.
    // 进来以后结束进度条
    NProgress.done();
    // 取出当前要去的页面的标签（路由元信息内容），设置给title
    document.title = to.meta.title;

})
// 7.将路由对象暴露出去
export default router;