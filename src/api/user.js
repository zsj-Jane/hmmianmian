// 导入请求对象
import request from '@/utils/request.js';
// 封装一个获取用户信息列表的接口方法
export function userList(params) {
    return request({
        url:'/user/list',
        method:'get',
        params
    });
}
// 封装一个后台创建用户的接口方法
export function userAdd(data) {
    return request({
        url:'/user/add',
        method:'post',
        data
    });
}
// 封装一个设置用户状态的接口方法
export function userStatus(data) {
    return request({
        url:'/user/status',
        method:'post',
        data
    });
}
// 封装一个删除用户的接口方法
export function userDel(data) {
    return request({
        url:'/user/remove',
        method:'post',
        data
    });
}
// 封装一个编辑用户的接口方法
export function userEdit(data) {
    return request({
        url:'/user/edit',
        method:'post',
        data
    });
}