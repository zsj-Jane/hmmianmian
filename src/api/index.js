// 导入请求对象
import request from '@/utils/request.js';
// 获取当前登录的用户信息
export function getInfo() {
    return request({
        url: "/info",
        method: 'get'
    });
}

// 退出请求
export function logout() {
    return request({
        url: "/logout",
        method: 'get'
    });
}