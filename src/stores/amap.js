import AMapLoader from '@amap/amap-jsapi-loader';

const install = (Vue) => {
  AMapLoader.load({
    key: "0a2974fda0aad52f9162df790e66a8c7", // key
    plugins: ["AMap.Geocoder",'Map3D'], // 插件
    version:'2.0',
    Loca:{                // 是否加载 Loca， 缺省不加载
      "version": '2.0.0'  // Loca 版本，缺省 1.3.2
    },
  }).then((amap,b)=>{
    Vue.prototype.$Amap = amap
    window.Amap = amap
  }).catch(err=>{
    throw(new Error('加载高德地图失败：'+err,))
  })
}

export default {
  install,
}