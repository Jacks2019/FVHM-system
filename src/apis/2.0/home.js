import request from './request'

export const fetchWellInstalled = async () => {
  return await request.get('/home/getwellStatusCounts')
}

export const totalconsumedofyear = async ({ year,valveType }) => {
  return await request.get('/home/totalconsumedofyear', {
    params: {
      year,
      valveType,
    },
  })
}

export const fetchMounthCostByYear = async ({ year }) => {//useless
  return await request.get('/home/monthconsumed', {
    params: {
      year,
    },
  })
}

export const fetchMounthCostByYearAndWell = async ({ year, id }) => {
  return await request.get('/wellinfo/findmonthvolumebyyear', {
    params: {
      year,
      wellId: id,
    },
  })
}

export const fetchCostRank = async ({ year }) => {
  return await request.get('/home/rankwaterconsumed', {
    params: {
      year,
    },
  })
}

export const fetchWaterCostByYear = async ({ year }) => {//
  return await request.get('/home/waterconsumed', {
    params: {
      year,
    },
  })
}

export const fetchDis=async({valveType}) => {
  return await request.get('/home/roadvalvecount',{
    params:{
      valveType,
    },
  })
}
