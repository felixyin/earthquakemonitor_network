/**
 * mutation类型配置
 */

export const SET_PAGE_PROGRESS = 'SET_PAGE_PROGRESS'

export const RESET_STATE = 'RESET_STATE'

export const SET_ACCOUNT = 'SET_ACCOUNT'

// 用于判断是否是登录页面，如果是，则显示背景图片
export const LOGIN_PAGE_SHOW = 'LOGIN_PAGE_SHOW'

// 用于当点击侧边菜单时，同步显示工作站的名称到header中的title上
export const WORKSTATION_NAME = 'WORKSTATION_NAME'

// 头部按钮和侧边栏导航
export const NAV_EMIT = 'MENU_NAV_EMIT'

// 页面可见区域高度
export const SET_CLIENT_HEIGHT = 'SET_CLIENT_HEIGHT'

// 收到地震预警后，实时显示地震烈度图
export const SET_REAL_TIME_EARLY_WARNING = 'SET_REAL_TIME_EARLY_WARNING'

export const SET_ACTIVE_MENU = 'SET_ACTIVE_MENU'