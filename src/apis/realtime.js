import request from '../request'

/**
 * 实时监测信息
 * @returns
 */
export const fetchRealTime = async options => {
  const { name, number, warning, village, town, running, online, remark } = options || {}
  return await request.get('/realtime', {
    params: {
      name,
      number,
      warning,
      village,
      town,
      running,
      online,
      remark,
    },
  })
}
