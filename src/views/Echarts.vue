<template>
  <div class="Echarts">
<!--    <div id="main" style="width: 600px;height:400px;"></div>-->
    <div id="zhe" style="width: 600px;height:400px;"></div>
  </div>
</template>

<script>
export default {
  name: 'Echarts',
  data() {
    return {
      TestName:'苏轼频次统计'
    }
  },
  methods:{

    myEcharts(){
      var _this=this
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById('main'));

      // 指定图表的配置项和数据
      var option = {
        title: {
          text: _this.TestName
        },
        tooltip: {},
        legend: {
          data:['次数']
        },
        xAxis: {
          data: ["眉山","开封","杭州","湖州","徐州","密州","黄州","海南","常州"]
        },
        yAxis: {},
        series: [{
          name: '次数',
          type: 'bar',
          data: [4, 3, 2, 2, 1, 1,1,1,1]
        }]
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    myEcharts2(){
      var _this=this
      // 基于准备好的dom，初始化echarts实例
      var myChart2 = this.$echarts.init(document.getElementById('zhe'));

      // 指定图表的配置项和数据
      var option1 = {
        title: {
          text: '苏轼迁徙指数折线图'
        },
        legend: {
          data:['次数']
        },
        xAxis: {
          name:'年龄',
          type: 'category',
          data: ['1', '19', '20', '22', '24', '29', '34','37','43','43','47','48','52','57','60']
        },
        yAxis: {
          type: 'value',
          name:'迁徙指数'
        },
        series: [{

          data: [527.34, 527.34, 527.34, 0.00, 527.34, 527.34, 272.81, 220.41, 120.54, 178.70, 0.00, 179.04, 352.36, 299.82, 375.18, 251.13, 671.20],
          type: 'line'
        }]
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart2.setOption(option1);
    }
  },
  mounted() {
    this.myEcharts2();
  }
}
</script>

<style>

</style>
