import type { App } from "vue";

import { createRouter, createWebHistory } from "vue-router";

import { basicRoutes } from "./basicRoutes";

// app router
export const router = createRouter({
  history: createWebHistory(),
  routes: basicRoutes,
  strict: true,
  scrollBehavior: async (savedPosition: any) => {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
});

// config router
export function setupRouter(app: App<Element>) {
  app.use(router);
}
