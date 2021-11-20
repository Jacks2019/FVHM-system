<template>
  <div class="p-page">
    <div class="p-header">
      <p class="page-name">阀栓信息</p>
      <el-input id="user" v-model="input" placeholder="请输入所属用户"/>
      <div id="address">
        <el-cascader
            v-model="value"
            placeholder="选择地址"
            :options="options"
            :props="{ expandTrigger: 'hover' }"
        ></el-cascader>
      </div>
      <el-input id="device-id" v-model="input" placeholder="请输入阀门编号"/>
      <el-input id="device-name" v-model="input" placeholder="请输入阀门名称"/>
      </div>
    </div>
</template>
<script>
import {defineComponent, ref} from 'vue'

export default defineComponent({
  setup() {
    return {
      input: ref(''),
    }
  },
})
</script>
<style>
.p-page {
  width: 100%;
  height: calc(100vh - 120px);
  overflow-y: hidden;
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

#user {
  position: relative;
  top: 3px;
  width: 160px;
  left: 120px;
}
#address {
  position: absolute;
  top: 50px;
  left: 310px;
  width: 200px;
}
#device-id{
  position: relative;
  top: -37px;
  width: 200px;
  left: 500px;
}
#device-name{
  position: relative;
  top: -77px;
  width: 200px;
  left: 710px;
}
</style>