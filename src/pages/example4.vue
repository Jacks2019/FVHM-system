<template>
  <div class="layer-out">
    <div id="map-container" class="layer"> </div>
    <div id="panel"></div>
    <div class="layer box" point-over:none>
      <index-box v-show="isLoaded"></index-box>
      <display-box :data="data" v-show="isLoaded"></display-box>
      <warning-table></warning-table>
      <hover-modal></hover-modal>
      <map-tip></map-tip>
      <el-radio-group
        v-model="radio"
        size="medium"
        style="position: absolute; bottom: 5px; right: 10px; pointer-events: auto; padding-right: 240px"
        @change="changeLayer"
      >
        <el-radio-button label="标准地图"></el-radio-button>
        <el-radio-button label="卫星地图"></el-radio-button>
      </el-radio-group>
      <div class="distancetool">
        <div class="header"
          ><b>测距模式</b>
          <el-switch
            v-model="distancemode"
            @change="changeMode"
            style="position: absolute; right: 15px; margin-top: 2px"
          >
          </el-switch>
        </div>
        <div class="divider" v-show="distancemode"></div>
        <div class="content" v-show="distancemode">
          <div class="clickfirst" v-show="!clicked">请点击测距起点</div>
          <div class="clicksecond" v-if="clicked && !showDistance">
            <div>测距起点：{{ `${clicklocation[2]}` }}</div>
            <div style="margin-top: 10px">请点击测距终点</div>
          </div>
          <div class="clickthird" v-if="clicked && showDistance">
            <div>{{ `${clicklocation[2]}  ` }}至{{ `  ${clicklocation[5]}` }}</div>
            <div style="margin-top: 10px">距离为 {{ distance }} 千米</div>
            <div style="margin-top: 10px">请点击新的测距起点</div>
          </div>
        </div>
      </div>
      <el-radio-group
        v-model="type"
        size="medium"
        style="position: absolute; bottom: 5px; right: 10px; pointer-events: auto"
        @change="changeType"
      >
        <el-radio-button label="综合"></el-radio-button>
        <el-radio-button label="阀门"></el-radio-button>
        <el-radio-button label="消防栓"></el-radio-button>
        <el-radio-button label="导航"></el-radio-button>
      </el-radio-group>
    </div>
  </div>
</template>


