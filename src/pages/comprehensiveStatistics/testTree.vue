<template>
  <div class="p-page">
      <div class="p-header">
      <p class="page-name">月度综合统计报表</p>
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
let data=ref([])
const load=async(tree, treeNode, resolve)=>{
  let r1=[],r2=[]
  if(tree.id==2){
    r1=[
        {
          id: 31,
          planVolume: '2016-05-01',
          name: 'wangxiaohu31',
          hasChildren: true ,
        },
        {
          id: 32,
          planVolume: '2016-05-01',
          name: 'wangxiaohu32',
        },
      ]
  }
  if(tree.id==31){
    r2=[
        {
          id: 33,
          planVolume: '2016-05-01',
          name: 'wangxiaohu33',
        },
        {
          id: 34,
          planVolume: '2016-05-01',
          name: 'wangxiaohu34',
        },
      ]
  }
  resolve([].concat(r1).concat(r2))
}
const search=async()=>{
  data.value=[
        {
          id: 1,
          planVolume: '2016-05-02',
          name: 'wangxiaohu2',
        },
        {
          id: 2,
          planVolume: '2016-05-04',
          name: 'wangxiaohu4',
          hasChildren: true ,
        },
        {
          id: 3,
          planVolume: '2016-05-01',
          name: 'wangxiaohu1',
          hasChildren: false ,
        },
        {
          id: 4,
          planVolume: '2016-05-03',
          name: 'wangxiaohu3',
        },
      ]
}
onMounted(async()=>{
  search()
})
</script>

<style lang="scss" scoped>
  .op-flex {
    display: flex;
    position: relative;
    top: 0px;
    right: -1000px;
    width: 150px;
    
  }
  .search-btn {
    display: flex;
  }
  
</style>
