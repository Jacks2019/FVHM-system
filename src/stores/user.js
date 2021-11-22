import { loginAccount } from '../apis/account'

export const user = {
  namespaced: true,
  state: () => {
    let user
    const userStr = localStorage.getItem('user')
    if (userStr) {
      user = JSON.parse(userStr)
    }
    return {
      user,
    }
  },
  getters: {
    token(state) {
      return state.user?.token
    },
    menus(state) {
      const res = []
      if (!state.user) {
        return res
      }
      const menus = state.user.menus
      menus &&
        menus.forEach(item => {
          !item.pid &&
            res.push({
              id: item.frontendMenuId,
              label: item.frontendMenuName,
              path: item.frontendMenuUrl,
            })
        })
      menus &&
        menus.forEach(item => {
          if (item.pid) {
            const it = res.find(it => it.id === item.pid)
            if (it) {
              it.children = (it.children || []).concat({
                id: item.frontendMenuId,
                label: item.frontendMenuName,
                path: it.path + item.frontendMenuUrl,
              })
            }
          }
        })
      return res
    },
    username(state) {
      return state.user?.username
    },
    auth(state) {
      return state.user?.auth
    },
    postID(state) {
      return state.user?.post
    },
    support() {
      return ['func-well-add', 'func-well-export', 'func-well-file', 'func-well-edit', 'func-well-delete']
    },
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
  },
  actions: {
    async login(context, { username, password }) {
      const { message, data: user } = await loginAccount({ username, password })
      if (!user) {
        return message
      }
      localStorage.setItem('user', JSON.stringify(user))
      context.commit('setUser', user)
      context.dispatch('utils/fetchAddr', null, { root: true })
      return true
    },
    logout(context) {
      localStorage.removeItem('user')
      context.commit('setUser', undefined)
    },
  },
}
