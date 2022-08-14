<template>
  <div>
    <div style="width: 100%;height: 80px;box-shadow: 0 0 10px rgba(168,166,166,0.71);display: flex;justify-content: space-between">
      <div style="font-weight: bold;font-size: 22px;line-height: 75px;padding: 0 20px">商城书籍管理</div>
      <div style="font-weight: bold;font-size: 18px;padding: 25px 30px;cursor: pointer" @click="exit()">退出</div>
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
