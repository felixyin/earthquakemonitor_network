let lazyAMapApiLoaderInstance = null
import AMapAPILoader from './lazy-amap-api-loader'
export const initAMapApiLoader = (config) => {
  if (lazyAMapApiLoaderInstance) throw new Error('You has already initial your lazyAMapApiLoaderInstance, just import it')
  lazyAMapApiLoaderInstance = new AMapAPILoader(config)
  lazyAMapApiLoaderInstance.load()
}

let lazyAMapUIApiLoaderInstance = null
import AMapUIAPILoader from './lazy-amapui-api-loader'
export const initAMapUIApiLoader = (config) => {
  if (lazyAMapUIApiLoaderInstance) throw new Error('You has already initial your lazyAMapUIApiLoaderInstance, just import it')
  lazyAMapUIApiLoaderInstance = new AMapUIAPILoader(config)
  lazyAMapUIApiLoaderInstance.load()
}
export { lazyAMapApiLoaderInstance, lazyAMapUIApiLoaderInstance }

