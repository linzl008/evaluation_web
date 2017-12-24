/**
 * Created by Linzl on 2017/09/26.
 */
import * as types from '../mutation-types'
import Vue from 'vue'

const state = {
  'token': '',
  'user': {}
}

const mutations = {
  [types.SET_TOKEN] (state, token) {
    // console.log("mutations",Vue.prototype.$http)
    // Vue.prototype.$http.defaults.headers.common['token'] = token
    state.token = token
  },

  [types.SET_USER] (state, user) {
    state.user = user
  }
}

export default {
  state,
  mutations
}
