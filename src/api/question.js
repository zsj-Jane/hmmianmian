// 导入请求对象
import request from '@/utilis/request.js';
// 封装一个获取题目列表的接口方法
export function questionList(params) {
    return request({
        url:'/question/list',
        method:'get',
        params
    });
}
// 封装一个发布题目的接口方法
export function questionAdd(data) {
    return request({
        url:'/question/add',
        method:'post',
        data
    });
}
// 封装一个获取题目信息的接口方法
export function questionOne(data) {
    return request({
        url:'/question/one',
        method:'post',
        data
    });
}
// 封装一个设置题目状态的接口方法
export function questionStatus(data) {
    return request({
        url:'/question/status',
        method:'post',
        data
    });
}
// 封装一个删除题目的接口方法
export function questionDel(data) {
    return request({
        url:'/question/remove',
        method:'post',
        data
    });
}
// 封装一个编辑题目的接口方法
export function questionEdit(data) {
    return request({
        url:'/question/edit',
        method:'post',
        data
    });
}
// 封装一个上传文件的接口方法
export function questionUpload(data) {
    return request({
        url:'/question/upload',
        method:'post',
        data
    });
}