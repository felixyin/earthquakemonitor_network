/**
 * 对http请求参数代理
 */
export function argumentsProxy (vo) {
    if (vo) {
        if (typeof vo.revert === 'function') {
            return vo.revert()
        } else {
            return vo
        }
    } else {
        return null
    }
}

/**
 * 对http结果代理
 */
export function httpResultProxy (resultPromise, VO = null) {
    return new Promise((resolve, reject) => {
        resultPromise.then(res => {
            if (res) {
                if (res.status === true) {
                    resolve(mapVO(VO, res.data))
                } else {
                    reject(res.message)
                }
            } else {
                reject('服务器返回数据异常')
            }
        }, (error) => {
            throw error
        }).catch(error => {
            if (error.response) {
                // throw new Error('服务器异常！')
                // console.log(error.response)
                if (error.response.errno == 'ECONNREFUSED') {
                    reject('网络已断开或服务器已宕机')
                } else if (error.response.status == '401') {
                    reject('请求状态：401，没有权限！')
                } else {
                    reject('服务器异常！')
                }
            } else {
                // throw new Error('系统异常！')
                reject('系统异常！')
            }
        })
    })
}

function mapVO (VO, data) {
    if (VO) {
        if (Array.isArray(data)) {
            let arr = []
            for (let item of data) {
                arr.push(new VO(item))
            }
            return arr
        } else {
            return new VO(data)
        }
    } else {
        return data
    }
}
