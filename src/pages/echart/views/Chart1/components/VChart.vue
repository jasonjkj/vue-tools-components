<template>
	<div class="VChart" ref="chartContainer"></div>
</template>

<script>
    import echarts from 'echarts'

    export default {
        name: "VChart",
        props: {
            options: {
                type: Object,
                // 对象或数组默认值必须从一个工厂函数获取
                default: function () {
                    return {}
                }
            },
            styles: {
                type: Object,
                // 对象或数组默认值必须从一个工厂函数获取
                default: function () {
                    return {}
                }
            },
        },
        created: function () {

        },
        mounted() {
            this.$nextTick(() => {
                this.initChart();
            })
        },
        data() {
            return {
                chart: null,
            }
        },
        methods: {
            refresh() {
                // this.isShow=false;

            },
            initChart() {
                this.$el.style.width = (this.styles.width || 800) + 'px';
                this.$el.style.height = (this.styles.height || 400) + 'px';
                this.chart = echarts.init(this.$el);
                this.setOptions()
            },
            setOptions() {
                //https://echarts.apache.org/zh/api.html#echartsInstance.setOption
                this.chart.setOption(this.options);
            }
        },
        computed: {},
        watch: {
            options: {
                handler(n, o) {
                    this.setOptions()
                },
                deep: true,
            }
        },

    }
</script>
<style scoped>

</style>
