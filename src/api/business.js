// 导入axios
import axios from 'axios';
// 导入操作token的文件
import { getToken } from '@/utilis/token.js'
// 创建一个新的请求对象
let businessRequest = axios.create({
    // 设置基地址
    baseURL: process.env.VUE_APP_BASE_URL,
    // 允许携带cookie
    withCredentials: true
});
// 添加请求拦截器
businessRequest.interceptors.request.use(function (config) {
    // 发送请求前做些什么
    // 设置请求头的token
    config.headers.token = getToken();
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});
// 封装一个获取企业列表信息的接口方法
export function businessList(params) {
    return businessRequest({
        url:'/enterprise/list',
        method:'get',
        params
    });
}
// 封装一个新增企业的接口方法
export function businessAdd(data) {
    return businessRequest({
        url:'/enterprise/add',
        method:'post',
        data
    });
}
// 封装一个修改企业状态的接口方法
export function businessStatus(data) {
    return businessRequest({
        url:'/enterprise/status',
        method:'post',
        data
    });
}
// 封装一份企业删除的接口方法
export function businessDel(data) {
    return businessRequest({
        url:'/enterprise/remove',
        method:'post',
        data
    });
}
// 封装一个企业编辑的接口方法
export function businessEdit(data) {
    return businessRequest({
        url:'/enterprise/edit',
        method:'post',
        data
    });
}