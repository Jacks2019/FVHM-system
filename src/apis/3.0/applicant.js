import request from './request'

export const fetchApplicantByName = async ({ applicant_name } = {}) => {
  return await request.Pget('/applicant/getapplicantinfo', {
    params: {
      applicant_name,
    },
  })
}

export const addApplicantByName = async ({
  applicantName,
  cardId,
  category,
  coApplicant,
  code,
  contactPerson,
  departmentId,
  legalPerson,
  liveAddress,
  phone,
  productAddress,
  zoneId,
  zoneType,
} = {}) => {
  return await request.post('/applicant/insertapplicantinfo', {
    data: {
      applicantName,
      cardId,
      category,
      coApplicant,
      code,
      contactPerson,
      departmentId,
      legalPerson,
      liveAddress,
      phone,
      productAddress,
      zoneId,
      zoneType,
    },
  })
}

export const editApplicantByName = async ({
  applicantId,
  applicantName,
  cardId,
  category,
  coApplicant,
  code,
  contactPerson,
  departmentId,
  legalPerson,
  liveAddress,
  phone,
  productAddress,
  zoneId,
  zoneType,
} = {}) => {
  return await request.put('/applicant/updateapplicantinfo', {
    data: {
      applicantId,
      applicantName,
      cardId,
      category,
      coApplicant,
      code,
      contactPerson,
      departmentId,
      legalPerson,
      liveAddress,
      phone,
      productAddress,
      zoneId,
      zoneType,
    },
  })
}

export const deleteApplicantById = async ({ applicantId }) => {
  return await request.delete('/applicant/deleteapplicantinfo', {
    params: {
      applicantId,
    },
  })
}

export const getWellById = async ({ applicantId }) => {
  return await request.get('/applicant/getwellinfos', {
    params: {
      applicantId,
    },
  })
}

export const assignWellById = async ({ wellIds = [], applicantId }) => {
  return await request.post('/applicant/assignwell', {
    data: wellIds.map(item => {
      return {
        wellId: item,
        applicantId,
      }
    }),
  })
}
