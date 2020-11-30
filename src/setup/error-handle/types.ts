type Environment = 'Prod' | 'Stage';

export interface ReportOptions {
  dsn: string;
  release: string;
  environment: Environment;
}

export interface ServerApiErrorInfo {
  type: 'request';
  file: string;
  name?: string;
  message: string;
  stack?: string;
  detail: string;
  url: string;
  time?: string;
}

export interface NativeApiErrorInfo {
  error: Error;
  type: 'callNative';
  methodName: string;
  params?: any;
}