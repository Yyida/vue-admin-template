export const constantRoutes = [
  {
    // 登录页
    path: '/login',
    name: 'Login',
    meta: {
      title: '登录',
      hidden: true,
    },
    component: () => import('@/views/login/index.vue'),
  },
  {
    // 首页
    path: '/',
    name: 'Home',
    meta: {
      title: '首页',
      hidden: false,
    },
    component: () => import('@/layout/index.vue'),
  },
  {
    path: '/layout',
    name: 'Layout',
    meta: {
      title: 'Layout',
      hidden: false,
    },
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: '/',
        name: 'Home',
        meta: {
          title: 'Layout',
          hidden: false,
        },
        component: () => import('@/layout/index.vue'),
      },
      {
        path: '/asd',
        name: 'Home1',
        meta: {
          title: 'Layout1',
          hidden: false,
        },
        component: () => import('@/layout/index.vue'),
      },
    ],
  },
  {
    // 404
    path: '/404',
    name: '404',
    meta: {
      title: '404',
      hidden: false,
    },
    component: () => import('@/views/error/404.vue'),
  },
  {
    // 全部路由都匹配不上 重定向到 404
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'Any',
    meta: {
      title: '任意路由',
      hidden: false,
    },
  },
]

export default constantRoutes
