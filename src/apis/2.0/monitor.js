import request from './request'

// 多条件查询阀门详情信息
// http://115.157.195.222:3000/project/16/interface/api/66
export const fetchMonitorByConfig = async ({ well_name, well_code, status, town_name, village_name, remark }) => {
  return await request.get('/monitor/findbycondition', {
    params: {
      well_name,
      well_code,
      status,
      town_name,
      village_name,
      remark,
    },
  })
}
