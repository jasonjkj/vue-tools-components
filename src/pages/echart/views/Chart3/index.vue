<template>
	<div class="Chart2">
		<v-chart :options="option" ref="chart"></v-chart>
	</div>
</template>

<script>
    import echarts from 'echarts'
    export default {
        data() {
            return {
                option : {
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: []
                    },
                    yAxis: {
                        boundaryGap: [0, '50%'],
                        type: 'value'
                    },
                    series: [
                        {
                            name:'成交',
                            type:'line',
                            smooth:true,
                            symbol: 'none',
                            stack: 'a',
                            areaStyle: {
                                normal: {}
                            },
                            data: []
                        }
                    ]
                }
            }
        },
		    mounted(){
						var vm=this
            var base = +new Date(2014, 9, 3);
            var oneDay = 24 * 3600 * 1000;
            var date = [];

            var data = [Math.random() * 150];
            var now = new Date(base);

            function addData(shift) {
                now = [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/');
                date.push(now);
                data.push((Math.random() - 0.4) * 10 + data[data.length - 1]);

                if (shift) {
                    date.shift();
                    data.shift();
                }

                now = new Date(+new Date(now) + oneDay);
            }

            for (var i = 1; i < 100; i++) {
                addData();
            }
          this.$nextTick(()=>{
              this.$refs.chart.chart.showLoading()
          })

            setInterval( () =>{
                this.$refs.chart.chart.hideLoading()
                addData(true);
                debugger
                vm.option.xAxis={
                    data: date
                }
                vm.option.series=[{
                    name:'成交',
                    data: data
                }]
            }, 2500);
		    }
    }
</script>

<style lang="" scoped>

</style>
