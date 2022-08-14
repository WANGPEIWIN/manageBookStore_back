import Vue from 'vue'
import Router from 'vue-router'
import store from "../vuex";
let login =()=> import("../view/login");
let hotBook =()=> import("../view/hotBook");
let swiper =()=> import("../view/swiper");
let user=()=>import("../view/user");
let book =()=> import("../view/book");
let classic =()=> import("../view/classic");
let home=()=>import("../view/home")

Vue.use(Router)
const router=new Router({
  routes: [
    {
      path: '/',
      redirect:"/home"
    },
    {
      path:'/home',
      component:home,
      children:[
        {
          path: '/',
          redirect:"/home/user"
        },
        {
          path:'user',
          name:"用户",
          component:user,
        },
        {
          path:'book',
          component:book
        },
        {
          path:'classic',
          component:classic
        },
        {
          path:'hotBook',
          component:hotBook
        },
        {
          path:'swiper',
          component:swiper
        }
      ]
    },
    {
      path:'/login',
      component:login
    },

  ]
})

export default router;
router.beforeEach(function (to, from, next){
  if("/login"===to.path){
    next();
  }else{
    if(sessionStorage.getItem("token")){
      next();
    }else{
      let res={
        code:"400",
        message:"请先登录!"
      }
      store.commit("tip",res);
      next("/login");
    }
  }

})
const originalPush =Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location);
}
