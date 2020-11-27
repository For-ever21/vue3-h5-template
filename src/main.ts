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
  app.config.performance = true;
}
