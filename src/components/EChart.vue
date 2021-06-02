<template>
  <!--圖表展示在這個div中-->
  <div style="height: 100%" ref="echart">
    echart
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  //接收父類兩個資料 1、chartData (series資料 + x座標係數據）2、isAxisChart （是否有x坐標系，如果false，那麼上面的xData就為空）
  props: {
    chartData: {
      type: Object,
      default() {
        return {
          xData: [],
          series: []
        }
      }
    },
    isAxisChart: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    //計算 選擇是有x軸 還是沒有
    options() {
      return this.isAxisChart ? this.axisOption : this.normalOption
    },
    //用於下面的resize 改變圖表尺寸，在容器大小發生改變時需要手動調用
    isCollapse() {
      return this.$store.state.tab.isCollapse
    }
  },
  watch: {
    //監聽chartData數據
    chartData: {
      handler: function() {
        this.initChart()
      },
      deep: true
    },
    //監聽isCollapse 因為頭部水準擴展是一個動畫需要時間，所以這裡延遲300毫秒
    isCollapse() {
      setTimeout(() => {
        this.resizeChart()
      }, 300)
    }
  },
  data() {
    //在資料中有些資料在資料件中是寫死的
    return {
      echart: null,
      axisOption: {
        legend: {
          textStyle: {
            color: '#333'
          }
        },
        grid: {
          left: '20%'
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          data: [],
          axisLine: {
            lineStyle: {
              color: '#17b3a3'
            }
          },
          axisLabel: {
            color: '#333'
          }
        },
        yAxis: [
          {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: '#17b3a3'
              }
            }
          }
        ],
        color: [
          '#2ec7c9',
          '#b6a2de',
          '#5ab1ef',
          '#ffb980',
          '#d87a80',
          '#8d98b3',
          '#e5cf0d',
          '#97b552',
          '#95706d',
          '#dc69aa',
          '#07a2a4',
          '#9a7fd1',
          '#588dd5',
          '#f5994e',
          '#c05050',
          '#59678c',
          '#c9ab00',
          '#7eb00a',
          '#6f5553',
          '#c14089'
        ],
        series: []
      },
      normalOption: {
        tooltip: {
          trigger: 'item'
        },
        color: ['#0f78f4', '#dd536b', '#9462e5', '#a6a6a6', '#e1bb22', '#39c362', '#3ed1cf'],
        series: []
      }
    }
  },
  methods: {
    initChart() {
      //獲取處理好的資料
      this.initChartData()
      //獲取echart對象
      if (this.echart) {
        this.echart.setOption(this.options)
      } else {
        //通過refs獲取
        this.echart = echarts.init(this.$refs.echart)
        this.echart.setOption(this.options)
      }
    },
    //處理好資料
    initChartData() {
      if (this.isAxisChart) {
        this.axisOption.xAxis.data = this.chartData.xData
        this.axisOption.series = this.chartData.series
      } else {
        this.normalOption.series = this.chartData.series
      }
    },
    resizeChart() {
      this.echart ? this.echart.resize() : ''
    }
  },
  mounted() {
    //resize 改變圖表尺寸，在容器大小發生改變時需要手動調用（因為側邊欄是可以收縮的，所以這裡圖表根據是否收縮來改變圖表尺寸）
    window.addEventListener('resize', this.resizeChart)
  },
  //銷毀 防止記憶體洩漏
  destroyed() {
    window.removeEventListener('resize', this.resizeChart)
  }
}
</script>

<style lang="scss" scoped></style>

