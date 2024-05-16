<template>
<div style="width: 100%;">
  <div style="width:95%;margin: 0 auto;border: 1px solid #c7c6c6">
    <div style="width: 100%;text-align: center;background-color:#ff445f;height: 60px;color: white">
      <div style="font-size: 22px;height: 35px;line-height: 40px">{{bookInform.bookName}}</div>
      <div style="font-size: 14px">{{bookInform.author}}</div>
    </div>
    <div style="display: flex;width:95%;margin: 15px auto;">
      <div style="width: 15%;">
        <div style="text-align: center">
          <img :src="bookInform.imgUrl" style="width: 210px;height: 280px;">
        </div>
        <div style="margin: 0 auto;;width:80%;font-size: 16px">
          <div class="classic_label" @click="toClassic(bookInform.bigCategoryId,bookInform.classicNames)">
            分类:{{bookInform.classicNames}}
          </div>
          <div class="classic_label" @click="toLabel(bookInform.categoryId,bookInform.classicName)">
            标签:{{bookInform.classicName}}
          </div>
        </div>
      </div>
      <div style="width:85%;display: flex">
        <div style="width: 75%;margin-left: 20px " class="text">
          <p  v-html='bookInform.press.replaceAll("。","。<br/>")'></p>
        </div>
        <div style="width: 25%;">
          <div style="width: 100%;">
            <div style="font-size: 18px;color: #ff445f">热门书籍</div>
            <div v-for="(item,index) in hotBook">
              <div style="display: flex;border-bottom: 1px solid #dddddd;padding: 3px 0;cursor: pointer" @click="$router.push({path:'/before/bookItem',query:{bookId:item.bookId}})">
                <div><img :src="item.imgUrl" style="width: 25px"></div>
                <div style="margin-left: 10px;font-size: 14px;color: #666666">{{item.bookName}}</div>
              </div>
            </div>
          </div>
          <div style="width: 100%;display: flex;justify-content: center;margin-top: 8px;">
            <div class="bookItem_Button" @click="toRead(bookInform.filePath,bookInform.id)">立即阅读</div>
            <div class="bookItem_Button" @click="addCollect(bookInform.id)">加入收藏</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div style="width: 100%;margin-top: 15px">
    <div style="width:95%;margin: 0 auto;">
      <div style="width: 100%;">
        <div style="width: 20%;display: flex;justify-content: space-between;">
          <div style="height: 40px;line-height: 40px;font-size: 20px;margin-left: 10px;">
            本书评论
          </div>
          <div style="height: 40px;line-height: 40px;font-size: 20px;margin-left: 10px;cursor: pointer;background-color: #ff445f;color: white;padding: 0 5px" @click="dialogVisible = true">
            发布评论
          </div>
        </div>
      </div>
      <div style="width: 100%;margin-top: 15px;border: 1px solid #c7c6c6">
        <div style="">
          <div v-for="(item,index) in comments" :key="index" style=";padding: 10px;display: flex;justify-content: space-between" v-if="comments">
            <div style="display: flex">
              <div><img :src="item.avatar" style="width: 50px;height:50px;border-radius: 50%;"></div>
              <div style="margin-left: 10px">
                <div style="display: flex">
                  <div style=";margin-left: 10px;font-size: 18px;font-weight: bold;">{{item.userName}}</div>
                  <div style="font-size: 12px;margin-top: 4px;margin-left: 15px">
                    <el-rate
                    v-model="item.grades"
                    disabled
                    show-score
                    text-color="#ff9900"
                    score-template="{value}">
                  </el-rate>
                  </div>
                </div>
                <div style=";margin-left: 10px;font-size: 18px;">{{item.remarks}}</div>
              </div>
            </div>
            <div>
              <div v-show="item.userId===commentsUserId" class="comments_button" @click="deleteRemarks(item.id,item.bookId)">
                删除
              </div>
              <div v-show="item.userId!==commentsUserId" class="comments_button">
                举报
              </div>
            </div>
          </div>
          <div v-if="comments.length===0">
            <el-empty description="暂无评论" ></el-empty>
          </div>
        </div>
      </div>
    </div>
  </div>
  <el-dialog
    title="评论"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="分数">
        <el-rate
          style="margin-top: 10px"
          v-model="form.grades"
          show-text>
        </el-rate>
      </el-form-item>
      <el-form-item label="评论">
        <el-input v-model="form.remarks"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false;addComments(bookInform.id)">确 定</el-button>
  </span>
  </el-dialog>
