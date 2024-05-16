<template>
  <div id="app" style="min-width: 1480px">
<router-view/>
  </div>
</template>

<script>
import LeftHeader from "./components/common/leftHeader/leftHeader";
import HomeItem from "./view/back/item/user.vue";
import TitleItem from "./components/contant/titleItem/titleItem";
import Login from "./view/login";

export default {
  name: 'App',
  components: {Login, LeftHeader, HomeItem, TitleItem},
}
</script>

<style>
.el-menu-item{
  width:33% !important;
  text-align: center !important;
  border: none !important;
}
.index_inform{
  cursor: pointer;
  width: 18%;margin: 8px;
  box-shadow: 2px 2px 12px rgba(0,0,0,.2);
  border-radius: 1em;
  transition: all .3s
  /*border: 1px solid #d5d5d5;*/
  /*box-shadow:-1px -1px 5px 5px rgba(217, 215, 215, 0.58);*/
}
.index_inform:hover{
  /*border: 1px solid #d5d5d5;*/
  box-shadow: 2px 4px 10px rgba(0,0,0,.5);
  /*transform: scale3d(1.01,1.01,1.01);*/
}
.other_index_inform{
  cursor: pointer;
  width: 18%;margin: 4px;
  border: 1px solid rgba(138, 137, 137, 0.2);
  /*box-shadow: 2px 2px 12px rgba(0,0,0,.2);*/
  border-radius: 1em;
  padding: 0 8px;
  transition: all .3s;
}
.other_index_inform:hover{
  box-shadow: 2px 4px 10px rgba(141, 140, 140, 0.5);
}
.index_font{
  width: 100%;text-align: center;
  margin: 5px 0;
  cursor: pointer;
}
.index_font:hover{
}
.category_font{
  cursor: pointer;
  text-align: center;
  /*border-bottom: 1px solid #181818;*/
  margin-top: 1px;
  color: #ff445f;
}
.category_font:hover{
  background-color: #ff445f;
  color: white;
}
.category_button{
  background-color: #ff445f;
  color: #ffffff;
  cursor: pointer;
  text-align: center;
  border: 1px solid #ff445f;
  margin: 1px 0;
}
.category_button:hover{
  background-color:#ffffff;
  color:  #ff445f;
  border: 1px solid #ff445f;
}
.classic_select{
  display: flex;
  /*justify-content: space-between;*/
  width: 82%;
  margin: 2px auto;
  height: 35px;
  line-height:30px;
  /*background-color: #ff445f;*/

  color: #ff445f;
  padding: 2px 0;
}
.index_img{
  margin-top: 10px;
  /*transition: all .5s;*/
}
.index_img:hover{
  /*transform: scale(1.1);*/
}
.superInput{
  background-color: rgba(161, 155, 155, 0.03);
  width: 200px;
  padding: 10px 20px;
  margin: 20px 0;
  border-radius: 1.8em;
  font-size: 18px;
  border: none;
  outline: none;
  box-shadow: inset 0px 1px 3px 5px rgba(220, 219, 219, 0.34),inset 0px 1px 3px 2px rgba(199, 197, 197, 0.8);
}
.superSelect{
  background-color: rgba(161, 155, 155, 0.03);
  width: 120px;
  padding: 8px 20px;
  margin: 20px 0;
  border-radius: 1.8em;
  font-size: 18px;
  border: none;
  outline: none;
  box-shadow: inset 0px 1px 3px 5px rgba(220, 219, 219, 0.34),inset 0px 1px 3px 2px rgba(199, 197, 197, 0.8);
}
.superButton{
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.5);
  height: 40px;width: 100px;
  text-align: center;
  line-height: 40px;
  margin: 30px 10px;
  border-radius: .8em;
  cursor: pointer;
  transition: all .2s;
}
.superButton:hover{
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
}
@import "src/assets/css/basic.css";
</style>
