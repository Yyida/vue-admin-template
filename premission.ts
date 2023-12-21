import routes from '@/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { GET_TOKEN } from '@/utils/localStorage'
import pinia from '@/store'
import useUserStore from '@/store/modules/user'
import { useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'

// 全局路由守卫， 任意路由发生变化是都会监听到
// 路由跳转前监听
routes.beforeEach((to, form, next) => {
  NProgress.configure({ showSpinner: false })
  NProgress.start()
  const $route = useRoute()
  const userStore = useUserStore(pinia)
  const token = GET_TOKEN()
  if (token) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      // 没有用户信息
      userStore.userInfo().then((res: any) => {
        if (res.code === 200) {
          next()
        } else {
          ElMessage({
            type: 'error',
            message: 'token已失效，请重新登录！',
          })
          const path = $route.path
          next({
            path: '/login',
            query: {
              redirect: path,
            },
          })
          userStore.logout()
        }
      })
    }
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next('/login')
    }
  }
})

// 路由成功跳转后监听
routes.afterEach(() => {
  NProgress.done()
})
