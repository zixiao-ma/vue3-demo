import { createStore } from 'vuex'
import {api_getMenus} from "@/api/user_api";

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
      token:undefined,
      tokenHead:undefined
    },
    menus:{
      menus:[]
    }
  },
  getters: {
    getToken(state){
      return state.userInfo.tokenHead!+state.userInfo.token
    },

    getMenuArr(state){
      const menus =state.menus.menus
      let newMenus: any[] = []

      /*
      * @function filterMenus 对menu数据进行二次处理
      * */
      try {
         menus.forEach((item: any, index: number) => {
          if (item.parentId === 0) {
            newMenus.push(item)
            item['children'] = []
          }
        })
        newMenus.forEach((item: any) => {
          menus.forEach((ite: any) => {
            if (ite.parentId === item.id) {
              item['children'].push(ite)
            }
          })
        })
      } catch (error) {

      }
      return newMenus

    }
  },
  mutations: {
    setUserInfo(state,userInfo){
      state.userInfo = userInfo
    },
    setMenus(state,payload){
      state.menus = payload
    },
    loginOut(state){
      state.userInfo = {
        token:undefined,
        tokenHead:undefined
      }
      state.menus = {
        menus:[]
      }
    },
  },
  actions: {
  async getMenusList({commit}){
  try {
    const menus = await api_getMenus()
    console.log(menus)
    commit('setMenus',menus)
    } catch (error) {
  return Promise.reject(error)
    }
    }
  },
  modules: {
  },
  plugins: [
    saveStoreData
  ]
})
