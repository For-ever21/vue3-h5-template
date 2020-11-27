/**
 * @description: 用户类型 枚举
 */
export enum UserTypeEnum {
  DOCTOR = "doctor",
  USER = "user",
  BUSINESS = "business",
  ADMIN = "admin",
  MEDIC = "medic",
}

/**
 * @description: 登录渠道 枚举
 */
export enum LoginChannelEnum {
  WEIXIN = "wx",
  WEIBO = "weibo",
}

/**
 * @description: 登录来源 枚举
 */
export enum LoginSourceEnum {
  PATIENT = "patient",
}

/**
 * @description: 登录类型 枚举
 */
export enum LoginTypeEnum {
  APP = "app",
  PC = "pc",
}

/**
 * @description: 登录设备 枚举
 */
export enum DeviceEnum {
  PC = "pc",
  H5 = "h5",
  ANDROID = "android",
  IOS = "iphone",
}
