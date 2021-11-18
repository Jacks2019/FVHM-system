import request from './request'

export const fetchDataDetailByConfig = async ({ meterId, wellName, applicantName } = {}) => {
  return await request.Pget('/datadetail/getdatadetail', {
    params: {
      meterId,
      wellName,
      applicantName,
    },
  })
}
