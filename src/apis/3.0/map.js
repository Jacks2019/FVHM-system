import request from './request'

export const fetchAlertApplicant = async () => {
  return await request.Pget('/chart/exceptionApplicant')
}

export const fetchTargetInfo = async ({ year } = {}) => {
  return await request.Pget('/chart/info', {
    params: {
      year,
    },
  })
}
