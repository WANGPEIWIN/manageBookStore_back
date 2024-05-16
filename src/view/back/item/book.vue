<template>
  <div style="width: 100%">
      <div style="width: 100%;">
        <div style="line-height: 100px;">
        </div>
        <search-plant>
          <div slot="inputName">
            书籍名:
          </div>
          <div slot="input">
            <input  v-model="search.bookName" class="superInput" placeholder="请输入书籍"></input>
          </div>
          <div slot="selectName">
            分类:
          </div>
          <div slot="select">
            <select v-model="search.categoryId" class="superSelect" placeholder="请选择权限">
              <option label="无" value=""></option>
              <option :label="item.classicName" :value="item.id" v-for="(item,index) in classic" :key="index"></option>
            </select>
          </div>
          <div slot="button" style="display: flex">
            <button-collection>
            <div slot="check" @click="showBook()" >搜索</div>
            <div slot="modify"  @click="addBefore();dialogFormVisible = true">新增</div>
            <div slot="delete"  @click="emptyBookName()">清空</div>
          </button-collection>
          </div>
        </search-plant>
        <div style="border-radius: 1em;box-shadow: 0 0 10px rgba(128,128,128,0.62);width: 99%;height: auto;margin:10px auto;">
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
              prop="classicNames"
              label="大分类">
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
            <el-table-column label="操作" width="290px" >
              <template slot-scope="scope" >
                <button-collection>
                  <div slot="modify" @click="updBefore(scope.row.id);dialogFormVisible = true">修改</div>
                  <div slot="delete" @click="deleteBook(scope.row.id)">删除</div>
                  <div slot="check" @click="addHot(scope.row.id)">加入热门</div>
                </button-collection>
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
            <el-form-item label="文件上传:" prop="filePath">
<!--              :on-exceed="uploadTxtFile"-->
              <div v-show="true">
                <el-upload
                  class="upload-demo"
                  action=""
                  :on-change="uploadTxtFile"

                  :limit="1"
                  :file-list="fileList"
                  :auto-upload="false">
                  <div>
                    <el-button type="primary" size="small" icon="el-icon-upload">点击上传</el-button>
                  </div>
                </el-upload>
              </div>
              <div v-if="form.filePath">
                <div style="width: 100%;">{{form.filePath}}</div>
              </div>
            </el-form-item>
              <el-form-item label="作者:"
                            prop="author"
                            :rules="[{ required: true, message: '请输入作者', trigger: 'blur'}]">
                <el-input v-model="form.author" placeholder="请输入内容" style="margin: 10px 0;"></el-input>
              </el-form-item>
              <el-form-item label="简介:" prop="press">
                <el-input v-model="form.press" placeholder="请输入内容" style="margin: 10px 0;"></el-input>
              </el-form-item>
            <el-form-item label="大分类:"
                          prop="bigCategoryId"
                          :rules="[{ required: true, message: '请选择分类', trigger: 'blur'}]">
              <el-select v-model="form.bigCategoryId" placeholder="请选择分类">
                <el-option :label="item.classicNames" :value="item.id" v-for="(item,index) in classicItem" :key="index"></el-option>
              </el-select>
            </el-form-item>
              <el-form-item label="分类:"
                            prop="categoryId"
                            :rules="[{ required: true, message: '请选择分类', trigger: 'blur'}]">
                <el-select v-model="form.categoryId"   placeholder="请选择分类">
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


import {
  addBook,
  deleteBook,
  deleteFile, deleteTxt,
  selectAllBook,
  updateBook,
  uploadImg,
  uploadTxt
} from "../../../net/bookRequest";
import {classicSelectAll} from "../../../net/classicRequest";
import TitleItem from "../../../components/contant/titleItem/titleItem.vue";
import {addHotBook} from "../../../net/hotBookRequest";
import {classicItemSelectAll} from "../../../net/classicItemRequest";
import fa from "element-ui/src/locale/lang/fa";
import SearchPlant from "../../../components/contant/searchPlant.vue";
import buttonCollection from "../../../components/contant/button/buttonCollection.vue";
import {selectById} from "../../../net/bookRequest";
import contentButton from "../../../components/contant/contentButton.vue";

export default {
  name: "homeItem",
  components: {TitleItem,SearchPlant,buttonCollection,contentButton},
  data(){
    return{
      isUpload:false,
      imgUrlUpdate:false,
      fileChange:true,
      isAdd:true,
      fileList:[],
      bookInform:null,
      formLabelWidth: '120px',
      form:{
        bookName:'',
        imgUrl:'',
        author:'',
        categoryId:'',
        bigCategoryId:'',
        press:'',
        filePath:'',
      },
      oldFile:'',
      search:{
        bookName:'',
        categoryId:'',
      },
      classicItem:'',
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
      let showB = await selectAllBook(this.search);
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
      this.dialogFormVisible=false;
    },
    async handlePreview(file) {
      let req = new FormData();
      req.append("file",file.raw);
      this.form.imgUrl=(await uploadImg(req)).data;
      this.isUpload=true;
    },
    async uploadTxtFile(file){
      let req = new FormData();
      req.append("file",file.raw);
      this.form.filePath=(await uploadTxt(req)).data;
      this.$refs.upload.clearFiles();
      this.fileChange=false;

    },
    async addBook(){
      let arr=this.form.categoryId.toString();
      this.form.categoryId=arr;
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
      this.fileList=[],
      //覆盖原有表单
      this.form=(await selectById({id:id})).data;
      this.oldFile=this.form.filePath
      if(this.form.filePath!=null){
        this.fileChange=false;
      }else {
        this.fileChange=true;
      }
      //修改当前状态为修改
      this.isAdd=false;
      this.classicItem=(await classicItemSelectAll({})).data;
      this.imgUrlUpdate=true;
    },
    async addBefore(){
      //清空表单
      this.form={
        bookName:'',
        imgUrl:'',
        author:'',
        categoryId:'',
        press:'自行脑补',
        filePath: '',
      };
      //修改当前状态为添加
      this.isAdd=true;
      this.classicItem=(await classicItemSelectAll({})).data;
    },
    verify(){
      let res={
        code:'500',
        message:""
      }
      if(this.form.bookName===""){
        res.message+="书名"
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
    async operateBook(){//按钮当前流程控制器
      if(this.isAdd){
        if(this.verify()){
          this.dialogFormVisible = false;
          await this.addBook();
        }
      }else{
        let res=new FormData();
        res.append("fileName",this.oldFile);
        await deleteTxt(res);
        this.dialogFormVisible = false;
        await this.updBook();
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
