// 导入请求对象
import request from '@/utilis/request.js';
// 封装一个获取学科列表的接口方法
export function subjectList(params) {
    return request({
        url: "/subject/list",
        method: "get",
        // get请求参数使用params
        params
    })
}
// 封装一个修改学科状态的接口方法
export function subjectStatus(data) {
    return request({
        url: '/subject/status',
        method: 'post',
        data
    });
}
// 封装一个新增学科的接口方法
export function subjectAdd(data) {
    return request({
        url: '/subject/add',
        method: 'post',
        data
    });
}
// 封装一个编辑学科的接口方法
export function subjectEdit(data) {
    return request({
        url: '/subject/edit',
        method: 'post',
        data
    });
}
// 封装一个删除学科的接口方法
export function subjectDel(data) {
    return request({
        url: '/subject/remove',
        method: 'post',
        data
    });
}