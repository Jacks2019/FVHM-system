import request from './request'

export const fetchCityMixed = async ({ month, list }) => {
  return await request.Ppost('/monthreport/getcityinfos', {
    params: {
      month,
    },
    data: list,
  })
}

export const fetchAreaMixed = async ({ month, list }) => {
  return await request.Ppost('/monthreport/getareainfos', {
    params: {
      month,
    },
    data: list,
  })
}

export const fetchDistrictMixed = async ({ month, list }) => {
  return await request.Ppost('/monthreport/getdistrictinfos', {
    params: {
      month,
    },
    data: list,
  })
}

export const fetchApplicantMixed = async ({ month, zoneId, zoneType }) => {
  return await request.Pget('/monthreport/getapplicantsinfos', {
    params: {
      month,
      zoneId,
      zoneType,
    },
  })
}

export const fetchTownMixed = async ({ month, list }) => {
  return await request.Ppost('/monthreport/gettowninfos', {
    params: {
      month,
    },
    data: list,
  })
}
