<template>
    <div style="width: 100%;margin-top: -8px;">
      <before_top_title/>
      <router-view/>
      <bottom/>
    </div>
</template>

<script>
import Bottom from "../../components/common/bottom/bottom.vue";
import Before_top_title from "../../components/common/befor_top_title/before_top_title.vue";

export default {
  name: "before_home",
  components: {Before_top_title, Bottom}
}
</script>

<style scoped>

</style>
