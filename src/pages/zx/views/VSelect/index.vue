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
      placeholder="请选择"
    >
      <div slot="empty">
        <el-tree
          style="min-height: 50px;overflow-y: auto"
          ref="tree"
          :data="data"
          :props="defaultProps"
          node-key="id"
          :check-strictly="checkStrictly"
          @node-click="handleNodeClick"
          @check-change="handleClick"
          :show-checkbox="showCheck">
        </el-tree>
        <div style="text-align: center;" >
          <el-button plain @click.native="handleCancel">取消</el-button>
          <el-button type="main" plain @click.native="handleConfirm">确定</el-button>
        </div>
      </div>
    </el-select>
  </div>
</template>

<script>
import debounce from "lodash/debounce";

function isChild(data) {
  data.map((item, index) => {
    if (item.children) {
      item.disabled = true;
      isChild(item.children);
    } else {
      return data;
    }
  });
}

export default {
  name: "VSelect",
  data() {
    return {
      i: 0,
      checkStrictly: false, //复选时，该属性为false可直接获取最终子级;
      isMultiple: true,
      collapseTags: false,
      showCheck: true, //tree显示多选还是单选
      checked: [], //选中的项
      data: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 2,
              label: "二级 1-1",
              children: [
                {
                  id: 3,
                  label: "三级 1-1-1"
                }
              ]
            }
          ]
        },
        {
          id: 4,
          label: "一级 2",
          children: [
            {
              id: 5,
              label: "二级 2-1",
              children: [
                {
                  id: 6,
                  label: "三级 2-1-1"
                }
              ]
            },
            {
              id: 7,
              label: "二级 2-2",
              children: [
                {
                  id: 8,
                  label: "三级 2-2-1"
                }
              ]
            }
          ]
        },
        {
          id: 9,
          label: "一级 3",
          children: [
            {
              id: 10,
              label: "二级 3-1",
              children: [
                {
                  id: 11,
                  label: "三级 3-1-1"
                }
              ]
            },
            {
              id: 12,
              label: "二级 3-2",
              children: [
                {
                  id: 13,
                  label: "三级 3-2-1"
                }
              ]
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      }
<<<<<<< HEAD
    };
  },
  computed: {
    value: {
      get() {
        if (!this.isMultiple) {
          return this.checked && this.checked[0] && this.checked[0].label;
=======
    },
    mounted(){},
    computed:{
      value:{
        get(){
          if(!this.isMultiple){
              //不是多选 绑定label就行
              return this.checked.toString()
          }
          return this.checked.map((item,index)=>{
            return item.label
          })
        },
        set(val){
>>>>>>> bb5306637cb95ff0af954d4a5222914fc41d12aa
        }
        return this.checked.map((item, index) => {
          return item.label;
        });
      },
      set(val) {}
    }
  },
  created() {
    //  现有数据 再进行渲染
    isChild(this.data);
  },
  methods: {
    checkChange(data, checked, node) {
      //不能用
      /*
                *
                *  this.$refs.tree.setCheckedNodes([]);
                   this.$refs.tree.setCheckedNodes([data]);
                   触发两次
                * */
      // if (!this.isMultiple) {
      //     debugger
      //     this.checked = [{...data}]
      //     this.i++;
      //     if (this.i % 2 === 0) {
      //         if (checked) {
      //             debugger
      //             this.$refs.tree.setCheckedNodes([]);
      //             this.$refs.tree.setCheckedNodes([data]);
      //             //交叉点击节点
      //         } else {
      //             this.$refs.tree.setCheckedNodes([]);
      //             // this.checked=[]
      //             //点击已经选中的节点，置空
      //         }
      //     }
      //     // console.log('已选中内容-单选：', this.checked)
      //     this.$refs.select.visible = false
      // }
    },
    handleCheck(data, node) {
      console.log(data, node);
      var checkedKeys = node.checkedKeys;
      var currentKey = data.id;

      //checkedNodes  存在当前节点 , 那就是 选中
      //checkedNodes()  不存在存在当前节点 , 那就是 选中
      this.$refs.tree.setCheckedNodes([]);
      this.checked = [];
      if (checkedKeys.includes(currentKey)) {
        this.$refs.tree.setCheckedNodes([data]);
        this.checked = [data];
      }
      this.$refs.select.visible = false;
    },
<<<<<<< HEAD
    handleCancel() {
      this.$refs.tree.setCheckedNodes([]);
      this.checked = [];
    },
    handleConfirm() {
      this.checked = this.$refs.tree.getCheckedNodes(true);
      this.$refs.select.visible = false;
      console.log("已选中内容-确定按钮：", this.checked);
    },
    handleDel(val) {
      this.checked.map((item, index) => {
        if (item.label == val) {
          this.checked.splice(index, 1);
          this.$refs.tree.setCheckedNodes(this.checked);
          console.log("已选中内容-删除按钮：", this.checked);
        }
      });
=======
    methods:{
      handleClick(data,checked, node){
        debugger
        console.log(data,checked,node)
          // if(data.children && checked==false){
          //   data.disabled=true
          // }
        if(!this.isMultiple){
          this.i++;
          if(this.i%2===0){
            if(checked){
              debugger
              this.$refs.tree.setCheckedNodes([]);
              this.$refs.tree.setCheckedNodes([data]);
              this.checked=this.$refs.tree.setCheckedNodes([data])[0].label
              //交叉点击节点
            }else{
              this.$refs.tree.setCheckedNodes([]);
              //点击已经选中的节点，置空
            }
          }
        }
      },
      handleNodeClick(data){
        let data1=[{...data}]
        this.checked=isChild(data1).label
        console.log('handleNodeClick',this.checked)
      },
      handleCancel(){
        this.$refs.tree.setCheckedNodes([])
        this.checked=[]
      },
      handleConfirm(){
        this.checked=this.$refs.tree.getCheckedNodes(true)
        this.$refs.select.visible=false
        console.log('已选中内容-确定按钮：',this.$refs.tree.getCheckedNodes(true))
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
>>>>>>> bb5306637cb95ff0af954d4a5222914fc41d12aa
    }
  }
};
</script>

<style scoped>
<<<<<<< HEAD
/deep/ .el-tree-node__content > .el-checkbox.is-disabled {
  display: none;
=======
.expanded+label>.el-checkbox__input{
  display:none
>>>>>>> bb5306637cb95ff0af954d4a5222914fc41d12aa
}
</style>
