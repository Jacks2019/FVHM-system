import request from './request'

export const fetchHydrantInfoById = async ({ hydrantId }) => {
  return await request.get('/hydrantinfo/gethydrantinfobyhydrantid', {
    params: {
      hydrantId,
    },
  })
}

export const updateHydrantInfoByConfig = async ({
  hydrantId,
  // 名称编号
  hydrantName,
  hydrantCode,
  // 口径井深
  hydrantCaliber,
  hydrantDepth,
  // 时间
  createTime,
  // 地点
  zoneId,
  zoneType,
  // 用途类型
  hydrantUsage,
  hydrantType,
  // 经纬度
  longitude,
  latitude,
  // 状态
  status,
  // 通讯编号
  comNumber,
  // 灌溉面积
  irrigationArea,
  // 备注
  remark,
}) => {
  return await request.put('/hydrantinfo/updatehydrantinfo', {
    data: {
      hydrantId,
      // 名称编号
      hydrantName,
      hydrantCode,
      // 口径井深
      hydrantCaliber,
      hydrantDepth,
      // 时间
      createTime,
      // 地点
      zoneId,
      zoneType,
      // 用途类型
      hydrantUsage,
      hydrantType,
      // 经纬度
      longitude,
      latitude,
      // 状态
      status,
      // 通讯编号
      comNumber,
      // 灌溉面积
      irrigationArea,
      // 备注
      remark,
    },
  })
}

export const fetchHydrantDevicesById = async ({ hydrant_id }) => {
  return await request.get('/hydrantinfo/findmeterbyhydrantid', {
    params: {
      hydrantId: hydrant_id,
    },
  })
}

export const getHydrantMeterType = async () => {
  return await request.get('/meter/gethydrantmetertypes')
}

export const insertHydrantMeterInfo = async ({ hydrantId, meterCode, meterName, meterNo, status, createTime }) => {
  return await request.post('/meter/inserthydrantmeterinfo', {
    params: {
      hydrantId,
    },
    data: {
      meterCode,
      meterName,
      meterNo,
      status,
      createTime,
    },
  })
}

export const updateHydrantMeterInfo = async ({ meterId, meterCode, meterNo, meterName, status, createTime }) => {
  return await request.put('/meter/updatehydrantmeterinfo', {
    data: {
      meterId,
      meterCode,
      meterNo, // 类型
      meterName,
      status,
      createTime,
    },
  })
}

export const deleteHydrantMeterInfo = async ({ meter_id }) => {
  return await request.delete('/meter/deletehydrantmeterinfo', {
    params: {
      meterId: meter_id,
    },
  })
}

export const fetchSpecificHydrantVolumeByTime = async ({ type, time, id }) => {
  return await request.get('/hydrantinfo/findvolumebyday', {
    params: {
      type,
      time,
      hydrant_id: id,
    },
  })
}

export const fetchMounthCostByYearAndHydrant = async ({ year, id }) => {
  return await request.get('/hydrantinfo/findmonthvolumebyyear', {
    params: {
      year,
      hydrantId: id,
    },
  })
}

export const fetchHydrantYearTotalById = async ({ hydrantId }) => {
  return await request.Pget('/hydrantinfo/findvolumebyyear', {
    params: {
      hydrant_id: hydrantId,
    },
  })
}

export const fetchHydrantDataByConfig = async ({ id, start, end }) => {
  return await request.get('/hydrantinfo/findvolumebytime', {
    params: {
      hydrant_id: id,
      startTime: start,
      endTime: end,
    },
  })
}

export const fetchHydrantInfoByConfig = async ({ hydrantCode, hydrantName, address, applicantName, hydrantId }) => {
  return await request.get('/hydrantinfo/findhydrantinfosbyconditions', {
    params: {
      hydrantCode,
      hydrantName,
      address,
      applicantName,
      hydrantId,
    },
  })
}

export const addHydrantInfoByConfig = async ({
  // 名称编号
  hydrantName,
  hydrantCode,
  // 口径井深
  hydrantCaliber,
  hydrantDepth,
  // 时间
  createTime,
  // 地点
  zoneId,
  zoneType,
  // 用途类型
  hydrantUsage,
  hydrantType,
  // 经纬度
  longitude,
  latitude,
  // 状态
  status,
  // 通讯编号
  comNumber,
  // 灌溉面积
  irrigationArea,
  // 备注
  remark,
  applicantId,
}) => {
  return await request.post('/hydrantinfo/inserthydrantinfo', {
    params: {
      applicantId,
    },
    data: {
      // 名称编号
      hydrantName,
      hydrantCode,
      // 口径井深
      hydrantCaliber,
      hydrantDepth,
      // 时间
      createTime,
      // 地点
      zoneId,
      zoneType,
      // 用途类型
      hydrantUsage,
      hydrantType,
      // 经纬度
      longitude,
      latitude,
      // 状态
      status,
      // 通讯编号
      comNumber,
      // 灌溉面积
      irrigationArea,
      // 备注
      remark,
    },
  })
}

export const deleteHydrantInfoById = async ({ hydrant_ids }) => {
  return await request.delete('/hydrantinfo/deletehydrantinfo', {
    params: {
      hydrant_id: hydrant_ids,
    },
  })
}

export const fetchHydrantDistrictVolumeByTime = async ({ type, currentTime }) => {
  return await request.get('/districtreport/gethydrantdistrictreport', {
    params: {
      currentTime,
      type,
    },
  })
}

export const fetchHydrantAreaVolumeByTime = async ({ type, currentTime }) => {
  return await request.get('/areareport/gethydrantareareport', {
    params: {
      currentTime,
      type,
    },
  })
}

export const fetchHydrantTownVolumeByTime = async ({ type, currentTime }) => {
  return await request.get('/townreport/gethydranttownreport', {
    params: {
      currentTime,
      type,
    },
  })
}

export const fetchHydrantVillageVolumeByTime = async ({ type, currentTime }) => {
  return await request.get('/villagereport/gethydrantvillagereport', {
    params: {
      currentTime,
      type,
    },
  })
}
