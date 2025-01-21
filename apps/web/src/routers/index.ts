import type { RouteRecordRaw } from "vue-router";
import { createRouter, createWebHashHistory } from "vue-router";

export const constantRoutes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/dashboard",
  },
  {
    path: "/dashboard",
    component: () => import("@/views/dashboard/index"),
    name: "Dashboard",
  },
  {
    path: "/about",
    component: () => import("@/views/about/index"),
    name: "About",
  },
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    name: "Login",
    meta: {
      title: "登录",
      pure: true,
    },
  },
];

/**
 * 创建路由
 */
const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes as RouteRecordRaw[],
  // 刷新时，滚动条位置还原
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

/**
 * 重置路由
 */
export function resetRouter() {
  router.replace({ path: "/login" });
  location.reload();
}

export default router;
