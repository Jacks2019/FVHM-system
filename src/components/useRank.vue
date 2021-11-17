<template>
  <div class="wrapper" style="height: 100%">
    <div class="head">
      <div class="title">阀栓用水量排行</div>
      <div></div>
    </div>
    <div class="table">
      <el-table
        :data="tableData.slice(0, 20)"
        height="86%"
        style="width: 100%"
        stripe
        :row-style="{ height: '42px' }"
        :cell-style="{ padding: '0px', fontSize: '14px' }"
      >
        <el-table-column prop="applicantName" label="道路名称"> </el-table-column>
        <el-table-column prop="volume" width="160" label="用水量(万m³)"> </el-table-column>
      </el-table>
    </div>
  </div>
  <el-dialog title="监测阀栓信息" v-model="dialogVisible">
    <div class="myDialog" style="height: 45vh">
      <el-table
        :data="tableData"
        height="100%"
        border
        stripe
        style="width: 100%"
        :cell-style="{ padding: '0px', fontSize: '0.5em' }"
        :header-cell-style="{ height: '22px', padding: '2px', fontWeight: 'bold' }"
      >
        <el-table-column min-width="1" align="center" prop="well" label="道路名称"> </el-table-column>
        <!-- <el-table-column sortable min-width="2.5" align="center" prop="time" label="监测时间"> </el-table-column> -->
        <el-table-column sortable min-width="2" align="center" prop="consume" label="用水量(万m³)"> </el-table-column>
      </el-table>
    </div>
  </el-dialog>
</template>

<script setup>
  import { number } from 'echarts'
  import { ref, onMounted } from 'vue'
  // import { fetchCostRank } from '../../apis/2.0/home.js'
  // import { addAttrToEach, mountedToArrPrototype, nameGenerator } from '../../mock'
  let tableData = ref([])
  let dialogVisible = ref(false)

  // onMounted(async () => {
  //   mountedToArrPrototype()
  //   let res = await fetchCostRank({ year: new Date().getFullYear() })
  //   if (res.code === '200') {
  //     tableData.value = res.data;
  //   }
  // })
</script>

<style lang="scss" scoped>
  .wrapper {
    padding: 0 14px;
    .head {
      width: 100%;
      display: flex;
      justify-content: space-between;
      margin-bottom: 12px;
      .title {
        font-size: 22px;
        font-weight: 700;
      }
    }
  }
  .el-table-column {
    font-size: 10px;
  }
  #title {
    display: flex;
    height: 5%;
    justify-content: space-between;
  }
  .table {
    height: 95%;
    font-size: 0.5em;
  }
  .myDialog :deep() .el-table__body-wrapper {
    height: 90% !important;
  }
</style>
<style>
  .table .el-table__header thead th {
    background: rgb(239, 247, 253);
    color: rgba(33, 157, 237, 0.95);
    font-size: 17px;
    font-weight: 500;
  }
  .table .el-table__row .cell {
    font-size: 16px;
  }
</style>
