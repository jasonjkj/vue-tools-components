<template>
	<div class="Chart8">
		<highcharts :options="chartOptions" style="width:600px;height:800px"></highcharts>
	</div>
</template>

<script>
    export default {
        name: "Chart8",
		    data(){
            return {
                chartOptions:{
                    exporting: {
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
                    title: {
                        text: '离线导出（浏览器端导出，无需提交数据到导出服务器）'
                    },
                    subtitle: {
                        text: '请点击右侧导出按钮进行操作'
                    },
                    chart: {
                        type: 'area'
                    },
                    xAxis: {
                        categories: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
                    },
                    series: [{
                        data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 126.0, 148.5, 216.4, 194.1, 95.6, 54.4]
                    }]
                }
            }
		    }
    }
</script>

<style lang="" scoped>

</style>
