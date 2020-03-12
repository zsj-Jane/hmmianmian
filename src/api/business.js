// 导入请求对象
import request from '@/utils/request.js';
// 封装一个获取企业列表信息的接口方法
export function businessList(params) {
    return request({
        url:'/enterprise/list',
        method:'get',
        params
    });
}
// 封装一个新增企业的接口方法
export function businessAdd(data) {
    return request({
        url:'/enterprise/add',
        method:'post',
        data
    });
}
// 封装一个修改企业状态的接口方法
export function businessStatus(data) {
    return request({
        url:'/enterprise/status',
        method:'post',
        data
    });
}
// 封装一份企业删除的接口方法
export function businessDel(data) {
    return request({
        url:'/enterprise/remove',
        method:'post',
        data
    });
}
// 封装一个企业编辑的接口方法
export function businessEdit(data) {
    return request({
        url:'/enterprise/edit',
        method:'post',
        data
    });
}