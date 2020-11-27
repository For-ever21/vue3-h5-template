export interface NativeApiErrorInfo {
  error: Error;
  type: 'callNative';
  methodName: string;
  params?: any;
}

export interface SyncCalendarParams {
  id: number;
  title: string;
  deadline: number;
  alarm: number[];
}