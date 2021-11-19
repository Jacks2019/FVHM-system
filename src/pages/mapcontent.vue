<template>
    <div id="container" ></div>
</template>

<script>
import AMapLoader from '@amap/amap-jsapi-loader' // 引入高德地图
export default {
  data() {
    return {
      map: null
    }
  },
  mounted()
    {
      this.mapInit()
    },
  methods: {
    mapInit() {
      AMapLoader.load({
        "key": "0a2974fda0aad52f9162df790e66a8c7",   // 申请好的Web端开发者Key，首次调用 load 时必填
        "version": "2.0",   // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        "plugins": []  //插件列表
      }).then((AMap) => {
        this.map = new AMap.Map('container', {
          center: [116.397428, 39.90923],
          zoom: 13
        });
      }).catch(e => {
        console.log(e);
      })
    }
  }
}
</script>

<style>
#container{
  position: absolute;
  margin-top: -40px;
  left: 0;
  width: 100%;
  height:300px;
}
</style>