<template>
  <div class="p-page">
    <div class="p-header">
      <p class="page-name">报警管理</p>
      <el-input id="user" v-model="input" placeholder="请输入所属用户" />
    </div>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup() {
    return {
      input: ref(''),
    }
  },
})
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
  height: 100px;
  border: 1px solid #219ded0f;
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
</style>