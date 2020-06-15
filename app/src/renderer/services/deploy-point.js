/**
 * Created by fy on 20/04/2017.
 */

import * as API from './API'
import { postJson } from '../utils/http-rest'

/**
 * 返回所有部署点
 * @return {Object} 返回结果Promise
 */
export function findAllDeployPoint () {
    return postJson(API.FIND_ALL_DEPLOY_POINT, {data: {}})
}
