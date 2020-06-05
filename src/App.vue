<template>
  <div id="app">
    <a href="/index/Test">Index</a>
    <hr>
    <a href="/demo/Test">Demo</a>
    <router-view class="app-router-view" style="position: relative" :key="$route.fullpath"></router-view>
  </div>
</template>
<script>
  export default {
    name: 'App',
    created() {

    },
    beforeRouteLeave(to, from, next){
      alert(123123)
      next()
    }
  }
</script>
<style lang="scss">

</style>
