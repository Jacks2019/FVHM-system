<template>
    <div class="p-page">
        <div class="p-header">
            <p class="page-name">统计报表</p>
            <div class="op-flex">
                   <el-cascader 
                   v-model="place"
                   :options="options" 
                   :props="myprops"
                   ref="require" 
                   placeholder="选择行政区域"
                   @expand-change="handleItemChange"
                   collapse-tags="true"
                   size="medium"
                   clearable/>
            </div>
        </div>
    </div>
</template>

<script setup>
import { multiply } from 'lodash'
import {getCurrentInstance, onMounted,ref} from 'vue'
import {fetchCityList,
        fetchAreaList,
        fetchDistrictList,
        fetchTownList,
        fetchVillageList,
        fetchRoadList,
  } from '../../apis/2.0/addr'

let options=ref([])
let require=ref(null)
let myprops=ref()
let place =ref()
const {proxy} = getCurrentInstance() 
emits: ['handleItemChange']

myprops={
  label:'name',
  value:'message',
  checkStrictly:true,
  children: 'child',
  multiple: 'true'
}
const getList=async(type,zoneId)=>{
  let place,newplace;
  if(type==='area'){
    place=(await fetchAreaList()||[]).filter(value=>value.pid==zoneId);
    newplace=place.map((item,index)=>{
              return{
                name: item.area,
                message: {zoneId: item.zoneId,
                          type:type
                },
                child:null
              }
            })
  }
  else if(type==='district'){
    place=(await fetchDistrictList()||[]).filter(value=>value.pid==zoneId);
    newplace=place.map((item,index)=>{
              return{
                name: item.district,
                message: {zoneId: item.zoneId,
                          type:type
                },
                child:[]
              }
            })
  }
  else if(type==='town'){
    place=(await fetchTownList()||[]).filter(value=>value.pid==zoneId);
    newplace=place.map((item,index)=>{
              return{
                name: item.town,
                message: {zoneId: item.zoneId,
                          type:type
                },
                child:[]
              }
            })
  }
  else if(type==='village'){
    place=(await fetchVillageList()||[]).filter(value=>value.pid==zoneId);
    newplace=place.map((item,index)=>{
              return{
                name: item.village,
                message: {zoneId: item.zoneId,
                          type:type
                },
                child:[]
              }
            })
  }
  else if(type==='road'){
    place=(await fetchRoadList()||[]).filter(value=>value.pid==zoneId);
    newplace=place.map((item,index)=>{
              return{
                name: item.road,
                message: {zoneId: item.zoneId,
                          type:type
                },
                child:null
              }
            })
  }
  console.log("newplace: ",newplace);
  return newplace;
}
const getNodes=async(val)=>{
  
  if(!val){
    let rawcity=[];
    rawcity= await fetchCityList();
    console.log("rawcity: ",rawcity);
    const city=rawcity.map((item,index)=>{
      return{
        name: item.city,
        message: {zoneId: item.zoneId,
                  type:"city"
        },
        child:[]
      }
    })
    console.log("city: ",city);
    options.value=city;
    console.log("options: ",options);
  }
  else if(val.length===1){
    options.value.map(async(item,index)=>{
      if(item.message.zoneId===val[0].zoneId){
        if(item.child.length===0){
          let area = await getList('area',item.message.zoneId)
          let district=await getList('district',item.message.zoneId)
          if(district.length===0&&area.length===0){
            item.child=null;
          }
          else{
            item.child=[].concat(district).concat(area)
          }
        }
      }
    })
    console.log("options: ",options.value)
  }
  else if(val.length===2){
    options.value.map(async(item,index)=>{
      if(item.message.zoneId===val[0].zoneId){
        item.child.map(async(item1)=>{
          if(item1.message.zoneId===val[1].zoneId&&item1.message.type==='district'){
            if(item1.child.length===0){
              let town=await getList('town',val[1].zoneId)
              console.log("town: ",town)
              if(town.length===0){
                item1.child=null;
              }
              else{
                item1.child=[].concat(town)
              }
            }
          }
        })
      }
    })
  }
  else if(val.length===3){
    options.value.map(async(item,index)=>{
      if(item.message.zoneId===val[0].zoneId){
        item.child.map(async(item1)=>{
          if(item1.message.zoneId===val[1].zoneId&&item1.message.type==='district'){
            item1.child.map(async(item2)=>{
              if(item2.message.zoneId===val[2].zoneId){
                if(item2.child.length===0){
                  let village=await getList('village',val[2].zoneId)
                  console.log("village: ",village)
                  if(village.length===0){
                    item2.child=null
                  }
                  else{
                    item2.child=[].concat(village)
                  }
                }
              }
            })
          }
        })
      }
    })
  }
  else if(val.length===4){
    options.value.map(async(item,index)=>{
      if(item.message.zoneId===val[0].zoneId){
        item.child.map(async(item1)=>{
          if(item1.message.zoneId===val[1].zoneId&&item1.message.type==='district'){
            item1.child.map(async(item2)=>{
              if(item2.message.zoneId===val[2].zoneId){
                item2.child.map(async(item3)=>{
                  if(item3.message.zoneId===val[3].zoneId){
                    if(item3.child.length===0){
                      let road=await getList('road',val[3].zoneId)
                      console.log("road",road)
                      if(road.length===0){
                        item3.child=null;
                      }
                      else{
                        item3.child=[].concat(road)
                      }
                    }
                  }
                })
              }
            })
          }
        })
      }
    })
  }

}
const handleItemChange=async(val)=> {
  console.log("点击的val",val)

  let ineed=proxy.$refs.require.getCheckedNodes().map((item)=>{
    return item.data.message
  })//important

  console.log("place",ineed)
  getNodes(val)
}

onMounted(async()=>{
  getNodes()
 
})
</script>

<style lang="scss" scoped>
  .op-flex {
    display: flex;
    position: relative;
    top: 4px;
    right: -130px;
    width: 150px;
  }
  .search-btn {
    display: flex;
  }
</style>