// 封装请求对象
// 导入axios
import axios from 'axios';
// 导入获取token的文件
import { getToken } from '@/utils/token.js';
// 克隆一个axios对象，并设置它的初始基因，
// 以后通过indexRequest对象去发送axios请求，就会自动携带基地址和请求头
let request = axios.create({
    // 基地址
    baseURL: process.env.VUE_APP_BASE_URL,
    // 请求头(由于index.js文件在项目已启动就执行，这里headers里的token值为null，使得登录进入首页后，无法获得个人信息)
    // headers:{
    //     token:getToken()
    // }
});
// 添加请求拦截器（官网CV）
// 只要是indexRequest发的请求都会被拦截下来
request.interceptors.request.use(function (config) {
    // config参数：被拦截下来的请求的配置信息
    // window.console.log(config);
    // 往config里面的headers添加一个token，就代表此次发送的请求中包含token
    // 每次首页发送请求，都会被拦截下来，并自动加一个token
    config.headers.token = getToken();
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});
// 把请求对象暴露出去
export default request;