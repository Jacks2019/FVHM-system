import request from './request'

// 阀门信息
// http://115.157.195.222:3000/project/16/interface/api/60
export const fetchWellInfoByConfig = async ({ wellCode, wellName, address, applicantName, wellId }) => {
  return await request.get('/wellinfo/findwellinfosbyconditions', {
    params: {
      wellCode,
      wellName,
      address,
      applicantName,
      wellId,
    },
  })
}

export const fetchWellYearTotalById = async ({ wellId }) => {
  return await request.Pget('/wellinfo/findvolumebyyear', {
    params: {
      well_id: wellId,
    },
  })
}

export const fetchVolumeListByConfig = async ({ applicantName }) => {
  return await request.get('/plan/getplanvolumelist', {
    params: {
      applicantName,
    },
  })
}

export const fetchPrevVolumeByConfig = async ({ applicantId, planYear }) => {
  return await request.get('/plan/getpastplanvolume', {
    params: {
      applicantId,
      planYear,
    },
  })
}

export const fetchWellInfoById = async ({ wellId }) => {
  return await request.get('/wellinfo/getwellinfobywellid', {
    params: {
      wellId,
    },
  })
}

// 更新阀门信息
// http://115.157.195.222:3000/project/16/interface/api/70
export const updateWellInfoByConfig = async ({
  wellId,
  // 名称编号
  wellName,
  wellCode,
  // 口径井深
  wellCaliber,
  wellDepth,
  // 时间
  createTime,
  // 地点
  zoneId,
  zoneType,
  // 用途类型
  wellUsage,
  wellType,
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
  return await request.put('/wellinfo/updatewellinfo', {
    data: {
      wellId,
      // 名称编号
      wellName,
      wellCode,
      // 口径井深
      wellCaliber,
      wellDepth,
      // 时间
      createTime,
      // 地点
      zoneId,
      zoneType,
      // 用途类型
      wellUsage,
      wellType,
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

export const updateRemarkById = async ({ id, remark }) => {
  return await request.put('/wellinfo/updateremark', {
    params: {
      well_id: id,
      remark,
    },
  })
}

// 删除阀门
// http://115.157.195.222:3000/project/16/interface/api/71
export const deleteWellInfoById = async ({ well_ids }) => {
  return await request.delete('/wellinfo/deletewellinfo', {
    params: {
      well_id: well_ids,
    },
  })
}

// 新增阀门信息
// http://115.157.195.222:3000/project/16/interface/api/72
export const addWellInfoByConfig = async ({
  // 名称编号
  wellName,
  wellCode,
  // 口径井深
  wellCaliber,
  wellDepth,
  // 时间
  createTime,
  // 地点
  zoneId,
  zoneType,
  // 用途类型
  wellUsage,
  wellType,
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
  return await request.post('/wellinfo/insertwellinfo', {
    params: {
      applicantId,
    },
    data: {
      // 名称编号
      wellName,
      wellCode,
      // 口径井深
      wellCaliber,
      wellDepth,
      // 时间
      createTime,
      // 地点
      zoneId,
      zoneType,
      // 用途类型
      wellUsage,
      wellType,
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

// 4.6 新接口
// 更新阀门状态
// http://115.157.195.222:3000/project/16/interface/api/102
export const updateWellStatusByStatus = async ({ wellId, status }) => {
  return await request.put('/wellinfo/updatestatus', {
    data: {
      well_id: wellId,
      status,
    },
  })
}
