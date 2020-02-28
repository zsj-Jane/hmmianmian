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
export function subjectList(data) {
    return subjectRequest({
        url:"/subject/list",
        data
    })
}