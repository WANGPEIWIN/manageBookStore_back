<template>
  <div style="width: 100%;">
    <div style="line-height: 100px;">
      <div style="font-size: 30px;font-weight: bold;text-align: center">热门管理</div>
    </div>
    <div>
      <div style="width: 90%;height: 260px;margin: 0 auto;border-radius: 1em;box-shadow: 0 0 10px rgba(128,128,128,0.62)">
        <div style="width: 92%;margin: 0 auto;">
          <div style="font-weight: bold;font-size: 18px;line-height: 60px">筛选:</div>
            <div style="display: flex;width: 800px;justify-content: space-between">
              <div style="width: 380px;">
                <div style="height: 40px">书名:</div><el-input placeholder="请输入书名" v-model="search.bookName"></el-input>
              </div>
            </div>
            <div style="display: flex;margin: 20px 0;justify-content: right">
              <div @click=""><el-button type="primary" @click="selectHot()">搜索</el-button></div>
              <div style="margin: 0 20px;"> <el-button type="info"  @click="emptyForm()">清空</el-button></div>
            </div>
        </div>
      </div>
    </div>
    <div style="border-radius: 1em;box-shadow: 0 0 10px rgba(128,128,128,0.62);width: 90%;height: auto;margin:60px auto;">
      <el-table
        :data="bookInform"
        style="width: 100%;border-radius: 1em;">
        <el-table-column
          prop="bookName"
          label="书籍名">
        </el-table-column>
        <el-table-column
          prop="imgUrl"
          label="图片">
          <template slot-scope="scope">
            <img :src="scope.row.imgUrl" style="width: 70px">
          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间">
        </el-table-column>
        <el-table-column label="操作" width="200px" >
          <template slot-scope="scope" >
            <div style="height: 60px;margin-top: 32px;">
              <el-button-group>
<!--                <el-button icon="el-icon-edit" ></el-button>-->
                <el-button
                  icon="el-icon-delete"
                  type="danger" @click="deleteHot(scope.row.id)"></el-button>
              </el-button-group>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import {deleteHotBook, selectHot,} from "../net/hotBookRequest";

export default {
  name: "hotBook",
  data(){
    return{
      bookInform:[],
      formLabelWidth: '120px',
      search:{
        bookName:'',
      }
    }
  },
  async created() {
    await this.selectHot()
  },
  methods:{
    async emptyForm(){
      this.search={
        bookName:'',
      }
      await this.selectHot();
    },
    async selectHot(){
      let hot = await selectHot(this.search);
      if(hot.code==="200"){
        this.bookInform=hot.data;
      }
    },
    async deleteHot(id){
      let del = await deleteHotBook(id);
      if(del.code==="200"){
        this.bookInform=del.data;
      }
      this.$store.commit("tip",del)
    },
  }
}
</script>

<style scoped>

</style>
