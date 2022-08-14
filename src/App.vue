<template>
  <div id="app">
<router-view/>
  </div>
</template>

<script>
import LeftHeader from "./components/common/leftHeader/leftHeader";
import HomeItem from "./view/user";
import TitleItem from "./components/contant/titleItem/titleItem";
import Login from "./view/login";

export default {
  name: 'App',
  components: {Login, LeftHeader, HomeItem, TitleItem},
}
</script>

<style>
@import "assets/css/basic.css";
</style>
