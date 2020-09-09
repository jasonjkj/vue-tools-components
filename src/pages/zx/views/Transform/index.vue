<template>
<div>
  <el-button @click=handleClick>点击</el-button>
  <el-dialog title="添加指标" v-if="isShow" :visible.sync="isShow" width="70%">
    <div class="transform">
      <div class="left">
        <el-radio-group v-model="tab">
          <el-radio-button label="first">过程类</el-radio-button>
          <el-radio-button label="second">结果类</el-radio-button>
          <el-radio-button label="third">线上渠道监控</el-radio-button>
        </el-radio-group>
        <div class="tabs" v-if="tab==='first'">
          <el-tabs :tab-position="tabPosition">
          <el-tab-pane label="客户接触">客户接触</el-tab-pane>
          <el-tab-pane label="客户反馈">客户反馈</el-tab-pane>
        </el-tabs>
        </div>
      </div>
      <div class="center"></div>
      <div class="right"></div>
    </div>
    <div class="footer">
      <el-button type="second">取消</el-button>
      <el-button type="main">确定</el-button>
    </div>
  </el-dialog>
</div>
  
</template>

<script>
export default {
  name: "transForm",
  data() {
    return {
      tab:'first',
      tabPosition:'left',
      isShow:false
    }
  },
  computed: {},
  methods: {
    handleClick(){
      this.isShow=true
    }
  }
}
</script>

<style scoped>
.transform{
  padding:10px 10px 0px 10px;
  border:1px solid;
  .left,.center,.right {
    float:left;
  }
  .left .tabs{
      padding:10px;
  }
}
.footer{
  text-align: right;
  padding-top: 10px;
}
</style>
