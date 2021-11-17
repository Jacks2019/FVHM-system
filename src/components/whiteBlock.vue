<template>
  <div class="block">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
  .block {
    width: 100%;
    height: 100%;
    padding: 16px;
    border-radius: 10px;
    background: white;
    border: 0.5px solid rgba($color: rgb(222, 222, 255), $alpha: 0.7);
    overflow: hidden;
    box-sizing: border-box;
  }
</style>
