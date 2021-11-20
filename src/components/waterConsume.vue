<template>
  <div class="home">
    <div class="home-top">
      <div class="home-top-title">阀栓用水量</div>
      <div>
        <el-date-picker
          v-model="currentYear"
          type="year"
          placeholder="选择年份"
          format="YYYY 年"
          @change="search"
          :disabled-date="disableDate"
        ></el-date-picker>
      </div>
    </div>
    <div class="home-body" id="water-consume"></div>
  </div>
</template>

<script setup>
  import { ref, onMounted, onUnmounted } from 'vue'
  import * as echarts from 'echarts'
  import { totalconsumedofyear } from '../apis/2.0/home'
  let counts = ref([])
  let currentYear = ref(new Date())
  let myChart
  let linePic = function (yValues) {
    const lineDom = document.getElementById('water-consume')
    myChart = echarts.init(lineDom)
    let option
    option = {
      tooltip: {
        trigger: 'axis',
      },
      xAxis: {
        type: 'category',
        data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((_, idx) => idx + 1 + '月'),
      },
      yAxis: {
        type: 'value',
      },
      legend: {
        //data: [yValues[0].name, yValues[1].name, yValues[2].name],
        data: ['阀门', '消防栓'],
      },
      series: [
        {
          name: '阀门',
          data: yValues[0].value,
          type: 'line',
        },
        {
          name: '消防栓',
          data: yValues[1].value,
          type: 'line',
        },
      ],
      grid: {
        top: 50,
        left: '3%',
        right: '10%',
        bottom: 80,
        containLabel: true,
      },
    }
    myChart.setOption(option)
  }

  const disableDate = d => {
    return d.getFullYear() > new Date().getFullYear()
  }

  const search = async () => {
    const current = currentYear.value.getFullYear()
    const res1 = await totalconsumedofyear({ 
      year: current ,
      valveType: 1,
    })
    const res2 = await totalconsumedofyear({ 
      year: current ,
      valveType: 2,
    })
    let r1 = []
    let r2 = []
    if (res1.code === '200' && res2.code === '200') {
      let g = []
      r1 = res1.data.map(item => item.volume)
      r2 = res2.data.map(item => item.volume)
      const r = [
        {
          name: current + ' 年',
          value: r1,
        },
        {
          name: current  + ' 年',
          value: r2,
        },
      ]
      counts.value = r
      linePic(counts.value)
    }
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
    top:-11px;
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
<style>
  .home-top .el-input__inner {
    color: rgb(1, 82, 47);
    font-weight: 700;
    font-size: 14px;
  }
</style>
