import { createStore } from 'vuex'
import { user } from './user'
import { authority } from './authority'
import { utils } from './utils'

export const store = createStore({
  modules: {
    user,
    authority,
    utils,
  },
})
