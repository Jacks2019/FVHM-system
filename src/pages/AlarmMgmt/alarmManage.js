import request from "../../apis/3.0/request";

export const fetchAlarmManage = async () => {
  return await request.get('/warn/getwarninfos', {

  })
}