<template>
  <div class="p-page">
    <div class="p-header">
      <p class="page-name">报警管理</p>
      <el-input id="user" placeholder="请输入所属用户" />
      <div id="choosestates">
      <el-select v-model="searchState" placeholder="请选择报警状态">
        <el-option v-for="item in states" :key="item" :value="item">{{item}}</el-option>
      </el-select>

      <div id="choosedate">
      <el-date-picker
              v-model="selectTime"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              class="search"
              style="width: 500px"
            >
      </el-date-picker>
      </div>
      </div>
        <div id="button">
        <el-button type="primary" class="search-btn" @click="search">查询</el-button> <br>
        <el-button class="reset-btn" @click="reset">重置</el-button> <br>
        <el-button type="primary" class="export-btn" @click="exportCSV">导出</el-button>
        </div>
      </div>
    <el-table :data="data" style="width: 100%" stripe>
        <el-table-column prop="warnId" label="报警编号" width="120"> </el-table-column>
        <el-table-column prop="deviceId" label="设备编号" min-width> </el-table-column>
        <el-table-column prop="road" label="所属道路" min-width> </el-table-column>
        <el-table-column prop="warnType" label="报警类型" width="150">
          <template #default="scope">
            {{ ['水量超额报警', '其他报警'][scope.row.warnType] }}
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="120">
          <template #default="scope">
            {{ states[scope.row.status] }}
          </template>
        </el-table-column>
        <el-table-column prop="warnTime" label="报警时间" width="200"> </el-table-column>
        <el-table-column label="操作" width="200">
          <template #default="scope">
            <el-button type="success" v-if="scope.row.status == 1" @click="handleStatus(scope.row)">
              确认已处理
            </el-button>
            <el-button type="warning" v-if="scope.row.status == 0" @click="handleStatus(scope.row)">
              取消已处理
            </el-button>
          </template>
        </el-table-column>             
      </el-table>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue' 

export default defineComponent({
  setup() {
    return {
      input: ref(''),
      states : ref(['已处理', '未处理']),
      searchState : ''
    }
  },
})
let data = ref([])
data.value = [
    {
      id: 114284,
      name: '生候',
      well: 114285,
      type: '非生候决商',
      town: '上海市',
      village: '铁山区',
      time: '2021-04-13 21:30:06',
      status: '已恢复',
    },
  ]
</script>
<style>
.p-page{
  width: 100%;
  height: calc(100vh - 120px);
  overflow-y: hidden;
  margin: 0;
}
.p-header{
  background-color: #219ded0d;
  width: 100%;
  height: 300px;
  border: 100px solid #219ded0f;
}
.page-name{
  position: relative;
  font-size: 20px;
  font-weight: 700;
  top: 35px;
  left: 20px;
}
#user{
  position: relative;
  width: 130px;
  left: 120px;
}
#choosestates {
  position: absolute;
  top: 47px;
  left: 280px;
  width: 200px;
}
#choosedate {
  position: absolute;
  top: 0px;
  left: 210px;
  width: 100px;
}
#button {
  position: absolute;
  top: 15px;
  left: 1020px;
  width: 100px;
  line-height:300%;
}
</style>
