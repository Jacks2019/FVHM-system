<template>
  <div class="p-page2">
    <div class="p2-header">
      <p class="page2-name">报警管理</p>
      <addr-select class="addrSelect2"></addr-select>
      <el-col :span="8">
      <el-input class="roadName" v-model="input" placeholder="请输入道路名称"/>
      </el-col>
      <div class="vblock">
        <el-date-picker
            v-model="value1"
            type="datetimerange"
            range-separator="至"
            start-placeholder="Start date"
            end-placeholder="End date"
        >
        </el-date-picker>
      </div>
      <div class="button2">
        <el-button v-model="search" type="primary">查询</el-button>
        <el-button type="info">重置</el-button>
        <el-button type="primary">导出</el-button>
      </div>
    </div>
    <el-scrollbar class="data-chart2">
        <el-table
            :data=tableData
            :header-cell-style="{background:'#EFF7FD', fontFamily:'Helvetica,Arial,sans-serif',fontSize:'17px',
          color:'#219DEDF2',fontWeight:500,'text-align':'center'}"
            :cell-style="{'text-align':'center'}"
            :row-style="{fontSize:'16px',color:'#606266',fontFamily:'Helvetica,Arial,sans-serif'}"
            style="width: 100%"
        >
          <el-table-column fixed="left" label="报警编号" prop="warnId" width="120px"/>
          <el-table-column fixed="left"  label="设备编号" prop="valveId" width="120px"/>
          <el-table-column fixed="left"  label="阀栓名称" prop="valveName" width="120px"/>
          <el-table-column label="所属道路" prop="roadName" width="200px"/>
          <el-table-column label="报警类型" prop="warnType" :formatter="typeFormate" width="200px"/>
          <el-table-column label="状态" prop="status" :formatter="statusFormate" width="200px"/>
          <el-table-column label="报警时间" prop="warnTime" width="200px"/>
          <el-table-column fixed="right" label="操作" width="360">
            <template #default="scope">
              <el-button type="primary">详情</el-button>
              <el-button type="warning">停用</el-button>
              <el-button>修改</el-button>
              <el-button type="danger">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
    </el-scrollbar>
  </div>
</template>
<script setup>
import {defineComponent, onMounted, ref,toRefs,reactive} from 'vue'
import { fetchAlarmManage } from "@/pages/AlarmMgmt/alarmManage.js";
import {mountedToArrPrototype} from "../../mock";
import AddrSelect from '@/pages/ValvePlugInformation/addrSelect.vue'
import { alarmType,alarmStatus } from "../../utils/transform";

let input = ref('')
let options = ref([])
let tableData = ref([])

const typeFormate = function (row){
  const targetType = alarmType.find(i => i.value === row.warnType)
  return targetType.label;
}
const statusFormate = function (row){
  const targetStatus = alarmStatus.find(i => i.value === row.status)
  return targetStatus.label;
}
onMounted(async () => {
  mountedToArrPrototype()
  let res = await fetchAlarmManage()
  if (res.code === '200') {
    tableData.value = res.data;
  }
})

</script>
<style>
.p-page2 {
  width: 100%;
  height: calc(100vh - 120px);
  overflow-y: scroll;
  overflow-x: hidden;
  margin: 0;
}

.p2-header {
  background-color: #219ded0d;
  width: 100%;
  height: 100px;
  border: 1px solid #219ded0f;
}
.drawer{
  background-color: #969696;
}
.page2-name {
  font-size: 20px;
  font-weight: 700;
  top: 35px;
  left: 20px;
  position: relative;
}

.addrSelect2 {
  position: relative;
  top: 3px;
  margin-left: -25px;
}

.roadName {
  position: relative;
  top: 3px;
  left: 410px;
}
.vblock{
  position: relative;
  top: -37px;
  left: 625px;
}
.button2{
  position: relative;
  margin-top: -77px;
  margin-left: 1035px;
  width: 260px;
}

.data-chart2 {
  position: relative;
  top: 10px;
  overflow-y: hidden;
}
</style>