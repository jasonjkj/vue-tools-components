<template>
	<div class="index">
		<highcharts :options="chartOptions"></highcharts>
	</div>
</template>

<script>
    export default {
        name: "Chart1",
		    data(){
            return {
                chartOptions:{
                    series: [{
                        data: [1, 2, 3] // sample data
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
