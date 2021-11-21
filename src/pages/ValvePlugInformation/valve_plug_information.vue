<template>
  <div class="p-page">
    <div class="p-header">
      <p class="page-name">阀栓信息</p>
      <div id="address">
        <el-cascader
            v-model="value"
            placeholder="选择地址"
            :options="options"
            :props="{ expandTrigger: 'hover' }"
        ></el-cascader>
      </div>
      <el-input id="device-id" v-model="input" placeholder="请输入阀栓编号"/>
      <el-input id="device-name" v-model="search" placeholder="请输入阀栓名称"/>
      <div class="button">
      <el-button v-model="search" type="primary">查询</el-button>
      <el-button type="info">重置</el-button>
      <el-button type="success">添加</el-button>
      <el-button type="primary">导出</el-button>
      </div>
    </div>
    <div class="data-chart">
      <el-table
          :data=tableData
          :header-cell-style="{background:'#EFF7FD', fontFamily:'Helvetica,Arial,sans-serif',fontSize:'17px',
          color:'#219DEDF2',fontWeight:500,'text-align':'center'}"
          :row-style="{fontSize:'16px',color:'#606266',fontFamily:'Helvetica,Arial,sans-serif'}"
          style="width: 100%"
      >
        <el-table-column fixed="left" label="阀栓编号" prop="valveId" width="120px"/>
        <el-table-column label="阀栓类型" prop="type" width="120px"/>
        <el-table-column label="阀栓名称" prop="name" width="120px"/>
        <el-table-column label="所属道路" prop="user" width="200px"/>
        <el-table-column label="地址" prop="address" width="200px"/>
        <el-table-column label="阀栓状态" prop="status" width="200px"/>
        <el-table-column label="阀栓设置时间" prop="setTime" width="200px"/>
        <el-table-column label="计量设备型号" prop="countNum" width="200px"/>
        <el-table-column label="通讯编号" prop="callNum" width="200px"/>
        <el-table-column fixed="right" label="操作" width="360">
          <template #default="scope">
            <el-button type="primary">详情</el-button>
            <el-button type="warning">停用</el-button>
            <el-button>修改</el-button>
            <el-button type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script setup>
import {defineComponent, onMounted, ref} from 'vue'
import { fetchVpinformation} from "../../apis/3.0/vpinformation";
import {mountedToArrPrototype} from "../../mock";

let input = ref('')
let tableData = ref([])
onMounted(async () => {
  mountedToArrPrototype()
  let res = await fetchVpinformation({ year: new Date().getFullYear() })
  if (res.code === '200') {
    tableData.value = res.data;
  }
})

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

#address {
  position: absolute;
  top: 50px;
  left: 310px;
  width: 200px;
}

#device-id {
  position: relative;
  top: 3px;
  width: 200px;
  left: 500px;
}

#device-name {
  position: relative;
  top: -37px;
  width: 200px;
  left: 710px;
}
.button{
  position: relative;
  top: -77px;
  left: 950px;
}

.data-chart {
  position: relative;
  top: 10px;
}
</style>