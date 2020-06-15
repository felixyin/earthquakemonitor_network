/**
 * 导航模块
 */

import * as types from '../mutation-types'
import NavigationVo from '../../services/model/NavigationVo'

let name = window.sessionStorage.name || ''
let substation = window.sessionStorage.substation || ''

// initial state
const state = new NavigationVo(name, substation)

// getters
const getters = {
    getName: state => state.name,
    getSubstation: state => state.substation
}

// actions
const actions = {
    menuNav({commit, state}, name){
        return new Promise((resolve, reject) => {
            let substation = state.substation

            window.sessionStorage.name = name
            commit(types.NAV_EMIT, {name, substation})

            if (!substation) {
                throw '请选择要查看的变电站'
            }

            window.sessionStorage.substation = substation
            commit(types.NAV_EMIT, {name, substation})

            resolve({name: name, params: {substation}})
        })
    },
    substationNav({commit, state}, substation){
        return new Promise((resolve, reject) => {
            let name = state.name

            window.sessionStorage.substation = substation
            commit(types.NAV_EMIT, {name, substation})

            if (!name) {
                throw '请在上面选择按钮'
            }

            window.sessionStorage.name = name
            commit(types.NAV_EMIT, {name, substation})

            resolve({name: name, params: {substation}})
        })
    }
}

// mutations
const mutations = {
    [types.NAV_EMIT] (state, data) {
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
