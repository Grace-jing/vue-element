import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
/* Layout */
import Layout from '@/layout';

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'nav.dashboard', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/documentation',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/documentation/index'),
        name: 'Documentation',
        meta: { title: 'nav.documentation', icon: 'documentation', affix: true }
      }
    ]
  }
];

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [

  /** when your routing map is too long, you can split it into small modules **/
  {
    path: '/member',
    component: Layout,
    redirect: '/member/portrayal',
    name: 'Member',
    meta: {
      title: 'nav.member',
      icon: 'peoples'
    },
    children: [
      {
        path: 'portrayal',
        component: () => import('@/views/member/portrayal'),
        name: 'MemberPortrayal',
        meta: { title: 'nav.member_portrayal' }
      },
      {
        path: 'view',
        component: () => import('@/views/member/view'),
        name: 'MemberView',
        meta: { title: 'nav.member_view' }
      }, {
        path: 'recruitMember',
        component: () => import('@/views/member/recruit-member'),
        name: 'RecruitMember',
        meta: { title: 'nav.member_recruit' },
        hidden: true
      }
    ]
  },
  {
    path: '/ums',
    component: Layout,
    redirect: '/ums/userManage',
    name: 'ums',
    meta: {
      title: 'nav.ums',
      icon: 'example'
    },
    children: [
      {
        path: 'userManage',
        component: () => import('@/views/ums/userManage'),
        name: 'UserManage',
        meta: { title: 'nav.user_manage' }
      },
      {
        path: 'roleManage',
        component: () => import('@/views/ums/roleManage'),
        name: 'RoleManage',
        meta: { title: 'nav.role_manage' }
      },{
        path: 'addUser',
        component: () => import('@/views/ums/addUser'),
        name: 'AddUser',
        meta: { title: 'nav.add_user' },
        hidden: true
      },{
        path: 'editUser',
        component: () => import('@/views/ums/editUser'),
        name: 'EditUser',
        meta: { title: 'nav.edit_user' },
        hidden: true
      }
    ]
  },
  {
    path: '/error',
    component: Layout,
    redirect: 'noRedirect',
    name: 'ErrorPages',
    meta: {
      title: 'nav.error_pages',
      icon: '404'
    },
    children: [
      {
        path: '401',
        component: () => import('@/views/error-page/401'),
        name: 'Page401',
        meta: { title: 'nav.401', noCache: true }
      },
      {
        path: '404',
        component: () => import('@/views/error-page/404'),
        name: 'Page404',
        meta: { title: 'nav.404', noCache: true }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
];

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
});

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
