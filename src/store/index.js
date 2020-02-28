// 放vuex的代码
// 导入vue
import Vue from 'vue';
// 下载vuex: npm i vuex
// 导入vuex
import Vuex  from 'vuex';
// 注册vuex
Vue.use(Vuex);
// 创建vuex对象
const store = new Vuex.Store({
    // 放数据
    state:{
        // 用户名
        username:"",
        // 头像地址
        avatar:""
    },
    // 放方法
    mutations:{
        // 修改用户名的方法
        changeUsername(state,val){
            state.username=val;
        },
        // 修改头像的方法
        changeAvatar(state,val){
            state.avatar=val;
        }
    }
});
// 把vuex对象暴露出去
export default store;