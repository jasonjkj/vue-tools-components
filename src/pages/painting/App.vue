<template>
  <div id="app">
    <router-view class="app-router-view" style="position: relative" :key="$route.fullpath"></router-view>
  </div>
</template>
<script>
  export default {
    name: 'App',
    created() {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    beforeRouteLeave(to, from, next){
      alert(123123)
      next()
    }
  }
</script>
<style lang="scss">

</style>
