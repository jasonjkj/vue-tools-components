<template>
  <!-- 时间范围 -->
  <div class="v-timerange">
    <el-date-picker
      v-model="valCopy"
      type="datetimerange"
      start-placeholder="Start Time"
      end-placeholder="End Time"
      :default-time="['12:00:00']">
    </el-date-picker>
  </div>
</template>

<script>
  import lodashCloneDeep from 'lodash/cloneDeep'

  export default {
    name: "v-timerange",
    props: ['value'],
    data() {
      return {
        valCopy: [],
      }
    },
    model: {
      prop: 'value',
      event: 'change'
    },
    created() {
      this.valCopy = this.value ? lodashCloneDeep(this.value) : [];
    },
    mounted() {
    },
    watch: {
      valCopy(n, o) {
        if (this.value !== n) {
          this.$emit('change', this.valCopy)
        }
      },
      value(n, o) {
        this.valCopy = n || []
      }
    }
  }
</script>

<style lang="" scoped>

</style>
