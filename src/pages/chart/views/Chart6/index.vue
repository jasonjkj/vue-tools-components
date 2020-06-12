<template>
	<div class="Chart6">
      <highcharts :options="chartOptions" style="width:600px;height:800px"></highcharts>
	</div>

</template>

<script>
    //import hotHead from './components/matchPage/myHead.vue'
    export default {
        name: "Chart6",
        props: {},
        created: function () {

        },
        mounted() {

        },
        data: function () {
            return {
                chartOptions: {
                    tooltip: {
                        backgroundColor: '#FCFFC5',   // 背景颜色
                        borderColor: 'black',         // 边框颜色
                        borderRadius: 10,             // 边框圆角
                        borderWidth: 3,               // 边框宽度
                        shadow: true,                 // 是否显示阴影
                        animation: true,               // 是否启用动画效果
                        style: {                      // 文字内容相关样式
                            color: "#ff0000",
                            fontSize: "12px",
                            fontWeight: "blod",
                            fontFamily: "Courir new"
                        }
                    },
                    chart: {
                        type: 'column'
                    },
                    title: {
                        text: 'Monthly Average Rainfall'
                    },
                    subtitle: {
                        text: 'Source: WorldClimate.com'
                    },
                    xAxis: {
                        categories: [
                            'Jan',
                            'Feb',
                            'Mar',
                            'Apr',
                            'May',
                            'Jun',
                            'Jul',
                            'Aug',
                            'Sep',
                            'Oct',
                            'Nov',
                            'Dec'
                        ],
                        crosshair: true
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: 'Rainfall (mm)'
                        }
                    },
                    tooltip: {
                        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                            '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                        footerFormat: '</table>',
                        shared: true,
                        useHTML: true
                    },
                    plotOptions: {
                        column: {
                            colorByPoint: true
                        }
                    },
                    series: [{
                        name: 'Tokyo',
                        //colorByPoint:true,  或者直接写在这里
                        data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
                    }]
                }
            }
        },
        methods: {},
        computed: {},
        watch: {},
        components: {},
    }
</script>
<style scoped >

</style>
