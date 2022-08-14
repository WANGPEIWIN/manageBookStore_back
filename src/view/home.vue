<template>
<div>
  <title-item/>
  <div style="display: flex">
    <left-header/>
    <router-view/>
  </div>
</div>
</template>

<script>
import LeftHeader from "../components/common/leftHeader/leftHeader";
import HomeItem from "./user";
import TitleItem from "../components/contant/titleItem/titleItem";

export default {
  name: "home",
  components: {LeftHeader, HomeItem, TitleItem},
}
</script>

<style scoped>

</style>
