import * as Sentry from "@sentry/browser"
import * as Integrations from '@sentry/integrations';
import type { App } from "vue";
import { ReportOptions, ServerApiErrorInfo } from "./types"
export class Report {
  // 单例模式
  public static getInstance(app: App, options: ReportOptions) {
    if (!this.instance) {
      this.instance = new Report(app, options);
      this.instance.install();
      this.instance.registerGlobalError();
    }
    return this.instance;
  }

  private static instance: Report;

  public app: AnyObject;
  public options: ReportOptions;

  constructor(app: App, options: ReportOptions) {
    this.app = app;
    this.options = options;
  }

  // 初始化
  public install() {
    Sentry.init({
      dsn: this.options.dsn, // 上报地址
      integrations: [
        new Integrations.Vue({
          // Vue: this.app, // vue3 实例不满足，暂时不传
          attachProps: true,
          logErrors: true // false的话，sentry会屏蔽浏览器控制台报错信息
        })
      ],
      release: this.options.release,
      environment: this.options.environment
    })
  }
  // 注册全局错误处理
  public registerGlobalError() {
    window.addEventListener("error", (event) => {
      // 过滤 js error
      const target = event.target || event.srcElement; // 兼容 ie
      const isElementTarget =
        target instanceof HTMLScriptElement ||
        target instanceof HTMLLinkElement ||
        target instanceof HTMLImageElement;
      if (!isElementTarget) {
        return false;
      }
      // 上报资源地址
      const url =
        (target as HTMLScriptElement | HTMLImageElement).src ||
        (target as HTMLLinkElement).href;

      this.log({
        error: new Error(`ResourceLoadError: ${url}`),
        type: 'resource load'
      });
    }, true)
  }
  // 主动上报
  public log(info: AnyObject) {
    Sentry.withScope((scope) => {
      Object.keys(info).forEach((key) => {
        if (key !== 'error') {
          scope.setExtra(key, info[key]);
        }
      });
      Sentry.captureException(info.error || new Error(''));
    });
  }
}

export function errorServiceReport(error: any) {
  if (window.$sentry) {
    const errorInfo: Partial<ServerApiErrorInfo> = {
      type: 'request',
      message: error.message,
    };

    if (error.response) {
      const {
        config: { url = '', data: params = '', method = 'get', headers = {} } = {},
        data = {},
      } = error.response;
      errorInfo.url = url;
      errorInfo.name = 'Ajax Error!';
      errorInfo.file = '-';
      errorInfo.stack = JSON.stringify(data);
      errorInfo.detail = JSON.stringify({ params, method, headers });
    }

    window.$sentry.log(errorInfo);
  }
}