import request from './request'

// 根据年份获取全年消耗水量
// http://115.157.195.222:3000/project/16/interface/api/50
export const fetchYearCostByYear = async ({ year }) => {
  return await request.get('/chart/info', {
    params: {
      year,
    },
  })
}

// 设备状态
// http://115.157.195.222:3000/project/16/interface/api/52
export const fetchMeterStatus = async () => {
  return await request.get('/meter/meterstatus')
}

// 报警不同状态数量
// http://115.157.195.222:3000/project/16/interface/api/53
export const fetchWarnCount = async () => {
  return await request.get('/warn/warncode')
}
