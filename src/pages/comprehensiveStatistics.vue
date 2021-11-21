<template>
  <div class="p-page">
      <div class="p-header">
      <div class="home-top-title">月度综合统计报表</div>
      <div class="op-flex">
            <div>
              <el-date-picker
                v-model="searchTime"
                type="month"
                placeholder="选择某月"
                class="search"
                style="width: 200px"
                v-if="searchTimeType = '月'"
              ></el-date-picker>
            </div>
            <el-button type="primary" class="search-btn" @click="search">查询</el-button>
      </div>
      </div>
      <div class="p-body">
      <el-table
        :data="data"
        style="width: 100%"
        row-key="id"
        stripe
        lazy
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        :load="load"
      >
        <el-table-column prop="name" label="道路名称" width="170"></el-table-column>
        <el-table-column prop="planVolume" label="阀门用水量(万m³)" min-width="200"></el-table-column>
        <el-table-column prop="licenseVolume" label="消防栓用水量(万m³)" min-width="200"></el-table-column>
        <el-table-column prop="totalVolume" label="总用水量(万m³)" min-width="200"></el-table-column>
      </el-table>
    </div>
  </div>
  <div class="p-bottom">
    <!-- <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[20, 50, 100]"
      :page-size="num"
      layout="total, sizes, prev, pager, next, jumper"
      :total="allData.length"
    >
    </el-pagination> -->
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
let searchTime=ref(new Date())
let searchTimeType=ref('月')
</script>

<style lang="scss" scoped>
  .op-flex {
    display: flex;
    position: relative;
    top: -30px;
    right: -1030px;
    width: 150px;
    
  }
  .search-btn {
    display: flex;
  }
  
</style>
