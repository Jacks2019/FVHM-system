<template>
  <el-container class="whole-container">
    <el-header height="80px">
      <layer-header></layer-header>
    </el-header>

    <el-container>
      <el-aside width="300px">
        <layer-aside></layer-aside>
      </el-aside>

      <el-container>
        <div class="scroll-out">
          <el-scrollbar>
            <el-main>
              <router-view></router-view>
            </el-main>
            <!-- <el-footer>Footer</el-footer> -->
          </el-scrollbar>
        </div>
      </el-container>

    </el-container>
  </el-container>
</template>

<script setup>
import LayerHeader from '@/layers/header.vue';
import LayerAside from '@/layers/aside.vue';

// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/script-setup-2/active-rfcs/0000-script-setup.md
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
.el-header {
  position: fixed;
  top: 0;
  left: 0;
  background: white;
  width: 100%;
  z-index: 2000;
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.05);
}
.el-container {
  height: 100%;
  position: relative;
  overflow: hidden;
}
.scroll-out {
  margin: 10px 0;
  height: calc(100vh - 100px);
  width: 100%;
  overflow: hidden;
}
.el-page-header {
  padding-bottom: 20px;
}
</style>