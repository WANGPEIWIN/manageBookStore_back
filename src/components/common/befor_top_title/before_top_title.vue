<template>
  <div style="width: 100%;border-bottom: 1px solid #dddddd;">
    <div style="width: 80%;display: flex;justify-content: space-between;height: 59px;;margin: 0 auto;">
      <div style="width: 15%;text-align: center;" class="bg_style">
        <img src="@/assets/images/logo.png" style="width: 100%;cursor: pointer;height: 100%;" @click="$router.push('/before/index')">
      </div>
      <div style="width: 85%;display: flex;justify-content: space-between;line-height: 59px">
        <div style="width: 70%;">
          <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal"
                   text-color="#111111"
                   active-text-color="#ff445f"
          >
            <el-menu-item index="1" @click="keepIndex(1);$router.push('/before/index')">首页</el-menu-item>
            <el-menu-item index="2" @click="keepIndex(2);$router.push('/before/category')">分类</el-menu-item>
            <el-menu-item index="3"  @click="keepIndex(3);$router.push('/before/user')">个人页面</el-menu-item>
          </el-menu>
        </div>
        <div style="width: 30%;display: flex;">
          <div style="display: flex;position: relative;line-height: 33px;margin-top: 15px;position: relative;width: 70%;">
            <input type="text" v-model="search" class="input" style="outline: none;border: 1px solid #ff445f;font-size: 14px;padding: 5px 5px;overflow:hidden;color: #111111;height: 20px;width: 280px;">
            <div class="search_bk" @click="toSearch()">
              <div style="display: flex;justify-content: center">
                <img src="@/assets/images/search.svg" style="width: 20px;left: 0;">
                <div style="font-size: 14px">搜索</div>
              </div>
            </div>
          </div>
          <div style="width: 30%;">
            <div v-show="display" class="title_login" @click="$router.push('/login')">
              登录/注册
            </div>
            <div v-show="!display"  class="title_login" @click="returnLogin()">
              退出登录
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "before_top_title",
  data(){
    return{
      search:'',
      display:true,
      isShow:false,
      userInform:sessionStorage.getItem("user"),
      activeIndex:'1',
    }
  },
  watch:{
    userInform:{
      handler:function (){
        if(this.userInform!=null){
          this.display=false;
        }
      },
      immediate:true
    }
  },
  created() {
    this.activeIndex=sessionStorage.getItem('index');
    console.log(this.activeIndex);
    // this.activeIndex=sessionStorage.getItem(index);
  },
  methods:{
    returnLogin(){
      sessionStorage.clear();
      this.$router.push('/login');
      console.log(this.isShow);
    },
    keepIndex(index){
      console.log("@@@@"+index);
      sessionStorage.setItem("index",index);
    },
    toSearch(){
      if(this.search){
        this.$router.push({path: '/before/searchItem',query:{searchName:this.search}});
        this.search=null;
      }else {
        let res={
          code:"500",
          message:"请先输入搜索词"
        }
        this.$store.commit("tip",res);
      }
    }
  }
}
</script>

<style scoped>
.search_bk{
  height: 31px;
  background-color: #ff445f;
  color: white;
  width: 60px;
  cursor: pointer;
  position: absolute;right: 0;
}
.search_bk:hover{
  background-color: #f35c85;
}
.index_title{
  cursor: pointer;
  font-size: 20px;
  color: #181818;
  width: 15%;
  text-align: center;
}
.index_title:hover{
  border-bottom: 2px solid #ff445f;
  color: #ff445f;
  background-color: #ff445f;
  color: white;
}
.title_login{
  height: 28px;width: 100px;background-color: #ffffff;color: #666666;text-align: center;line-height: 38px;margin:11px 10px;cursor: pointer;font-size:15px;border-radius: .3em
}
.title_login:hover{
  color: #ff445f;
}
.bg_style{

}
</style>
