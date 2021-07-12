<template>
  <div class="VChart" ref="chartContainer"></div>
</template>

<script>
  import echarts from 'echarts'

  export default {
    name: "VChart",
    props: {
      options: {
        type: Object,
        // 对象或数组默认值必须从一个工厂函数获取
        default: function () {
          return {}
        }
      },
      styles: {
        type: Object,
        // 对象或数组默认值必须从一个工厂函数获取
        default: function () {
          return {}
        }
      },
      updateType: {
        type: String,
        // 对象或数组默认值必须从一个工厂函数获取
        default: function () {
          return 'auto'
        }
      }   //自动"auto'  手动'manual'
    },
    created: function () {

    },
    mounted() {
      this.$nextTick(() => {
        this.initChart();
      })
    },
    data() {
      return {
        chart: null,
      }
    },
    methods: {
      refresh() {
        // this.isShow=false;

      },
      initChart() {
        this.$el.style.width = (this.styles.width || 800) + 'px';
        this.$el.style.height = (this.styles.height || 400) + 'px';
        this.chart = echarts.init(this.$el);
        this.setOptions()
        // this.chart.off("brushSelected");//解绑事件处理函数（可根据情况而定是否需要，这里我这边会重绘几次表，所以需要解绑事件处理函数）。
        // this.chart.on('brushSelected', (params) => {
        //   console.log(params,'brushSelected');
        // });
        this.chart.on('brushEnd', (params) => {
          console.log(params,'brushEnd');
        });
        // this.chart.on('brush', (params) => {
        //   console.log(params,'brush');
        // });
      },
      setOptions() {
        //https://echarts.apache.org/zh/api.html#echartsInstance.setOption
        this.chart.setOption(this.options);
      }
    },
    computed: {},
    watch: {
      options: {
        handler(n, o) {
          if (this.updateType === 'manual') {
            //手动更新 不执行重渲染
            return
          }
          this.setOptions()
        },
        deep: true,
      }
    },

  }
</script>
<style scoped>

</style>
