<template>
<div>
  <div style="width: 80%;margin: 0 auto;">
    <el-carousel height="450px">
      <el-carousel-item v-for="item in swiper" :key="item">
        <img :src="item.imgUrl" style="width: 100%;;cursor: pointer" @click="$router.push({path:'/before/bookItem',query:{bookId:item.bookId}})">
      </el-carousel-item>
    </el-carousel>
  </div>
  <div style="width: 80%;display: flex;margin: 0 auto;flex-wrap: wrap;">
    <show-case :list="bookInform" @getBookId="toBookItem"></show-case>
  </div>
  <div style="width: 80%;margin: 0 auto;">
    <div style="text-align: center;margin: 10px 0;cursor: pointer">
      <img src="@/assets/images/index_split.jpg" style="width: 100%;height: 100px;" @click="$router.push({path:'/before/bookItem',query:{bookId:'1662453824255668225'}})">
    </div>
    <div style="width: 100%;display: flex;">
      <div style="width:22%;">
        <el-carousel height="200px" style="width: 100%;" type="card" ref="carousel">
          <el-carousel-item v-for="(item,index) in bookSwiper" :key="index">
            <img :src="item.imgUrl" style="width: 100%;;cursor: pointer;height: 220px" @click="$router.push({path:'/before/bookItem',query:{bookId:item.bookId}})">
          </el-carousel-item>
        </el-carousel>
      </div>
      <div style="width: 74%;display: flex;flex-wrap: wrap">
        <div style="width: 45%;display: flex;margin-left: 15px;" v-for="(item,index) in otherBook"  @click="$router.push({path:'/before/bookItem',query:{bookId:item.id,bookName:item.bookName}})" class="other_index_inform">
          <div><img :src="item.imgUrl" style="width: 150px;margin-top: 22px;margin-left: 8px;height: 190px"></div>
          <div style="margin-left: 8px;margin-top: 15px">
            <div style="font-size: 18px;">{{item.bookName.substring(0,8)}}</div>
            <div style="font-size: 12px;color: #818080;margin: 8px 0;">{{item.press.substring(0,100)}}</div>
            <div style="color: #6c6c6c;font-size: 12px;margin-top: 2px;display: flex;justify-content: space-between">
              <div style="margin-top: 5px">{{item.author}}</div>
              <div style="border: 1px solid #dddddd;padding: 3px">{{item.classicNames}}</div>
            </div>
          </div>
        </div>
      </div>
      <div style="width: 22%;">
        <div style="font-size: 18px;color: #ff445f">热门书籍</div>
        <div v-for="(item,index) in hotBook">
          <div style="display: flex;border-bottom: 1px solid #dddddd;padding: 3px 0;cursor: pointer" @click="$router.push({path:'/before/bookItem',query:{bookId:item.bookId}})">
            <div><img :src="item.imgUrl" style="width: 25px"></div>
            <div style="margin-left: 10px;font-size: 14px;color: #666666">{{item.bookName}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>

import {selectAll} from "../../../net/swiperRequest";
import {selectAllBook} from "../../../net/bookRequest";
import book from "../../back/item/book.vue";
import {selectHot} from "../../../net/hotBookRequest";
import ShowCase from "../../../components/common/ShowCase.vue";

export default {
  name: "before_index",
  components: {ShowCase},
  data(){
    return {
      swiper:'',
      bookInform:'',
      bookSwiper:'',
      swiperIndex:'',
      otherBook:'',
      hotBook:'',
    }
  },
  methods:{
    toBookItem(data){
      this.$router.push({path:'/before/bookItem',query:{bookId:data}})
    },
    async getHotBook(){
      this.hotBook=(await selectHot({})).data.splice(0,5)
    },
    async getBook(){
      this.bookInform=(await selectAllBook({})).data.splice(0,10);
      this.otherBook=(await selectAllBook({})).data.splice(12,12);
    }
  },
  async created() {
    this.swiper=(await selectAll({})).data.splice(0,2);
    this.bookSwiper=(await selectAll({})).data.splice(2,10);
    await this.getBook();
    await this.getHotBook();
  }
}
</script>

<style scoped>

</style>
