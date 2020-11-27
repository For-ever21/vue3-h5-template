import {
  UserTypeEnum,
  LoginChannelEnum,
  LoginSourceEnum,
  LoginTypeEnum,
  DeviceEnum,
} from "@/enums/businessEnum";

/**
 * @description: 获取短信验证码 请求参数
 */
export interface ISmsReqParams {
  phone: string;
  userType: UserTypeEnum;
}

/**
 * @description: 授权登录(手机验证码登录) 请求参数
 */
export interface ISmsLoginReqParams {
  checkNum: string;
  tel: string;
  loginChannel?: LoginChannelEnum;
  loginSource?: LoginSourceEnum;
  loginType?: LoginTypeEnum;
  source?: DeviceEnum;
  userType?: UserTypeEnum;
}

export interface ISmsLoginResultModel {
  avatar: string;
}

/**
 * @description: 获取生成第三方code 请求参数
 */
type authType = "login" | "bind";
type providerType = "weixin" | "weibo";
export interface IGenerateCodeReqParams {
  providerType: providerType;
  userType: UserTypeEnum;
  authType?: authType;
  projectName?: string;
  resourceUrl?: string;
  source?: DeviceEnum;
}

/**
 * @description: 获取生成第三方code 返回数据
 */
export interface IGenerateCodeUrlResultModel {
  phone?: string;
  userType?: UserTypeEnum;
}
