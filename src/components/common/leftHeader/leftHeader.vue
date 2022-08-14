<template>
  <div>
  <el-row style="width: 200px;border-right: 1px solid rgba(157,155,155,0.35)">
    <el-menu
      :default-active="currentPath"
      class="el-menu-vertical-demo">
      <el-menu-item index="1" @click="saveIndex(1);$router.push('/home/user');">
        <i class="el-icon-user-solid"></i>
        <span slot="title">用户管理</span>
      </el-menu-item>
      <el-menu-item index="2" @click="saveIndex(2);$router.push('/home/book');">
        <i class="el-icon-notebook-2"></i>
        <span slot="title">书籍管理</span>
      </el-menu-item>
      <el-menu-item index="3" @click="saveIndex(3);$router.push('/home/classic');">
        <i class="el-icon-menu"></i>
        <span slot="title">分类管理</span>
      </el-menu-item>
      <el-menu-item index="4" @click="saveIndex(4);$router.push('/home/hotBook');">
        <i class="el-icon-sunny"></i>
        <span slot="title">热门管理</span>
      </el-menu-item>
      <el-menu-item index="5" @click="saveIndex(5);$router.push('/home/swiper')">
        <i class="el-icon-s-marketing"></i>
        <span slot="title">轮播图管理</span>
      </el-menu-item>
    </el-menu>
  </el-row>
  </div>
</template>

<script>
export default {
  name: "leftHeader",
  data(){
    return{
      currentPath:"1",
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

</style>
