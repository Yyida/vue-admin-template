import { createRouter, createWebHashHistory } from 'vue-router'
import { constantRoutes } from './routes'

const routes = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
  // 添加滚动行为
  scrollBehavior() {
    return {
      left: 0,
      top: 0,
    }
  },
})

export default routes
