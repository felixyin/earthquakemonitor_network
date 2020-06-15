import { assign } from '../utils/polyfill'

const DEFAULT_AMP_CONFIG = {
  // key: null,
  // v: 1.3,
  protocol: 'http',
  hostAndPath: '//139.224.1.36:8080/amapui.js',
  // hostAndPath: 'webapi.amap.com/ui/1.0/main.js',
  // plugin: [],
  // callback: 'amapInitComponent'
}

export default class AMapUIAPILoader {
  /**
   * @param config required 初始化参数
   */
  constructor (config) {
    this._config = assign({}, DEFAULT_AMP_CONFIG, config)
    this._document = document
    this._window = window
    // this._scriptLoaded = false
    // this._queueEvents = []
  }

  load () {
    if (this._window.AMapUI) {
      return this._window.AMapUI
      // return Promise.resolve()
    }

    // if (this._scriptLoadingPromise) return this._scriptLoadingPromise
    const script = this._document.createElement('script')
    script.type = 'text/javascript'
    script.async = false
    script.defer = false
    script.src = this._getScriptSrc()
    // script.onload = function () {
    //   if (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete') {
    //     script.onload = script.onreadystatechange = null
    //
    //     AMapUI.requireConf = {
    //       'skipDataMain': true,
    //       'config': {
    //         'lib/conf': {
    //           'productWebRoot': 'http://webapi.amap.com/ui',
    //           'mainVersion': '1.0',
    //           'patchVersion': '5',
    //           'fullVersion': '1.0.5'
    //         }
    //       },
    //       'map': {
    //         '*': {
    //           'css': 'polyfill/require/require-css/css',
    //           'text': 'polyfill/require/require-text/text'
    //         }
    //       },
    //       'shim': {
    //         'jquery': {
    //           'exports': '$'
    //         },
    //         'zepto': {
    //           'exports': '$'
    //         }
    //       },
    //       'paths': {
    //         'jquery': 'plug/ext/jquery-1.12.4.min',
    //         'zepto': 'plug/ext/zepto-1.2.0.min'
    //       },
    //       'baseUrl': 'http://webapi.amap.com/ui/1.0/'
    //     }
    //   }
    // }

    // this._scriptLoadingPromise = new Promise((resolve, reject) => {
    //   this._window['amapInitComponent'] = () => {
    //     this._queueEvents.forEach(event => event())
    //     while (this._queueEvents.length) {
    //       this._queueEvents.pop().apply()
    //     }
    //     return resolve()
    //   }
    //   script.onerror = error => reject(error)
    // })
    this._document.head.appendChild(script)
    // debugger
    // console.log(this._window.AMapUI)

    // return this._scriptLoadingPromise
    return this._window.AMapUI
    // this._window.AMapUI = initAMapUI()
    // return this._window.AMapUI
  }

  _getScriptSrc () {
    return `${this._config.protocol}://${this._config.hostAndPath}`
  }

}
