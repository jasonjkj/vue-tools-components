<template>
  <div>
    <el-row>
      <el-col :span="4">
        <div class="input"> 
          <el-popover
            v-model="visible"
            placement="bottom"
            trigger="click">
            <el-tree ref="tree" :data="data" :props="defaultProps" node-key="id" :check-strictly="true"
             @node-click="handleNodeClick"
             :show-checkbox="showCheck">
            </el-tree>
            <div style="text-align: center;" >
              <el-button plain @click.native="handleCancel">取消</el-button>
              <el-button type="main" plain @click.native="handleConfirm">确定</el-button>
            </div>
            <div class="input_tree" slot="reference">
              <el-input v-model="inputVal" placeholder="请选择">
                <i slot="suffix" class="el-input__icon el-icon-arrow-down"></i>
              </el-input>
              <div class="el-cascader__tags">
                <span class="el-tag el-tag--info el-tag--small el-tag--light"
                  v-for="(item,index) in checked" :key="index"
                >{{item.label}}
                  <i class="el-tag__close el-icon-close" @click="handleDel(item.id)"/>
                </span>
              </div>
            </div>
          </el-popover>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name:"input",
    data(){
      return {
        checked:[], 
        showCheck:true,
        inputVal:'',
        visible:false,
        data:[
          {
            id: 1,
            label: '一级 1',
            children: [{
              id: 2,
              label: '二级 1-1',
              children: [{
                id: 3,
                label: '三级 1-1-1'
              }]
            }]
          },
          {
            id: 4,
            label: '一级 2',
            children: [{
              id: 5,
              label: '二级 2-1',
              children: [{
                id: 6,
                label: '三级 2-1-1'
              }]
            }, 
            {
              id: 7,
              label: '二级 2-2',
              children: [{
                id: 8,
                label: '三级 2-2-1'
              }]
            }]
          },
          {
            id: 9,
            label: '一级 3',
            children: [{
              id: 10,
              label: '二级 3-1',
              children: [{
                id: 11,
                label: '三级 3-1-1'
              }]
            },
            {
              id: 12,
              label: '二级 3-2',
              children: [{
                id: 13,
                label: '三级 3-2-1'
              }]
            }]
          }
        ],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
      }
    },
    methods:{
      handleNodeClick(data){
        console.log(data)
      },
      handleCancel(){
        this.$refs.tree.setCheckedNodes([])
        this.checked=[]
      },
      handleConfirm(){
        this.checked=this.$refs.tree.getCheckedNodes(true)
        console.log('已选中内容：',this.$refs.tree.getCheckedNodes(true))
      },
      handleDel(val){
        this.checked.map((item,index)=>{
          if(item.id==val){
            this.checked.splice(index,1)
            this.$refs.tree.setCheckedNodes(this.checked)
          }
        })
      }
    }
  }
</script>

<style>  /*  scoped */


</style>