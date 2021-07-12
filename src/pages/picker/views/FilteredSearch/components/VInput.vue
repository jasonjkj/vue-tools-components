<template>
  <!-- input 类型 -->
  <div class="v-input">
    <el-input size="mini"
              class="rel-input"
              ref="input"
              :maxlength="255"
              :autoComplete="autoComplete || 'off'"
              autosize
              v-bind="$props"
              v-on="$listeners"
              v-model="valCopy"
    >
    </el-input>
  </div>
</template>

<script>
  import lodashCloneDeep from 'lodash/cloneDeep'
  export default {
    name: "v-input",
    data () {
      return {
        valCopy: null,
      }
    },
    props: ['value', 'type', 'rows', 'disabled', 'maxlength', 'autoComplete', 'showPassword','placeholder'],
    model: {
      prop: 'value',
      event: 'change'
    },
    created () {
      this.valCopy = lodashCloneDeep(this.value)
    },
    mounted () {},
    methods:{
      triggerFocus(){
        this.$nextTick(() => {
          var dom = this.$refs.input.$el.children[0];    //获取输入框DOM 索引
          dom.focus();
        })
      }
    },
    watch: {
      valCopy (n, o) {
        if (this.value !== n) {
          this.$emit('change', this.valCopy)
        }
      },
      value (n, o) {
        this.valCopy = n
      }
    }
  }
</script>

<style lang="" scoped>

</style>
