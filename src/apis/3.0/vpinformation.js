import request from "./request";

export const fetchVpinformation = async () => {
  return await request.get('/valveinfo/getvalveinfos', {
    
  })
}
