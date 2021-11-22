import request from './request'


export const fetchMonthCity = async({ month, list })=>{
    return await request.Ppost('/monthreport/getcityinfos', {
        params: {
          month,
        },
        data: list,
      })
}

export const fetchMonthArea = async({ month, list })=>{
    return await request.Ppost('/monthreport/getareainfos', {
        params: {
          month,
        },
        data: list,
      })
}

export const fetchMonthTown = async({ month, list })=>{
    return await request.Ppost('/monthreport/gettowninfos', {
        params: {
          month,
        },
        data: list,
      })
}

export const fetchMonthDistrict = async({ month, list })=>{
    return await request.Ppost('/monthreport/getdistrictinfos', {
        params: {
          month,
        },
        data: list,
      })
}

export const fetchMonthVillage = async({ month, list })=>{
    return await request.Ppost('/monthreport/getvillageinfos', {
        params: {
          month,
        },
        data: list,
      })
}

export const fetchMonthRoad = async({ month, list })=>{
    return await request.Ppost('/monthreport/getroadinfos', {
        params: {
          month,
        },
        data: list,
      })
}