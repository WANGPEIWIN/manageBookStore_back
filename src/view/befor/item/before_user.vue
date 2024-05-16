<template>
<div style="width: 100%;;margin-top: 20px">
  <div style="width: 90%;margin: 0 auto;display: flex;justify-content: space-between">
    <div style="width: 20%;border: 1px solid #e5e4e4">
      <div style="text-align: center">
        <img :src="userInform.avatar" style="width: 160px;border-radius:50%;height: 160px;margin-top: 10px">
      </div>
      <div style="width: 100%;text-align: center;font-size:18px;height: 30px;line-height: 30px;margin: 5px 0;">
        <div style="width: 30%;margin: 0 auto;border: 1px solid #dcdada;border-radius: 1.2em;background-color: #ff445f;color: white;display: flex;justify-content: center">
          <div>{{userInform.userName}}</div>
          <div style="margin-top: 2px;margin-left: 4px;cursor: pointer;" @click="dialogFormVisible=true;updBefore(userInform.id)"><i class="el-icon-edit-outline"></i></div>
        </div>
      </div>
      <div style="margin-top:12px">
        <div class="user_inform" >简介:{{userInform.profile}}</div>
        <div class="user_inform" >电话:{{userInform.phone}}</div>
        <div class="mine_title" @click="getCollect()">收藏书籍</div>
        <div class="mine_title" @click="getComments()">书籍评论</div>
      </div>
    </div>
    <div style="width: 79%;border: 1px solid #e5e4e4">
      <div v-show="show">
        <div v-for="(item,index) in collection" :key="index" style="height: 100px;background-color: #efedec;display: flex;padding: 5px 0;">
          <div style=""><img :src="item.imgUrl" style="height: 80%;margin-top: 10px;margin-left: 5px"></div>
          <div style="width: 15%;text-align: center;font-size: 14px;margin-top: 20px;">
           <div>{{item.bookName}}</div>
           <div style="font-size: 12px;color: gray;margin-top: 4px">{{item.author}}</div>
          </div>
          <div style="width: 65%;margin-top: 10px;color: #919090">
            {{item.press.substring(0,100)}}
          </div>
          <div class="user_button" @click="$router.push({path:'/before/bookItem',query:{bookId:item.bookId}})">
            去阅读页
          </div>
        </div>
      </div>
      <div v-show="display">
        <div v-for="(item,index) in comments" :key="index" style="margin: 6px 0;height: 140px;background-color: #efedec;display: flex;padding: 5px 0;justify-content: space-around">
          <div><img :src="item.imgUrl" style="height: 80%;width: 80px;margin-top: 10px"></div>
          <div style="width: 8%;text-align: center;margin-top: 45px">{{item.bookName}}</div>
          <div style="margin-top: 35px;width: 300px">{{item.remarks.substring(0,70)}}</div>
          <div style="margin-top: 45px">
            <el-rate
            v-model="item.grades"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value}">
          </el-rate>
          </div>
          <div style="margin-top: 45px">
            {{item.createTime}}
          </div>
          <div style="margin-top: 45px"> {{item.updateTime}}</div>
        </div>
      </div>
    </div>
  </div>
  <div style="position:absolute;">
    <el-form :model="form" ref="form" class="demo-dynamic">
      <el-dialog title="修改用户信息" :visible.sync="dialogFormVisible" :before-close="dialogDisappear" width="450px">
        <el-form-item
          prop="userName"
          label="姓名"
          :rules="[{ required: true, message: '请输入用户名', trigger: 'blur' }]">
          <el-input v-model="form.userName" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item
          prop="pwd"
          label="密码"
          :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]">
          <el-input v-model="form.pwd" placeholder="请输入内容" show-password style="margin: 10px 0;"></el-input>
        </el-form-item>
        <el-form-item label="头像" prop="avatar">
          <div v-if="form.avatar===''">
            <el-upload
              class="upload-demo"
              action=""
              :on-change="handlePreview"
              :limit="1"
              :show-file-list="false"
              :auto-upload="false">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </div>
          <div v-else style="display: flex">
            <img :src="form.avatar" style="height: 200px"/>
            <div v-if="imgUrlUpdate">
              <el-upload
                class="upload-demo"
                action=""
                :on-change="handlePreview"
                :limit="1"
                :auto-upload="false"
                style="text-align: center;position: relative;top:60px;left: 10px">
                <el-button size="small" type="primary">修改图片</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </div>
          </div>
        </el-form-item>
        <el-form-item
          prop="profile"
          label="简介">
          <el-input v-model="form.profile" placeholder="请输入内容" style="margin: 10px 0;"></el-input>
        </el-form-item>
        <el-form-item
          prop="phone"
          label="电话"
          :rules="[{ required: true, message: '请输入电话', trigger: 'blur' }]">
          <el-input v-model="form.phone" placeholder="请输入内容" style="margin: 10px 0;"></el-input>
        </el-form-item>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogDisappear(),dialogFormVisible=false">取 消</el-button>
          <el-button type="primary" @click="updUser(),dialogFormVisible=false">确 定</el-button>
        </div>
      </el-dialog>
    </el-form>
  </div>
