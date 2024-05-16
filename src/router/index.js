import Vue from 'vue'
import Router from 'vue-router'
import store from "../vuex";
let before_bookRead =()=> import("../view/befor/item/before_bookRead.vue");
let before_searchItem =()=> import("../view/befor/item/before_searchItem.vue");
let before_bookFile =()=> import("../view/befor/item/before_bookFile.vue");
let before_bookItem =()=> import("../view/befor/item/before_bookItem.vue");
let before_category =()=> import("../view/befor/item/before_category.vue");
let before_index =()=> import("../view/befor/item/before_index.vue");
let before_user =()=> import("../view/befor/item/before_user.vue");
let beforeHome =()=> import("../view/befor/beforeHome.vue");


let comments =()=> import("../view/back/item/comments.vue");
let classicItem =()=> import("../view/back/item/classicItem.vue");
let login =()=> import("../view/login");
let hotBook =()=> import("../view/back/item/hotBook.vue");
let swiper =()=> import("../view/back/item/swiper.vue");
let user=()=>import("../view/back/item/user.vue");
let book =()=> import("../view/back/item/book.vue");
let classic =()=> import("../view/back/item/classic.vue");
let home=()=>import("../view/back/home.vue")

Vue.use(Router)
const router=new Router({
  routes: [
    {
      path: '/',
      redirect:"/before"
    },
    {
      path:'/login',
      component:login
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
          name:"用户管理",
          component:user,
        },
        {
          path:'book',
          name:"书籍管理",
          component:book
        },
        {
          path:'classic',
          name:"标签管理",
          component:classic
        },
        {
          path:'classicItem',
          name:"分类管理",
          component:classicItem
        },
        {
          path: 'comments',
          name:"评论管理",
          component:comments
        },
        {
          path:'hotBook',
          name:"热门管理",
          component:hotBook
        },
        {
          path:'swiper',
          name:"轮播图管理",
          component:swiper
        }
      ]
    },
    {
      path:'/before',
      component:beforeHome,
      children:[
        {
          path: '/',
          redirect:"/before/index"
        },
        {
          path:'user',
          component:before_user,
          meta:{
            token:true
          }
        },
        {
          path: 'index',
          component:before_index,
        },
        {
          path: 'category',
          component:before_category,

        },
        {
          path: 'bookItem',
          component:before_bookItem,

        },
        {
          path: 'bookRead',
          component:before_bookRead
        },
        {
          path:'searchItem',
          component:before_searchItem,

        },
        {
          path: 'bookFile',
          component:before_bookFile,
        },
      ]
    },
  ]
})

export default router;
// router.beforeEach((to, from, next) => {
//   if (sessionStorage.getItem("user")) {
//     return next();
//   } else {
//     let res = {
//       code: "400",
//       message: "请先登录"
//     }
//     store.commit("tip", res);
//     return next("/login");
//   }
//   return next();
// });
const originalPush =Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location);
}
