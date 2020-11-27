import { RouteConfig, RedirectOption, NavigationGuard, Route } from "vue-router";
import { PathToRegexpOptions } from "vue-router/types/router";
import Vue, { ComponentOptions, AsyncComponent } from "vue";
type RoutePropsFunction = (route: Route) => Object;
//手动暴露出RouteConfigSingleView
interface RouteConfigSingleView {
  path: string;
  name?: string;
  children?: RouteConfig[];
  redirect?: RedirectOption;
  alias?: string | string[];
  meta?: any;
  beforeEnter?: NavigationGuard;
  caseSensitive?: boolean;
  pathToRegexpOptions?: PathToRegexpOptions;
  component?: ComponentOptions<Vue> | typeof Vue | AsyncComponent;
  props?: boolean | Object | RoutePropsFunction;
}
export interface CustomRoute extends RouteConfigSingleView {
  hidden?: boolean; //该路由是否在菜单内显示
  topProgress?: boolean; //是否开启顶部页面加载进度条
}

declare const _default: {
  customRoute: CustomRoute;
};
export default _default;
