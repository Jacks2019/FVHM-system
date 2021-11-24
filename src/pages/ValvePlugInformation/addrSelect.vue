<template>
  <span>
    <el-cascader
        clearable
        :model-value="zoneId"
        :options="options"
        placeholder="选择地址"
        :show-all-levels="false"
        :props="{ emitPath: false, expandTrigger: 'hover', label: 'name', value: 'id' }"
        @change="changeResult"
    ></el-cascader>
  </span>
</template>

<script>
// import { store } from '@/stores'
// export default {
//   props: ['modelValue'],
//   emits: ['update:modelValue'],
//   computed: {
//     options() {
//       console.log(store.getters['utils/addressOptions'])
//       return store.getters['utils/addressOptions']
//     },
//     zoneId() {
//       // 读取
//       if (this.modelValue?.isComputed) {
//         return undefined
//       }
//       return this.modelValue?.zoneId
//     },
//   },
//   methods: {
//     // 存储
//     changeResult(value) {
//       if (!value) {
//         this.$emit('update:modelValue', undefined)
//         return
//       }
//       const obj = {
//         zoneType: value.isArea ? 1 : 2,
//         zoneId: value.isArea ? value.id : value,
//         isComputed: true,
//       }
//       console.log('change', obj, value)
//       this.$emit('update:modelValue', obj)
//     },
//   },
// }
</script>
