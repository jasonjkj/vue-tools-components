<template>
  <div class="log">
    <v-chart :options="options" ref="chart"></v-chart>
  </div>
</template>

<script>
  import sourceData from './data'
  import groupBy from 'lodash/groupBy'


  export default {
    data() {
      return {
        options: {
          title: {
            text: '日志图表',
            subtext: '副标题 - 测试'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            icon: "roundRect",
            type: 'scroll',
            orient: 'horizontal',
            bottom: 0,
            align: 'auto',
          },
          // toolbox: {
          //   //展示 那几个缩放按钮的 工具箱
          //   show: true,
          //   feature: {
          //     dataZoom: {
          //       yAxisIndex: 'none'
          //     },
          //     magicType: {type: ['line', 'bar']},    //切换图标类型   折线图  --> 柱状图
          //     restore: {},                           //重置按钮
          //     saveAsImage: {}                        //保存图片
          //   }
          // },
          brush:{
            toolbox:["lineX","clear",'rect'],  //选择工具栏 的操作 ...
            brushType:"lineX",
            brushMode:"single",
            throttleType:'debounce',
            removeOnClick:false,
            transformable:false,

            xAxisIndex: 'all',
            brushLink: 'all',
          },
          xAxis: {
            id: "xAxis",
            //设置 x轴为时间轴
            type: 'time',
            minInterval: 1000,   //至少是1s
            splitNumber: 5,
            axisLabel: {
              // formatter(time){
              //     //建议不要年月日 , 有点恶心
              //     return Moment(time).format("YYYY-MM-DD HH:mm:ss")
              // }
            },
            nameLocation: "center",
            scale: true,
            boundaryGap: false,
            axisLine: {onZero: false},
            splitLine: {
              show: false,
              interval: 0
            },
            min: 'dataMin',
            max: 'dataMax',
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              formatter: '{value}Byte'
            }
          },
          series: []
        }
      }
    },
    created() {

    },
    mounted() {
      this.$nextTick((item,index)=>{
        this.loadData()
      })
    },
    methods:{
      loadData(){
        //加载数据  请求的数据 ,初始化处理
        var remoteData=sourceData.data.result;
        this. completeDataRender(remoteData)
      },
      completeDataRender(remoteData) {
        //先删除数据
        this.options.dataset = [];
        this.options.series = [];
        this.options.legend.data = [];

        //再赋值
        var data = remoteData
        var typeObj = groupBy(data, "type");
        var dataset = [];
        var series = [];
        var legendDate = [];
        for (var key in typeObj) {
          dataset.push({
            id: key,
            source: typeObj[key] || []
          })
        }
        for (var i = 0; i < dataset.length; i++) {
          series[i] = {
            type: 'bar',
            stack:"stackCurrent",
            showSymbol: false,
            datasetIndex: i,
            areaStyle: {},
            name: dataset[i].id,
            encode: {
              tooltip: ['bytes'],
              x: 'stat_time',
              y: 'bytes',
            }
          };

          //配置 图例的样式
          legendDate[i] = {
            name: dataset[i].id,
            icon: 'circle'
          }
        }

        // this.$refs.chart.clear()
        this.options.dataset = dataset;
        this.options.series = series;
        this.options.legend.data = legendDate

      },
    },
    components: {
      // VChart: () => import("./components/VChart.vue")
    },
  }
</script>

<style lang="" scoped>

</style>
