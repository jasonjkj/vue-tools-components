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
                        boundaryGap: false,
                        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: [820, 932, 901, 934, 1290, 1330, 1320],
                        type: 'line',
                        areaStyle: {
                            opacity:.4,
                        },


                        symbol:"emptyCircle",  //折线图 是实心圆
                        symbolSize:6,     //圆的半径
                        lineStyle:{
                            width:2       //折线的线粗为2
                        },     //
                    }]
                }
            }


        }
    }
</script>

<style lang="" scoped>

</style>
