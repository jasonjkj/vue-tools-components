<template>
	<div class="index" style="width: 600px;border: 1px solid red">
		<highcharts id="container"  ref="chart" :options="chartOptions" style="width:400px;height:400px"></highcharts>
		<button id="set-div-size" @click="handleClick1" class="autocompare">Toggle container size</button>
		<button id="reflow-chart"  @click="handleClick2" class="autocompare">Reflow chart to container</button>

	</div>
</template>

<script>
    export default {
		    data(){
            return {
                wide:false,
                chartOptions:{
                    chart: {
                        type: 'line',
                        zoomType: 'x',
                        panning: true,
                        panKey: 'shift',
                        inverted:false,
                        animation:true,
                    },
                    title: {
                        text: 'Zooming and panning'
                    },
                    subtitle: {
                        text: 'Click and drag to zoom in. Hold down shift key to pan.'
                    },
                    yAxis: {
                        title:{
                            text:'y轴标题'
                        },
                        tickColor:'#ff0000',
		                    tickWidth:'5',
                        tickLength:'10',
                        tickInterval:10,
                        labels: {
                            enabled:true,
                            Step:10,
                            formatter:function(){
                                if(this.value <=100) {
                                    return "第一等级("+this.value+")";
                                }else if(this.value >100 && this.value <=200) {
                                    return "第二等级("+this.value+")";
                                }else {
                                    return "第三等级("+this.value+")";
                                }
                            }
                        }
                    },
                    xAxis: {
                        gridLineWidth:'1',
                        gridLineColor:'green',
                        gridLineDashStyle:'Dot',
                        labels: {
                            // staggerLines:10
                        },
                        title:{
                            text:'x轴标题'
                        },
                        tickColor:'#ff0000',
                        enabled:false,
                        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                    },
                    series: [{
                        data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
                    }]
                }
            }
		    },
		    created(){

		    },
		    methods:{
            handleClick1(){
                $('#container').width(this.wide ? 400 : 500);
                this.wide = !this.wide;
            },
            handleClick2(){
                // $('#container').highcharts().reflow();
		            var chart=this.$refs.chart.chart
                this.$refs.chart.chart.reflow()
                var title = {
                    useHTML:true,
                    text: "Highcharts中文网 | <a href='https://www.highcharts.com.cn' target='_blank'>中文教程</a>"
                };

                chart.setTitle(title);
            }
		    }
    }
</script>

<style  scoped>

</style>
