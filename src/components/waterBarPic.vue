<template>
  <div class="home">
    <div class="home-top">
      <div class="home-top-title">阀门分布</div>
      <div>
        <el-date-picker
          v-model="currentYear"
          type="year"
          placeholder="选择年份"
          format="YYYY 年"
          @change="search"
          :disabled-date="disableDate"
        >
        </el-date-picker>
      </div>
    </div>
    <div class="home-body" id="water-bar"></div>
  </div>
</template>

<script setup>
  import { ref, onMounted, onUnmounted } from 'vue'
  import * as echarts from 'echarts'
  import { fetchWaterCostByYear } from '../../apis/2.0/home'
  import { mountedToArrPrototype, nameGenerator, replaceEach } from '../../mock'

  let citys = ref([])
  let consumption = ref([])
  let currentYear = ref(new Date())

  let myChart
  let BarPic = function (xValues, yValues) {
    mountedToArrPrototype()
    let chartDom = document.getElementById('water-bar')
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
        },
      ],
      series: [
        {
          name: currentYear.value.getFullYear() + '年度用水量',
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
    const res = await fetchWaterCostByYear({ year: currentYear.value.getFullYear() })
    if (res.code === '200') {
      citys.value = res.data.map(item => item.applicantName)
      consumption.value = res.data.map(item => item.volume)
    }
    BarPic(citys.value, consumption.value)
  }

  onMounted(async () => {
    search()
    // let res1 = await fetchWaterCostByYear({ year: 2021 })
    // let res2 = await fetchWaterCostByYear({ year: 2020 })
    // if (res1.code === '200') {
    //   for (let i = 0; i < res1.data.length; i++) {
    //     citys.value[0].push(res1.data[i].place)
    //     consumption.value[0].push(res1.data[i].volume)
    //   }
    // }
    // if (res2.code === '200') {
    //   for (let i = 0; i < res2.data.length; i++) {
    //     citys.value[1].push(res2.data[i].place)
    //     consumption.value[1].push(res2.data[i].volume)
    //   }
    // }
    // BarPic(citys.value[0], consumption.value[0])
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
