import { createStore } from 'vuex'

// 创建一个新的 store 实例

export const setStore = (initState) => createStore({
  state() {
    return initState
  },
  mutations: {
    updateUser(state, payload) {
      const [ key, value ] = payload
      state.userInfo[key] = value
    },
    updateState(state, payload) {
      Object.assign(state, payload)
    }
  }
})

// 主应用接口返回全局信息时更新子应用的state的值
export const changeStoreSate = (onGlobalStateChange, store) => {
  onGlobalStateChange((state) => {
    store.commit('updateState', state)
  })
}