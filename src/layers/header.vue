<template>
  <div class="header">
    <header>
      <img src='../assets/logo.png' alt='logo' />
      <p>水资源管理系统</p>
    </header>
  </div>
</template>

<script setup>
  import { useRouter, useRoute } from 'vue-router'

  const router = useRouter();
  
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
header {
  margin: 0 10px;
  display: flex;
  height: 80px;
  align-items: center;

  img {
    width: 32px;
    height: 32px;
    margin-right: 20px;
  }
}
</style>