<script setup>
  import AMapLoader from '@amap/amap-jsapi-loader'
  import { onMounted, onUnmounted, reactive } from 'vue'
  import { ref } from 'vue'
  // import { fetchRealTime } from '@/apis/realtime.js'
  // import { fetchAlertApplicant } from '../apis/3.0/map.js'
  // import DisplayBox from '@/components/displayBox.vue'
  // import IndexBox from '@/components/indexBox.vue'
  // import { fetchWellInfoByConfig } from '../apis/2.0/well'
  // import MapTip from '../components/MapTip.vue'
  // import { fetchMonitorByConfig } from '../apis/2.0/monitor'
  // import warningPoints from '../assets/warningpoints.png'
  // import normalPoints from '../assets/normalpoints.png'
  // import offlinePoints from '../assets/offlinepoints.png'
  // import uninstalledPoints from '../assets/uninstalledpoints.png'
  // import { getHoverContext } from '@/components/hoverContext.js'
  // import { getWarningContext } from '@/components/warningContext.js'
  // import hoverModal from '@/components/hoverModal.vue'
  // import warningTable from '@/components/warningTable.vue'
  // import * as echarts from 'echarts'
  // import 'echarts-extension-amap'

  const echarts = globalThis.echarts
  console.log('type', typeof echarts)
  let chart
  var normal = ref([])
  var hydrant = ref([])
  var offline = ref([])
  var warning = ref([])
  var uninstalled = ref([])
  var hydrantShow = ref([])
  var normalShow = ref([])
  var offlineShow = ref([])
  var warningShow = ref([])
  var uninstalledShow = ref([])
  var warningItem = ref()
  var wellData = ref([])
  var radio = ref()
  var clicklocation = ref([])
  var distancemode = ref(false)
  var clicked = ref(false)
  var showDistance = ref(false)
  var distance = ref()
  distance.value = undefined
  clicklocation.value = []
  radio.value = '标准地图'
  wellData.value = []
  normal.value = []
  hydrant.value = []
  offline.value = []
  warning.value = []
  uninstalled.value = []
  normalShow.value = []
  hydrantShow.value = []
  offlineShow.value = []
  warningShow.value = []
  uninstalledShow.value = []

  var showStates = ref([])
  showStates.value = [false, false, false, false, false, false]
  let timer = null
  const isLoaded = ref(false)
  let pointsData = ref([])
  pointsData.value = []
  var satelliteObject = ref()
  satelliteObject.value = null
  
  function updateNumbers() {
    data.numbers.onlineNumber = normal.value.length + offline.value.length + warning.value.length
    data.numbers.hydrantNumber = hydrant.value.length
    data.numbers.offlineNumber = uninstalled.value.length
    data.numbers.runningNumber = normal.value.length + warning.value.length
    data.numbers.shutNumber = offline.value.length
    data.numbers.warningNumber = warning.value.length
    data.numbers.normalNumber = normal.value.length
  }

  function GetDistance(lat1, lng1, lat2, lng2) {
    var radLat1 = (lat1 * Math.PI) / 180.0
    var radLat2 = (lat2 * Math.PI) / 180.0
    var a = radLat1 - radLat2
    var b = (lng1 * Math.PI) / 180.0 - (lng2 * Math.PI) / 180.0
    var s =
      2 *
      Math.asin(
        Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)),
      )
    s = s * 6378.137 // EARTH_RADIUS;
    s = Math.round(s * 10000) / 10000
    return s
  }

  function changeLayer(e) {
    if (e == '标准地图') {
      satelliteObject.value.hide()
    } else {
      satelliteObject.value.show()
    }
  }

  function changeWell() {
    normalShow.value = normal.value
    hydrantShow.value = []
    offlineShow.value = []
    uninstalledShow.value = []
    warningShow.value = []
  }

  function changeHydrant() {
    normalShow.value = []
    hydrantShow.value = hydrant.value
    offlineShow.value = []
    uninstalledShow.value = []
    warningShow.value = []
  }

  function changeAll() {
    normalShow.value = normal.value
    hydrantShow.value = hydrant.value
    warningShow.value = warning.value
    offlineShow.value = offline.value
    uninstalledShow.value = uninstalled.value
  }

  let setType = ref('综合')
  function changeType(e) {
    if (e == '阀门') {
      setType.value = '阀门'
      changeWell()
      setWell()
    } else if (e == '消防栓') {
      setType.value = '消防栓'
      console.log(normalShow.value)
      changeHydrant()
      setWell()
    } else if(e=='综合') {
      setType.value = '综合'
      changeAll()
      setWell()
    }else{
      setNav()
    }
  }
  let type = ref('综合')

  function changeMode(e) {
    //console.log(e)
    clicklocation.value = []
    clicked.value = false
  }

  const onlineDisplayFunction = (isInstalled, isToShow) => {
    var i
    for (i = 0; i < 6; i++) {
      showStates.value[i] = false
    }
    if (isInstalled === true) {
      showStates.value[0] = isToShow
    } else {
      showStates.value[1] = isToShow
    }
    if (isToShow === false) {
      //全显示
      normalShow.value = normal.value
      hydrantShow.value = hydrant.value
      warningShow.value = warning.value
      offlineShow.value = offline.value
      uninstalledShow.value = uninstalled.value
    } else {
      //仅显示
      if (isInstalled === true) {
        normalShow.value = normal.value
        hydrantShow.value = hydrant.value
        warningShow.value = warning.value
        offlineShow.value = offline.value
        uninstalledShow.value = []
      } else {
        normalShow.value = []
        hydrantShow.value = []
        warningShow.value = []
        offlineShow.value = []
        uninstalledShow.value = uninstalled.value
      }
    }
    setWell()
  }

  const runDisplayFunction = (isRunning, isToShow) => {
    var i
    for (i = 0; i < 6; i++) {
      showStates.value[i] = false
    }
    if (isRunning === true) {
      showStates.value[2] = isToShow
    } else {
      showStates.value[3] = isToShow
    }
    if (isToShow === false) {
      normalShow.value = normal.value
      hydrantShow.value = hydrant.value
      warningShow.value = warning.value
      offlineShow.value = offline.value
      uninstalledShow.value = uninstalled.value
    } else {
      if (isRunning === true) {
        normalShow.value = normal.value
        hydrantShow.value = hydrant.value
        warningShow.value = warning.value
        offlineShow.value = []
        uninstalledShow.value = []
      } else {
        normalShow.value = []
        hydrantShow.value = []
        warningShow.value = []
        offlineShow.value = offline.value
        uninstalledShow.value = []
      }
    }
    setWell()
  }

  const warningDisplayFunction = (isWarning, isToShow) => {
    var i
    for (i = 0; i < 6; i++) {
      showStates.value[i] = false
    }
    if (isWarning === true) {
      showStates.value[4] = isToShow
    } else {
      showStates.value[5] = isToShow
    }
    if (isToShow === false) {
      normalShow.value = normal.value
      hydrantShow.value = hydrant.value
      warningShow.value = warning.value
      offlineShow.value = offline.value
      uninstalledShow.value = uninstalled.value
    } else {
      if (isWarning === true) {
        normalShow.value = []
        hydrantShow.value = []
        warningShow.value = warning.value
        offlineShow.value = []
        uninstalledShow.value = []
      } else {
        normalShow.value = normal.value
        hydrantShow.value = hydrant.value
        warningShow.value = []
        offlineShow.value = []
        uninstalledShow.value = []
      }
    }
    setWell()
  }

  var data = reactive({
    numbers: {
      onlineNumber: 0,
      hydrantNumber: 0,
      offlineNumber: 0,
      runningNumber: 0,
      shutNumber: 0,
      warningNumber: 0,
      normalNumber: 0,
    },
    onlineDisplayFunction: onlineDisplayFunction,
    runningDisplayFunction: runDisplayFunction,
    warningDisplayFunction: warningDisplayFunction,
  })

  
  const setNav = async () => {
    if (!chart) {
      await loadMap2()
      isLoaded.value = true
      const amap = chart.getModel().getComponent('amap').getAMap()
      var satellite = new AMap.TileLayer.Satellite({
        map: amap,
      })
      satellite.hide()
      satelliteObject.value = satellite
      log.success('fail')
    }
    else{
      const amap = chart.getModel().getComponent('amap').getAMap()
      AMap.plugin('AMap.Driving', function () {
                const driving = new AMap.Driving({
                    // 驾车路线规划策略，AMap.DrivingPolicy.LEAST_TIME是最快捷模式
                    policy: AMap.DrivingPolicy.LEAST_TIME,
                    // map 指定将路线规划方案绘制到对应的AMap.Map对象上
                    map: amap,
                    // panel 指定将结构化的路线详情数据显示的对应的DOM上，传入值需是DOM的ID
                    panel: 'panel'
                })
                const points = [
                    { keyword: '赣州市政府',city:'赣州' },
                    { keyword: '达芬奇国际中心',city:'赣州' }
                ]
                // 搜索完成后，将自动绘制路线到地图上
                driving.search(points)
            })
    }
  }
  async function loadMap2() {
    chart = echarts.init(document.getElementById('map-container'))
    chart.on('mousemove', e => {
      console.log(e, wellData.value)
      getHoverContext().setPosition([e.event.event.clientX, e.event.event.clientY])
      // console.log('find', store.state.wellList.find(item => item.well.id === e.data.id))
      getHoverContext().setData(wellData.value.find(item => item.wellId === e.data.id))
    })
    chart.on('mouseout', () => {
      getHoverContext().setPosition([-100, -100])
      getHoverContext().setData(undefined)
    })

    chart.on('click', e => {
      console.log(e.data.name)
      if (distancemode.value === true) {
        if (clicklocation.value.length === 0) {
          clicklocation.value.push(e.data.value[0])
          clicklocation.value.push(e.data.value[1])
          clicklocation.value.push(e.data.name)
          clicked.value = true
          showDistance.value = false
        } else if (clicklocation.value.length === 3) {
          clicklocation.value.push(e.data.value[0])
          clicklocation.value.push(e.data.value[1])
          clicklocation.value.push(e.data.name)
          clicked.value = true
          distance.value = GetDistance(
            clicklocation.value[4],
            clicklocation.value[3],
            clicklocation.value[1],
            clicklocation.value[0],
          )
          console.log('距离为' + distance.value + 'km')
          showDistance.value = true
          alert(clicklocation.value[2] + ' 至 ' + clicklocation.value[5] + '\n距离为 ' + distance.value + ' 千米')
          aa()
        } else {
          clicked.value = true
          showDistance.value = false
          clicklocation.value = []
          clicklocation.value.push(e.data.value[0])
          clicklocation.value.push(e.data.value[1])
          clicklocation.value.push(e.data.name)
        }
        console.log(clicklocation)
      }
    })

    const optionNew = {
      // amap component option
      amap: {
        // enable 3D mode
        viewMode: '3D',
        // initial options of AMap
        // See https://lbs.amap.com/api/javascript-api/reference/map#MapOption for details
        // initial map center [lng, lat]
        center: [114.9402, 25.851],
        // initial map zoom
        zoom: 11,
        // whether the map and echarts automatically handles browser window resize to update itself.
        resizeEnable: true,
        // customized map style, see https://lbs.amap.com/dev/mapstyle/index for details
        mapStyle: 'amap://styles/macaron',
        // whether echarts layer should be rendered when the map is moving. Default is true.
        // if false, it will only be re-rendered after the map `moveend`.
        // It's better to set this option to false if data is large.
        renderOnMoving: true,
        // the zIndex of echarts layer for AMap, default value is 2000.
        // deprecated since v1.9.0, use `echartsLayerInteractive` instead.
        // echartsLayerZIndex: 2019,
        // whether echarts layer is interactive. Default value is true
        // supported since v1.9.0
        echartsLayerInteractive: true,
        // whether to enable large mode. Default value is false
        // supported since v1.9.0
        largeMode: false,
        // Note: Please DO NOT use the initial option `layers` to add Satellite/RoadNet/Other layers now.
        // There are some bugs about it, we can use `amap.add` instead.
        // Refer to the codes at the bottom.

        // More initial options...
      },
      // tooltip: {
      //   trigger: "item"
      // },
      animation: false,
      series: [
        {
          name: '在线',
          type: 'effectScatter', // 特效散点
          coordinateSystem: 'amap',
          data: [],
          symbolSize: 27,
          // symbolSize: function (val) {
          //   return val[2] / 10;
          // },
          encode: {
            value: 2,
          },
          showEffectOn: 'render', // 特效开启时机
          rippleEffect: {
            // 扩散特效
            brushType: 'stroke',
          },
          hoverAnimation: true,
          label: {
            formatter: '{b}',
            position: 'right',
            show: true,
          },
          itemStyle: {
            // color: "rgba(255, 165, 0, 0.8)",
            color: 'rgba(165, 255, 0, 0.8)',
            shadowBlur: 10,
            shadowColor: '#333',
          },
          zlevel: 1,
        },
        {
          name: '报警',
          type: 'effectScatter', // 特效散点
          coordinateSystem: 'amap',
          data: [],
          symbolSize: 27,
          // symbolSize: function (val) {
          //   return val[2] / 10;
          // },
          encode: {
            value: 2,
          },
          // showEffectOn: "render", // 特效开启时机
          // rippleEffect: { // 扩散特效
          //   brushType: "stroke"
          // },
          hoverAnimation: true,
          label: {
            formatter: '{b}',
            position: 'right',
            show: true,
          },
          itemStyle: {
            color: 'rgba(255, 165, 0, 0.8)',
            // color: "rgba(165, 255, 0, 0.8)",
            shadowBlur: 10,
            shadowColor: '#333',
          },
          zlevel: 1,
        },
        {
          name: '离线',
          type: 'effectScatter', // 特效散点
          coordinateSystem: 'amap',
          data: [],
          symbolSize: 27,
          // symbolSize: function (val) {
          //   return val[2] / 10;
          // },
          encode: {
            value: 2,
          },
          showEffectOn: 'emphasis', // 特效开启时机
          rippleEffect: {
            // 扩散特效
            brushType: 'stroke',
          },
          hoverAnimation: true,
          label: {
            formatter: '{b}',
            position: 'right',
            show: true,
          },
          itemStyle: {
            color: 'rgba(165, 165, 165, 0.8)',
            // color: "rgba(165, 255, 0, 0.8)",
            shadowBlur: 10,
            shadowColor: '#333',
          },
          zlevel: 1,
        },
      ],
    }
    chart.setOption(optionNew)
  }

  const fetchData = async () => {
    console.log('刷新')
    let { data: res } = await fetchWellInfoByConfig({})
    // let { data: monitorList } = await fetchMonitorByConfig({})
    // const res = monitorList.map(item => {
    //   const well = wellList.find(it => it.id === item.wellId)
    //   return {
    //     ...well,
    //     ...item,
    //   }
    // })
    console.log('data', res)
    wellData.value = res
    const genList = e => {
      return res.filter(e).map(item => {
        return {
          id: item.wellId,
          name: item.wellName,
          value: [item.longitude, item.latitude, item.flowCount],
          applicantId: item.applicantId,
        }
      })
    }
    normal.value = genList(item => item.status === 1001)
    hydrant.value = genList(item => item.status === 1004)
    warning.value = genList(item => item.status === 4444)
    offline.value = genList(item => item.status === 1003)
    uninstalled.value = genList(item => item.status === 1002)
    console.log(hydrant.value)
    /*hydrant.value = [
      { id: 88, name: '顺泰治炼工业-机井', value: [115.020018, 25.63693, undefined], applicantId: 8 },
      { id: 89, name: '顺泰治炼工业-机井', value: [115.3745, 33.2572, undefined], applicantId: 8 },
      { id: 90, name: '顺泰治炼工业-机井', value: [115.3743, 33.25709, undefined], applicantId: 8 },
      { id: 91, name: '顺泰治炼工业-机井', value: [115.3744, 33.25714, undefined], applicantId: 8 },
    ]*/
    data.numbers = {
      onlineNumber: 0,
      hydrantNumber: 0,
      offlineNumber: 0,
      runningNumber: 0,
      shutNumber: 0,
      warningNumber: 0,
      normalNumber: 0,
    }
    updateNumbers()
    checkDisplay()
    setWell()
    getWarningContext().setPositionFunc(jumpTo)
    getWarningContext().setSelectedFunc(selectedItemByWarning)
    // getWarningContext().setData(res.filter(item => item.status === 4444))
  }

  const jumpTo = item => {
    if (!chart) {
      return
    }
    const amap = chart.getModel().getComponent('amap').getAMap()
    console.log('g', [item.latitude, item.longitude])
    amap.setZoomAndCenter(14, [item.longitude, item.latitude], false, 300)
  }

  function checkDisplay() {
    if (showStates.value[0] === true) {
      normalShow.value = normal.value
      hydrantShow.value = hydrant.value
      warningShow.value = warning.value
      offlineShow.value = offline.value
      uninstalledShow.value = []
    } else if (showStates.value[1] === true) {
      normalShow.value = []
      hydrantShow.value = []
      warningShow.value = []
      offlineShow.value = []
      uninstalledShow.value = uninstalled.value
    } else if (showStates.value[2] === true) {
      normalShow.value = normal.value
      hydrantShow.value = hydrant.value
      warningShow.value = warning.value
      offlineShow.value = []
      uninstalledShow.value = []
    } else if (showStates.value[3] === true) {
      normalShow.value = []
      hydrantShow.value = []
      warningShow.value = []
      offlineShow.value = offline.value
      uninstalledShow.value = []
    } else if (showStates.value[4] === true) {
      normalShow.value = []
      hydrantShow.value = []
      warningShow.value = warning.value
      offlineShow.value = []
      uninstalledShow.value = []
    } else if (showStates.value[5] === true) {
      normalShow.value = normal.value
      hydrantShow.value = hydrant.value
      warningShow.value = []
      offlineShow.value = []
      uninstalledShow.value = []
    } else {
      normalShow.value = normal.value
      hydrantShow.value = hydrant.value
      warningShow.value = warning.value
      offlineShow.value = offline.value
      uninstalledShow.value = uninstalled.value
    }
  }

  const selectedItemByWarning = warningIt => {
    // console.log('refresh')
    warningItem.value = warningIt
    setWell()
  }

  const setWell = async () => {
    if (!chart) {
      await loadMap2()
      isLoaded.value = true
      const amap = chart.getModel().getComponent('amap').getAMap()
      var satellite = new AMap.TileLayer.Satellite({
        map: amap,
      })
      satellite.hide()
      satelliteObject.value = satellite

    //   var driving = new AMap.Driving({
    //   // 驾车路线规划策略，AMap.DrivingPolicy.LEAST_TIME是最快捷模式
    //   policy: AMap.DrivingPolicy.LEAST_TIME,
    //   map: amap
    //   })
    //   var startLngLat = [116.379028, 39.865042]
    //   var endLngLat = [116.427281, 39.903719]
    //   driving.search(startLngLat, endLngLat, function (status, result) {
    //    // 未出错时，result即是对应的路线规划方案
    //  },
    //  function(status, result) {
    //     // result 即是对应的驾车导航信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingResult
    //     if (status === 'complete') {
    //         log.success('绘制驾车路线完成')
    //     } else {
    //         log.error('获取驾车数据失败：' + result)
    //     }
    // }
    //  )

    }
    const option = {
      animation: false,
      series: [
        {
          name: '阀门在线',
          type: 'effectScatter', // 特效散点
          coordinateSystem: 'amap',
          data: normalShow.value,
          symbolSize: 27,
          // symbolSize: function (val) {
          //   return val[2] / 10;
          // },
          encode: {
            value: 2,
          },
          showEffectOn: 'emphasis', // 特效开启时机
          rippleEffect: {
            // 扩散特效
            brushType: 'stroke',
          },
          hoverAnimation: true,
          label: {
            formatter: '{b}',
            position: 'right',
            show: true,
          },
          itemStyle: {
            // color: "rgba(255, 165, 0, 0.8)",
            color: 'rgba(165, 255, 0, 0.8)',
            shadowBlur: 10,
            shadowColor: '#333',
          },
          zlevel: 1,
        },
        {
          name: '消防栓在线',
          type: 'effectScatter', // 特效散点
          coordinateSystem: 'amap',
          data: hydrantShow.value,
          symbolSize: 27,
          // symbolSize: function (val) {
          //   return val[2] / 10;
          // },
          encode: {
            value: 2,
          },
          showEffectOn: 'emphasis', // 特效开启时机
          rippleEffect: {
            // 扩散特效
            brushType: 'stroke',
          },
          hoverAnimation: true,
          label: {
            formatter: '{b}',
            position: 'right',
            show: true,
          },
          itemStyle: {
            // color: "rgba(255, 165, 0, 0.8)",
            color: 'rgb(117, 205, 245)',
            shadowBlur: 10,
            shadowColor: '#333',
          },
          zlevel: 1,
        },
        {
          name: '报警',
          type: 'effectScatter', // 特效散点
          coordinateSystem: 'amap',
          data: warningShow.value.filter(item => {
            if (warningItem.value) {
              return warningItem.value.applicantId !== item.applicantId
            }
            return true
          }),
          showEffectOn: 'emphasis', // 特效开启时机
          symbolSize: 27,
          encode: {
            value: 2,
          },
          hoverAnimation: true,
          label: {
            formatter: '{b}',
            position: 'right',
            show: true,
          },
          itemStyle: {
            color: 'rgba(255,110,118, 0.8)',
            // color: 'blue',
            // color: "rgba(165, 255, 0, 0.8)",
            shadowBlur: 10,
            shadowColor: '#333',
          },
          zlevel: 1,
        },
        {
          name: '已选报警',
          type: 'effectScatter', // 特效散点
          coordinateSystem: 'amap',
          data: warningShow.value.filter(item => {
            if (warningItem.value) {
              return warningItem.value.applicantId === item.applicantId
            }
            return false
          }),
          showEffectOn: 'render', // 特效开启时机
          symbolSize: 27,
          encode: {
            value: 2,
          },
          hoverAnimation: true,
          label: {
            formatter: '{b}',
            position: 'right',
            show: true,
          },
          itemStyle: {
            color: 'rgba(255,110,118, 0.8)',
            // color: "rgba(165, 255, 0, 0.8)",
            shadowBlur: 10,
            shadowColor: '#333',
          },
          zlevel: 1,
        },
        {
          name: '停用',
          type: 'effectScatter', // 特效散点
          coordinateSystem: 'amap',
          data: offlineShow.value,
          symbolSize: 27,
          encode: {
            value: 2,
          },
          showEffectOn: 'emphasis', // 特效开启时机
          rippleEffect: {
            // 扩散特效
            brushType: 'stroke',
          },
          hoverAnimation: true,
          label: {
            formatter: '{b}',
            position: 'right',
            show: true,
          },
          itemStyle: {
            color: 'rgba(165, 165, 165, 0.8)',
            // color: "rgba(165, 255, 0, 0.8)",
            shadowBlur: 10,
            shadowColor: '#333',
          },
          zlevel: 1,
        },
        {
          name: '未安装',
          type: 'effectScatter', // 特效散点
          coordinateSystem: 'amap',
          data: uninstalledShow.value,
          symbolSize: 27,
          encode: {
            value: 2,
          },
          showEffectOn: 'emphasis', // 特效开启时机
          rippleEffect: {
            // 扩散特效
            brushType: 'stroke',
          },
          hoverAnimation: true,
          label: {
            formatter: '{b}',
            position: 'right',
            show: true,
          },
          itemStyle: {
            color: 'rgb(194,20,229)',
            // color: "rgba(165, 255, 0, 0.8)",
            shadowBlur: 10,
            shadowColor: '#333',
          },
          zlevel: 1,
        },
      ],
    }
    chart.setOption(option)
  }

  let t
  const setupMap = () => {
    fetchData()
    t = setInterval(fetchData, 900000)
  }

  const inDestory = () => {
    if (chart) {
      chart.dispose()
    }
    clearInterval(t)
  }

  onMounted(
    //await loadMap()
    setupMap()
    
  )

  onUnmounted(() => {
    clearInterval(timer)
    inDestory()
  })
