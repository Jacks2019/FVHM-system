import request from './request'

// 报警信息列表获取
// http://115.157.195.222:3000/project/16/interface/api/56
export const fetchWarnInfoByConfig = async ({ well_name, status, warn_code, startTime, endTime }) => {
  return await request.get('/warn/findwarninfo', {
    params: {
      well_name,
      status,
      warn_code,
      startTime,
      endTime,
    },
  })
}

// 报警状态修改
// http://115.157.195.222:3000/project/16/interface/api/64
export const updateWarnIdById = async ({ id, status, well_id }) => {
  return await request.put('/warn/updatewarn', {
    data: {
      id,
      status,
      wellId: well_id,
    },
  })
}
