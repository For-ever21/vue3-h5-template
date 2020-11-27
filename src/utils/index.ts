import { isEmpty, isPrimitive, isArray, isObject } from "@/utils/is";

export function walkObj(obj: Record<string, any>, handler: Function, context?: any): void {
  if (isEmpty(obj)) {
    console.error("遍历的obj对象为空");
    return;
  }
  const keys = Object.keys(obj);
  const len = keys.length;
  let key = null,
    value = null;
  for (let i = 0; i < len; i++) {
    key = keys[i];
    value = obj[key];
    if (!isEmpty(handler)) {
      const stop = handler.call(context, value, key, obj);
      if (stop) {
        return;
      }
    }
  }
}

export function walkArray(array: Array<any>, handler: Function, context?: any): void {
  if (isEmpty(array)) {
    return;
  }
  const len = array.length;
  let value;
  for (let i = 0; i < len; i++) {
    value = array[i];
    if (!isEmpty(handler)) {
      const stop: boolean | void = handler.call(context, value, i, array);
      if (stop) {
        return;
      }
    }
  }
}

/**
 * Generating a random int in range (0, max - 1)
 * @param max {number}
 */
export function getRandomInt(max: number) {
  return Math.floor(Math.random() * Math.floor(max));
}

/**
 *
 * 将含横杠字符串转成驼峰式字符串如：article-author-name 转成 驼峰式 articleAuthorName
 * @export
 * @param {string} str
 * @return {*}
 */
export function camelize(str: string) {
  return str.replace(/-(\w)/g, (_, c) => (c ? c.toUpperCase() : ""));
}
// export function requireDir(
//   container: Record<string | number, any>,
//   path: string,
//   Regex: RegExp
// ): Record<string | number, any> {
//   const modulesFiles = require.context(path, true, Regex);
//   container = modulesFiles.keys().reduce((modules, modulePath) => {
//     const moduleName: string = modulePath.replace(/^\.\/(.*)\.\w+$/, "$1");
//     const value = modulesFiles(modulePath);
//     modules[moduleName] = value.default;
//     return modules;
//   }, container);
//   return container;
// }

/**
 *
 * 将 source上所有属性复制一份到target上，当有相同属性时会不会覆盖取决于override是否为true,默认为true
 * @export
 * @param {*} target
 * @param {*} source
 * @param {boolean} [isInter=false]
 * @param {boolean} [override=true]
 * @return {*}
 */
export function extend(target: any, source: any, isInter = false, override = true) {
  if (!override) {
    if (isEmpty(source)) {
      return;
    }
  }
  if (isPrimitive(source)) {
    if (override || isEmpty(target)) {
      target = source;
    }
  } else if (isObject(source)) {
    if (isInter) {
      if (!isObject(target)) {
        target = {};
      }
    }
    for (const p in source) {
      if (Object.prototype.hasOwnProperty.call(source, p)) {
        target[p] = extend(target[p], source[p], true, override);
      }
    }
  } else if (isArray(source)) {
    if (isInter) {
      if (!isArray(target)) {
        target = [];
      }
    }
    const len = source.length;
    for (let i = 0; i < len; i++) {
      target[i] = extend(target[i], source[i], true, override);
    }
  }
  return target;
}

/**
 *
 * 去除字符串前后空格
 * @export
 * @param {string} str
 * @return {*}  {string}
 */
export function trim(str: string): string {
  if (str) {
    return str.replace(/(^[ \t\n\r]+)|([ \t\n\r]+$)/g, "");
  }
  return str;
}

/**
 * Add the object as a parameter to the URL
 * @param baseUrl url
 * @param obj
 * @returns {string}
 * eg:
 *  let obj = {a: '3', b: '4'}
 *  setObjToUrlParams('www.baidu.com', obj)
 *  ==>www.baidu.com?a=3&b=4
 */
export function setObjToUrlParams(baseUrl: string, obj: any): string {
  let parameters = "";
  let url = "";
  for (const key in obj) {
    parameters += key + "=" + encodeURIComponent(obj[key]) + "&";
  }
  parameters = parameters.replace(/&$/, "");
  if (/\?$/.test(baseUrl)) {
    url = baseUrl + parameters;
  } else {
    url = baseUrl.replace(/\/?$/, "?") + parameters;
  }
  return url;
}

export function deepMerge<T = any>(src: any, target: any): T {
  let key: string;
  for (key in target) {
    src[key] =
      src[key] && src[key].toString() === "[object Object]"
        ? deepMerge(src[key], target[key])
        : (src[key] = target[key]);
  }
  return src;
}

/**
 * @description: 根据数组中某个对象值去重
 */
export function unique<T = any>(arr: T[], key: string): T[] {
  const map = new Map();
  return arr.filter((item) => {
    const _item = item as any;
    return !map.has(_item[key]) && map.set(_item[key], 1);
  });
}

/**
 * @description: es6数组去重复
 */
export function es6Unique<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}
