/**
 * h5: 移动端浏览器
 * android: 安卓应用webview
 * ios: ios应用webview
 * pc: pc端浏览器
 * weixin: 微信环境内置浏览器
 * weibo: 微博环境内置浏览器
 * alipay: 支付宝环境内置浏览器
 * hapApp: 快应用
 */

declare type Platform = 'h5' | 'android' | 'ios' 
| 'pc' | 'weixin' | 'weibo' | 'alipay' | 'hapApp';

// browser-浏览器访问  app- webview 访问
declare type Device = 'browser' | 'app';

declare interface Window {
  $sentry: AnyObject;
  $appVersion: string | undefined;
  $systemVersion: string | undefined;
  $platform: Platform;
  $device: Device;
}
declare namespace NodeJS {
  interface Process {
    env: ProcessEnv;
  }
  interface ProcessEnv {
    readonly NODE_ENV: "development" | "production";
    readonly VUE_APP_USE_MOCK: "on" | "off";
    readonly BASE_URL: string;
    readonly VUE_APP_API: string;
    readonly SentryDSN: string;
  }
}

declare let process: NodeJS.Process;

declare interface AnyObject {
  [propName: string]: any;
}

declare interface ListQuery extends AnyObject {
  page: number;
  count: number;
}

declare interface Dictionary<T> {
  [index: string]: T;
}
declare interface NumericDictionary<T> {
  [index: number]: T;
}

declare type TimeoutHandle = ReturnType<typeof setTimeout>;

declare type IntervalHandle = ReturnType<typeof setInterval>;

declare interface Fn<T = any, R = T> {
  (...arg: T[]): R;
}

declare interface PromiseFn<T = any, R = T> {
  (...arg: T[]): Promise<R>;
}

declare type Nullable<T> = T | null;

declare type TargetContext = "_self" | "_blank";
