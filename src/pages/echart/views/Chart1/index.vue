<template>
	<div class="index">
		<v-chart :options="options" ref="chart"></v-chart>
	</div>
</template>

<script>
    export default {
        data() {
            return {
                options: {

                    title: {
                        text: '动态数据',
                        subtext: '纯属虚构',
		                    textStyle:{

                        }
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            label: {
                                backgroundColor: '#283b56'
                            }
                        }
                    },
                    legend: {
                        data:['最新成交价', '预购队列']
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            dataView: {readOnly: false},
                            restore: {},
                            saveAsImage: {}
                        }
                    },
                    dataZoom: {
                        show: false,
                        start: 0,
                        end: 100
                    },
                    xAxis: [
                        {
                            axisLabel:{
                              /*  interval:false*/
                                interval:'auto'
                            },
                            type: 'category',
                            boundaryGap: true,
                            data: (function (){
                                var now = new Date();
                                var res = [];
                                var len = 10;
                                while (len--) {
                                    res.unshift(now.toLocaleTimeString().replace(/^\D*/,''));
                                    now = new Date(now - 2000);
                                }
                                return res;
                            })()
                        },
                        // {
                        //     type: 'category',
                        //     boundaryGap: true,
                        //     data: (function (){
                        //         var res = [];
                        //         var len = 10;
                        //         while (len--) {
                        //             res.push(10 - len - 1);
                        //         }
                        //         return res;
                        //     })()
                        // },

                    ],
                    yAxis: [
                        {
                            axisLine:{
                                lineStyle:{
                                    color:"#999999",
                                    // shadowColor: 'rgba(0, 0, 0, 0.5)',
                                    shadowColor: '#999999',
                                    opacity:1,
                                    shadowBlur: 1
                                }
                            },
                            axisTick:{
                                lineStyle:{
                                    color:"#e5e5e5"
                                }
                            },
                            axisLabel:{
                                interval:false
                            },
                            type: 'value',
                            scale: true,
                            name: '价格',
                            max: 30,
                            min: 0,
                            boundaryGap: [0.2, 0.2]
                        },
                        {
                            type: 'value',
                            scale: true,
                            name: '预购量',
                            max: 1200,
                            min: 0,
                            boundaryGap: [0.2, 0.2]
                        }
                    ],
		                grid:{
                        show:false,
                        borderWidth:1,
                        // borderColor:"#e5e5e5"
                        borderColor:"red"
                    },
                    series: [
                       /* {
                            name: '预购队列',
                            type: 'bar',
                            xAxisIndex: 1,
                            yAxisIndex: 1,
                            data: (function (){
                                var res = [];
                                var len = 10;
                                while (len--) {
                                    res.push(Math.round(Math.random() * 1000));
                                }
                                return res;
                            })()
                        },*/
                        {

                            name: '最新成交价',
                            type: 'line',
                            data: (function (){
                                var res = [];
                                var len = 0;
                                while (len < 10) {
                                    res.push((Math.random()*10 + 5).toFixed(1) - 0);
                                    len++;
                                }
                                return res;
                            })()
                        }
                    ]
                }
            }
        },
        created() {

        },
		    mounted(){

            var count = 11;
            setInterval(()=>{
                var axisData = (new Date()).toLocaleTimeString().replace(/^\D*/, '');

                var data0 = this.options.series[0].data;
                var data1 =  this.options.series[1].data;
                data0.shift();
                data0.push(Math.round(Math.random() * 1000));
                data1.shift();
                data1.push((Math.random() * 10 + 5).toFixed(1) - 0);

                this.options.xAxis[0].data.shift();
                this.options.xAxis[0].data.push(axisData);
                this.options.xAxis[1].data.shift();
                this.options.xAxis[1].data.push(count++);
            }, 2100);
		    },
        methods: {},
        components: {
            VChart:()=>import("./components/VChart.vue")
        },
    }
</script>

<style scoped>

</style>
