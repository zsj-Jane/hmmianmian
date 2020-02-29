// 导入axios
import axios from 'axios';
// 导入操作token的文件
import { getToken } from '@/utilis/token.js'
// 创建一个新的请求对象
let subjectRequest = axios.create({
    // 设置基地址
    baseURL: process.env.VUE_APP_BASE_URL,
    // 允许携带cookie
    withCredentials: true
});
// 添加请求拦截器
subjectRequest.interceptors.request.use(function (config) {
    // 发送请求前做些什么
    // 设置请求头的token
    config.headers.token = getToken();
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});
// 封装一个获取学科列表的接口方法
export function subjectList(params) {
    return subjectRequest({
        url:"/subject/list",
        method:"get",
        // get请求参数使用params
        params
    })
}
// 封装一个修改学科状态的接口方法
export function subjectStatus(data) {
    return subjectRequest({
        url:'/subject/status',
        method:'post',
        data
    });
}
// 封装一个新增学科的接口方法
export function subjectAdd(data) {
    return subjectRequest({
        url:'/subject/add',
        method:'post',
        data
    });
}
// 封装一个编辑学科的接口方法
export function subjectEdit(data) {
    return subjectRequest({
        url:'/subject/edit',
        method:'post',
        data
    })
}