import request from './request'

export const getMeterTypes = async () => {
  return await request.Pget('/meter/getallmetertypes')
}
