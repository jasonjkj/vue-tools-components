<template>
	<div class="">
		<v-chart :options="option" ref="chart"></v-chart>
	</div>
</template>

<script>
    export default {
        data() {
            return {
                option: {
                    series: {
                        type: 'sunburst',
                        data: [{
                            name: 'Protocols',
                            children: [{
                                "name": "ipv4",
                                value: 5,
                                children: [{
                                    "name":"tcp",
                                    value: 5,

                                }]
                            }]
                        }]
                    }
                }
            }
        }
    }
</script>

<style scoped>

</style>
