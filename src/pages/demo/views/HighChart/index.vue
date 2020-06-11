<template>
    <div class="HighChart">
        <div class="box">
            <h3>股票图</h3>
            <div id="container" class="container"></div>
            <button @click="updateStcockChart" :disabled="!stockChart">更新数据范围</button>
        </div>
    </div>
</template>

<script>
    import Highcharts from 'highcharts/highstock';
    import HighchartsMore from 'highcharts/highcharts-more';
    import HighchartsDrilldown from 'highcharts/modules/drilldown';
    import Highcharts3D from 'highcharts/highcharts-3d';
    // import $ from 'jquery'
    HighchartsMore(Highcharts)
    HighchartsDrilldown(Highcharts);
    Highcharts3D(Highcharts);

    export default {
        name: "HighChart",
        props:{
        },
        created:function(){
            this.createChart();
        },
        mounted(){

        },
        data:function () {
            return {
                stockChart: null,
            }
        },
        methods:{
            createChart() {
                Highcharts.setOptions({
                    lang: {
                        rangeSelectorZoom: ''
                    }
                });
                $.getJSON('https://data.jianshukeji.com/jsonp?filename=json/aapl-ohlcv.json&callback=?', (data) => {
                    console.log(data);
                    var ohlc = [],
                      volume = [],
                      dataLength = data.length,
                      // set the allowed units for data grouping
                      groupingUnits = [
                          [
                              'week', // unit name
                              [1] // allowed multiples
                          ],
                          [
                              'month', [1, 2, 3, 4, 6]
                          ]
                      ],
                      i = 0;
                    for (i; i < dataLength; i += 1) {
                        ohlc.push([
                            data[i][0], // the date
                            data[i][1], // open
                            data[i][2], // high
                            data[i][3], // low
                            data[i][4] // close
                        ]);
                        volume.push([
                            data[i][0], // the date
                            data[i][5] // the volume
                        ]);
                    }
                    // create the chart
                    this.stockChart = new Highcharts.stockChart('container', {
                        rangeSelector: {
                            selected: 1,
                            inputDateFormat: '%Y-%m-%d'
                        },
                        title: {
                            text: '苹果历史股价'
                        },
                        xAxis: {
                            dateTimeLabelFormats: {
                                millisecond: '%H:%M:%S.%L',
                                second: '%H:%M:%S',
                                minute: '%H:%M',
                                hour: '%H:%M',
                                day: '%m-%d',
                                week: '%m-%d',
                                month: '%y-%m',
                                year: '%Y'
                            }
                        },
                        yAxis: [{
                            labels: {
                                align: 'right',
                                x: -3
                            },
                            title: {
                                text: '股价'
                            },
                            height: '60%',
                            lineWidth: 2
                        }, {
                            labels: {
                                align: 'right',
                                x: -3
                            },
                            title: {
                                text: '成交量'
                            },
                            top: '65%',
                            height: '35%',
                            offset: 0,
                            lineWidth: 2
                        }],
                        series: [{
                            type: 'candlestick',
                            name: 'AAPL',
                            color: 'green',
                            lineColor: 'green',
                            upColor: 'red',
                            upLineColor: 'red',
                            tooltip: {},
                            data: ohlc,
                            dataGrouping: {
                                units: groupingUnits
                            }
                        }, {
                            type: 'column',
                            name: 'Volume',
                            data: volume,
                            yAxis: 1,
                            dataGrouping: {
                                units: groupingUnits
                            }
                        }]
                    });
                });
            },

            updateStcockChart() {
                var rangeSelector = this.stockChart.rangeSelector,
                  selected = rangeSelector.selected,
                  total = rangeSelector.buttons.length;
                selected++;
                if (selected >= total) {
                    selected = 0;
                }

                this.stockChart.rangeSelector.clickButton(selected)
            },
        },
        computed: {

        },
        watch:{
            HighChart(n,o){

            }
        },
        components: {

        },
    }
</script>
<style scoped >

</style>
