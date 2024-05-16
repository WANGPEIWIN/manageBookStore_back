<template>
  <div style="width: 100%;">
    <div style="width: 100%;height: 80px;box-shadow: 0 0 10px rgba(168,166,166,0.71);display: flex;justify-content: space-between">
      <div style=";font-size: 22px;line-height: 75px;padding: 0 20px;cursor: pointer" >
        <div>{{$route.name}}</div>
      </div>
      <div style="font-size: 16px;padding: 25px 30px;cursor: pointer;display: flex" class="exit" @click="exit()">
        <div><img src="@/assets/images/exit.svg" style="width: 20px;"></div>
        <div>退出</div>
      </div>
    </div>
  </div>

</template>
<script>
export default {
  name: "titleItem",
  methods:{
    exit(){
      sessionStorage.removeItem("token");
      this.$router.push("/login");
      let res={
        code:"200",
        message:"退出成功"
      }
      this.$store.commit("tip",res);
    }
  }
}
</script>

<style scoped>

</style>
