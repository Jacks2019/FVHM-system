<template>
  <el-page-header @back="goBack" title="返回" content="用户类型管理"/>
  <el-table
      :data="tableData"
      stripe
      style="width: 100%">
    <el-table-column
        prop="name"
        label="用户类型"
        width="800px"
    >

    </el-table-column>
    <el-table-column
        width="500px"
    >
      <template #header>
        <el-button plain @click="goManage" type="primary" size="small">新增类型</el-button>
      </template>
      <template #default>
        <el-button type="text" size="small">新增账号</el-button>
        <el-button type="text" size="small">查找账号</el-button>
        <el-button @click="open" type="text" size="small">权限管理</el-button>
        <el-button type="text" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import {ElMessageBox} from 'element-plus';
import {useRouter, useRoute} from 'vue-router';
import {h} from 'vue';

const tableData = [
  {
    name: "用户类型A",
  }
]
const router = useRouter();
const open = () => {
  router.push('/manage/edit')
}
const goBack = () => {
  router.back();
}
</script>

<style lang="scss" scoped>
p {
  color: red;
}
</style>