/**
 * 账号信息VO
 */

export default class UserVO {
    constructor (data) {
        this.id = data.id || ''
        this.useranme = data.username || ''
        this.password = data.password || ''
        this.phone = data.phone || ''
        this.role = data.role || ''
        this.status = data.status || ''
    }
}
