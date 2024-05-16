<template>
  <div style="width: 100%;">
    <search-plant>
      <div slot="inputName">
        书籍名:
      </div>
      <div slot="input">
        <input  v-model="search.bookName" class="superInput" placeholder="请输入书名"></input>
      </div>
      <div slot="button" style="display: flex">
        <content-button>
          <div slot="mainButton" @click="selectHot()" >搜索</div>
          <div slot="otherButton"  @click="emptyForm()">清空</div>
        </content-button>
      </div>
    </search-plant>
    <div style="border-radius: 1em;box-shadow: 0 0 10px rgba(128,128,128,0.62);width: 99%;height: auto;margin:10px auto;">
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
            <div>
              <content-button>
                <div slot="mainButton" disabled="disabled">修改</div>
                <div slot="otherButton" @click="deleteHot(scope.row.id)">删除</div>
              </content-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import {deleteHotBook, selectHot,} from "../../../net/hotBookRequest";
import SearchPlant from "../../../components/contant/searchPlant.vue";
import buttonCollection from "../../../components/contant/button/buttonCollection.vue";
import ContentButton from "../../../components/contant/contentButton.vue";

export default {
  name: "hotBook",
  components: {ContentButton, SearchPlant,buttonCollection},
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
