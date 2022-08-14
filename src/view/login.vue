<template>
  <div class="build">
    <div style="width: 380px;height: 300px;box-shadow: 0 0 1px #8d8585;margin: 200px auto;background-color: #00000060;border-radius: 1em;">
      <div style="width: 300px;margin:0 auto;padding: 20px 0;">
        <el-form>
          <el-form-item label="用户名">
            <el-input v-model="userLogin.userName"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="userLogin.pwd" show-password></el-input>
          </el-form-item>
        </el-form>
        <div style="text-align: center">
          <el-button round @click="login()">登录</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getLogin} from "../net/userRequest";

export default {
  name: "login",
  data(){
    return{
      userLogin:{
        userName:'',
        pwd:''
      }
    }
  },
  async created() {

  },
  methods:{
    async login(){
      let res=await getLogin(this.userLogin);
      if(res.code==="200"){
        sessionStorage.setItem("token",res.data);
        this.$router.push("/home/user");
      }
      this.$store.commit("tip",res);
    }
  }
}
</script>

<style scoped>
.build{
  background:url("../assets/images/backGround.png");
  width:100%;
  height: 745px;
  position:fixed;
  background-size:100% 100%;
}

</style>
