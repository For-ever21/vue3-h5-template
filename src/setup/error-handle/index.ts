import type { App } from "vue";
import { Report } from "./sentry"
export function setupErrorHandle(app: App) {
  const IS_DEV = process.env.NODE_ENV === 'development';
  if (IS_DEV) {
    const sentry = Report.getInstance(app, {
      dsn: process.env.SentryDSN,
      release: require("../../../package.json").version, // from webpack DefinePlugin
      environment: 'Prod'
    });

    window.$sentry = sentry;

    // 全局监控 Vue errorHandler
    app.config.errorHandler = (error, vm, info) => {
      window.$sentry.log({
        error,
        type: 'vue errorHandler',
        vm,
        info
      });
    };
  }
}
