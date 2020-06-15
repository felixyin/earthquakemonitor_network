/**
 * Created by fy on 2017/3/4.
 */

/**
 * 导航对象
 * 包含所有的导航信息：
 * name：'' 模块名
 * index：''
 * substation：''  变电站参数
 */
export default class NavigationVo {
    constructor (data) {
        // 路由名称
        this.name = data.name || ''
        // 变电站id
        this.substation = data.substation || ''
    }
}
