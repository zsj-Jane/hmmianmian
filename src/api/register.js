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