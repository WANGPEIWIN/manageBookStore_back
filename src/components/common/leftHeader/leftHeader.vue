<template>
  <div style="">
    <el-menu
      :collapse="isCollapse"
      style="border-right: 1px solid rgba(157,155,155,0.35);color: white;height: 750px"
    :default-active="currentPath"
    background-color="#304156"
    text-color="white"
    class="el-menu-vertical-demo">
    <div style="text-align: center;font-size: 24px;margin: 20px 0">
      <i class="el-icon-reading"></i>
      悦享书城
    </div>
    <el-menu-item index="1" @click="saveIndex(1);$router.push('/home/user');">
      <i class="el-icon-user-solid"></i>
      <span slot="title">用户管理</span>
    </el-menu-item>
    <el-menu-item index="2" @click="saveIndex(2);$router.push('/home/book');">
      <i class="el-icon-notebook-2"></i>
      <span slot="title">书籍管理</span>
    </el-menu-item>
    <el-menu-item index="3" @click="saveIndex(3);$router.push('/home/classicItem');">
      <i class="el-icon-menu"></i>
      <span slot="title">分类管理</span>
    </el-menu-item>
    <el-menu-item index="4" @click="saveIndex(4);$router.push('/home/classic');">
      <i class="el-icon-s-grid"></i>
      <span slot="title">标签管理</span>
    </el-menu-item>
    <el-menu-item index="5" @click="saveIndex(5);$router.push('/home/hotBook');">
      <i class="el-icon-sunny"></i>
      <span slot="title">热门管理</span>
    </el-menu-item>
    <el-menu-item index="6" @click="saveIndex(6);$router.push('/home/swiper')">
      <i class="el-icon-s-marketing"></i>
      <span slot="title">轮播图管理</span>
    </el-menu-item>
<!--      <el-menu-item index="7" @click="saveIndex(7);$router.push('/home/comments')">-->
<!--      <i class="el-icon-chat-line-round"></i>-->
<!--      <span slot="title">评论管理</span>-->
<!--    </el-menu-item>-->
  </el-menu>
  </div>
</template>

<script>
export default {
  name: "leftHeader",
  data(){
    return{
      currentPath:"1",
      isCollapse:false
    }
  },
  methods:{
    saveIndex(index){
      sessionStorage.setItem("index",index);
    }
  },
  created() {
    if(sessionStorage.getItem("index")){
      this.currentPath=sessionStorage.getItem("index");
    }
  }
}
</script>

<style scoped>
.el-menu{
  width: 220px !important;
}
.el-menu-item:hover{
  background-color: #58759b !important;
}
.el-menu-item{
  width: 100% !important;
  text-align: left !important;
}
</style>
