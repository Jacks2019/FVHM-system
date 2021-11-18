import request from './request'

export const fetchAccountsListById = async ({ id }) => {
  return await request.Pget('/role/roleUser/' + id)
}

export const fetchPostById = async ({ id }) => {
  return await request.Pget('/role/getinfo/' + id)
}

export const saveAccount2PostByList = async ({ id, list }) => {
  return await request.post('/role/roleUser/set', {
    params: {
      roleId: id,
    },
    // data: {
    //   sysRoleAndPermissionVos: list,
    // },
    data: list,
  })
}
