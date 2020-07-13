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
                    xAxis: {
                        type: 'category',
                        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],

                        //坐标轴轴线相关设置。
                        axisLine: {
                            lineStyle: {
                                show: false,
                                type:"solid",
                                color: "#999999",
                                width: 1,
                                shadowColor: '#999999',
                                opacity:1,
                                shadowBlur: 1
                            },
                        },
                        // 坐标轴刻度标签的相关设置。
                        axisLabel: {
                            color: '#333333'
                        },
                    },
                    yAxis: {
                        //Y坐标轴 名称样式设置
                        name:"单位",
                        nameLocation:"middle",
                        nameGap:35,
                        nameTextStyle:{
                            color:"#333333",    //默认取坐标轴颜色
                            // fontWeight:"bold",
		                        // left:5,
                            align:"right",
                            fontSize:12
                        },
                        //分割线样式
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: '#e5e5e5',
                                width: .8
                            }
                        },
                        //坐标轴轴线相关设置。
                        axisLine: {
                            lineStyle: {
                                color: "#999999",
                                width: 1,
                                // shadowColor: '#999999',
                                // opacity:1,
                                // shadowBlur: 1
                            },
                        },
                        // 坐标轴刻度标签的相关设置。
                        axisLabel: {
                            color: '#333333'
                        },
                        type: 'value'
                    },
                    series: [{
                        symbol:"circle",  //折线图 是实心圆
                        symbolSize:5,     //圆的半径
                        itemStyle:{
                            borderWidth:1,
                            // borderColor:"transparent"
                            borderColor:'rgba(255,255,255,1)'
                        },
                        lineStyle:{
                            width:2       //折线的线粗为2
                        },     //
                        data: [820, 932, 901, 934, 1290, 1330, 1320],
                        type: 'line'
                    }]
                }
            }
        }
    }
</script>

<style lang="" scoped>

</style>
