import request from '../request'

/**
 * 各地区年度用水量
 * @param {number} year 年份
 * @returns
 */
export const fetchWaterYear = async ({ year }) => {
  return await request.get('/water/year', {
    params: {
      year,
    },
  })
}

/**
 * 总计每月用水量
 * @param {number} year 年份
 * @returns
 */
export const fetchWaterTotal = async ({ year }) => {
  return await request.get('/water/total', {
    params: {
      year,
    },
  })
}

/**
 * 用水统计列表
 * @param {string} type 月季年
 * @param {number} count 1-12 1-4 2019
 * @returns
 */
export const fetchWaterPlace = async ({ type, count }) => {
  return await request.get('/water/total', {
    params: {
      type,
      count,
    },
  })
}
