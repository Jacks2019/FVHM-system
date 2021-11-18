<template>
  <div class="home">
    <div class="home-top">
      <div class="home-top-title">消防栓分布</div>
    </div>
    <div class="home-body" id="water-line"></div>
  </div>
</template>

<script setup>
  import { ref, onMounted, onUnmounted } from 'vue'
  import * as echarts from 'echarts'
  import { fetchDis } from '../apis/2.0/home'
  import { mountedToArrPrototype, nameGenerator, replaceEach } from '../mock'

  let citys = ref([])
  let consumption = ref([])
  let currentYear = ref(new Date())

  let myChart
  let BarPic = function (xValues, yValues) {
    mountedToArrPrototype()
    let chartDom = document.getElementById('water-line')
    myChart = echarts.init(chartDom)
    let coloredY = []
    const colors = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F']
    for (let i = 0; i < yValues.length; i++) {
      let str = '#'
      let random = 0
      for (let j = 0; j < 6; j++) {
        random = parseInt(Math.random() * 16)
        str += colors[random]
      }
      coloredY.push({
        value: yValues[i],
        xvalue: xValues[i],
        itemStyle: { color: str },
      })
    }
    let option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
        },
      },
      grid: {
        top: '10%',
        left: '3%',
        right: '11%',
        bottom: '10%',
        containLabel: true,
      },
      xAxis: [
        {
          name: '道路',
          type: 'category',
          // data: xValues.replaceEach(nameGenerator),
          data: xValues,
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
          interval:1,
        },
      ],
      series: [
        {
          name: '分布数量',
          type: 'bar',
          data: coloredY,
          barWidth: 40,
        },
      ],
    }
    if (xValues.length > 8) {
      option.dataZoom = [
        {
          show: true,
          realtime: true,
          start: 0,
          filterMode: 'none',
          end: 30,
          bottom: '5%',
          height: 3,
          showDetail: false,
        },
        {
          type: 'inside',
          realtime: true,
          start: 0,
          end: 30,
          showDetail: false,
        },
      ]
    }
    myChart.setOption(option)
  }

  const disableDate = d => {
    return d.getFullYear() > new Date().getFullYear()
  }

  const search = async () => {
    const res = await fetchDis({ valveType: 2 })
    if (res.code === '200') {
      citys.value = res.data.map(item => item.roadName)
      consumption.value = res.data.map(item => item.valveCounts)
    }
    BarPic(citys.value, consumption.value)
  }

  onMounted(async () => {
    search()
  })
  onUnmounted(() => {
    if (myChart) {
      myChart.dispose()
    }
  })
</script>

<style lang="scss" scoped>
  .home {
    position: relative;
    top: -8px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    &-top {
      display: flex;
      justify-content: space-between;
      &-title {
        font-weight: 700;
        font-size: 22px;
      }
    }
    &-body {
      position: relative;
      flex-grow: 1;
      height: 330px;
      width: 100%;
    }
  }
</style>
