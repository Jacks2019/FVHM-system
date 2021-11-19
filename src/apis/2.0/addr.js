import request from './request'

// 仍在使用的旧接口
export const fetchVillageInfo = async () => {
  return await request.Pget('/village/getvillagerelationship')
}

// 仍在使用的旧接口
export const fetchTownInfo = async () => {
  return await request.Pget('/town/gettownrelationship')
}

export const fetchCityInfo = async () => {
  return await request.Pget('/city/getcityinfo')
}

export const fetchDistrictInfo = async () => {
  return await request.Pget('/district/getdistrictrelationship')
}

export const fetchAreaInfo = async () => {
  return await request.Pget('/area/getarearelationship')
}

export const fetchDistrictList = async () => {
  return await request.Pget('/district/getdistrictinfo')
}

export const fetchAreaList = async () => {
  return await request.Pget('/area/getareainfo')
}

export const fetchTownList = async () => {
  return await request.Pget('/town/gettowninfo')
}

export const fetchVillageList = async () => {
  return await request.Pget('/village/getvillageinfo')
}

export const AddVillageInfoByConfig = async ({ townId, villageName, address }) => {
  return await request.post('/village/insertvillageinfo', {
    data: {
      villageName,
      address,
      townId,
    },
  })
}

export const editDistrictInfoByConfig = async ({ cityId, districtId, districtName }) => {
  return await request.put('/district/updatedistrictinfo', {
    data: {
      cityId,
      districtId,
      districtName,
    },
  })
}

export const editVillageInfoByConfig = async ({ address, townId, villageId, villageName }) => {
  return await request.put('/village/updatevillageinfo', {
    data: {
      address,
      townId,
      villageId,
      villageName,
    },
  })
}

export const AddTownInfoByConfig = async ({ districtId, townName }) => {
  return await request.post('/town/inserttowninfo', {
    data: {
      districtId,
      townName,
    },
  })
}

export const AddCityInfoByConfig = async ({ cityId, cityName }) => {
  return await request.post('/city/insertcityinfo', {
    data: {
      cityId,
      cityName,
    },
  })
}

export const AddDistrictInfoByConfig = async ({ cityId, districtName }) => {
  return await request.post('/district/insertdistrictinfo', {
    data: {
      cityId,
      districtName,
    },
  })
}

export const AddAreaInfoByConfig = async ({ address, areaName }) => {
  return await request.post('/area/insertareainfo', {
    data: {
      address,
      areaName,
    },
  })
}

export const editCityInfoByConfig = async ({ cityId, cityName }) => {
  return await request.put('/city/updatecityinfo', {
    data: {
      cityId,
      cityName,
    },
  })
}

export const editTownInfoByConfig = async ({ districtId, townId, townName }) => {
  return await request.put('/town/updatetowninfo', {
    data: {
      districtId,
      townId,
      townName,
    },
  })
}

export const editAreaInfoByConfig = async ({ address, areaId, areaName }) => {
  return await request.put('/area/updateareainfo', {
    data: {
      address,
      areaId,
      areaName,
    },
  })
}

export const deleteDistrictInfoById = async ({ id }) => {
  return await request.delete('/district/deletedistrictinfo', {
    params: {
      districtId: id,
    },
  })
}

export const deleteAreaInfoById = async ({ id }) => {
  return await request.delete('/area/deleteareainfo', {
    params: {
      areaId: id,
    },
  })
}

export const deleteTownInfoById = async ({ id }) => {
  return await request.delete('/town/deletetowninfo', {
    params: {
      townId: id,
    },
  })
}

export const deleteVillageInfoById = async ({ id }) => {
  return await request.delete('/village/deletevillageinfo', {
    params: {
      villageId: id,
    },
  })
}

export const deleteCityInfoById = async ({ id }) => {
  return await request.delete('/city/deletecityinfo', {
    params: {
      cityId: id,
    },
  })
}
