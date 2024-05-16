<template>
<div style="display: flex;">
    <div style="display: flex">
      <div class="modifyButton">
        <div>
          <slot name="modify"></slot>
        </div>
      </div>
      <div class="deleteButton">
        <div>
          <slot name="delete"></slot>
        </div>
      </div>
    </div>
    <div class="checkButton">
      <div>
        <slot name="check"></slot>
      </div>
    </div>
</div>
</template>

<script>
import contentButton from "../contentButton.vue";

export default {
  name: "buttonCollection",
  components:{contentButton},
  data(){
    return{
      content:document.querySelector('.checkButton').innerHTML,
    }
  },
  created() {
    if(!this.content){
      document.querySelector('.checkButton').remove();
    }
  },
  watch(){

  }
}
</script>

<style scoped>
.modifyButton{
  box-shadow: 0 0 6px rgba(0, 0, 0, 1);
  height: 40px;width: 80px;
  text-align: center;
  line-height: 40px;
  margin: 30px 5px;
  cursor: pointer;
  transition: all .1s;
  color: white;
  background-color: #58759b;
}
.modifyButton:hover{
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.5);
  height: 40px;width: 80px;
  text-align: center;
  line-height: 40px;
  margin: 30px 5px;
  cursor: pointer;
  color: white;
  background-color: rgba(88, 117, 155, 0.85);
}
.deleteButton{
  box-shadow: 0 0 6px rgb(26, 26, 26);
  height: 40px;width: 80px;
  text-align: center;
  line-height: 40px;
  margin: 30px 5px;
  cursor: pointer;
  transition: all .1s;
  color: white;
  background-color: #e34131;
}
.deleteButton:hover{
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.5);
  height: 40px;width: 80px;
  text-align: center;
  line-height: 40px;
  margin: 30px 5px;
  cursor: pointer;
  color: white;
  background-color: rgba(227, 65, 49, 0.88);
}
.checkButton{
  box-shadow: 0 0 6px rgb(98, 98, 98);
  height: 40px;width: 80px;
  text-align: center;
  line-height: 40px;
  margin: 30px 5px;
  cursor: pointer;
  transition: all .1s;
  color: white;
  background-color: #81d036;
}
.checkButton:hover{
  box-shadow: 0 0 6px rgba(66, 66, 66, 0.5);
  height: 40px;width: 80px;
  text-align: center;
  line-height: 40px;
  margin: 30px 5px;
  cursor: pointer;
  color: white;
  background-color: rgba(129, 208, 54, 0.84);
}
</style>
