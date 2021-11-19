import request from '../request'

export const fetchWellsList = async ({ number, name, town, village }) => {
  return await request.get('/well', {
    params: {
      number,
      name,
      town,
      village,
    },
  })
}

/**
 * 特定阀门(在一定时间范围内的)累计用水量
 * @param {number | string} id 阀门id
 * @param {string} type 月季年
 * @returns
 */
export const fetchWellsTotal = async ({ id, type }) => {
  return await request.get('/well/total/' + id, {
    params: {
      type,
    },
  })
}

/**
 * 特定阀门信息
 * @param {阀门id} id
 * @returns
 */
export const fetchWellInfo = async ({ id }) => {
  return await request.get('/well/total/' + id)
}

/**
 * 特定阀门实况数据
 * @param {阀门id} id
 * @returns
 */
export const fetchWellData = async ({ id }) => {
  return await request.get('/well/data/' + id)
}

/**
 * 添加阀门
 */
export const addWellInfo = async ({
  name,
  number, // 阀门编号
  town,
  village,
  longtitude,
  latitude,
  person, // 管理员
  phone,
  area, // 灌溉地区
  volume, // 累计用水量
  diameter, // 口径
  depth, // 井深
  createTime,
  metering, // 计量设备
  count, // 通讯编号
}) => {
  return await request.post('/well/create', {
    data: {
      name,
      number, // 阀门编号
      town,
      village,
      longtitude,
      latitude,
      person, // 管理员
      phone,
      area, // 灌溉地区
      volume, // 累计用水量
      diameter, // 口径
      depth, // 井深
      createTime,
      metering, // 计量设备
      count, // 通讯编号
    },
  })
}

/**
 * 修改阀门信息 需要传入整个well对象（用解构方式把 原对象内属性 和 已修改属性 合并后，给入这个函数）
 */
export const editWellInfo = async ({
  id,
  name,
  number, // 阀门编号
  town,
  village,
  longtitude,
  latitude,
  person, // 管理员
  phone,
  area, // 灌溉地区
  volume, // 累计用水量
  diameter, // 口径
  depth, // 井深
  createTime,
  metering, // 计量设备
  count, // 通讯编号
}) => {
  return await request.put('/well/edit', {
    data: {
      id,
      name,
      number, // 阀门编号
      town,
      village,
      longtitude,
      latitude,
      person, // 管理员
      phone,
      area, // 灌溉地区
      volume, // 累计用水量
      diameter, // 口径
      depth, // 井深
      createTime,
      metering, // 计量设备
      count, // 通讯编号
    },
  })
}

/**
 * 修改阀门备注
 */
export const editWellRemark = async ({ id, remark }) => {
  return await request.put('/well/remark', {
    data: {
      id,
      remark,
    },
  })
}

/**
 * 删除阀门
 */
export const deleteWellInfo = async ({ id }) => {
  return await request.delete('/well/delete', {
    data: {
      id,
    },
  })
}
