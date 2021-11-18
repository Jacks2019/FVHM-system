import request from '../request'

/**
 * 报警管理列表
 * @param {number | string} id 报警id
 * @param {number | string} well 阀门id
 * @param {string} name
 * @param {string} type
 * @param {string} village
 * @param {string} status
 * @param {string} start 开始时间
 * @param {string} end 结束时间
 * @returns
 */
// 仍在使用的旧接口
export const fetchWarningsList = async ({ applicantName, startTime, endTime, status, wellName }) => {
  return await request.get('/warn/findwarninfo', {
    params: {
      applicantName,
      startTime,
      endTime,
      status,
      wellName,
    },
  })
}
