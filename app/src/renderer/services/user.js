/**
 * 用户Service
 */

import * as API from './API'
import { post, postJson } from '../utils/http-rest'
import { httpResultProxy } from '../utils/proxy'
// const base64 = require('js-base64').Base64

let headers = {'Content-type': 'application/json;charset=UTF-8'}

/**
 * 用户登录
 * @return {Object} 返回结果Promise
 */
export function login (payload) {
    let it = payload[Symbol.iterator]()
    let args = {
        username: it.next().value,
        password: it.next().value
    }
    console.info('===========>')
    return post(API.LOGIN, args)
}

/**
 * 注册
 */
export function regist (payload) {
    let it = payload[Symbol.iterator]()
    let args = {
        username: it.next().value,
        password: it.next().value
    }

    let promise = postJson(API.REGIST, args, {headers: headers})
    return httpResultProxy(promise)
}

/**
 * 退出
 */
export function logout () {

}

/**
 * TODO 暂时不做分页优化
 * 返回所有用户
 */
export function findAllUser (userJson) {
    // let userJson = JSON.stringify(user)
    // console.log(userJson)
    return postJson(API.FIND_ALL_USER, userJson)
}

/**
 * 保存用户
 * @param user
 */
export function save (user) {
    return postJson(API.SAVE_USER, user)
}

/**
 * 删除用户
 * @param id
 */
export function del (id) {
    return post(API.DELETE_USER, {id: id})
}