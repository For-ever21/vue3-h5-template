// axios配置  可自行根据项目进行更改，只需更改该文件即可，其他文件可以不动

import type { AxiosResponse } from "axios";
import type { CreateAxiosOptions, RequestOptions, Result } from "./types";

import { VAxios } from "./Axios";
import { getToken } from "@/utils/auth";
import { AxiosTransform } from "./axiosTransform";

import { checkStatus } from "./checkStatus";

import { useMessage } from "@/hooks/useMessage";

import { RequestEnum, ResultEnum, ContentTypeEnum } from "@/enums/httpEnum";

import { isString } from "@/utils/is";
import { deepMerge } from "@/utils";
import { errorServiceReport } from '@/setup/error-handle/sentry';
import { errorResult } from "./const";

const { Toast } = useMessage();

/**
 * @description: 数据处理，方便区分多种处理方式
 */
const transform: AxiosTransform = {
  /**
   * @description: 处理请求数据
   */
  transformRequestData: (res: AxiosResponse<Result>, options: RequestOptions) => {
    const { isTransformRequestResult } = options;
    // 不进行任何处理，直接返回
    // 用于页面代码可能需要直接获取code，data，message这些信息时开启
    if (!isTransformRequestResult) {
      return res.data;
    }
    // 错误的时候返回

    const { data } = res;
    if (!data) {
      // return '[HTTP] Request has no return value';
      return errorResult;
    }
    //  这里 code，result，message为 后台统一的字段，需要在 types.ts内修改为项目自己的接口返回格式
    const { status, data: result, message } = data;
    // 鉴权接口 会返回无status字段的数据
    if (!status) {
      return data;
    }
    // 接口请求成功，直接返回结果
    if (status === ResultEnum.SUCCESS) {
      return result;
    } else {
      // 接口请求错误，统一提示错误信息
      Toast(message || "操作失败,系统异常!");
      Promise.reject(new Error(message));
      return errorResult;
    }
  },

  // 请求之前处理config
  beforeRequestHook: (config, options) => {
    const { apiUrl } = options;

    if (apiUrl && isString(apiUrl)) {
      config.url = `${apiUrl}${config.url}`;
    }
    if (config.method === RequestEnum.GET) {
      const now = new Date().getTime();
      if (!isString(config.params)) {
        config.data = {
          // 给 get 请求加上时间戳参数，避免从缓存中拿数据。
          params: Object.assign(config.params || {}, {
            _t: now,
          }),
        };
      } else {
        // 兼容restful风格
        config.url = config.url + config.params + `?_t=${now}`;
        config.params = undefined;
      }
    } else {
      if (!isString(config.params)) {
        config.data = config.params;
        config.params = undefined;
      } else {
        // 兼容restful风格
        config.url = config.url + config.params;
        config.params = undefined;
      }
    }
    return config;
  },

  /**
   * @description: 请求拦截器处理
   */
  requestInterceptors: (config) => {
    // 请求之前处理config
    const token = getToken();
    if (token) {
      // jwt token
      config.headers.Authorization = token;
    }
    return config;
  },

  /**
   * @description: 响应错误处理
   */
  responseInterceptorsCatch: (error: any) => {
    errorServiceReport(error) // 接口异常 上报
    const { response, code, message } = error || {};
    // console.log(response, code, message);
    const msg: string =
      response && response.data && response.data.error ? response.data.message : "";
    const err: string = error.toString();
    try {
      if (code === "ECONNABORTED" && message.indexOf("timeout") !== -1) {
        Toast("接口请求超时,请刷新页面重试!");
      }
      if (err && err.includes("Network Error")) {
        Toast("网络异常");
      }
    } catch (error) {
      throw new Error(error);
    }
    checkStatus(error.response && error.response.status, msg);
    return Promise.reject(error);
  },
};

function createAxios(opt?: Partial<CreateAxiosOptions>) {
  return new VAxios(
    deepMerge(
      {
        timeout: 20 * 1000,
        // 基础接口地址
        // baseURL: "",
        headers: { "Content-Type": ContentTypeEnum.JSON },
        // 数据处理方式
        transform,
        // 配置项，下面的选项都可以在独立的接口请求中覆盖
        requestOptions: {
          // 需要对返回数据进行处理
          isTransformRequestResult: true,
          // post请求的时候添加参数到url
          joinParamsToUrl: false,
          // 格式化提交参数时间
          formatDate: true,
          // 消息提示类型
          errorMessageMode: "none",
          // 接口地址
          apiUrl: "",
        },
      },
      opt || {}
    )
  );
}
export const defHttp = createAxios({
  requestOptions: {
    apiUrl: process.env.VUE_APP_API,
  },
});

// other api url
// export const otherHttp = createAxios({
//   requestOptions: {
//     apiUrl: 'xxx',
//   },
// });
