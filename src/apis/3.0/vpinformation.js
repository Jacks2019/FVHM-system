import request from "./request";

export const fetchVpinformation = async () => {
  return await request.Pget('/valveinfo/getvalveinfos', {
    params: {
    },
  })
}
