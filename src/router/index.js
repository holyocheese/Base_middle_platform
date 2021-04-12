import Vue from "vue";
import Router from "vue-router";

const _import = require("./_import_" + process.env.NODE_ENV);
// in development env not use Lazy Loading,because Lazy Loading large page will cause webpack hot update too slow.so only in production use Lazy Loading

Vue.use(Router);

/* layout */
import Layout from "../views/layout/Layout";

/**
 * icon : the icon show in the sidebar
 * hidden : if `hidden:true` will not show in the sidebar
 * redirect : if `redirect:noredirect` will no redirect in the levelbar
 * noDropdown : if `noDropdown:true` will has no submenu
 * meta : { role: ['admin'] }  will control the page role
 **/

export const constantRouterMap = [
  {
    path: "/login",
    component: _import("login/index"),
    hidden: true,
  },
  {
    path: "/authredirect",
    component: _import("login/authredirect"),
    hidden: true,
  },
  {
    path: "/404",
    component: _import("error/404"),
    hidden: true,
  },
  {
    path: "/401",
    component: _import("error/401"),
    hidden: true,
  },
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    name: "MainPage",
    hidden: true,
    children: [
      {
        path: "dashboard",
        component: _import("dashboard/index"),
      },
    ],
  },
];

export default new Router({
  // mode: 'history', // 后端支持可开
  scrollBehavior: () => ({
    y: 0,
  }),
  routes: constantRouterMap,
});

export const asyncRouterMap = [
  {
    path: "/baseManager",
    component: Layout,
    name: "BaseManager",
    icon: "setting",
    authority: "baseManager",
    children: [
      {
        path: "userManager",
        icon: "fa-user",
        component: _import("admin/user/index"),
        name: "UserManager",
        authority: "userManager",
      },
      {
        path: "menuManager",
        icon: "category",
        component: _import("admin/menu/index"),
        name: "MenuManager",
        authority: "menuManager",
      },
      {
        path: "groupManager",
        icon: "group_fill",
        component: _import("admin/group/index"),
        name: "GroupManager",
        authority: "groupManager",
      },
      {
        path: "groupTypeManager",
        icon: "fa-users",
        component: _import("admin/groupType/index"),
        name: "GroupTypeManager",
        authority: "groupTypeManager",
      },
      {
        path: "gateLogManager",
        icon: "viewlist",
        component: _import("admin/gateLog/index"),
        name: "GateLogManager",
        authority: "gateLogManager",
      },
      {
        path: "passwordManager",
        icon: "viewlist",
        component: _import("admin/password/index"),
        name: "PasswordManager",
        authority: "passwordManager",
      },
    ],
  },
  {
    path: "/pdf",
    component: Layout,
    name: "pdf",
    icon: "setting",
    authority: "pdf",
    children: [
      {
        path: "pdfPage",
        icon: "fa-user",
        component: _import("pdf/pdfPage"),
        name: "pdfPage",
        authority: "pdfPage",
      },
      {
        path: "pdfTable",
        icon: "fa-user",
        component: _import("pdf/pdfTable"),
        name: "pdfTable",
        authority: "pdfTable",
      },
      {
        path: "areaMarking",
        icon: "fa-user",
        component: _import("pdf/areaMarking"),
        name: "areaMarking",
        authority: "areaMarking",
      },
      {
        path: "pdfArea",
        icon: "fa-user",
        component: _import("pdf/pdfArea"),
        name: "pdfArea",
        authority: "pdfArea",
      },
    ],
  },
];
