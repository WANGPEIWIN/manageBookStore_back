<template>
  <div style="width: 100%;height: 649px;display: flex">
    <div style="width: 100%;">
      <div style="line-height: 100px;">
        <div style="font-size: 30px;font-weight: bold;text-align: center">用户管理</div>
      </div>
      <div style="width: 90%;height: 260px;margin: 0 auto;border-radius: 1em;box-shadow: 0 0 10px rgba(128,128,128,0.62)">
        <div style="width: 92%;margin: 0 auto;">
          <div style="font-weight: bold;font-size: 18px;line-height: 60px">筛选:</div>
          <div style="display: flex;width: 800px;justify-content: space-between">
            <div style="width: 380px;">
              <div style="height: 40px">用户名:</div><el-input v-model="search.userName" placeholder="请输入姓名"></el-input>
            </div>
            <div style="margin: 0 70px ">
              <div style="height: 40px">权限:</div>
              <el-select v-model="search.role" placeholder="请选择权限">
                <el-option label="无" value=""></el-option>
                <el-option label="管理员" value="管理员"></el-option>
                <el-option label="用户" value="用户"></el-option>
              </el-select>
            </div>
          </div>
          <div style="display: flex;margin: 20px 0;justify-content: right">
            <div @click="showUser()"><el-button type="primary">搜索</el-button></div>
            <div style="margin: 0 20px;"> <el-button type="success"  @click="addBefore();dialogFormVisible = true">新增</el-button></div>
            <div><el-button type="info" @click="emptySearch()">清空</el-button></div>
          </div>
        </div>
      </div>
      <div style="border-radius: 1em;box-shadow: 0 0 10px rgba(128,128,128,0.62);width: 90%;height: auto;margin:60px auto;">
          <el-table
            :data="userInform"
            style="width: 100%;border-radius: 1em;">
            <el-table-column
              prop="userName"
              label="姓名">
            </el-table-column>
            <el-table-column
              prop="pwd"
              label="密码">
            </el-table-column>
            <el-table-column
              prop="avatar"
              label="头像">
              <template v-slot="scope">
                <img :src="scope.row.avatar" style="width: 80px;border-radius:50%;">
              </template>
            </el-table-column>
            <el-table-column
              prop="profile"
              label="简介">
            </el-table-column>
            <el-table-column
              prop="role"
              label="权限">
            </el-table-column>
            <el-table-column
              prop="phone"
              label="电话">
            </el-table-column>
            <el-table-column
              prop="createTime"
              label="注册时间">
            </el-table-column>
            <el-table-column
              prop="updateTime"
              label="更新时间">
            </el-table-column>
            <el-table-column label="操作" width="200px" >
              <template slot-scope="scope" >
                <div style="height: 60px;margin-top: 32px;">
                  <el-button-group>
                    <el-button
                      icon="el-icon-edit"  @click="updBefore(scope.row.id);dialogFormVisible = true"></el-button>
                    <el-button
                      icon="el-icon-delete"
                      type="danger" @click="deleteUser(scope.row.id)"></el-button>
                  </el-button-group>
                </div>
              </template>
            </el-table-column>
          </el-table>
      </div>
      <div style="position:absolute;">
        <el-form :model="form" ref="form" class="demo-dynamic">
          <el-dialog title="操作用户" :visible.sync="dialogFormVisible" :before-close="dialogDisappear" width="450px">
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
                <el-form-item label="权限:"
                              :rules="[{ required: true, message: '请选择权限', trigger: 'blur'}]">
                  <el-select v-model="form.role" placeholder="请选择权限" style="margin: 0 10px">
                    <el-option label="无" value="无"></el-option>
                    <el-option label="管理员" value="管理员"></el-option>
                    <el-option label="用户" value="用户"></el-option>
                  </el-select>
                </el-form-item>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogDisappear()">取 消</el-button>
              <el-button type="primary" @click="operateUser()">确 定</el-button>
            </div>
          </el-dialog>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>

import {addUser, deleteUser, selectAll, selectById, updateUser} from "../net/userRequest";
import {deleteFile, uploadImg} from "../net/bookRequest";

export default {
  name: "user",
  data() {
    return {
      isUpload:false,
      imgUrlUpdate:false,
      isAdd: true,
      userInform: null,
      formLabelWidth: '120px',
      form: {
        userName: '',
        pwd: '',
        avatar:'',
        profile: '',
        role: '',
        phone: '',
      },
      search: {
        userName: '',
        role: '',
      },
      dialogFormVisible: false,
    }
  },
  async created() {
    await this.showUser();
  },
  methods: {
    async showUser() {
      let res = await selectAll(this.search);
      if(res.code==="200"){
        this.userInform = res.data;
      }
    },
    async dialogDisappear(){
      if(this.isUpload){
        this.isUpload=false;
        let res=new FormData()
        res.append("fileName",this.form.avatar);
        await deleteFile(res);
      }
      //把其他的也改了,这是今天内容
      this.dialogFormVisible=false;
    },
    async handlePreview(file) {
      let req = new FormData();
      req.append("file",file.raw);
      this.form.avatar=(await uploadImg(req)).data;
      this.isUpload=true;
    },
    async addUser() {
      let add = await addUser(this.form);
      if(add.code==="200"){
        this.userInform = add.data;
      }
      this.$store.commit("tip",add);
    },
    async deleteUser(id) {
      let del = await deleteUser(id);
      if(del.code==="200"){
        this.userInform = del.data;
      }
      this.$store.commit("tip",del);
    },
    async updUser() {
      let upd = await updateUser(this.form);
      if(upd.code==="200"){
        this.userInform = upd.data;
      }
      this.$store.commit("tip",upd);
    },
    async updBefore(id) {
      //这个位置是可以但是不好?
      //覆盖原有表单
      this.form = (await selectById(id)).data;
      //修改当前状态为修改
      this.isAdd = false;
      this.imgUrlUpdate=true;
    },
    addBefore() {
      //清空表单
      this.form = {
        userName: '',
        pwd: '',
        avatar: '',
        profile: '啥也没有',
        role: '用户',
        phone: '',
      };
      //修改当前状态为添加
      this.isAdd = true;
    },
    verifyUserSubmit(){
      let res={
        code:"500",
        message:""
      }
      if(this.form.userName===''){
        res.message+="用户名  ";
      }
      if(this.form.pwd===''){
        res.message+="密码  ";
      }
      if (this.form.phone===''){
        res.message+="电话  ";
      }
      if(this.form.role===''){
        res.message+="权限  ";
      }
      if (res.message===""){
       return true;
      }
      res.message+="未填写";
      this.$store.commit("tip",res);
      return false;
    },
    async deleteFile(imgPath){
      await deleteFile(imgPath)
    },
    operateUser() {//按钮当前流程控制器
      if (this.isAdd) {
        if (this.verifyUserSubmit()){
          this.dialogFormVisible = false;
          this.addUser();
        }
        }else {
          this.dialogFormVisible = false;
          this.updUser();
      }
      this.imgUrlUpdate=false;
    },
    async emptySearch(){
      this.search={
        userName: '',
        role: ''
      }
      await this.showUser();
    }
  }
}
</script>

<style scoped>

</style>
