<template>
  <div >
    <title>界首市阀栓管理系统</title>
    <el-container class="whole-container">
      <el-header height="80px">
        <layer-header></layer-header>
      </el-header>

      <el-container class="center-container">
        <el-aside width="200px">
          <layer-aside></layer-aside>
        </el-aside>

        <el-container>
          <div class="scroll-out">
            <el-scrollbar>
              <el-main>
                <router-view></router-view>
              </el-main>
            </el-scrollbar>
          </div>
        </el-container>

      </el-container>

    </el-container>
  </div>
</template>

<script setup>
import LayerHeader from '@/layers/header.vue';
import LayerAside from '@/layers/aside.vue';
import MapContent from '@/pages/Map/mapcontent.vue'
import MapDetail from '@/pages/Map/mapdetail.vue'
import MapLoader from '@/pages/Map/localMap.js'

</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 80px;
  height: calc(100vh - 80px);
  position: relative;
  box-sizing: border-box;
}
.whole-container{
  height: 100%;
  overflow-y: hidden;
}
.el-header {
  position: fixed;
  top: 0;
  left: 0;
  background-color: #F4F4F4;
  width: 100%;
  z-index: 2000;
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.05);
}
.el-main{
  background-color: #F8F8F8;
}
.scroll-out {
  height: calc(100vh - 80px);
  width: 100%;
  overflow: hidden;
}

.el-page-header {
  padding-bottom: 20px;

}
</style>