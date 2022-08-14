<template>
  <div style="width: 100%">
      <div style="width: 100%;">
        <div style="line-height: 100px;">
          <div style="font-size: 30px;font-weight: bold;text-align: center">书籍管理</div>
        </div>
        <div style="width: 90%;height: 260px;margin: 0 auto;border-radius: 1em;box-shadow: 0 0 10px rgba(128,128,128,0.62)">
          <div style="width: 92%;margin: 0 auto;">
            <div style="font-weight: bold;font-size: 18px;line-height: 60px">筛选:</div>
            <div style="display: flex;width: 800px;justify-content: space-between">
              <div style="width: 380px;">
                <div style="height: 40px">书籍名:</div><el-input v-model="search.bookName" placeholder="请输入书名"></el-input>
              </div>
              <div style="margin: 0 70px ">
                <div style="height: 40px">分类:</div>
                <el-select v-model="search.categoryId" placeholder="请选择分类">
                  <el-option label="无" value=""></el-option>
                  <el-option :label="item.classicName" :value="item.id" v-for="(item,index) in classic" :key="index"></el-option>
                </el-select>
              </div>
            </div>
            <div style="display: flex;margin: 20px 0;justify-content: right">
              <div @click="showBook()"><el-button type="primary">搜索</el-button></div>
              <div style="margin: 0 20px;"> <el-button type="success"  @click="addBefore();dialogFormVisible = true">新增</el-button></div>
              <div><el-button type="info" @click="emptyBookName()">清空</el-button></div>
            </div>
          </div>
        </div>
        <div style="border-radius: 1em;box-shadow: 0 0 10px rgba(128,128,128,0.62);width: 90%;height: auto;margin:60px auto;">
          <el-table
            :data="bookInform"
            style="width: 100%;border-radius: 1em;">
            <el-table-column
              prop="bookName"
              label="书名">
            </el-table-column>
            <el-table-column
              prop="imgUrl"
              label="图片"
              width="120px">
              <template slot-scope="scope" >
                <img :src="scope.row.imgUrl" style="height: 130px;"/>
              </template>
            </el-table-column>
            <el-table-column
              prop="author"
              label="作者">
            </el-table-column>
            <el-table-column
              prop="press"
              label="简介"
            width="200px">
            </el-table-column>
            <el-table-column
              label="价格">
              <template slot-scope="scope">
                ¥{{scope.row.price}}
              </template>
            </el-table-column>
            <el-table-column
              prop="discount"
              label="折扣">
            </el-table-column>
            <el-table-column
                prop="classicName"
                label="分类">
            </el-table-column>
            <el-table-column
              prop="createTime"
              label="注册时间">
            </el-table-column>
            <el-table-column
              prop="updateTime"
              label="更新时间">
            </el-table-column>
            <el-table-column label="操作" width="190px" >
              <template slot-scope="scope" >
                <div style="height: 60px;margin-top: 32px;">
                  <el-button-group>
                  <el-button @click="updBefore(scope.row.id);dialogFormVisible = true" icon="el-icon-edit" type="primary"></el-button>
                  <el-button type="danger" @click="deleteBook(scope.row.id)" icon="el-icon-delete"></el-button>
                  <el-button type="success" @click="addHot(scope.row.id)" icon="el-icon-magic-stick"></el-button>
                  </el-button-group>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div style="position:absolute;">
          <el-form ref="form" :model="form" class="demo-dynamic">
          <el-dialog title="操作书籍" :visible.sync="dialogFormVisible" width="450px"  :before-close="dialogDisappear" >
              <el-form-item label="名字"
                            prop="bookName"
                            :rules="[{ required: true, message: '请输入名字', trigger: 'blur'}]">
                <el-input v-model="form.bookName" placeholder="请输入内容" style="margin: 10px 0;"></el-input>
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
                  <img :src="form.imgUrl" style="height: 200px"/>
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
              <el-form-item label="价格:"
                            prop="price"
                            :rules="[{ required: true, message: '请输入价格', trigger: 'blur'}]">
                <el-input v-model="form.price" placeholder="请输入内容" style="margin: 10px 0;"></el-input>
              </el-form-item>
              <el-form-item label="折扣:"
                            prop="discount"
                            :rules="[{ required: true, message: '请输入折扣', trigger: 'blur'}]">
                <el-input v-model="form.discount" placeholder="请输入内容" style="margin: 10px 0;"></el-input>
              </el-form-item>
              <el-form-item label="作者:"
                            prop="author"
                            :rules="[{ required: true, message: '请输入作者', trigger: 'blur'}]">
                <el-input v-model="form.author" placeholder="请输入内容" style="margin: 10px 0;"></el-input>
              </el-form-item>
              <el-form-item label="简介:" prop="press">
                <el-input v-model="form.press" placeholder="请输入内容" style="margin: 10px 0;"></el-input>
              </el-form-item>
              <el-form-item label="分类:"
                            prop="categoryId"
                            :rules="[{ required: true, message: '请选择分类', trigger: 'blur'}]">
                <el-select v-model="form.categoryId" placeholder="请选择分类">
                  <el-option :label="item.classicName" :value="item.id" v-for="(item,index) in classic" :key="index"></el-option>
                </el-select>
              </el-form-item>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="operateBook()">确 定</el-button>
            </div>
          </el-dialog>
          </el-form>
        </div>
      </div>
    </div>
