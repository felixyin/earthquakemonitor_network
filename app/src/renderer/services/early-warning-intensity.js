/**
 * Created by fy on 20/04/2017.
 */

import * as API from './API'
import { postJson } from '../utils/http-rest'

/**
 * 返回所有震源历史
 * @return {Object} 返回结果Promise
 */
export function findAll () {
    return postJson(API.FIND_ALL_EARLY_WARNING_INTENSITY, {data: {}})
}
