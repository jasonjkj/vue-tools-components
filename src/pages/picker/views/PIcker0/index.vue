<template>
  <div class="index">
    <VueCtkDateTimePicker
      :no-label="true"
      :no-header="true"
      :no-shortcuts="true" :range="true" v-model="yourValue"/>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                yourValue: { "start": "2018-04-02", "end": "2018-04-17" }
            }
        },
        created() {

        },
        methods: {}
    }
</script>

<style scoped>

</style>
