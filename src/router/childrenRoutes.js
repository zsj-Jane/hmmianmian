// 保存首页的子路由规则
// 导入组件
import chart from '../views/index/chart/chart.vue';
import user from '../views/index/user/user.vue';
import question from '../views/index/question/question.vue';
import business from '../views/index/business/business.vue';
import subject from '../views/index/subject/subject.vue';
// 把首页的子路由规则暴露出去
export default [
    // 数据概览
    {
        path: 'chart',
        component: chart,
        meta: {
            title: '数据概览',
            roles: ['超级管理员', '管理员'],
            icon: "el-icon-pie-chart"
        }
    },
    // 用户列表
    {
        path: 'user',
        component: user,
        meta: {
            title: '用户列表',
            roles: ['超级管理员', '管理员'],
            icon: "el-icon-user"
        }
    },
    // 题库列表
    {
        path: 'question',
        component: question,
        meta: {
            title: '题库列表',
            roles: ['超级管理员', '管理员', '老师', '学生'],
            icon: "el-icon-edit-outline"
        }
    },
    // 企业列表
    {
        path: 'business',
        component: business,
        meta: {
            title: '企业列表',
            roles: ['超级管理员', '管理员', '老师'],
            icon: "el-icon-office-building"
        }
    },
    // 学科列表
    {
        path: 'subject',
        component: subject,
        meta: {
            title: '学科列表',
            roles: ['超级管理员', '管理员', '老师', '学生'],
            icon: "el-icon-notebook-2"
        }
    }
]