</div>
</template>

<script>
import {getBookDetails, getBookFile, selectAllBook, selectById} from "../../../net/bookRequest";
import {addCollect} from "../../../net/collectRequest";
import el from "element-ui/src/locale/lang/el";
import form from "element-ui/packages/form";
import {addComments, deleteComments, selectComments} from "../../../net/commentsRequest";
import {selectHot} from "../../../net/hotBookRequest";

export default {
  name: "before_bookItem",
  data(){
    return{
      bookInform:'',
      searchInform:{
        bookName:this.$route.query.bookName,
      },
      comments:'',
      dialogVisible: false,
      form:{
        grades:'',
        remarks:'',
        bookId:'',
        userId:'',
      },
      searchComments:{
        bookId:this.$route.query.bookId,
      },
      hotBook:'',
      commentsUserId:sessionStorage.getItem("id")
    }
  },
  methods:{
   async getBookItem(){
     this.bookInform=(await selectAllBook({id:this.$route.query.bookId})).data[0];
    },
    async getHotBook(){
     this.hotBook=(await selectHot({})).data
    },
    toRead(file,id){
     this.$router.push({path:'/before/bookRead',query:{filePath:file,bookId:id}})
    },
    async addComments(id){
      if(sessionStorage.getItem('user')){
        let uId=sessionStorage.getItem("id")
        this.form.bookId=id;
        this.form.userId=uId;
        this.comments=(await addComments(this.form)).data;
        this.form='';
      }else{
        await this.$router.push('/login');
      }
    },
    async deleteRemarks(id,value){
      this.comments=( await deleteComments(id,value)).data;
      await this.getComments();
    },
    async getComments(){
      this.comments=(await selectComments({bookId:this.$route.query.bookId})).data;
    },
    async addCollect(id){
     if(sessionStorage.getItem('user')){
       let uId=sessionStorage.getItem("id")
       let res=await addCollect({bookId:id,userId:uId})
       if(res.code==='200') {
         this.$store.commit('tip', res)
       }else {
         this.$store.commit('tip', res)
       }
     }else{
       await this.$router.push('/login');
     }
    },
    toClassic(index,value){
     this.$router.push({
       path:'/before/category',
       query:{
         categoryId:index,
         categoryName:value,
       }
     })
    },
    toLabel(index,value){
     this.$router.push({
       path:'/before/category',
       query:{
         labelId:index,
         labelName:value,
       }
     })
    }
  },
  watch:{
    '$route.query.bookId'(){
      this.getBookItem();
      this.getComments();
    }
},
  created() {
    this.getBookItem();
    this.getComments();
    this.getHotBook();
  },
}
</script>

<style scoped>
.classic_label{
  cursor: pointer;
  margin: 5px 0;
}
.classic_label:hover{
  color: #ef4506;
}
.bookItem_Button{
text-align: center;
  border: 1px solid white;
  background-color: #ff445f;
  color: white;
  padding: 8px;
  margin: 0 5px;
  cursor: pointer;
  transition: all .3s;
}
.bookItem_Button:hover{
  border: 1px solid #ff445f;
  color: #ff445f;
  background-color: white;
}
.comments_button{
  margin-top: 6px;
  padding: 10px 20px;
  background-color: #f31109;
  border-radius: .9em;
  cursor: pointer;
  border: 1px solid #f31109;
  color: white;
}
.comments_button:hover{
  border: 1px solid #f31109;
  color: #f31109;
  background-color: white;
}
</style>
