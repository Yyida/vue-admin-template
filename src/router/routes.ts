export const constantRoutes = [
  {
    // 登录页
    path: '/login',
    name: 'Login',
    meta: {
      title: '登录',
      hidden: true,
      icon: 'Promotion',
    },
    component: () => import('@/views/login/index.vue'),
  },
  {
    // 首页
    path: '/',
    name: 'Layout',
    redirect: '/home',
    meta: {
      title: '首页',
      hidden: false,
      icon: 'Promotion',
    },
    component: () => import('@/layout/index.vue'),
    children: [
      {
        // 首页
        path: '/home',
        name: 'Index',
        meta: {
          title: '首页',
          hidden: false,
          icon: 'Promotion',
        },
        component: () => import('@/views/home/index.vue'),
      },
    ],
  },
  {
    path: '/screen',
    name: 'Screen',
    meta: {
      title: '数据大屏',
      hidden: false,
      icon: 'Promotion',
    },
    components: import('@/views/screen/index.vue'),
  },
  {
    path: '/acl',
    name: 'Acl',
    meta: {
      title: '权限管理',
      hidden: false,
      icon: 'Lock',
    },
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: '/acl/user',
        name: 'User',
        meta: {
          title: '用户管理',
          hidden: false,
          icon: 'Lock',
        },
        component: () => import('@/views/acl/user/index.vue'),
      },
      {
        path: '/acl/role',
        name: 'Role',
        meta: {
          title: '角色管理',
          hidden: false,
          icon: 'Lock',
        },
        component: () => import('@/views/acl/role/index.vue'),
      },
      {
        path: '/acl/permission',
        name: 'Permission',
        meta: {
          title: '菜单管理',
          hidden: false,
          icon: 'Lock',
        },
        component: () => import('@/views/acl/permission/index.vue'),
      },
    ],
  },
  {
    // 404
    path: '/404',
    name: '404',
    meta: {
      title: '404',
      hidden: true,
      icon: 'Promotion',
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
      hidden: true,
      icon: 'Promotion',
    },
  },
]

export default constantRoutes
