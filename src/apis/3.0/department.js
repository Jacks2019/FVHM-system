import request from './request'

export const fetchDepartmentsByNone = async () => {
  return await request.Pget('/department/getdepartmentinfo')
}
