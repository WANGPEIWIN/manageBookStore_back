<template>
<div>
  <div style="width: 82%;margin: 10px auto;color:#666666;display: flex">
    <div style="margin-left: 10px;width:80px">
      当前位置:
    </div>
    <div>
      {{currentNames}}
    </div>
    <div style="display: flex">
      <img src="@/assets/images/splice.svg" style="width: 20px;" v-if="currentName">
      <div>
        {{currentName}}
      </div>
    </div>
  </div>
  <div>
    <div class="classic_select">
      <div style="margin-left: 10px;color: #666666">分类:</div>
      <div v-for="(item,index) in bigCategory" style="width: 8%;justify-content: space-around;margin-left: 20px;">
        <div class="category_font" @click="searchCategoryBook(item.id,item.classicNames)">{{item.classicNames}}</div>
      </div>
      <div class="category_font" style="width: 8%" @click="searchCategoryBook('','')">重置</div>
    </div>
    <div class="classic_select">
      <div style="margin-left: 10px;color: #666666">标签:</div>
      <div v-for="(item,index) in category" style="width: 8%;justify-content: space-around;margin-left: 20px;">
        <div class="category_font" @click="searchLabelBook(item.id,item.classicName)">{{item.classicName}}</div>
      </div>
      <div class="category_font" style="width: 8%" @click="searchLabelBook('','')">重置</div>
    </div>
  </div>
  <div style="width: 82%;display: flex;margin: 0 auto;flex-wrap: wrap;">
    <show-case :list="classicBook" @getBookId="toBookItem"></show-case>
  </div>
  </div>
</template>

<script>
import {classicItemSelectAll} from "../../../net/classicItemRequest";
import {classicSelectAll} from "../../../net/classicRequest";
import {selectAllBook} from "../../../net/bookRequest";
import el from "element-ui/src/locale/lang/el";
import ShowCase from "../../../components/common/ShowCase.vue";

export default {
  name: "before_category",
  components:{ShowCase},
  data(){
    return{
      category:'',
      bigCategory:'',
      classicBook:'',
      currentNames:'',
      currentName:'',
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
  },
  async created() {
    // this.classicBook = (await selectAllBook({bookName: this.$route.query.searchName})).data;
    this.searchCategoryBook(this.$route.query.categoryId, this.$route.query.categoryName);
    this.searchLabelBook(this.$route.query.labelId, this.$route.query.labelName);
    await this.getBigClassic();
    await this.getClassic();
    // await this.reChange();
  },
  methods:{
    toBookItem(data){
      this.$router.push({path:'/before/bookItem',query:{bookId:data}})
    },
    async getBigClassic(){
      this.bigCategory=(await classicItemSelectAll({})).data;
    },
    async getClassic(){
      this.category=(await classicSelectAll({})).data;
    },
    async getClassicBook(){
      this.classicBook=(await selectAllBook(this.form)).data;
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
      this.classicBook=(await selectAllBook({})).data;
      this.currentNames='';
      this. currentName='';
    }
  }
}
</script>

<style scoped>

</style>
