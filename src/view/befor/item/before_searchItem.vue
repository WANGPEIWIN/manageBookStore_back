<template>
<div style="width:100%;">
  <div class="classic_select">
    <div style="margin-left: 10px">分类:</div>
    <div v-for="(item,index) in bigCategory" style="width: 8%;justify-content: space-around;margin-left: 20px;">
      <div class="category_font" @click="searchCategoryBook(item.id,item.classicNames)">{{item.classicNames}}</div>
    </div>
    <div class="category_font" style="width: 8%" @click="searchCategoryBook('','无分类')">无分类</div>
  </div>
  <div class="classic_select">
    <div style="margin-left: 10px">标签:</div>
    <div v-for="(item,index) in category" style="width: 8%;justify-content: space-around;margin-left: 20px;">
      <div class="category_font" @click="searchLabelBook(item.id,item.classicName)">{{item.classicName}}</div>
    </div>
    <div class="category_font" style="width: 8%" @click="searchLabelBook('','无标签')">无标签</div>
  </div>
  <div class="classic_select">
    <div style="display: flex;width: 50%">
      <div style="margin-left: 10px;width: 12%">
        当前位置:
      </div>
      <div style="display: flex;width: 30%;text-align: center;margin-left: 20px">
        <div>分类:</div>
        <div style="margin-left: 10px">{{currentNames}}</div>
      </div>
      <div style="display: flex;width: 30%;text-align: center">
        <div>标签:</div>
        <div style="margin-left: 10px">{{currentName}}</div>
      </div>
    </div>
    <div style="width: 10%;">
      <div class="category_button" style="width:100%;" @click="reChange()">重置</div>
    </div>
  </div>
  <div style="width: 80%;display: flex;margin: 0 auto;flex-wrap: wrap" v-if="searchInform">
    <div v-for="(item,index) in searchInform"  class="index_inform">
      <div style="margin: 5px 8px;">
        <div style="text-align: center"><img :src="item.imgUrl" style="width: 120px;height: 150px;cursor: pointer;" class="index_img" @click="$router.push({path:'/before/bookItem',query:{bookId:item.id,bookName:item.bookName}})"></div>
        <div style="margin-top: 10px;margin-left: 15px;width: 80%;">
          <div class="index_font" @click="$router.push({path:'/before/bookItem',query:{bookId:item.id,bookName:item.bookName}})">
            {{item.bookName}}
          </div>
          <div style="font-size: 14px;color: #6c6c6c">
            {{item.press.substring(0,53)}}
          </div>
          <div style="color: #6c6c6c;font-size: 12px;margin-top: 2px;display: flex;justify-content: space-between">
            <div style="margin-top: 5px">{{item.author}}</div>
            <div style="border: 1px solid #dddddd;padding: 3px">{{item.classicNames}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <el-empty description="没有找到与该搜索词相关的内容"  v-else></el-empty>
</div>
</template>

<script>
import {selectAllBook} from "../../../net/bookRequest";
import {classicItemSelectAll} from "../../../net/classicItemRequest";
import {classicSelectAll} from "../../../net/classicRequest";

export default {
  name: "before_searchItem",
  data(){
    return{
      searchInform:'',
      bigCategory:'',
      classicBook:'',
      currentNames:'',
      currentName:'',
      category:'',
      form:{
        bigCategoryId: '',
        categoryId:'',
      }
    }
  },
  watch:{
    form:{
      handler:function (){
        this.getClassicBook();
      },
      deep:true
    },
    async '$route.query.searchName'() {
      this.searchInform = (await selectAllBook({bookName: this.$route.query.searchName})).data;
    }
  },
  async created() {
    this.searchInform = (await selectAllBook({bookName: this.$route.query.searchName})).data;
    await this.getBigClassic();
    await this.getClassic();
    // await this.reChange();
  },
  methods:{
    async getBigClassic(){
      this.bigCategory=(await classicItemSelectAll({})).data;
    },
    async getClassic(){
      this.category=(await classicSelectAll({})).data;
    },
    async getClassicBook(){
      this.searchInform=(await selectAllBook(this.form)).data;
    },
    searchCategoryBook(one,names) {
      this.form.bigCategoryId=one;
      this.currentNames=names;
    },
    searchLabelBook(two,name){
      this.form.categoryId=two;
      this.currentName=name;
    },
    async reChange(){
      this.searchInform=(await selectAllBook({})).data;
      this.currentNames='';
      this. currentName='';
    }
  }
}
</script>

<style scoped>

</style>
