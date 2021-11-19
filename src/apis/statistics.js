import request from '../request'

/**
 * 统计报表列表
 * @param {string} place 村庄乡镇
 * @param {string} type 月季年
 * @param {number} time yyyy-mm-dd yyyy-mm yyyy yyyy-season-x
 * @returns
 */
export const fetchStatisticsList = async ({ type, time, place }) => {
  return await request.get('/statistics', {
    params: {
      type,
      time,
      place,
    },
  })
}

/**
 * 监测井安装量
 * @returns
 */
// 仍在使用的旧接口
export const fetchInstalledWell = async () => {
  return await request.get('/home/getvalveStatusCounts', {
    params: {
      valveType: 1
    },
  }
  )
}

export const fetchInstalledHydrant = async () => {
  return await request.get('/home/getvalveStatusCounts', {
    params: {
      valveType: 2
    },
  }
  )
}

/**
 * 全年指标
 * @param {number} year 年份
 * @returns
 */
export const fetchTarget = async ({ year }) => {
  return await request.get('/chart/info', {
    params: {
      year,
    },
  })
}
