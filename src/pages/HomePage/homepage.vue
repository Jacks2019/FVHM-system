<template>
  <div class="water">
    <el-row :gutter="20" style="margin-top: -40px">
      <el-col :span="4" style="padding: 10px"
        ><white-block style="width:200 px;height:310px;"><wells-count></wells-count></white-block
      ></el-col>
      <el-col :span="4" style="padding: 10px"
        ><white-block style="width:200 px;height:310px;"><hydrant-count></hydrant-count></white-block
      ></el-col>
      <el-col :span="14" style="padding: 10px; height:330px;"
        ><white-block><water-consume></water-consume></white-block
      ></el-col>
    </el-row>
    <el-row :gutter="10" style="margin-top: -14px">
      <el-col :span="7" style="padding: 10px; height: 385px"
        ><white-block><use-rank></use-rank></white-block
      ></el-col>
      <el-col :span="8" style="padding: 10px; height:385px"
        ><white-block><valve-distribution></valve-distribution></white-block
      ></el-col>
      <el-col :span="8" style="padding: 10px; height:385px"
        ><white-block><hydrant-distribution></hydrant-distribution></white-block
      ></el-col>
    </el-row>
  </div>
</template>

<script setup>
  import wellsCount from '../../components/wellsCount.vue'
  import hydrantCount from '../../components/hydrantCount.vue'
  import waterConsume from '../../components/waterConsume.vue'
  import useRank from '../../components/useRank.vue'
  import valveDistribution from '../../components/waterBarPic.vue'//阀门分布
  import hydrantDistribution from '../../components/waterLinePic.vue'//消防栓分布
  import whiteBlock from '../../components/whiteBlock.vue'
</script>

<style lang="scss" scoped>
.water {
    height: calc(100vh - 100px);
    width: 100%;
    padding-top: 10px;
  }
</style>