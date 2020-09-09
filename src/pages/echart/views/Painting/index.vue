<template>
  <div class="index">
    <div id="main" style="width: 600px;height:400px;"></div>
  </div>
</template>

<script>
  // import data from "./data";
  import data from "../../algorithm/recursion";
  export default {
    mounted() {
      var myChart = this.$echarts.init(document.getElementById('main'));
      myChart.showLoading();
      setTimeout(()=>{
        myChart.hideLoading();
      },2000)


      this.$echarts.util.each(data.children, function (datum, index) {
        index % 2 === 0 && (datum.collapsed = true);
      });

      myChart.setOption( {
        tooltip: {
          trigger: 'item',
          triggerOn: 'mousemove'
        },
        series: [
          {
            type: 'tree',
            roam:true,
            data: [data],

            top: '1%',
            left: '7%',
            bottom: '1%',
            right: '20%',

            symbolSize: 7,

            label: {
              position: 'left',
              verticalAlign: 'middle',
              align: 'right',
              fontSize: 9
            },

            leaves: {
              label: {
                position: 'right',
                verticalAlign: 'middle',
                align: 'left'
              }
            },

            expandAndCollapse: true,
            animationDuration: 550,
            animationDurationUpdate: 750
          }
        ]
      });
    }
  }
</script>

<style lang="less" scoped>

</style>