</div>
</template>

<script>
import {selectAll, selectById, updateUser} from "../../../net/userRequest";
import {selectCollect} from "../../../net/collectRequest";
import {selectComments} from "../../../net/commentsRequest";
import {deleteFile, uploadImg} from "../../../net/bookRequest";
import {selectReadRecord} from "../../../net/readRecordRequest";

export default {
  name: "before_user",
  data(){
    return{
      userInform:'',
      collection:'',
      show:false,
      display:false,
      informShow:true,
      comments:'',
      formData:'',
      imgUrlUpdate:false,
      form: {
        userName: '',
        pwd: '',
        avatar:'',
        profile: '',
        role: '',
        phone: '',
      },
      dialogFormVisible: false,
    }
  },
  methods:{
    async selectRecord(id){
      this.formData=(await selectReadRecord({userId: id})).data[0];
      console.log(this.formData);
    },
    async getUserInform(){
      this.informShow=true;
      this.show=false;
      this.display=false;
      this.userInform=(await selectAll({userName:sessionStorage.getItem("user"),role:''})).data[0];
      sessionStorage.setItem("id",this.userInform.id);
    },
    async getCollect(){
      this.show=true;
      this.informShow=false;
      this.display=false;
      this.collection=(await selectCollect({userId:this.userInform.id})).data;
    },
    async getComments(){
      this.display=true;
      this.show=false;
      this.informShow=false;
      this.comments=(await selectComments({userId:this.userInform.id})).data;
    },
    async dialogDisappear(){
      if(this.isUpload){
        this.isUpload=false;
        let res=new FormData()
        res.append("fileName",this.form.avatar);
        await deleteFile(res);
      }
      this.dialogFormVisible=false;
    },
    async handlePreview(file) {
      let req = new FormData();
      req.append("file",file.raw);
      console.log(req);
      this.form.avatar=(await uploadImg(req)).data;
      this.isUpload=true;
    },
    async updUser() {
      let upd = await updateUser(this.form);
      console.log(upd);
      // if(upd.code==="200"){
        this.userInform = upd.data;
      // }
      // this.$store.commit("tip",upd);
    },
    async updBefore(id) {
      //这个位置是可以但是不好?
      //覆盖原有表单
      this.form = (await selectById(id)).data;
      //修改当前状态为修改
      this.isAdd = false;
      this.imgUrlUpdate=true;
    },
  },
  async created() {
    await this.getUserInform();
    await this.getCollect();
    await this.selectRecord(this.userInform.id);
  },
}
</script>

<style scoped>
.mine_title{
  text-align: center;background-color: #ff445f;
  height: 50px;
  color: white;
  line-height: 50px;
  cursor: pointer;
  width: 97%;
  margin: 2px auto;
}
.mine_title:hover{
  color: #ff445f;
  background-color: white;
  border: 1px solid #ff445f;
}
.user_inform{
  text-align: center;background-color: #ffffff;
  border: 1px solid #ff445f;
  color: #ff445f;
  line-height: 40px;
  width: 97%;
  margin: 2px auto;
  border-radius: 1.4em;
  cursor: pointer;
}
.user_button{
  margin-top: 10px;margin-left: 20px;
  padding: 8px;background: #ff445f;
  height: 30px;line-height: 30px;
  color: white;border-radius: .6em;
  cursor: pointer
}
.user_button:hover{

}
</style>
