import type { AxiosRequestConfig } from "axios";
import { AxiosTransform } from "./axiosTransform";

export interface RequestOptions {
  //  是否处理请求结果
  isTransformRequestResult?: boolean;
  // 接口地址， 不填则使用默认apiUrl
  apiUrl?: string;
  // 错误消息提示类型
  errorMessageMode?: "none" | "modal";
}

export interface CreateAxiosOptions extends AxiosRequestConfig {
  prefixUrl?: string;
  transform?: AxiosTransform;
  requestOptions?: RequestOptions;
}

export interface Result<T = any> {
  status: number;
  message: string;
  data: T;
}

// multipart/form-data：上传文件
export interface UploadFileParams {
  // 其他参数
  data?: { [key: string]: any };
  // 文件参数的接口字段名
  name?: string;
  // 文件
  file: File | Blob;
  // 文件名
  filename?: string;
  [key: string]: any;
}
