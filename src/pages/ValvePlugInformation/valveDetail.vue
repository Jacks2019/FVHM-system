<template>
  <el-button  class="drawerButton" type="primary" style="margin-left: 16px" @click="drawer = true">
    详情
  </el-button>

  <el-drawer size="50%" :after-close="handleClose" v-model="drawer" title="I am the title" :with-header="false">
    <div class="drawerDetail" >
      <el-tabs class="alarm2Detail" type="border-card">
        <el-tab-pane label="基本信息">
          <basic-information></basic-information>
        </el-tab-pane>
        <el-tab-pane label="实况数据">
          <live-data></live-data>
        </el-tab-pane>
      </el-tabs>
    </div>
  </el-drawer>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ElMessageBox } from 'element-plus'
import BasicInformation from "./basicInformation.vue";
import LiveData from "./liveData.vue";
export default {
  components: {LiveData, BasicInformation},
  data() {
    let drawer = ref(false);
    const handleClose = (done) => {
      drawer = ref(true)
    }
    return {
      drawer,
      handleClose
    }
  },
}
</script>
<style>
.drawerButton{
  position: relative;
  right: 10px;
}
.drawerDetail{
  background-color: #F8F8F8;
  position: relative;
  top:80px;
  height: 100%;
  width: 100%;
}
.alarm2Detail{
  background-color: #F8F8F8;
  position: relative;
  top: 2%;
  left: 2%;
  height: 85%;
  width: 96%;
}

</style>