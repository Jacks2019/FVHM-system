import request from './request'

export const fetchLicenseByConfig = async ({ applicantName, end, license, start } = {}) => {
  return await request.Pget('/license/getlicenseinfo', {
    params: {
      applicantName,
      end,
      license,
      start,
    },
  })
}

export const deleteLicenseById = async ({ licenseId }) => {
  return await request.delete('/license/deletelicenseinfo', {
    params: {
      licenseId,
    },
  })
}

export const editLicenseByConfig = async ({
  applicantId,
  available,
  departmentId,
  id,
  license,
  licenseVolume,
  startTime,
}) => {
  return await request.put('/license/updatelicenseinfo', {
    data: {
      applicantId,
      available,
      departmentId,
      id,
      license,
      licenseVolume: (licenseVolume || 0) * 10000,
      startTime,
    },
  })
}

export const addLicenseByConfig = async ({
  applicantId,
  available,
  departmentId,
  license,
  licenseVolume,
  startTime,
}) => {
  return await request.post('/license/insertlicenseinfo', {
    data: {
      applicantId,
      available,
      departmentId,
      license,
      licenseVolume: (licenseVolume || 0) * 10000,
      startTime,
    },
  })
}
