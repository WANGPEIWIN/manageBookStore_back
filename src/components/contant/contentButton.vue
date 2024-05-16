<template>
<div style="display: flex">
  <div class="modifyButton">
    <slot name="mainButton"></slot>
  </div>
  <div class="deleteButton">
    <slot name="otherButton"></slot>
  </div>
</div>
</template>

<script>
export default {
  name: "contentButton",
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
</style>