<!--  </div>-->
</template>

<script>


import {addBook, deleteBook, deleteFile, selectAll, selectById, updateBook, uploadImg} from "../net/bookRequest";
import {classicSelectAll} from "../net/classicRequest";
import TitleItem from "../components/contant/titleItem/titleItem";
import {addHotBook} from "../net/hotBookRequest";

export default {
  name: "homeItem",
  components: {TitleItem},
  data(){
    return{
      isUpload:false,
      imgUrlUpdate:false,
      isAdd:true,
      fileList:[],
      bookInform:null,
      formLabelWidth: '120px',
      form:{
        bookName:'',
        imgUrl:'',
        price:'',
        discount:'',
        author:'',
        categoryId:'',
        press:'',
      },
      search:{
        bookName:'',
        categoryId:'',
      },
      classic:'',
      dialogFormVisible: false,
    }
  },
  created: async function () {
    await this.showBook();
    this.classic = (await classicSelectAll({})).data;
  },
  methods:{
    async showBook(){
      let showB = await selectAll(this.search);
      if(showB.code==="200"){
        this. bookInform=showB.data;
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
      this.isUpload=true;
    },
    async addBook(){
      let addB = await addBook(this.form);
      if(addB.code==="200"){
        this.bookInform=addB.data;
      }
      this.$store.commit("tip",addB);
    },
    async deleteBook(id){
      let delB = await deleteBook(id);
      if(delB.code==="200"){
        this.bookInform=delB.data;
      }
      this.$store.commit("tip",delB);
    },
    async updBook(){
      let updB = await updateBook(this.form);
      if(updB.code==="200"){
        this.bookInform=updB.data;
      }
      this.$store.commit("tip",updB);
    },
    async addHot(id){
      this.$store.commit("tip",await addHotBook({bookId: id}));
    },
    async updBefore(id){
      //覆盖原有表单
      console.log(id);
      this.form=(await selectById({id:id})).data;
      //修改当前状态为修改
      this.isAdd=false;
      this.imgUrlUpdate=true;
    },
    addBefore(){
      //清空表单
      this.form={
        bookName:'',
        imgUrl:'',
        price:'',
        discount:'1',
        author:'',
        categoryId:'',
        press:'自行脑补',
      };
      //修改当前状态为添加
      this.isAdd=true;
    },
    verify(){
      let res={
        code:'500',
        message:""
      }
      if(this.form.bookName===""){
        res.message+="书名"
      }
      if(this.form.price===""){
        res.message+="价格"
      }
      if(this.form.discount===""){
        res.message+="折扣"
      }
      if(this.form.author===""){
        res.message+="作者"
      }
      if(this.form.press===""){
        res.message+="介绍"
      }
      if(res.message===""){
        return true;
      }
      res.message+="未填写";
      this.$store.commit("tip",res);
      return false;
    },
    operateBook(){//按钮当前流程控制器
      if(this.isAdd){
        if(this.verify()){
          this.dialogFormVisible = false;
          this.addBook();
        }
      }else{
        this.dialogFormVisible = false;
        this.updBook();
      }
      this.imgUrlUpdate=false;
    },
    async emptyBookName(){
      this.search={
          bookName:'',
          categoryId:'',
      }
      await this.showBook();
    }
  }
}
</script>

<style scoped>

</style>