</script>

<style lang="scss" scoped>
  .layer-out {
    position: relative;
    overflow: hidden;
    width: 100%;
    height: calc(100vh - 100px);
  }
  .layer {
    width: 100%;
    height: calc(100vh - 100px);
    // position: absolute;
    // left: 7px;
    // top: 1px;
  }
  .box {
    pointer-events: none;
  }
  .h {
    position: absolute;
    bottom: 200px;
    right: 10px;
    pointer-events: auto;
  }
  .distancetool {
    position: absolute;
    bottom: 35px;
    left: 15px;
    pointer-events: auto;
    width: fit-content;
    height: fit-content;
    background: rgb(255, 255, 255, 0.9);
    //text-align: center;
    border: 0.5px solid rgba($color: #000000, $alpha: 0.1);
    font-size: 115%;
    border-radius: 15px;
  }
  .header {
    width: 220px;
    padding: 7px;
    padding-left: 15px;
  }
  .content {
    width: fit-content;
    height: fit-content;
    font-size: 105%;
    color: #000000;
  }
  .divider {
    border-top: 1px solid rgba($color: #969696, $alpha: 0.15);
    height: 1px;
    overflow: hidden;
    margin-left: 10px;
    margin-right: 10px;
  }
  .clickfirst {
    width: 220px;
    height: 45px;
    text-align: center;
    padding: 7px;
  }
  .clicksecond {
    padding: 15px;
    padding-top: 10px;
    max-width: 295px;
    min-width: 220px;
    word-wrap: break-word;
    word-break: normal;
    text-align: center;
  }
  .clickthird {
    padding: 15px;
    padding-top: 10px;
    max-width: 295px;
    min-width: 220px;
    word-wrap: break-word;
    word-break: normal;
    text-align: center;
  }
</style>
