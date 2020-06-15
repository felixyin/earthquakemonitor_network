/**
 * 全局mutation处理
 */

import * as types from './mutation-types'

export const state = {
  pageProgress: 0,
  isLoginPageShow: false,
  workstationName: '主页',
  clientHeight: document.body.clientHeight - 110,
  tabHeight: document.body.clientHeight - 200,
  realTimeEarlyWarning: '',
  activeMenu: 'home'
}

export const mutations = {
  // 设置页面进度
  [types.SET_PAGE_PROGRESS] (state, progress) {
    state.pageProgress = progress
  },
  // 重置state
  [types.RESET_STATE] (state) {

  },
  [types.LOGIN_PAGE_SHOW] (state, isShown) {
    state.isLoginPageShow = isShown
  },
  [types.WORKSTATION_NAME](state, name){
    state.workstationName = name
  },
  [types.SET_CLIENT_HEIGHT](state, height){
    state.clientHeight = height
    state.tabHeight = height - 200
  },
  [types.SET_REAL_TIME_EARLY_WARNING](state, realTimeEarlyWarning){
    state.realTimeEarlyWarning = realTimeEarlyWarning
  },
  [types.SET_ACTIVE_MENU](state, activeMenu){
    state.activeMenu = activeMenu
  }
}
