<template>
  <div style="width: 100%">
      <div style="width: 100%;">
        <search-plant>
          <div slot="inputName">
            标签名:
          </div>
          <div slot="input">
            <input  v-model="search.classicName" class="superInput" placeholder="请输入标签名"></input>
          </div>
          <div slot="button" style="display: flex">
            <button-collection>
              <div slot="check" @click="showClassic()" >搜索</div>
              <div slot="modify"  @click="addBefore();dialogFormVisible = true">新增</div>
              <div slot="delete"  @click="emptySearch()">清空</div>
            </button-collection>
          </div>
        </search-plant>
        <div style="border-radius: 1em;box-shadow: 0 0 10px rgba(128,128,128,0.62);width: 99%;height: auto;margin:10px auto;">
          <el-table
            :data="classicInform"
            style="width: 100%;border-radius: 1em;">
            <el-table-column
              prop="classicName"
              label="标签名">
            </el-table-column>
<!--            <el-table-column-->
<!--              prop="classicItemId"-->
<!--              label="分类详情">-->
<!--            </el-table-column>-->
<!--            <el-table-column-->
<!--              prop="imgUrl"-->
<!--              label="图片">-->
<!--              <template slot-scope="scope" >-->
<!--                <img :src="(scope.row.imgUrl)" style="height: 120px">-->
<!--              </template>-->
<!--            </el-table-column>-->
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
                <button-collection>
                  <div slot="modify" @click="updBefore(scope.row.id);dialogFormVisible = true">修改</div>
                  <div slot="delete" @click="deleteClassic(scope.row.id)">删除</div>
                  <div slot="check"></div>
                </button-collection>
<!--                <div style="height: 60px;margin-top: 32px;">-->
<!--                  <el-button-group>-->
<!--                    <el-button-->
<!--                      icon="el-icon-edit"  @click="updBefore(scope.row.id);dialogFormVisible = true"></el-button>-->
<!--                    <el-button-->
<!--                      icon="el-icon-delete"-->
<!--                      type="danger" @click="deleteClassic(scope.row.id)"></el-button>-->
<!--                  </el-button-group>-->
<!--                </div>-->
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div style="position:absolute;">
          <el-dialog title="操作分类" :visible.sync="dialogFormVisible" width="450px"  :before-close="dialogDisappear" >
            <el-form :model="form">
              <el-form-item label="分类名:"
                            prop="classicName"
                            :rules="[{ required: true, message: '请输入分类名', trigger: 'blur' }]">
                <el-input v-model="form.classicName" placeholder="请输入内容" style="margin: 10px 0;"></el-input>
              </el-form-item>
<!--              <el-form-item label="所属分类:"-->
<!--                            :rules="[{ required: true, message: '请输入分类名', trigger: 'blur' }]">-->
<!--                <el-select v-model="form.classicItemId"  placeholder="请选择">-->
<!--                  <el-option-->
<!--                    v-for="item in classicItem"-->
<!--                    :key="item.id"-->
<!--                    :label="item.classicNames"-->
<!--                    :value="item.id">-->
<!--                  </el-option>-->
<!--                </el-select>-->
<!--              </el-form-item>-->
              <el-form-item label="图片:">
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
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="operateClassic()">确 定</el-button>
            </div>
          </el-dialog>
        </div>
      </div>
    </div>

</template>

<script>

import {addClassic, classicSelectAll, deleteClassic, selectById, updateClassic} from "../../../net/classicRequest";
import TitleItem from "../../../components/contant/titleItem/titleItem.vue";
import {deleteFile, uploadImg} from "../../../net/bookRequest";
import {classicItemSelectAll} from "../../../net/classicItemRequest";
import searchPlant from "../../../components/contant/searchPlant.vue";
import buttonCollection from "../../../components/contant/button/buttonCollection.vue";

export default {
  name: "homeItem",
  components: {TitleItem,searchPlant,buttonCollection},
  data(){
    return{
      imgUrlUpdate:false,
      isUpload:false,
      imageUrl: '',
      isAdd:true,
      classicInform:null,
      formLabelWidth: '120px',
      classicItem:'',
      form:{
        classicName:'',
        classicItemId:'',
        imgUrl:'',
      },
      search:{
        classicName:'',
      },
      dialogFormVisible: false,
    }
  },
  async created() {
    await this.showClassic();
  },
  methods:{
    async showClassic(){
      let classic = await classicSelectAll(this.search);
      if(classic.code==="200"){
        this. classicInform=classic.data;
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
    async addClassic(){
      let addC = await addClassic(this.form);
      if(addC.code==="200"){
        this.classicInform=addC.data;
      }
      this.$store.commit("tip",addC)
    },
    async deleteClassic(id){
      let delC = await deleteClassic(id);
      if(delC.code==="200"){
        this.classicInform=delC.data;
      }
      this.$store.commit("tip",delC);
    },
    async updClassic(){
      let updC = await updateClassic(this.form);
      if(updC.code==="200"){
        this.classicInform=updC.data;
      }
     this.$store.commit("tip",updC);
    },
    async updBefore(id){
      //覆盖原有表单
      this.form=(await selectById(id)).data;
      //修改当前状态为修改
      this.isAdd=false;
      this.imgUrlUpdate=true;
    },
    async addBefore(){
      //清空表单
      this.form={
        classicName:'',
        imgUrl:'',
      };
      //修改当前状态为添加
      this.isAdd=true;
      // this.classicItem=(await classicItemSelectAll({})).data;
      // console.log(this.classicItem);
    },
    verify(){
      let res={
        code:'500',
        message: ""
      }
      if(this.form.classicName===""){
        res.message="分类名没有添加";
        this.$store.commit("tip",res);
        return false;
      }
      if(res.message===""){
        return true;
      }
    },
    operateClassic(){//按钮当前流程控制器
      if(this.isAdd){
        if(this.verify()){
          this.dialogFormVisible = false;
          this.addClassic();
        }
      }else{
        this.dialogFormVisible = false;
        this.updClassic();
      }
      this.imgUrlUpdate=false;
    },
    async emptySearch(){
      this.search={
        classicName:'',
      }
      await this.showClassic();
    }
  }
}
</script>

<style scoped>
</style>
