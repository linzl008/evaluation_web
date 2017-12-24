import * as types from './mutation-types'
import Vue from 'vue'

export const setToken = async ({ commit }, token) => {
  commit(types.SET_TOKEN, token)
  // await tab.call(Vue.prototype)
}

export const setUser = ({ commit }, user) => {
  commit(types.SET_USER, user)
}



