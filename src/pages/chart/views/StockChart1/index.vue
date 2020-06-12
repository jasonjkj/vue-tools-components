<template>
	<highcharts v-if="isShow" ref="chartContainer"
	            class="stock"
	            :constructor-type="'stockChart'"
	            :options="stockOptions"></highcharts>
</template>

<script>
  import Ws from './Ws'
    export default {
        // name:"StockChart",
        data() {
            return {
                chart: null,  //获取一下highChart实例
                isShow: false,
                stockOptions: {}

            }
        },
        created() {
        },
        mounted() {
            this.stockOptions = {
                exporting: {  //导出设置
                    enabled: true,
                    chartOptions: { // specific options for the exported image
                        plotOptions: {
                            series: {
                                dataLabels: {
                                    enabled: true
                                }
                            }
                        }
                    },
                    // fallbackToExportServer: false
                },
                chart: {
                    events: {
                        load: this.loadData,
                    },
                },
                rangeSelector: {
                    buttons: [{
                        count: 1,
                        type: 'minute',
                        text: '1M'
                    }, {
                        count: 5,
                        type: 'minute',
                        text: '5M'
                    }, {
                        type: 'all',
                        text: 'All'
                    }],
                    inputEnabled: false,
                    selected: 0
                },
                title: {
                    text: 'Live random data'
                },
                tooltip: {
                    split: false
                },
                // exporting: {
                //   enabled: false
                // },
                series: [{
                    name: '随机数据',
                    data: this.historyData()
                }]
            }
            this.refresh()
        },
        methods: {
            historyData(){
              var data = [], time = (new Date()).getTime(), i;
              // 自动随机1000个数据,
              for (i = -999; i <= 0; i += 1) {
                data.push([
                  time + i * 1000,      //X 轴坐标
                  Math.round(Math.random() * 100)   //y轴坐标
                ]);
              }
              return data;
            },
            loadData() {
              var ws=new Ws({
                url:"ws://localhost:8080",
                receiveMsg:(event)=>{
                  this.chart = this.$refs.chartContainer.chart;
                  var series = this.chart.series[0];
                  var x = (new Date()).getTime(), // current time
                    y = Math.round(Math.random() * 100);
                  series.addPoint([x, y], true, true);
                }
              })
            },
            refresh(callback) {
                this.isShow = false
                var timer = setTimeout(() => {
                    this.isShow = true
                    this.$nextTick(() => {
                        this.chart = this.$refs.chartContainer.chart
                    })
                });
                timer = null
            }
        }
    }
</script>
<style scoped>
	.stock {
		width: 70%;
		margin: 0 auto
	}
</style>
