import request from './request'

export const fetchMenuListById = async ({ id }) => {
  return await request.Pget('/role/roleMenu/' + id)
}

export const fetchApiListById = async ({ id }) => {
  return await request.Pget('/role/roleApi/' + id)
}

export const saveMenuByList = async ({ id, list }) => {
  return await request.post('/role/roleMenu/set', {
    params: {
      roleId: id,
    },
    // data: {
    //   sysRoleAndPermissionVos: list,
    // },
    data: list,
  })
}

export const saveApiByList = async ({ id, list }) => {
  return await request.post('/role/roleApi/set', {
    params: {
      roleId: id,
    },
    // data: {
    //   sysRoleAndPermissionVos: list,
    // },
    data: list,
  })
}

export const fetchMenuListByNone = async () => {
  return await request.Pget('/menu/getinfos')
}

export const fetchApiListByNone = async () => {
  return await request.Pget('/api/getinfos')
}

export const addMenuByConfig = async ({ pid, description, frontendMenuName, frontendMenuSort, frontendMenuUrl }) => {
  return await request.post('/menu/insertmenu', {
    data: {
      frontendMenuName,
      frontendMenuSort,
      frontendMenuUrl,
      description,
      pid,
    },
  })
}

export const addApiByConfig = async ({
  pid,
  description,
  backendApiName,
  backendApiMethod,
  backendApiSort,
  backendApiUrl,
}) => {
  return await request.post('/api/insertapi', {
    data: {
      backendApiName,
      backendApiSort,
      backendApiUrl,
      description,
      backendApiMethod,
      pid,
    },
  })
}

export const editMenuByConfig = async ({
  pid,
  description,
  frontendMenuName,
  frontendMenuSort,
  frontendMenuUrl,
  frontendMenuId,
}) => {
  return await request.put('/menu/updatemenu', {
    data: {
      pid,
      description,
      frontendMenuName,
      frontendMenuSort,
      frontendMenuUrl,
      frontendMenuId,
    },
  })
}

export const editApiByConfig = async ({
  backendApiName,
  backendApiSort,
  backendApiUrl,
  description,
  backendApiMethod,
  pid,
  backendApiId,
}) => {
  return await request.put('/api/updateapi', {
    data: {
      backendApiName,
      backendApiSort,
      backendApiUrl,
      description,
      backendApiMethod,
      pid,
      backendApiId,
    },
  })
}

export const deleteMenuById = async ({ id }) => {
  return await request.delete('/menu/deletemenu', {
    params: {
      idList: id,
    },
  })
}

export const deleteApiById = async ({ id }) => {
  return await request.delete('/api/deleteapi', {
    params: {
      idList: id,
    },
  })
}
