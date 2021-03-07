<template>
  <div>
    <el-page-header @back="goBack" title="返回" content="用户类型权限管理">
    </el-page-header>
    <div class="manage-item">
      <p>用户类型</p>
      <p class="describe">{{ username }}</p>
    </div>
    <el-transfer
      v-model="value"
      filterable
      filter-placeholder="搜素功能..."
      :props="{
        key: 'name',
        label: 'label'
      }"
      :titles="['不可用功能', '可用功能']"
      :data="data"
    />
  </div>
</template>

<script setup>
  import { ref, computed } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useStore } from 'vuex';
  import { funcListConfigs } from '../router';

  const router = useRouter();
  const route = useRoute();
  const data = ref([]);
  data.value = funcListConfigs;
  const value = ref([]);
  value.value = [];
  const goBack = () => {
    router.back();
  }
  const store = useStore();
  const username = computed(() => store.getters['user/name']);
  console.log(username);
</script>

<style lang="scss">
.manage-item {
  margin: 20px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 240px;
  font-size: 14px;

  .describe {
    color: rgb(107, 107, 107);
  }
}
.el-transfer {
  margin-top: 40px;
  .el-transfer-panel__list.is-filterable {
    height: 320px;
  }

  .el-transfer-panel__body {
    height: 367px; // 要比上面大 47px
  }
}

</style>