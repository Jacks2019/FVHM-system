import request from "../../apis/3.0/request";

export const fetchFindData = async(num)=>{
  return await request.get('/valveinfo/findvalveinfosbyconditions', {
    params: {
      valveCode:num,
    },
  })
}

