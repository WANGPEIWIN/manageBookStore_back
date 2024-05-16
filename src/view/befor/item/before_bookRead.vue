<template>
<div style="width: 100%;">
  <div style="font-size: 20px;text-align: center;height: 40px;line-height: 40px">{{novel[chapter].substring(0,14)}}</div>
  <div style="width: 50%;;margin:0 auto;line-height: 32px;letter-spacing:4px">
    <p v-html='novel[chapter].replaceAll("。","。<br/>")'></p>
  </div>
  <div style="display: flex;justify-content: center;">
    <div style="display: flex;width: 500px;justify-content: space-between">
      <button class="novelButton" :disabled="isButton" @click="subtractChapter()">上一章</button>
      <button @click="addChapter" class="novelButton" >下一章</button>
    </div>
  </div>
</div>
</template>

<script>
import {getBookFile} from "../../../net/bookRequest";
import {addReadRecord, selectReadRecord, updateReadRecord} from "../../../net/readRecordRequest";
import fa from "element-ui/src/locale/lang/fa";

export default {
  name: "before_bookRead",
  data(){
    return{
      novel:'',
      show:true,
      chapter:1,
      record:0,
      readForm:{
        filePath: this.$route.query.filePath,
        fileRecord: this.record,
        bookId: this.$route.query.bookId,
        userId: sessionStorage.getItem("id"),
        chapiterRecord:this.chapter
      },
      recordId:'',
      formData:'',
      isButton:false
    }
  },
  watch:{
    chapter(){
        window.scroll(0, 0);
        if(this.show){
          // this.readRecord();
          this.show=false;
        }else {
          this.updateReadCode();
        }
    }
  },
  methods:{
    async getBookRead(){
      this.novel=(await getBookFile({filePath:this.$route.query.filePath,
        fileRecord:this.record,bookId:this.$route.query.bookId,
      userId:sessionStorage.getItem("id")})).data;
      // console.log(res);
    },
    addChapter(){
      this.isButton=false;
      if(this.chapter<this.novel.length-1){
        this.chapter++;
        console.log("在第一次请求前的"+this.chapter);
      }else {
        this.record+=1;
        this.chapter=0;
        this.getBookRead();
        console.log("请求过一次之后的"+this.chapter);
        // this.chapter===this.novel.length-1
      }
    },
    async subtractChapter() {
      console.log("从上一次cord请求下来的"+this.chapter);
      if (this.chapter <= this.novel.length - 1 && this.chapter > 0) {
        this.chapter -= 1;
        console.log("从上一次cord请求下来的并且减了一章"+this.chapter);
      }
      if(this.chapter===1&&this.record===0){
        console.log("this.chapter===1&&this.record===0"+this.chapter);
        this.isButton=true;
        let res={
          code:'300',
          message:"已至第一章，请点击下一章"}
        this.$store.commit("tip",res)
      }
      if (this.chapter === 0) {
        console.log("回到第一次请求"+this.chapter);
        if(this.record>0){
          this.record -= 1;
          this.novel = null;
          this.novel=(await getBookFile({filePath: this.$route.query.filePath,fileRecord:this.record})).data;
          this.chapter = this.novel.length - 1;
          console.log("再第一次请求前的"+this.chapter);
        }
        }
      },
    //新增record
    async readRecord(){
      //可以重复修改，但不可以重复增加
      this.recordId=(await addReadRecord({
        filePath: this.$route.query.filePath,
        fileRecord: this.record,
        bookId: this.$route.query.bookId,
        userId: sessionStorage.getItem("id"),
        chapiterRecord:this.chapter
      })).data[0].id;
      console.log("@@@@record表的id@@@@@"+this.recordId[0].id);
    },
    async updateReadCode(){
      await updateReadRecord({
        id:this.formData.id,
        filePath: this.$route.query.filePath,
        fileRecord: this.record,
        bookId: this.$route.query.bookId,
        userId: sessionStorage.getItem("id"),
        chapiterRecord:this.chapter
      });
    },
    async selectRecord(){
      this.formData=(await selectReadRecord({bookId: this.$route.query.bookId})).data[0];
    }
  },
   async created() {
     await this.selectRecord();
     console.log("record请求完+readRecord");
     this.novel=(await getBookFile({
       filePath: this.$route.query.filePath,
       fileRecord: 0,
       bookId: this.$route.query.bookId,
       userId: sessionStorage.getItem("id"),
       chapiterRecord:1
     })).data;
     if(this.formData!=''){
       console.log("formData判断");
       this.novel=(await getBookFile(this.formData)).data;
       console.log("用请求的record数据请求小说数据");
       console.log("用请求的record数据给章节赋值");
       this.chapter = this.formData.chapiterRecord;
       if(this.chapter===1&&this.formData.fileRecord===0){
         this.isButton=true
       }
       this.show=false;
     }else {
       console.log("没有请求到formData，现在新增record记录");
       await this.readRecord();
     }
     console.log("结束");
     // await this.getBookRead(this.formData);
     // if(this.formData){
     //   this.chapter = this.formData.chapiterRecord;
     //   this.show=false;
     // }
     //if formdateid存在就销毁add函数
     sessionStorage.getItem("id")
   },
}
</script>

<style scoped>
.novelButton {
  cursor: pointer;
  border: 1px solid white;
  background-color: #ff445f;
  color: white;
  padding: 8px;
  transition: all .3s;
}
.novelButton:hover{
  border: 1px solid #ff445f;
  color: #ff445f;
  background-color: white;
}
</style>
