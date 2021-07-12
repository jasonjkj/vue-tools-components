<template>
  <el-popover
    popper-class="RecentSearch"
    placement="top"
    trigger="click"
    width="160"
    v-model="visible">
    <div class="list-container" >
      <template v-if="historyList.length>0">
        <template v-for="(item,index) in historyList">
          <div class="el-dropdown-menu__item history-item"> 一条历史记录777777777777777777777777777777777 </div>
        </template>
      </template>
      <template v-else>
        <div  class="history-item"> No Data... </div>
      </template>
    </div>
    <div class="clear-all el-dropdown-menu__item">清空所有历史记录</div>
    <i class="el-icon-time history-icon" slot="reference"></i>
  </el-popover>
</template>

<script>
  export default {
    name: "RecentSearch",
    data() {
      return {
        visible: false,
        historyList:[1,2,3]
      }
    }
  }
</script>

<style scoped>
  .history-icon {
    padding: 0 10px;
    cursor: pointer;
    line-height: 24px;
  }
  .list-container{
    max-height: 300px;
    overflow-y: auto;
  }
  .clear-all{
    font-size: 12px;
    line-height: 32px;
    text-align: center;
    border-top: 1px solid #DCDFE6;
    cursor: pointer;
  }
  .history-item{
    line-height: 28px;
    padding: 0 20px;
    text-align: left;
    font-size: 12px;
  }
</style>
