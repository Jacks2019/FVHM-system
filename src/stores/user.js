export const user = {
  namespaced: true,
  state: () => {
    let user = {
      name: 'default',
      token: '12'
    };
    const userStr = localStorage.getItem('user');
    if (userStr) {
      user = JSON.parse(userStr);
    }
    return {
      user
    }
  },
  getters: {
    token(state) {
      return state.user?.token
    },
    name(state) {
      return state.user?.name
    }
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {
    async login(context) {
      const user = {
        name: 'zhang',
        token: '123123'
      };
      localStorage.setItem('user', JSON.stringify(user));
      context.commit('setUser', user);
    }
  },
};
