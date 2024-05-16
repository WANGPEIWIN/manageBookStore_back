<template>
<div style="display: flex;width: 98%;height: 100px;margin:  5px;box-shadow: 2px 4px 10px rgb(0,0,0,0.2);border-radius: 1.2em;padding: 10px">
  <div style="display: flex;line-height: 100px;width: 25%;">
    <slot name="inputName" ></slot>
    <slot name="input"></slot>
  </div>
  <div style="display: flex;line-height: 100px;width: 25%;">
    <slot name="selectName"></slot>
    <slot name="select"></slot>
  </div>
  <div style="width: 50%;display: flex">
    <slot name="button"></slot>
  </div>
  <div></div>
</div>
</template>

<script>
export default {
  name: "searchPlant",
}
</script>

<style scoped>

</style>
