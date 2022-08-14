<template>
  <div style="width: 100%;">
    <div style="line-height: 100px;">
      <div style="font-size: 30px;font-weight: bold;text-align: center">轮播图管理</div>
    </div>
    <div style="width: 90%;height: 260px;margin: 0 auto;border-radius: 1em;box-shadow: 0 0 10px rgba(128,128,128,0.62)">
      <div style="width: 92%;margin: 0 auto;">
        <div style="font-weight: bold;font-size: 18px;line-height: 60px">筛选:</div>
          <div style="display: flex;width: 800px;justify-content: space-between">
            <div style="width: 380px;">
              <div style="height: 40px">标题:</div><el-input placeholder="请输入标题" v-model="search.title"></el-input>
            </div>
          </div>
          <div style="display: flex;margin: 20px 0;justify-content: right">
            <div @click=""><el-button type="primary" @click="selectTitle()">搜索</el-button></div>
            <div style="display: flex;justify-content: right;margin: 0 10px"> <el-button type="success"  @click="dialogFormVisible = true;beforeAdd()">新增</el-button></div>
            <div> <el-button type="info"  @click="emptyTitle()">清空</el-button></div>
          </div>
      </div>
    </div>
    <div style="border-radius: 1em;box-shadow: 0 0 10px rgba(128,128,128,0.62);width: 90%;height: auto;margin:60px auto;">
      <el-table
        :data="swiperInform"
        style="width: 100%;border-radius: 1em;">
        <el-table-column
          prop="title"
          label="标题">
        </el-table-column>
        <el-table-column
          prop="imgUrl"
          label="图片">
          <template slot-scope="scope">
            <img :src="scope.row.imgUrl" style="width: 130px">
          </template>
        </el-table-column>
        <el-table-column
          prop="explains"
          label="概述">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="注册时间">
        </el-table-column>
        <el-table-column label="操作" width="200px" >
          <template slot-scope="scope" >
            <div style="height: 60px;margin-top: 32px;">
              <el-button-group>
                <el-button icon="el-icon-edit" @click="beforeUpd(scope.row.id);dialogFormVisible = true"></el-button>
                <el-button
                  icon="el-icon-delete"
                  type="danger" @click="deleteSwiper(scope.row.id)"></el-button>
              </el-button-group>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div style="position:absolute;">
      <el-dialog title="操作轮播图" :visible.sync="dialogFormVisible" width="450px"   :before-close="dialogDisappear">
        <el-form :model="form" ref="form">
          <el-form-item label="标题:"
                        prop="title"
                        :rules="[{ required: true, message: '请输入标题', trigger: 'blur' }]">
            <el-input v-model="form.title" placeholder="请输入内容" style="margin: 10px 0;"></el-input>
          </el-form-item>
          <el-form-item label="图片:" prop="imgUrl">
            <div v-if="form.imgUrl===''">
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
              <img :src="form.imgUrl" style="width: 250px"/>
              <div v-if="imgUrlUpdate">
                <el-upload
                  class="upload-demo"
                  action=""
                  :on-change="handlePreview"
                  :limit="1"
                  :auto-upload="false"
                  style="text-align: center;position: relative;top:10px;left: 10px">
                  <el-button size="small" type="primary">修改图片</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="概述:"
                        prop="explains"
                        :rules="[{ required: true, message: '请输入概述', trigger: 'blur' }]">
            <el-input v-model="form.explains" placeholder="请输入内容" style="margin: 10px 0;"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="operateSwiper()">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {addSwiper, deleteSwiper, selectAll, selectById, updateSwiper} from "../net/swiperRequest";
import {deleteFile, uploadImg} from "../net/bookRequest";

export default {
  name: "swiper",
  data(){
    return{
      isUpload:false,
      imgUrlUpdate:false,
      swiperInform:null,
      form:{
        title:'',
        imgUrl:'',
        explains:'',
      },
      search:{
        title:''
      },
      dialogFormVisible: false,
      upd:true,
    }
  },
  async created() {
    await this.showSwiper();
  },
  methods:{
    async showSwiper(){
      let show = await selectAll(this.search);
      if(show.code==="200"){
        this.swiperInform=show.data;
      }
    },
    async dialogDisappear(){
      if(this.isUpload){
        this.isUpload=false;
        let res=new FormData()
        res.append("fileName",this.form.imgUrl);
        await deleteFile(res);
      }
      //把其他的也改了,这是今天内容
      this.dialogFormVisible=false;
    },
    async handlePreview(file) {
      let req = new FormData();
      req.append("file",file.raw);
      this.form.imgUrl=(await uploadImg(req)).data;
    },
    verify(){
      let res={
        code:'500',
        message:""
      }
      if(this.form.title===""){
        res.message+="标题";
      }
      if(this.form.explains===""){
        res.message+="介绍"
      }
      if(res.message===""){
        return true;
      }
      res.message+="未填写";
      this.$store.commit("tip",res);
      return false;
    },
    async addSwiper(){
      if(this.verify()){
        this.dialogFormVisible = false;
        let add = await addSwiper(this.form);
        if(add.code==="200"){
          this.swiperInform=add.data;
        }
        this.$store.commit("tip",add);
      }
    },
    async deleteSwiper(id){
      let del = await deleteSwiper(id);
      if(del.code==="200"){
        this.swiperInform=del.data;
      }
      this.$store.commit("tip",del);
    },
    async beforeUpd(id){
      this.form=(await selectById(id)).data;
      let oldImg=this.form.imgUrl;
      this.upd=false;
      this.imgUrlUpdate=true;
    },
    async beforeAdd(){
      this.form={
        title:'',
          imgUrl:'',
          explains:'',
      }
      this.upd=true;
    },
    async updSwiper(){
      await updateSwiper(this.form)
    },
    operateSwiper() {//按钮当前流程控制器
      if (this.upd) {
          this.dialogFormVisible = false;
          this.addSwiper();
      }else {
        this.dialogFormVisible = false;
        this.updSwiper();
      }
      this.imgUrlUpdate=false;
    },
    async selectTitle(){
      this.swiperInform=(await selectAll(this.search)).data;
    },
    async emptyTitle(){
      this.search={
        title: '',
      }
      await this.showSwiper();
    }
    }
}
</script>

<style scoped>

</style>
