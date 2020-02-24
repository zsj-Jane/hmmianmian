// 导入axios
import axios from 'axios';
// 导入获取token的文件
import {getToken} from '@/utilis/token.js';
// 克隆一个axios对象，并设置它的初始基因，
// 以后通过indexRequest对象去发送axios请求，就会自动携带基地址和请求头
let indexRequest = axios.create({
    // 基地址
    baseURL:process.env.VUE_APP_BASE_URL,
    // 请求头
    headers:{
        token:getToken()
    }
})
// 获取当前登录的用户信息
export function getInfo() {
    return indexRequest({
        url:"/info",
        method:'get'
    });
}

// 退出请求
export function logout() {
    return indexRequest({
        url:"/logout",
        method:'get'
    });
}