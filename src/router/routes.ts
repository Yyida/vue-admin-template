export const constantRoutes = [
  {
    // 登录页
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
  },
  {
    // 首页
    path: '/',
    name: 'Home',
    component: () => import('@/views/home/index.vue'),
  },
  {
    // 404
    path: '/404',
    name: '404',
    component: () => import('@/views/error/404.vue'),
  },
  {
    // 全部路由都匹配不上 重定向到 404
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'Any',
  },
]

export default constantRoutes
