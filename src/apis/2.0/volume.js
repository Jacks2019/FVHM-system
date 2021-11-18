import request from './request'

export const fetchApplicantStatisticsByTime = async ({ type, currentTime }) => {
  return await request.Pget('/statistical/getapplicantstatistical', {
    params: {
      currentTime,
      type,
    },
  })
}

// 工业园区用水统计
// http://115.157.195.222:3000/project/16/interface/api/58
export const fetchAreaVolumeByTime = async ({ type, currentTime }) => {
  return await request.get('/areareport/getareareport', {
    params: {
      currentTime,
      type,
    },
  })
}

// 区域用水统计
// http://115.157.195.222:3000/project/16/interface/api/58
export const fetchDistrictVolumeByTime = async ({ type, currentTime }) => {
  return await request.get('/districtreport/getdistrictreport', {
    params: {
      currentTime,
      type,
    },
  })
}

// 乡镇用水统计
// http://115.157.195.222:3000/project/16/interface/api/55
// http://115.157.195.222:3000/project/16/interface/api/57
export const fetchTownVolumeByTime = async ({ type, currentTime }) => {
  return await request.get('/townreport/gettownreport', {
    params: {
      currentTime,
      type,
    },
  })
}

// 村庄用水统计
// http://115.157.195.222:3000/project/16/interface/api/58
export const fetchVillageVolumeByTime = async ({ type, currentTime }) => {
  return await request.get('/villagereport/getvillagereport', {
    params: {
      currentTime,
      type,
    },
  })
}

// 阀门用水统计
// http://115.157.195.222:3000/project/16/interface/api/59
export const fetchWellVolumeByTime = async ({ type, time, well_name }) => {
  return await request.get('/wellvolume/findbyconditions', {
    params: {
      type,
      time,
      well_name,
    },
  })
}

// 特定阀门用水统计
// http://115.157.195.222:3000/project/16/interface/api/59
export const fetchSpecificWellVolumeByTime = async ({ type, time, id }) => {
  return await request.get('/wellinfo/findvolumebyday', {
    params: {
      type,
      time,
      well_id: id,
    },
  })
}

// 阀门用水统计
// http://115.157.195.222:3000/project/16/interface/api/59
export const fetchWellDataByConfig = async ({ id, start, end }) => {
  return await request.get('/wellinfo/findvolumebytime', {
    params: {
      well_id: id,
      startTime: start,
      endTime: end,
    },
  })
}
