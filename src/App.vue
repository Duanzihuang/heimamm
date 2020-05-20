<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  // watch: {
  //   $route:function(newValue) {
  //     console.log("------------------")
  //     console.log(newValue)
  //   }
  // }
}
</script>

<style lang="less">
// 以下两种都可以，任君选择
// @import './styles/base.less';

@import url("~@/styles/base.less");
</style>
