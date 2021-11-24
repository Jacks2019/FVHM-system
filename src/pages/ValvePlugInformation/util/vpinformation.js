import request from "../../../apis/3.0/request";

export const fetchVpinformation = async () => {
  return await request.get('/valveinfo/getvalveinfos', {
    
  })
}
