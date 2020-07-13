<template>
  <div>
    <el-select
      ref="select"
      v-model="value"
      value-key="ip"
      :multiple="isMultiple"
      :collapse-tags="collapseTags"
      @remove-tag="handleDel"
      default-first-option
      placeholder="请选择">
      <div slot="empty">
        <el-tree ref="tree" :data="data" :props="defaultProps" node-key="id"
          :check-strictly="checkStrictly"
          @node-click="handleNodeClick"
          @check-change="handleClick"
          :show-checkbox="showCheck">
        </el-tree>
        <div style="text-align: center;" v-if="isMultiple">
          <el-button plain @click.native="handleCancel">取消</el-button>
          <el-button type="main" plain @click.native="handleConfirm">确定</el-button>
        </div>
      </div>
    </el-select>
  </div>
</template>

<script>
  // function isChild(data){
  //   debugger
  //   data.map((item,index)=>{
  //     if(item.children){
  //       isChild(item.children)
  //     }else{
  //       return item.label
  //     }
  //   })
  // }
  export default {
    data() {
      return {
        i:0,
        checkStrictly:true, //复选时，该属性为false可直接获取最终子级;
        isMultiple:false,
        collapseTags:false,
        showCheck:true, //tree显示多选还是单选
        checked:[],  //选中的项
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
          label: 'label',
        },
      }
    },
    computed:{
      value:{
        get(){
          if(!this.isMultiple){
              return this.checked && this.checked[0] && this.checked[0].label
          }
          return this.checked.map((item,index)=>{
            return item.label
          })
        },
        set(val){
        }
      }
    },
    methods:{
      handleClick(data,checked, node){
        debugger
        if(!this.isMultiple){
          this.i++;
          if(this.i%2===0){
            if(checked){
              debugger
              this.$refs.tree.setCheckedNodes([]);
              this.$refs.tree.setCheckedNodes([data]);
              this.checked=[{...data}]
              //交叉点击节点
            }else{
              this.$refs.tree.setCheckedNodes([]);
              this.checked=[]
              //点击已经选中的节点，置空
            }
          }
          console.log('已选中内容-单选：',this.checked)
          this.$refs.select.visible=false
        }
      },
      handleNodeClick(data){
        // debugger
        // let data1=[{...data}]
        // console.log('data1:',data1)
        // console.log('isChild',isChild(data1))
        // // this.checked=isChild(data1)
        // // console.log('handleNodeClick',this.checked)
      },
      handleCancel(){
        this.$refs.tree.setCheckedNodes([])
        this.checked=[]
      },
      handleConfirm(){
        this.checked=this.$refs.tree.getCheckedNodes(true)
        this.$refs.select.visible=false
        console.log('已选中内容-确定按钮：',this.checked)
      },
      handleDel(val){
        this.checked.map((item,index)=>{
          if(item.label==val){
            this.checked.splice(index,1)
            this.$refs.tree.setCheckedNodes(this.checked)
            console.log('已选中内容-删除按钮：',this.checked)
          }
        })
      }
    }
  }
</script>

<style scoped>
>>> .expanded+label>.el-checkbox__input{
  display:none
}

</style>
