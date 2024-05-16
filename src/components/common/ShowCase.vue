<template>
<div style="width: 100%;display: flex;flex-wrap: wrap">
  <div v-for="(item,index) in list" :key="index"  class="index_inform" @click="getBookInfo(item.id)">
    <div style="margin: 5px 8px;">
      <div style="text-align: center"><img :src="item.imgUrl" style=" width: 120px;height: 150px;cursor: pointer;" class="index_img"></div>
      <div class="index_font">{{item.bookName}}</div>
      <div style="font-size: 14px;color: #6c6c6c">{{item.press.substring(0,53)}}</div>
      <div style="color: #6c6c6c;font-size: 12px;margin-top: 2px;display: flex;justify-content: space-between">
        <div style="margin-top: 5px">{{item.author}}</div>
        <div style="border: 1px solid #dddddd;padding: 3px">{{item.classicNames}}</div>
      </div>
    </div>
    <slot/>
  </div>
</div>
</template>

<script>
export default {
  name: "ShowCase",
  props:{
    list:''
  },
  methods:{
   getBookInfo(data){
     this.$emit('getBookId',data);
   }
  }
}
</script>

<style scoped>

</style>
