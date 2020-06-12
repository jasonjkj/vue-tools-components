<template>
  <div id="app">
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
