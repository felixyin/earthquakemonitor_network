// polyfills
import './polyfills'

import upperCamelCase from 'uppercamelcase'
// 初始化接口
import { initAMapApiLoader, initAMapUIApiLoader } from './services/injected-amap-api-instance'
// 组建导入
import AMap from './components/amap.vue'
import AMapMarker from './components/amap-marker.vue'
import AMapSampleMarker from './components/amap-sample-marker.vue'
import AMapSearchBox from './components/amap-search-box.vue'
import AMapCircle from './components/amap-circle.vue'
import AMapGroupImage from './components/amap-ground-image.vue'
import AMapInfoWindow from './components/amap-info-window.vue'
import AMapPolyline from './components/amap-polyline.vue'
import AMapPolygon from './components/amap-polygon.vue'
// managers
import AMapManager from './managers/amap-manager'

let components = [
  AMap,
  AMapMarker,
  AMapSampleMarker,
  AMapSearchBox,
  AMapCircle,
  AMapGroupImage,
  AMapInfoWindow,
  AMapPolygon,
  AMapPolyline
]

let VueAMap = {
  initAMapApiLoader,
  initAMapUIApiLoader,
  AMapManager
}

VueAMap.install = (Vue) => {
  if (VueAMap.installed) return
  Vue.config.optionMergeStrategies.deferredReady = Vue.config.optionMergeStrategies.created
  components.map(_component => {
    Vue.component(_component.name, _component)
    VueAMap[upperCamelCase(_component.name).replace(/^El/, '')] = _component
  })
}
export default VueAMap

export { AMapManager }
export { lazyAMapApiLoaderInstance, lazyAMapUIApiLoaderInstance } from './services/injected-amap-api-instance'
