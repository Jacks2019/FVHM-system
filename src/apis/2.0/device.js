import request from './request'

// 根据阀门id获得设备信息
// http://115.157.195.222:3000/project/16/interface/api/63
export const fetchDevicesById = async ({ well_id }) => {
  return await request.get('/wellinfo/findmeterbywellid', {
    params: {
      wellId: well_id,
    },
  })
}
