<template>
  <div class="build">
    <div style="position: absolute;right: 200px;top:200px">
      <img src="@/assets/images/bg.jpg" style="width: 300px;height: 300px;">
    </div>
    <div style="left: 0;right:0;top:200px;position: absolute;width: 380px;box-shadow: 0 0 1px #8d8585;margin: 0 auto;background-color: #00000060;border-radius: 1em;">
      <div style="text-align: center;height: 60px">
        <img src="@/assets/images/logo.png" style="width: 200px;margin: 10px 0;">
      </div>
      <div style="width: 300px;margin:0 auto;padding: 10px 0;">
        <div v-show="isShow">
          <el-form  class="item">
            <el-form-item label="用户名">
              <el-input v-model="userLogin.userName"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="userLogin.pwd" show-password></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div v-show="!isShow">
          <el-form ref="form" :model="form">
            <el-form-item label="用户名">
              <el-input v-model="form.userName"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="form.pwd"></el-input>
            </el-form-item>
            <el-form-item label="电话">
              <el-input v-model="form.phone"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div style="color: white;display: flex;justify-content: space-around;height: 30px">
          <el-radio v-model="role" label="before"><strong>前端页面</strong></el-radio>
          <el-radio v-model="role" label="back"><strong>后台管理</strong></el-radio>
        </div>
        <div style="display: flex">
          <el-button round v-show="isShow" @click="login()">登录</el-button>
          <el-button round v-show="!isShow" @click="isShow=true">返回登录</el-button>
          <el-button round v-show="isShow" @click="isShow=false">注册</el-button>
          <el-button round v-show="!isShow"  @click="register()">注册账号</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {addUser, getLogin} from "../net/userRequest";

export default {
  name: "login",
  data(){
    return{
      userLogin:{
        userName:'',
        pwd:''
      },
      role:"before",
      form:{
        userName:'',
        pwd:'',
        phone:'',
      },
      checked:true,
      isShow:true,
    }
  },
  async created() {
    this.userLogin={
      userName:'',
      pwd: '',
    }
  },
  methods:{
    async login(){
      console.log('准备登录');
      let res=await getLogin(this.userLogin);
      if(this.role==="back"){
          if (res.code === "200") {
            console.log('后台登录');
            sessionStorage.setItem("token",res.data);
            await this.$router.push("/home/user");
            this.$store.commit("tip",res);
          }
        // }
      }else if(this.role==="before"){
        console.log('前端登录');
        if (res.code === "200") {
          sessionStorage.setItem("user", this.userLogin.userName);
          await this.$router.push("/before/user");
        }
      }
    },
    async register(){
      this.isShow=!this.isShow;
      let res=await addUser(this.form);
      if(res.code==="200"){
        this.$store.commit("tip",res);
      }
    }
  }
}
</script>

<style >
.build{
  background-color:#f17b70 ;
  /*background:url("../assets/images/backGround.png");*/
  width:100%;
  height: 745px;
  position:relative;
  background-size:100% 100%;
}
.select_before{
  background-color: red;
  padding: 5px;
  cursor: pointer;
}
.select_back{
  background-color: red;
  padding: 5px;
  cursor: pointer;
}
.item .el-form-item__label{
  color: #101010;
}
</style>
