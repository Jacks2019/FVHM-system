import { fetchCityInfo, fetchDistrictInfo, fetchTownInfo, fetchVillageInfo, fetchAreaInfo } from '../apis/2.0/addr'
import { fetchApplicantByName } from '../apis/3.0/applicant'
import { fetchDepartmentsByNone } from '../apis/3.0/department'
import { getMeterTypes } from '../apis/3.0/meter'
import { cloneDeep } from 'lodash'
import { cityGenerator, countryGenerator, genList, idGenerator, rateGeneratorFactory } from '../mock'
import { fixHeight } from '../utils/fixHeight'
import { init } from 'echarts'

export const utils = {
  namespaced: true,
  state: () => {
    let city
    let area
    let district
    let town
    let village
    let menuCollapse = false
    let applicant
    let department
    let meterType
    let t

    let update = 0
    return {
      city,
      district,
      town,
      village,
      area,
      menuCollapse,
      t,
      update,
      applicant,
      department,
      meterType,
    }
  },
  getters: {
    addressOptions(state) {
      const city = cloneDeep(state.city) || []
      const district = cloneDeep(state.district) || []
      const town = cloneDeep(state.town) || []
      const village = cloneDeep(state.village) || []
      const area = cloneDeep(state.area) || []
      village.forEach(item => {
        const idx = town.findIndex(it => item.pid === it.id)
        if (idx >= 0) {
          town[idx].children = (town[idx].children || []).concat(item)
        }
      })
      town.forEach(item => {
        const idx = district.findIndex(it => item.pid === it.id)
        if (idx >= 0 && item.children && item.children.length > 0) {
          district[idx].children = (district[idx].children || []).concat(item)
        }
      })
      district.forEach(item => {
        const id = item.id
        item.id = {
          id,
          isArea: false,
        }
        const idx = city.findIndex(it => item.pid === it.zoneId)
        if (idx >= 0 && item.children && item.children.length > 0) {
          city[idx].children = (city[idx].children || []).concat(item)
        }
      })
      area.forEach(item => {
        const id = item.id
        item.id = {
          id,
          isArea: true,
        }
        const idx = city.findIndex(it => item.pid === it.zoneId)
        if (idx >= 0) {
          city[idx].children = (city[idx].children || []).concat(item)
        }
      })
      if (state.city) {
        const res = city.map(item => {
          return {
            ...item,
            name: item.city,
            id: item.zoneId,
          }
        })
        return res
      } else {
        return []
      }
    },
    districtOptions(state) {
      const city = cloneDeep(state.city) || []
      const district = cloneDeep(state.district) || []
      district.forEach(item => {
        const id = item.id
        const idx = city.findIndex(it => item.pid === it.zoneId)
        console.log('aaaa', city[idx])
        if (idx >= 0) {
          city[idx].children = (city[idx].children || []).concat(item)
        }
      })
      if (state.city) {
        const res = city.map(item => {
          return {
            ...item,
            name: item.city,
            id: item.zoneId,
          }
        })
        return res
      } else {
        return []
      }
    },
    townOptions(state) {
      const city = cloneDeep(state.city) || []
      const district = cloneDeep(state.district) || []
      const town = cloneDeep(state.town) || []
      town.forEach(item => {
        const idx = district.findIndex(it => item.pid === it.id)
        if (idx >= 0) {
          district[idx].children = (district[idx].children || []).concat(item)
        }
      })
      district.forEach(item => {
        const id = item.id
        const idx = city.findIndex(it => item.pid === it.zoneId)
        if (idx >= 0 && item.children && item.children.length > 0) {
          city[idx].children = (city[idx].children || []).concat(item)
        }
      })
      if (state.city) {
        const res = city.map(item => {
          return {
            ...item,
            name: item.city,
            id: item.zoneId,
          }
        })
        return res
      } else {
        return []
      }
    },
    cityOptions(state) {
      const city = cloneDeep(state.city) || []
      if (city) {
        const res = city.map(item => {
          return {
            ...item,
            name: item.city,
            id: item.zoneId,
          }
        })
        return res
      } else {
        return []
      }
    },
  },
  mutations: {
    setState(state, payload) {
      for (const c in payload) {
        payload[c] && (state[c] = payload[c])
      }
    },
    updateSum(state) {
      state.update += 1
    },
    changeMenuCollapse(state, payload) {
      state.menuCollapse = payload
    },
    updatePageInterval(state, payload) {
      state.t = payload
    },
  },
  actions: {
    async changeMenuCollapse(context, payload) {
      clearInterval(context.state.t)
      context.commit('changeMenuCollapse', payload)
      setTimeout(() => {
        clearInterval(context.state.t)
        fixHeight()
        let t = setInterval(fixHeight, 800)
        context.commit('updatePageInterval', t)
      }, 2000)
    },
    async init(context) {
      context.dispatch('fetchAddr')
      context.dispatch('fetchApplicant')
      context.dispatch('fetchDepartment')
      context.dispatch('fetchMeterType')
    },
    async fetchApplicant(context) {
      const applicant = (await fetchApplicantByName()) || []
      context.commit('setState', {
        applicant,
      })
    },
    async fetchMeterType(context) {
      const types = (await getMeterTypes()) || []
      context.commit('setState', {
        meterType: types,
      })
    },
    async fetchDepartment(context) {
      const department = (await fetchDepartmentsByNone()) || []
      console.log('dedede', department)
      context.commit('setState', {
        department,
      })
    },
    async fetchAddr(context) {
      const city = (await fetchCityInfo()) || []
      const district = (await fetchDistrictInfo()) || []
      const town = (await fetchTownInfo()) || []
      const village = (await fetchVillageInfo()) || []
      const area = (await fetchAreaInfo()) || []
      context.commit('setState', {
        city,
        district,
        town,
        village,
        area,
      })
    },
  },
}
