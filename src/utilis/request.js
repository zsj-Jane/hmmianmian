// 封装请求对象
// 导入axios
import axios from 'axios';
// 导入操作token的文件
import { getToken } from '@/utilis/token.js'
// 创建一个新的请求对象
let request = axios.create({
    // 设置基地址
    baseURL: process.env.VUE_APP_BASE_URL,
    // 允许携带cookie
    withCredentials: true
});
// 添加请求拦截器
request.interceptors.request.use(function (config) {
    // 发送请求前做些什么
    // 设置请求头的token
    config.headers.token = getToken();
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});
// 把请求对象暴露出去
export default request;