<template>
  <div id="container" ></div>
</template>

<script>
import MapLoader from '@/pages/Map/localMap.js';

export default {
  data () {
    return {
      map: null
    }
  },
  mounted () {
    let that = this
    MapLoader().then(AMap => {
      console.log('地图加载成功')
      that.map = new AMap.Map('container', {
        center: [117.000923, 36.675807],
        zoom: 11
      })
    }, e => {
      console.log('地图加载失败' ,e)
    })
  }
}
</script>

<style>
#container{
  position: absolute;
  margin-top: -40px;
  left: 0;
  width: 100%;
  height:100vw;
}
</style>