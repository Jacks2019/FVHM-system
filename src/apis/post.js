import request from './2.0/request'

export const fetchPostList = async () => {
  return await request.Pget('/role/getinfos')
}

export const addPost = async ({ name, desc }) => {
  return await request.Ppost('/role/insertrole', {
    data: {
      roleName: name,
      description: desc,
    },
  })
}

export const editPostByConfig = async ({ roleId, roleName, description }) => {
  return await request.Pput('/role/updaterole', {
    data: {
      roleId,
      roleName,
      description,
    },
  })
}

export const deletePost = async ({ id }) => {
  return await request.Pdelete('/role/deleterole', {
    params: {
      idList: id,
    },
  })
}

export const fetchGlobalAuthority = async () => {
  return await request.Pget('/global/funcs')
}
