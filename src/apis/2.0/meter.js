import request from './request'

export const getMeterType = async () => {
  return await request.get('/meter/getmetertype')
}

export const insertMeterInfo = async ({ wellId, meterCode, meterName, meterNo, status, createTime }) => {
  return await request.post('/meter/insertmeterinfo', {
    params: {
      wellId,
    },
    data: {
      meterCode,
      meterName,
      meterNo,
      status,
      createTime,
    },
  })
}

export const updateMeterInfo = async ({ meterId, meterCode, meterNo, meterName, status, createTime }) => {
  return await request.put('/meter/updatemeterinfo', {
    data: {
      meterId,
      meterCode,
      meterNo, // 类型
      meterName,
      status,
      createTime,
    },
  })
}

export const deleteMeterInfo = async ({ meter_id }) => {
  return await request.delete('/meter/deletemeterinfo', {
    params: {
      meterId: meter_id,
    },
  })
}
