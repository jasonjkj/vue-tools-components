<template>
  <div id="app">
    <template v-for="(val,key,index) in pageList">
      <template v-if="key !== 'index'">
        <a :href="'/'+key"> {{ key }} </a>
        <hr>
      </template>
    </template>
  </div>
</template>
<script>
  //import config from
  const pages=require('../pages');
  export default {
    name: 'App',
    created() {
      console.log(pages);
      this.pageList=pages
    },
    data(){
      return {
        pageList:[]
      }
    }
  }
</script>
<style lang="scss">

</style>
