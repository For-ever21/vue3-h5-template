import { createApp } from "vue";
import { setupMobileFit } from "@/setup/mobie-fit";
import { setupErrorHandle } from '@/setup/error-handle';
import { setupMtaPoint } from "@/setup/mta-point"

import App from "./App.vue";

import "@styles/index.less";

const app = createApp(App);

// 移动端适配
setupMobileFit(app);

// 装配 global error handle
setupErrorHandle(app);

// 装配 神策埋点
setupMtaPoint(app);

// 路由 ready 之后进行 mounted
app.mount("#app");

// 开发环境下
if (process.env.NODE_ENV === "development") {
  // 设置为 true 以在浏览器开发工具的 performance/timeline 面板中启用对组件初始化、编译、渲染和更新的性能追踪
  app.config.performance = true;
}
