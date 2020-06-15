/**
 * 全局action处理
 */

import * as types from './mutation-types'

/**
 * 设置页面进度
 */
export const setPageProgress = ({commit}, progress) => {
  commit(types.SET_PAGE_PROGRESS, progress)
  if (progress === 100) {
    setTimeout(() => {
      commit(types.SET_PAGE_PROGRESS, 0)
    }, 500)
  }
}

/**
 * 重置STORE
 */
export const resetStore = ({commit}) => {
  commit(types.RESET_STATE)
}

/**
 *
 * @param commit
 * @param isShown
 */
export const setLoginPageShow = ({commit}, isShown) => {
  commit(types.LOGIN_PAGE_SHOW, isShown)
}

/**
 * @param commit
 * @param name
 */
export const setWorksationName = ({commit}, name) => {
  commit(types.WORKSTATION_NAME, name)
}

/**
 * 设置页面可见区域高度
 * @param commit
 * @param height
 */
export const setClientHeight = ({commit}, height) => {
  commit(types.SET_CLIENT_HEIGHT, height)
}

/**
 *
 */
export const setRealTimeEarlyWarning = ({commit}, rtew) => {
  commit(types.SET_REAL_TIME_EARLY_WARNING, rtew)
}

export const setActiveMenu = ({commit}, activeMenu) => {
  commit(types.SET_ACTIVE_MENU, activeMenu)
}
