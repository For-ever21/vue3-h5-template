import { defHttp } from "@/utils/http";

import {
  ISmsReqParams,
  ISmsLoginReqParams,
  ISmsLoginResultModel,
  // IGenerateCodeUrlResultModel,
} from "@/api/model/userModel";

/**
 * @description: 获取短信验证码
 */
export function getSmsCode(params: ISmsReqParams) {
  return defHttp.request({
    url: "/auth/phoneCheckNum",
    method: "GET",
    params,
  });
}

/**
 * @description: 授权登录(手机验证码登录)
 */
export function smsLoginApi(params: ISmsLoginReqParams) {
  return defHttp.request<ISmsLoginResultModel>({
    url: "/telAuth",
    method: "POST",
    params,
  });
}

/**
 * @description: 获取生成第三方code的链接 (weixin,weibo) OAuth2鉴权
 */
export function generateCodeUrl(params: any) {
  return defHttp.request<any>({
    url: "/auth/generateCodeUrl",
    method: "GET",
    params,
  });
}
