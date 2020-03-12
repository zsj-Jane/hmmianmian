// 导入请求对象
import request from '@/utils/request.js';
// 封装一个面板数据接口 方法
export function chartData() {
    return request({
        url:'/data/title',
        method:'post'
    });
}
// 封装一个 企业题目数据统计 接口方法
export function chartStatistics() {
    return request({
        url:'/data/statistics',
        method:'post'
    });
}
// 封装一个 热门城市题目统计 接口方法
export function chartCity() {
    return request({
        url:'/data/hot_cities',
        method:'post'
    });
}