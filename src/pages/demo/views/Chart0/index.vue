<template>
	<div class="index">
		<highcharts :options="chartOptions" style="width:400px;height:400px"></highcharts>
	</div>
</template>

<script>
    export default {
		    data(){
            return {
                chartOptions:{
                    chart: {
                        panning: true,
                        panKey: 'shift',
                        zoomType: 'y',
                        // plotBackgroundColor:'green',
                        borderColor:'#7CB5EC',
                        borderWidth:'1',
                        // backgroundColor:"red",
                        type: 'column',                         //指定图表的类型，默认是折线图（line）
                        style: {
                            fontFamily: "",
                            fontSize: '24px',
                            fontWeight: 'bold',
                            color: '#006cee'
                        },
                        events:{
                            click: function (event) {
                                console.log(event);
                            },
                        },
                        options3d: {
                            enabled: true,
                            alpha: 15,
                            beta: 15,
                            depth: 50
                        }
                    },

                    title: {
                        text: '我的第一个图表'                 // 标题
                    },
                    xAxis: {
                        categories: ['苹果', '香蕉', '橙子']   // x 轴分类
                    },
                    yAxis: {
                        title: {
                            text: '吃水果个数'                // y 轴标题
                        }
                    },
                    series: [{                              // 数据列
                        name: '小明',                        // 数据列名
                        data:  [29.9, 71.5, 106.4]                  // 数据
                    }, {
                        name: '小红',
                        data: [129.2, 135.6, 148.5]
                    }]
                }
            }
		    },
		    created(){

		    },
		    methods:{

		    }
    }
</script>

<style  scoped>

</style>
