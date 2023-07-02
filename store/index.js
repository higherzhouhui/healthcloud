import Vue from 'vue'
import Vuex from 'vuex'
import { ACCESS_TOKEN, USER_NAME, USER_INFO } from "@/common/util/constants"
import { loginRequest } from '@/api/user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: uni.getStorageSync(USER_INFO),
    download: {
      isShowProgress: false,
      percent: 0
    }
  },
  mutations: {
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
      uni.setStorageSync(USER_INFO, userInfo);
    },
    SET_DOWLOADSTATUS: (state, data) => {
      state.download = Object.assign({}, state.download, data)
      if (state.download.isShowProgress) uni.hideTabBar()
      else uni.showTabBar()
    }
  },
  actions: {
    //手机号登录
    PhoneLogin({ state }, userInfo) {
      return new Promise((resolve, reject) => {
        loginRequest(userInfo).then(response => {
          if (response.code == 200) {
            const userInfo = response.data
            uni.setStorageSync(ACCESS_TOKEN, userInfo.token);
            uni.setStorageSync(USER_INFO, userInfo);
            // commit('SET_USERINFO', userInfo)
            state.userInfo = userInfo
          }
          resolve(response)
        }).catch((error) => {
          reject(error)
        })
      })
    },
    // 登出
    Logout({ commit }) {
      return new Promise((resolve) => {
        uni.removeStorageSync(ACCESS_TOKEN)
        uni.removeStorageSync(USER_INFO)
        resolve()
      })
    },
  },
  getters: {
    userInfo: state => { return uni.getStorageSync(USER_INFO).userInfo },
  }
})
