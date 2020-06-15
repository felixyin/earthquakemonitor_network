/**
 * 校区管理Service
 */

import * as API from './API'
import { get, post } from '../utils/http'
import { httpResultProxy } from '../utils/proxy'

function headers () {
  return {headers: {...global.__Authorization}}
}

/**
 * 获取校区
 * @param {String} orgId 机构ID
 */
export function getRegions (orgId) {
  let promise = get(API.GET_REGIONS + `/${orgId}`, null, headers())
  return httpResultProxy(promise, null)
}

/**
 * 添加校区
 */
export function addRegion (payload) {
  let it = payload[Symbol.iterator]()
  let args = {
    org_id: it.next().value,
    campus_name: it.next().value
  }

  let promise = post(API.ADD_REGION, args, {headers: {...global.__Authorization}})
  return httpResultProxy(promise)
}

/**
 * 获取服务中心
 * @param {String} campusId 校区ID
 */
export function getSchools (campusId) {
  let promise = get(API.GET_SCHOOLS + `/${campusId}`, null, {headers: headers})
  // return httpResultProxy(promise, SchoolVO)
  return null
}

/**
 * 添加服务中心
 */
export function addSchool (payload) {
  let it = payload[Symbol.iterator]()
  let args = {
    org_id: it.next().value,
    campus_id: it.next().value,
    school_name: it.next().value
  }

  let promise = post(API.ADD_SCHOOL, args, {headers: headers})
  return httpResultProxy(promise)
}
