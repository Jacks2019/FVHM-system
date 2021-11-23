export const statuss = [
  {
    value: 1001,
    label: '正常运行',
  },
  {
    value: 1002,
    label: '尚未安装',
  },
  {
    value: 1003,
    label: '已经停用',
  },
  {
    value: 4444,
    label: '正在报警',
  },
]
export const alarmType = [
  {
    value: 1,
    label: '阀门故障',
  },
  {
    value: 2,
    label: '消防栓故障',
  },
  {
    value: 3,
    label: '水量超额',
  },
  {
    value: 4,
    label: '监测设备电量不足',
  }
]
export const alarmStatus = [
  {
    value: 0,
    label: '未处理',
  },
  {
    value: 1,
    label: '已处理',
  }
]
export const types = [
  {
    value: 1,
    label: '阀门',
  },
  {
    value: 2,
    label: '消防栓',
  },
]

export const usages = [
  {
    value: 1,
    label: '工业用水',
  },
  {
    value: 2,
    label: '农业用水',
  },
  {
    value: 3,
    label: '生态用水',
  },
  {
    value: 4,
    label: '生活用水',
  },
]

export const departments = [
  {
    label: '水利局',
    value: 1,
  },
]

export const licenseStates = [
  {
    label: '可用',
    value: 1,
  },
  {
    label: '不可用',
    value: 2,
  },
]

const transObjValueToStr = (obj, num) => {
  const idx = obj.findIndex(item => item.value === num)
  if (idx >= 0) {
    return obj[idx].label
  }
  return ''
}

export const transWellUsageToStr = num => {
  return transObjValueToStr(usages, num)
}

export const transWellStatusToStr = num => {
  return transObjValueToStr(statuss, num)
}

export const transWellTypeToStr = num => {
  return transObjValueToStr(types, num)
}

export const transDepartmentsToStr = num => {
  return transObjValueToStr(departments, num)
}
