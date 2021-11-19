import request from './2.0/request'

export const addAccount = async ({ username, password, describe }) => {
  return await request.Ppost('/user/register', {
    data: {
      name: username,
      passw: password,
      des: describe,
    },
  })
}

// 仍在使用的旧接口
export const fetchAccountsList = async () => {
  return await request.Pget('/user/getinfos')
}

export const deleteAccount = async ({ ids }) => {
  return await request.Pdelete('/user/deleteuser', {
    params: {
      idList: ids,
    },
  })
}

export const editAccountDesc = async ({ id, name, desc, password }) => {
  return await request.Pput('/user/updateuser', {
    data: {
      id,
      name,
      des: desc,
      passw: password,
    },
  })
}

export const editAccountPost = async ({ id, post }) => {
  return await request.Pput('/user/updateuser', {
    data: {
      id,
      post,
    },
  })
}

export const editAccountPassword = async ({ id, name, desc, password }) => {
  return await request.Pput('/user/updateuser', {
    data: {
      id,
      name,
      des: desc,
      passw: password,
    },
  })
}

// 仍在使用的旧接口
export const loginAccount = async ({ username, password }) => {
  return await request.post('/login', {
    data: {
      username,
      password,
    },
  })
}
