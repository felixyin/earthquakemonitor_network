/**
 * 用户模块
 */

import * as service from '../../services/user'
import * as types from '../mutation-types'
import UserVO from '../../services/model/UserVO'
const base64 = require('js-base64').Base64

let id = window.sessionStorage.id || ''

// initial state
const state = new UserVO(id)

// getters
const getters = {
  hasLoggedIn: state => state.id
}

// actions
const actions = {
  login ({commit, state}, payload) {
    return service.login(payload).then(user => {
      console.info(user)

      window.sessionStorage.id = user.id

      commit(types.SET_ACCOUNT, user)
    }).catch(e => {
      console.log(e.response)
      throw e.toString()
    })
  },
  regist ({commit, state}, payload) {
    return service.regist(payload).then(data => {
      window.sessionStorage.id = data
      commit(types.SET_ACCOUNT, {id: data})
    })
  },
  logout ({commit, state}) {
    window.sessionStorage.clear()
    commit(types.RESET_STATE)
  }
}

// mutations
const mutations = {
  [types.SET_ACCOUNT] (state, data) {
    Object.assign(state, data)
  },
  [types.RESET_STATE] (state) {
    state.userId = '' // TODO
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
