<template>
<div>
  <search-plant>
    <div slot="inputName">
      评论内容:
    </div>
    <div slot="input">
      <input  v-model="search.remarks" class="superInput" placeholder="请输入书籍"></input>
    </div>
    <div slot="button" style="display: flex">
      <content-button>
        <div slot="mainButton" @click="getComments()" >搜索</div>
        <div slot="otherButton"  @click="emptyBookName()">清空</div>
      </content-button>
    </div>
  </search-plant>
  <div style="border-radius: 1em;box-shadow: 0 0 10px rgba(128,128,128,0.62);width: 99%;height: auto;margin:10px auto;">
    <el-table
      :data="commentInfo"
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
</div>
</template>

<script>
import SearchPlant from "../../../components/contant/searchPlant.vue";
import buttonCollection from "../../../components/contant/button/buttonCollection.vue";
import contentButton from "../../../components/contant/contentButton.vue";
import {selectComments} from "../../../net/commentsRequest";

export default {
  name: "comments",
  components:{SearchPlant,buttonCollection,contentButton},
  data(){
    return{
      search:{
        remarks:'',
      },
      commentInfo:[],
    }
  },
  methods:{
    async getComments(){
      this.commentInfo=(await selectComments(this.search)).data;
    }
  },
  created() {
    this.getComments();
  },
}
</script>

<style scoped>

</style>
