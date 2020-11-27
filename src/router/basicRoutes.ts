import type { RouteRecordRaw } from "vue-router";
export const basicRoutes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "root",
    redirect: "/patient/login",
  },
  {
    path: "/patient/login",
    name: "login",
    component: () => import("@/views/patient/login.vue"),
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/patient/login.vue"),
  },
  // ! 404 配置 必须放置最后
  // { path: "**", redirect: "/404" },
];
