// 导入axios
import axios from 'axios';
// 导出 用户登录 的方法
export function login(data) {
    return axios({
        url: process.env.VUE_APP_BASE_URL + "/login",
        method: "post",
        data,
        // 允许携带cookie
        withCredentials: true
    });
};