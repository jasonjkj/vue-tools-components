<template>
  <!-- 下拉值 数据 -->
  <div class="v-select">
    <el-select
      :collapse-tags="collapseTags"
      size="mini"
      autosize
      v-model="valCopy"
      :clearable="clearable === undefined || clearable"
      @visible-change="visibleChangeHandle"
      v-bind="$props"
      v-on="$listeners"
      :loading="loading"
    >
      <template v-for="(item,index) in optionsCopy">
        <el-option
          :label="item.label"
          :value="item.value">
        </el-option>
      </template>
    </el-select>
  </div>
</template>

<script>
  import lodashCloneDeep from 'lodash/cloneDeep'
  export default {
    name: "v-select",
    props: ['value', 'collapseTags', 'options', 'multiple', 'filterable', 'queryParam', 'disabled', 'clearable', 'wrapper'],
    data () {
      return {
        optionsCopy: [],
        valCopy: null,
        loading: false,
        selectObj: {}    //选中的对象 需要存储一下 ,没准儿有用
      }
    },
    model: {
      prop: 'value',
      event: 'change'
    },
    created () {
      this.value ? this.valCopy = lodashCloneDeep(this.value) : '';
      this.optionsCopy = this.options ? lodashCloneDeep(this.options) : []
    },
    mounted () {

    },
    methods: {
      visibleChangeHandle (status) {
        if (!this.queryParam) {
          return
        }
        this.loading = true
        this.optionsCopy = []
        if (status === true) {//重新赋值下拉值...
          // this.optionsCopy
        }
      }
    },
    watch: {
      options (n, o) {
        //监听下拉数据的变化
        this.optionsCopy = this.options ? [...this.options] : []
      },
      valCopy (n, o) {
        if (this.value !== n) {
          this.$emit('change', this.valCopy)
        }
      },
      value (n, o) {
        // this.valCopy = this.value
        this.valCopy = n
      }
    }
  }
</script>

<style lang="" scoped>

</style>
