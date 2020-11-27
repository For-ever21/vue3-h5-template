const toString = Object.prototype.toString;

export function isPrimitive(value: any) {
  return (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "symbol" ||
    typeof value === "boolean" ||
    typeof value === "function"
  );
}

export function is(val: unknown, type: string): boolean {
  return toString.call(val) === `[object ${type}]`;
}

export function isObject(val: any): boolean {
  return val !== null && is(val, "Object");
}

export function isDate(val: any): boolean {
  return is(val, "Date");
}

export function isNull(val: any): boolean {
  return val === null;
}

export function isPromise(val: any): boolean {
  return is(val, "Promise") && isObject(val) && isFunction(val.then) && isFunction(val.catch);
}

export function isArray(val: any): boolean {
  return val && Array.isArray(val);
}

export function isString(val: any): boolean {
  return is(val, "String");
}

export function isNumber(val: any): boolean {
  return is(val, "Number");
}

export function isFunction(val: any): boolean {
  return is(val, "Function");
}

export function isBoolean(val: any): boolean {
  return is(val, "Boolean");
}

export function isRegExp(val: any): boolean {
  return is(val, "RegExp");
}

export const isWindow = (val: any): boolean => {
  return typeof window !== "undefined" && is(val, "Window");
};

export const isElement = (val: any): boolean => {
  return isObject(val) && !!val.tagName;
};

export const isServer = typeof window === "undefined";

export const isClient = typeof window !== "undefined";

export function isImageDom(o: Element): boolean {
  return o && ["IMAGE", "IMG"].includes(o.tagName);
}

export const isTextarea = (element: Element | null): element is HTMLTextAreaElement => {
  return element !== null && element.tagName.toLowerCase() === "textarea";
};

export function isEmpty(obj: any): boolean {
  return obj === undefined || obj === null || obj === "";
}
