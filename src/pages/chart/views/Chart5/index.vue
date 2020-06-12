<template>
	<div class="index">
		<highcharts :options="chartOptions" style="width:400px;height:400px"></highcharts>
	</div>
</template>

<script>
    import Highcharts from 'highcharts'

    export default {
        data() {
            return {
                chartOptions: {}
            }
        },
        created() {

        },
        mounted() {
            this.$nextTick(() => {
                this.chartOptions = {
                    chart: {
                        // inverted:true,
                        zoomType: 'xy'
                    },
                    title: {
                        text: '东京月平均温度和降雨量'
                    },
                    subtitle: {
                        text: '数据来源: WorldClimate.com'
                    },
                    xAxis: [{
                        // opposite:true,
                        // reversed:true,
                        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                        crosshair: true,
                        plotLines:[{
                            color:'red',            //线的颜色，定义为红色
                            dashStyle:'longdashdot',//标示线的样式，默认是solid（实线），这里定义为长虚线
                            value:10,                //定义在哪个值上显示标示线，这里是在x轴上刻度为3的值处垂直化一条线
                            width:2                 //标示线的宽度，2px
                        }]
                    }],
                    yAxis: [
                        { // Primary yAxis
                            labels: {
                                format: '{value}°C',
                                style: {
                                    color: Highcharts.getOptions().colors[1]
                                }
                            },
                            title: {
                                text: '温度',
                                style: {
                                    color: Highcharts.getOptions().colors[1]
                                }
                            }
                        },
                        { // Secondary yAxis
                            title: {
                                text: '降雨量',
                                style: {
                                    color: Highcharts.getOptions().colors[0]
                                }
                            },
                            labels: {
                                format: '{value} mm',
                                style: {
                                    color: Highcharts.getOptions().colors[0]
                                }
                            },
                            opposite: true
                        }
                    ],
                    tooltip: {
                        shared: true
                    },
                    legend: {
                        layout: 'vertical',
                        align: 'left',
                        x: 120,
                        verticalAlign: 'top',
                        y: 100,
                        floating: true,
                        backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
                    },
                    series: [
                        {
                            name: '降雨量',
                            type: 'column',
                            yAxis: 1,
		                        color:'yellow',
                            data: [{
                                y:49.9,
                                cursor:'pointer'
                            }, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
                            tooltip: {
                                valueSuffix: ' mm'
                            }
                        },
                        {
                            allowPointSelect: true,
                            cursor:'pointer',
                            name: '温度',
                            lineWidth: 5,
                            type: 'spline',
                            zones: [{
                                value: 0,
                                color: '#f7a35c',
                                dashStyle: 'dot'
                            }, {
                                value: 10,
                                color: '#7cb5ec'
                            }, {
                                value: 20,
                                color: '#90ed7d'
                            }],
                            data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6],
                            tooltip: {
                                valueSuffix: '°C'
                            }
                        }
                    ]
                }
            })
        },
        methods: {}
    }
</script>

<style scoped>

</style>
