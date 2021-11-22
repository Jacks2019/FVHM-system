export const authority = {
  namespaced: true,
  state: () => {
    let authority = [
      {
        id: '2233',
        name: 'admin',
        capacity: [],
      },
    ]
    return {
      authority,
    }
  },
  mutations: {
    setCapacity(state, { id, capacity }) {
      const authority = state.authority.find(item => item.id === id)
      if (authority) {
        authority.capacity = capacity
      }
    },
  },
  actions: {
    async fetchAuthority(context) {},
  },
}
