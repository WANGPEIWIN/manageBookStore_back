import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
// 创建一个新的 store 实例
const store =new Vuex.Store({
  state:{
    count:0
  },
  mutations:{
    tip(state,res){
      if(res.code==="200"){
        Vue.prototype.$notify({
          title: '成功',
          message: res.message,//这里的message是指什么
          type: 'success'
        });
      }else if(res.code==="300"){
        Vue.prototype.$notify({
          title: '警告',
          message: res.message,
          type: 'warning'
        });
      }else{
        Vue.prototype.$notify.error({
          title: '错误',
          message: res.message
        });
      }
    }
  }
})
export default store;


