<template>
  <div class="p-page">
    <div class="p-header">
      <p class="page-name">阀栓信息</p>
      <addr-select class="addrSelect"></addr-select>
      <el-col :span="8">
      <el-input class="device-id"  v-model="input1" placeholder="请输入阀栓编号"/>
      </el-col>
      <el-col :span="8">
      <el-input class="device-name" v-model="input2" placeholder="请输入阀栓名称"/>
      </el-col>
      <div class="button">
      <el-button v-model="search" type="primary">查询</el-button>
      <el-button type="info">重置</el-button>
      <el-button type="success">添加</el-button>
      <el-button type="primary">导出</el-button>
      </div>
    </div>
    <div class="test">
    <el-scrollbar class="data-chart">
      <el-table
          :data=tableData
          :header-cell-style="{background:'#EFF7FD', fontFamily:'Helvetica,Arial,sans-serif',fontSize:'17px',
          color:'#219DEDF2',fontWeight:500,'text-align':'center'}"
          :cell-style="{'text-align':'center'}"
          :row-style="{fontSize:'16px',color:'#606266',fontFamily:'Helvetica,Arial,sans-serif'}"
          style="width: 100%"
      >
        <el-table-column fixed="left" label="阀栓编号" prop="valveCode" width="120px"/>
        <el-table-column label="阀栓类型" prop="valveType" :formatter="typeFormate" width="120px"/>
        <el-table-column label="阀栓名称" prop="valveName" width="120px"/>
        <el-table-column label="所属道路" prop="roadName" width="200px"/>
        <el-table-column label="地址" prop="address" width="200px"/>
        <el-table-column label="阀栓状态" prop="status" :formatter="statusFormate" width="200px"/>
        <el-table-column label="阀栓设置时间" prop="createTime" width="200px"/>
        <el-table-column label="计量设备型号" prop="meterNum" width="200px"/>
        <el-table-column label="通讯编号" prop="phone" width="200px"/>
        <el-table-column fixed="right" label="操作" width="360">
          <template #default="scope">
            <el-button type="primary" @click="pageDetail">详情</el-button>
            <el-button type="warning">停用</el-button>
            <el-button>修改</el-button>
            <el-button type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-scrollbar>
    </div>
  </div>
</template>
<script setup>
import {defineComponent, onMounted, ref} from 'vue'
import { fetchVpinformation} from "./vpinformation";
import {mountedToArrPrototype} from "../../mock";
import AddrSelect from '@/pages/ValvePlugInformation/addrSelect.vue';
import { types,statuss } from '@/utils/transform.js'
import {router} from "../../router";

let input1 = ref('')
let input2 = ref('')
let options = ref([])
let tableData = ref([])
/* 阀栓代码与文本转换 */
const typeFormate = function (row){
  const target = types.find(i => i.value === row.valveType)
  return target.label;
}
const statusFormate = function (row){
  const targetStatus = statuss.find(i => i.value === row.status)
  return targetStatus.label;
}
/* 获取阀栓信息 */
onMounted(async () => {
  mountedToArrPrototype()
  let res = await fetchVpinformation()
  if (res.code === '200') {
    tableData.value = res.data;
  }
})
const pageDetail = function (){
  router.replace('/valve_plug_information/valveDetail');
}
</script>
<style>
.p-page {
  width: 100%;
  height: calc(100vh - 120px);
  overflow-y: hidden;
  overflow-x: hidden;
  margin: 0;
}

.p-header {
  background-color: #219ded0d;
  width: 100%;
  height: 100px;
  border: 1px solid #219ded0f;
}

.page-name {
  font-size: 20px;
  font-weight: 700;
  top: 35px;
  left: 20px;
  position: relative;
}

.addrSelect {
  position: relative;
  top: 3px;
  margin-left: -145px;
  width: 200px;
}

.device-id {
  position: relative;
  top: 3px;
  left: 500px;
}

.device-name {
  position: relative;
  top: 3px;
  left: 510px;
}
.button{
  position: relative;
  top: -37px;
  left: 950px;
}
.test{
  overflow-x: scroll;
}
.data-chart {
  position: relative;
  top: 10px;
  always: true;
  overflow-x: scroll;
}
</style>