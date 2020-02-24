// 导入axios
import axios from 'axios';
// 导出 发送短信验证请求 方法
export function sendSMS(data) {
    return axios({
        url: process.env.VUE_APP_BASE_URL + '/sendsms',
        method: 'post',
        data,
        // axios如果发跨域请求，默认不会携带cookie
        // 允许携带cookie
        withCredentials: true
    });
}

// 发送注册账号接口的请求
export function register(data) {
    return axios({
        url:process.env.VUE_APP_BASE_URL+"/register",
        method:"post",
        data,
        // 允许携带cookie
        withCredentials:true
    });
}