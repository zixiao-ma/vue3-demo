import { createStore } from 'vuex'
const saveStoreData = (store:any) => {
  const key = 'VUE_STORE_KEY'
  const storage = window.sessionStorage
  const data = storage.getItem(key)
  data && store.replaceState(JSON.parse(data))

  store.subscribe((mutation:object, state:object) => {
    storage.setItem(key, JSON.stringify(state))
  })
}
export default createStore({
  state: {
    userInfo:{
      token:undefined
    }
  },
  getters: {
    getToken(state){
      return state.userInfo.token
    }
  },
  mutations: {
    setUserInfo(state,userInfo){
      state.userInfo = userInfo
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [
    saveStoreData
  ]
})
