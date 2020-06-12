<template>
	<div class="Chart7">
		<highcharts :options="chartOptions" style="width:600px;height:800px"></highcharts>
	</div>
</template>

<script>
    //import hotHead from './components/matchPage/myHead.vue'
    export default {
        props: {},
        created: function () {

        },
        mounted() {

        },
        data: function () {
            return {
                chartOptions: {
                    chart: {
                        type: 'column'
                    },
                    title: {
                        text: 'Basic drilldown'
                    },
                    xAxis: {
                        type: 'category'
                    },
                    legend: {
                        enabled: false
                    },
                    plotOptions: {
                        series: {
                            borderWidth: 0,
                            dataLabels: {
                                enabled: true
                            }
                        }
                    },
                    series: [{
                        name: 'Things',
                        colorByPoint: true,
                        data: [{
                            name: 'Animals',
                            y: 5,
                            drilldown: 'animals'
                        }, {
                            name: 'Fruits',
                            y: 2,
                            drilldown: 'fruits'
                        }, {
                            name: 'Cars',
                            y: 4,
                            drilldown: 'cars'
                        }]
                    }],
                    drilldown: {
                        series: [{
                            id: 'animals',
                            data: [
                                {name: 'Cats', id: 'cat', y: 4},
                                {name: 'Dogs', id: 'dog', y: 2},
                                {name: 'Cows', y: 1, id: 'cow'},
                                {name: 'Sheep', y: 2, id: 'sheep'},
                                {name: 'Pigs', y: 1, id: 'pig'}
                            ]
                        }, {
                            id: 'fruits',
                            data: [{
                                name: 'Apples',
                                y: 4
                            }, {
                                name: 'Oranges',
                                y: 2,
                                drilldown: 'third-leves'
                            }]
                        }, {
                            id: 'cars',
                            data: [
                                ['Toyota', 4],
                                ['Opel', 2],
                                ['Volkswagen', 2]
                            ]
                        }, {
                            id: 'third-leves',
                            data: [
                                ['Toyota', 4],
                                ['Opel', 2],
                                ['Volkswagen', 2]
                            ]
                        }]
                    }
                }
            }
        },
        methods: {},
        computed: {},
        watch: {},
        components: {},
    }
</script>
<style scoped>


</style>
