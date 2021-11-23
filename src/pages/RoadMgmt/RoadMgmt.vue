<template>
  <div class="p-page">
    <div class="p-header">
      <p class="page-name">道路管理</p> 
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <el-button class="addbutton" type="primary" icon="el-icon-plus" @click="addModal.open()">新增道路</el-button>
    </div>

      <el-table :data="townList" style="width: 100%" size="medium" stripe> 
        <el-table-column prop="road" label="道路名" width="200"> </el-table-column>
        <el-table-column prop="district" label="所属区县" width="200"> </el-table-column>
        <el-table-column prop="city" label="所属城市" min-width="200"> </el-table-column>
        <el-table-column fixed="right" label="操作" width="230">
          <template #default="scope">
            <el-button type="primary" @click="editModal.open(scope.row)">编辑</el-button>
            <el-button type="danger" @click="roadFunc.delete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    <div class="p-foot"></div>
  </div>
  <div class="p-bottom">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[20, 50, 100]"
      :page-size="perPage"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
  <a-modal v-model:visible="modalState" :title="modalTitle" style="font-weight: 500">
    <el-form :model="addForm" label-width="100px" :inline="false">
      <el-form-item label="道路名" required>
        <el-input v-model="addForm.name" style="width: 330px"></el-input>
      </el-form-item>
      <el-form-item label="所属区县" required>
        <el-cascader
          v-model="addForm.zoneId"
          :options="options"
          placeholder="选择地址"
          :show-all-levels="false"
          :props="{ emitPath: false, expandTrigger: 'hover', label: 'name', value: 'id' }"
        ></el-cascader>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary" @click="modal.submit()">保存</el-button>
      <el-button @click="modal.cancel()">取消</el-button>
    </template>
  </a-modal>
</template>

<script setup>
import {defineComponent, onMounted, ref} from 'vue'
import { fetchVpinformation} from "../../apis/3.0/vpinformation";
import {mountedToArrPrototype} from "../../mock";

let modalState = true
let input = ref('')
let tableData = ref([])
  const addForm = {
    name: '',
    zoneId: '',
  }

onMounted(async () => {
  mountedToArrPrototype()
  let res = await fetchVpinformation()
  if (res.code === '200') {
    tableData.value = res.data;
  }
})
const addModal = {
    open() {
      modalState = true
      //mode.value = 'add'
      addForm.name = ''
      addForm.zoneId = ''
      addForm.addr = ''
      // modal.value = addModal
    },
  }
</script>

<style>
.p-page {
  width: 100%;
  height: calc(100vh - 120px);
  /* overflow-y: scroll; */
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
#addbutton {
  position: absolute;
  top: 0px;
  left: 1020px;
  width: 100px;
  line-height:300%;
}
</style>
