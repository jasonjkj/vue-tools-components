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
                    // silent: true,
                    series: {
	                    data: [{
		                    value: 10,
		                    children: [{
			                    name: 'target',
			                    value: 4,
			                    children: [{
				                    value: 2,
				                    name: 'target1',
				                    children: [{
					                    name: 'target11',
					                    value: 1
				                    }]
			                    }, {
				                    name: 'target2',
				                    value: 1
			                    }, {
				                    name: 'target3',
				                    value: 0.5
			                    }]
		                    }, {
			                    name: "other",
			                    value: 2
		                    }]
	                    }, {
		                    value: 4,
		                    name: "ip4",
		                    children: [{
			                    children: [{
				                    name: "TLS",
				                    value: 2
			                    }]
		                    }]
	                    }],
	                    nodeClick: false,  //阻止下钻

                        radius: ['15%', '95%'],
                        center: ['50%', '60%'],
                        type: 'sunburst',
                        sort: null,
                        highlightPolicy: 'self',


                        label: {
                            normal: {
                                rotate: 'none',
                                color: '#fff'
                            }
                        },
                        levels: [],
                        itemStyle: {
                            color: 'yellow',
                            borderWidth: 2
                        },
                        emphasis: {
                            itemStyle: {
                                color: 'green'
                            }
                        },
                        highlight: {
                            itemStyle: {
                                color: 'orange'
                            }
                        },
                        downplay: {
                            itemStyle: {
                                color: '#ccc'
                            }
                        }
                    }
                }
            }
        },
        mounted() {
            this.$nextTick(() => {
                var chart = this.$refs.chart.chart;
                chart.on('click', (params,a,b,c) => {
                    console.log(params,a,b,c);
                    var target = params.name;
                    //选中的高亮
                    // chart.dispatchAction({
                    //     type: 'sunburstHighlight',
                    //     targetNodeId: target
                    // });
                    return false
                });
            })



	        setTimeout( ()=> {
		        var chart = this.$refs.chart.chart;
		        chart.dispatchAction({
			        type: 'sunburstHighlight',
			        targetNodeId: 'target'
		        });
	        });
        }
    }
</script>

<style lang="" scoped>

</style>
