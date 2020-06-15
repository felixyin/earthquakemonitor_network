import Vue from 'vue'
import Electron from 'vue-electron'
import Resource from 'vue-resource'
import Router from 'vue-router'
import { sync } from 'vuex-router-sync'
import App from './App.vue'
import store from './store'
import router from './routes'
import * as filters from './filters'
import AMap from 'vue-amap'

Vue.use(Electron)
Vue.use(Resource)
Vue.use(Router)
Vue.use(AMap)

window.myMapReady = function (map) {
}

AMap.initAMapApiLoader({
  key: 'c7357362d8a8126d2fdb40806683b96a',
  // callback: 'myMapReady',
  plugin: ['AMap.Autocomplete',
    'AMap.PlaceSearch',
    'AMap.Scale',
    'AMap.OverView',
    'AMap.ToolBar',
    'AMap.MapType',
    'AMap.PolyEditor',
    'AMap.CircleEditor',
    'AMap.MouseTool',
    'AMap.Icon',
    'AMap.Size',
    'AMap.Pixel',
    'AMap.Marker',
    'AMap.Driving',
    'AMap.DistrictSearch'
  ]
})

AMap.initAMapUIApiLoader()

Vue.config.debug = true

// sync the router with the vuex store.
// this registers `store.state.route`
sync(store, router)

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.filter('time', function (value) {//value为13位的时间戳
  function add0 (m) {
    return m < 10 ? '0' + m : m
  }

  var time = new Date(parseInt(value))
  var y = time.getFullYear()
  var m = time.getMonth() + 1
  var d = time.getDate()

  return y + '-' + add0(m) + '-' + add0(d)
})

/* eslint-disable no-new */

// bootstrap vue app
const app = new Vue({
  router,
  store,
  ...App
}).$mount('#app')

export { app, router, store }
