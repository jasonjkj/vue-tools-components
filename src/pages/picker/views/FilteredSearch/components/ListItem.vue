<template>
  <div class="ListItem clearfix" :class="{'last-item':isLast && isFocus}">
    <div class="label">
      <span class="el-tag el-tag--info el-tag--mini el-tag--light" @click="editlabel">
        <span class="el-select__tags-text">{{ label }}</span>
      </span>
    </div>
    <div class="value" v-show="!isFocus" :class="{'none': !value}">
      <span class="el-tag el-tag--info el-tag--mini el-tag--light" @click="editVal">
        <span class="el-select__tags-text">{{ value }}</span>
        <i class="el-tag__close el-icon-close" @click.stop="handleDel"></i>
      </span>
    </div>
    <div class="input-item" v-show="isFocus">
      <template v-if="type === 'time'">
        <v-picker
          @focus="handleFocus"
          @blur="handleBlur"
          @keydown="handleKeydown"
          ref="item"
          class="input"
          :popper-append-to-body="false"
          popper-class="autocomplete-popover"
          v-model="value"
          placeholder="请输入搜索的值"
          @select="handleSelect"
        />
      </template>
      <template v-else-if=" type==='timeRange'">
        <v-timerange  v-model="value"/>
      </template>
      <template v-else-if="type === 'select'">
        <v-select  v-model="value"/>
      </template>
      <template v-else>
       <v-input
         @focus="handleFocus"
         @blur="handleBlur"
         @keydown="handleKeydown"
         ref="item"
         class="input"
         :popper-append-to-body="false"
         popper-class="autocomplete-popover"
         placeholder="请输入搜索的值"
         v-model="value"/>
      </template>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ListItem",
    props:['selectItem',"isLast"],
    data() {
      return {
        isFocus: false,
        placeholder:"",
        label: "",
        value: "",
        type: "",     //time timeRange   select  input  ,当前输入框类型
      }
    },
    created() {
      this.value=this.selectItem.value || null;
      this.label=this.selectItem.name || null
      this.placeholder=this.selectItem.placeholder || null
    },
    methods: {
      handleFocus() {
        this.isFocus = true;                              //修改当前组件的 操作状态
        this.$parent.conditionConfig.isShow=false;         //展示 搜索的字段
        this.$refs.item && this.$refs.item.triggerFocus() //输入框选中  并且聚焦
        this.$parent.isFocus=true
      },
      handleBlur() {
        this.isFocus = false
        this.$parent.isFocus=false
        this.$parent.conditionConfig.isShow=true
      },
      handleKeydown() {
        var keyCode = window.event ? e.keyCode : e.which;
        //删除事件
        if (keyCode === 8) {  //删除

        }
        if (keyCode === 13) {  //回车

        }
      },
      handleClear() {
        //清空所有 选中内容
        this.value = ''
      },
      handleDel() {
         this.$emit("del",this.selectItem)
      },
      editVal() {
        //编辑值
        this.isFocus = true;
        this.$parent.isFocus=true
        this.$refs.item && this.$refs.item.triggerFocus()
      },
      editlabel() {
        //编辑label
        this.isFocus = true
        this.$parent.isFocus=true
        this.$refs.item && this.$refs.item.triggerFocus()
      }
    },
    components: {
      VPicker: () => import('./VPicker.vue'),
      VInput: () => import('./VInput.vue'),
      VTimerange: () => import('./VTimerange.vue'),
      VSelect: () => import('./VSelect.vue'),
    }
  }
</script>

<style lang="css" scoped>
  .input-item {
    flex: auto;
  }

  .input-item .input {
    width: 100%;
  }

  /deep/ .input-item input {
    min-width: 200px;
    width: 100%;
    border: none;
    box-shadow: none;
  }


  /deep/ .autocomplete-popover {
    width: auto !important;
    max-width: 300px !important;
  }

  /deep/ .input .el-input__inner {
    font-size: 14px;
    height: 24px;
    line-height: 24px;
    padding: 0 2px;
  }

  .ListItem {
    font-size: 0;
    margin-right: 4px;
  }

  .ListItem div {
    /*float: left;*/
    white-space: nowrap;
    display: inline-block;
  }

  .clearfix:after {
    content: ".";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
  }

  .label {
    margin: 2px;
  }

  .value {
    margin: 2px;
  }

  .el-tag.el-tag--info:hover {
    background-color: #DFDFDF;
  }

  /* 空数据 */
  .none .el-tag {
    padding: 0;
    height: 16px;
    line-height: 16px;
    .el-select__tags-text{

    }

  }
  .none .el-tag .el-tag__close{
    left: 1px;
  }
  .last-item{
    display: flex;
    flex: auto;
  }
</style>
