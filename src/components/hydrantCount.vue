<template>
  <div id="wrapper">
    <div id="title">
      <span>消防栓数量</span>
    </div>
    <div class="content">
      <div class="sum">
        <div style="text-align: center">
          <!-- <span class="number">{{ counts.total }}</span> -->
          <span class="number">66</span>
          <span>个</span>
          <span class="explain middle">(安装总量)</span>
        </div>
      </div>
      <div class="finish">
        <div style="text-align: center">
          <!-- <span class="number">{{ counts.installedCounts }}</span> -->
          <span class="number">66</span>
          <span>个</span>
          <span class="explain middle">(已安装)</span>
        </div>
      </div>
      <div class="finish">
        <div style="text-align: center">
          <!-- <span class="number">{{ counts.unInstallCounts }}</span> -->
          <span class="number">66</span>
          <span>个</span>
          <span class="explain middle">(未安装)</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  // import { fetchInstalled } from '../../apis/statistics'

  const counts = ref({
    total: 0,
    installedCounts: 0,
    unInstallCounts: 0,
  })

  // onMounted(async () => {
  //   const res = await fetchInstalled()
  //   console.log('message', res.message)
  //   if (res.code === '200') {
  //     counts.value = res.data
  //   }
  // })
</script>

<style lang="scss" scoped>
  .content {
    position: relative;
    top:10px;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 16px;
  }
  .middle {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .number {
    font-size: 24px;
    color: #015293;
    font-weight: bold;
  }
  .explain {
    color: rgba(33, 157, 237, 0.95);
    font-size: 16px;
  }
  #wrapper {
    height: 100%;
    width: 100%;
  }
  #title {
    color: rgba(0, 0, 0, 0.9);
    /* background-color: #015293; */
    text-align: center;
    font-size: 22px;
    font-weight: 700;
    width: 100%;
  }
  .sum,
  .finish {
    width: 100%;
    margin-top: 15px;
    background-color: rgba($color: #409eff, $alpha: 0.1);
    width: 90%;
    height: 7vh;
  }
</style>
