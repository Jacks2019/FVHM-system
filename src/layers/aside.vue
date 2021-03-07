<template>
  <div class="scroll-out">
    <el-scrollbar>
      <el-menu :default-openeds="menuExpandedConfigs" router>
        <template v-for="config in menuConfigs">

          <el-submenu
            v-if="config.children && config.children.length > 0"
            :index="config.name"
            :key="config.name"
          >
            <template #title @click="say">
              <i v-if="config.icon" :class="config.icon"></i>
              {{ config.label }}
            </template>
            <el-menu-item
              v-for="con in config.children"
              :index="con.index"
              :key="con.name"
            >{{ con.label }}</el-menu-item>
          </el-submenu>

          <el-menu-item v-else :index="config.index" :key="config.name">
            <i v-if="config.icon" :class="config.icon"></i>
            {{ config.label }}
          </el-menu-item>

        </template>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup>
  import { menuConfigs } from '@/router';
  import { menuExpandedConfigs } from '@/router';

  const say = () => {
    console.log('sasa')
  };
  console.log(menuExpandedConfigs);
</script>

<style lang="scss" scoped>
</style>