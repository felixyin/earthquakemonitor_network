/**
 * 路由配置
 */

import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

// 异步组件实现路由懒加载
const Login = resolve => require(['../views/Login.vue'], resolve)
const Regist = resolve => require(['../views/Regist.vue'], resolve)
const NotFound = resolve => require(['../views/NotFound.vue'], resolve)
// 组件按组分块
const Home = r => require.ensure([], () => r(require('../views/Home.vue')), 'group-main')
const Index = r => require.ensure([], () => r(require('../views/main/Index.vue')), 'group-main')
const DeployPonit = r => require.ensure([], () => r(require('../views/main/DeployPonit.vue')), 'group-main')
const EarlyWarningIntensity = r => require.ensure([], () => r(require('../views/main/earlyWarningIntensity.vue')), 'group-main')
const Setting = r => require.ensure([], () => r(require('../views/main/Setting.vue')), 'group-main')
const SettingUser = r => require.ensure([], () => r(require('../views/main/SettingUser.vue')), 'group-main')

const EarthquakeDemo1 = r => require.ensure([], () => r(require('../views/main/EarthquakeDemo1.vue')), 'group-main')
const EarthquakeDemo2 = r => require.ensure([], () => r(require('../views/main/EarthquakeDemo2.vue')), 'group-main')
const EarthquakeDemo3 = r => require.ensure([], () => r(require('../views/main/EarthquakeDemo3.vue')), 'group-main')

const CampusManage = r => require.ensure([], () => r(require('../views/main/CampusManage.vue')), 'group-main')

const VideoManage = r => require.ensure([], () => r(require('../views/main/VideoManage.vue')), 'group-main')

Vue.use(Router)

const router = new Router({
  mode: 'hash', // history
  routes: [
    {path: '/login', name: 'login', component: Login},
    {path: '/regist', name: 'regist', component: Regist},
    {
      path: '/main',
      component: Home,
      children: [
        {
          path: '',
          redirect: '/home'
        },
        {
          path: 'home',
          name: 'home',
          alias: '/home',
          component: Index,
          meta: {requiresAuth: false}
        },
        {
          path: 'deployPonit',
          name: 'deployPonit',
          alias: '/deployPonit',
          component: DeployPonit,
          meta: {requiresAuth: true}
        },
        {
          path: 'earlyWarningIntensity',
          name: 'earlyWarningIntensity',
          alias: '/earlyWarningIntensity',
          component: EarlyWarningIntensity,
          meta: {requiresAuth: true}
        },
        {
          path: 'setting',
          name: 'setting',
          alias: '/setting',
          component: Setting,
          children: [
            {
              path: 'user',
              name: 'settingUser',
              alias: '/settingUser',
              component: SettingUser
            },
            {
              path: 'log',
              name: 'settingLog',
              alias: '/settingLog',
              component: CampusManage
            }
            ,
            {
              path: 'earthquake-demo1',
              name: 'anfang',
              alias: '/earthquake-demo1',
              component: EarthquakeDemo1,
              meta: {requiresAuth: true}
            },

            {
              path: 'earthquake-demo2',
              name: 'dongli',
              alias: '/earthquake-demo2',
              component: EarthquakeDemo2,
              meta: {requiresAuth: true}
            }

          ],
          meta: {requiresAuth: true}
        }
      ]
    },
    {path: '/', redirect: '/login'},
    {path: '*', component: NotFound}
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {x: 0, y: 0}
    }
  }
})

// 路由钩子：每个路由开始前处理
router.beforeEach((to, from, next) => {
  // 登录中间验证，页面需要登录而没有登录的情况直接跳转登录
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.hasLoggedIn) {
      store.dispatch('setPageProgress', 60)
      next()
    } else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
    }
  } else {
    next()
  }
})

// 路由钩子：每个路由结束后处理
router.afterEach(route => {
  // window.scrollTo(0, 0)
  store.dispatch('setPageProgress', 100)
})

export default router
