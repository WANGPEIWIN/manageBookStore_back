<template>
  <div style="display: flex;width: 100%;">
    <left-header/>
    <div style="width: 100%;">
      <title-item/>
      <router-view/>
    </div>
  </div>
</template>

<script>
import LeftHeader from "../../components/common/leftHeader/leftHeader.vue";
import HomeItem from "./item/user.vue";
import TitleItem from "../../components/contant/titleItem/titleItem.vue";

export default {
  name: "home",
  components: {LeftHeader, HomeItem, TitleItem},
}
</script>

<style scoped>

</style>
