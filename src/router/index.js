import Vue from 'vue'
import Router, { RouterMount } from 'uni-simple-router'
Vue.use(Router)
// 初始化
const router = new Router({
  encodeURI: false,
  // eslint-disable-next-line no-undef
  routes: [...ROUTES] // 路由表
})

// 全局路由前置守卫
router.beforeEach((to, from, next) => {
  console.log('前置钩子')
  next()
})
// 全局路由后置守卫
router.afterEach((to, from) => {
  console.log('afterEach----守卫')
})

export {
  router,
  RouterMount
}
