<template>
  <div style="width: 100%;">
    <search-plant>
      <div slot="inputName">
        标题:
      </div>
      <div slot="input">
        <input  v-model="search.title" class="superInput" placeholder="请输入标题"></input>
      </div>
      <div slot="button" style="display: flex">
        <button-collection>
          <div slot="check" @click="selectTitle()" >搜索</div>
          <div slot="modify"  @click="beforeAdd();dialogFormVisible = true">新增</div>
          <div slot="delete"  @click="emptyTitle()">清空</div>
        </button-collection>
      </div>
    </search-plant>
    <div style="border-radius: 1em;box-shadow: 0 0 10px rgba(128,128,128,0.62);width: 99%;height: auto;margin:10px auto;">
      <el-table
        :data="swiperInform"
        style="width: 100%;border-radius: 1em;">
        <el-table-column
          prop="title"
          label="标题">
        </el-table-column>
        <el-table-column
          prop="bookName"
          label="小说">
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
            <button-collection>
              <div slot="modify" @click="beforeUpd(scope.row.id);dialogFormVisible = true">修改</div>
              <div slot="delete" @click="deleteSwiper(scope.row.id)">删除</div>
            </button-collection>
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
          <el-form-item label="书籍信息:"
                        :rules="[{ required: true, message: '请选择权限', trigger: 'blur'}]">
            <el-select v-model="form.bookId" placeholder="请选择书籍信息" style="margin: 0 10px">
              <el-option v-for="(item,index) in book " :label="item.bookName" :value="item.id" :key="item.id"></el-option>
            </el-select>
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
import {addSwiper, deleteSwiper, selectAll, selectById, updateSwiper} from "../../../net/swiperRequest";
import {deleteFile, selectAllBook, uploadImg} from "../../../net/bookRequest";
import SearchPlant from "../../../components/contant/searchPlant.vue";
import buttonCollection from "../../../components/contant/button/buttonCollection.vue";

export default {
  name: "swiper",
  components: {SearchPlant,buttonCollection},
  data(){
    return{
      isUpload:false,
      imgUrlUpdate:false,
      swiperInform:null,
      form:{
        title:'',
        imgUrl:'',
        explains:'',
        bookId:'',
      },
      book:'',
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
    async getBook(){
     this.book= (await selectAllBook({})).data;
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
      await this.getBook();
      this.form=(await selectById(id)).data;
      let oldImg=this.form.imgUrl;
      this.upd=false;
      this.imgUrlUpdate=true;
    },
    async beforeAdd(){
      await this.getBook();
      this.form={
        title:'',
          imgUrl:'',
          explains:'',
      }
      this.upd=true;
    },
    async updSwiper(){
      this.swiperInform=(await updateSwiper(this.form)).data;
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
