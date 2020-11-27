import { trim } from "./index";
import { isWindow } from "./is";

const hasWindow = isWindow(null);
export interface ViewportOffsetResult {
  left: number;
  top: number;
  right: number;
  bottom: number;
  rightIncludeBody: number;
  bottomIncludeBody: number;
}

export function getBoundingClientRect(element: Element): DOMRect | number {
  if (!element || !element.getBoundingClientRect) {
    return 0;
  }
  return element.getBoundingClientRect();
}

/**
 *
 * 设置页面标题
 * @export
 * @param {string} title
 */
export function setDocumentTitle(title: string): void {
  document.title = title;
}

/* istanbul ignore next */
export function hasClass(el: HTMLElement, cls: string): boolean {
  if (!el || !cls) return false;
  if (cls.indexOf(" ") !== -1) throw new Error("className should not contain space.");
  if (el.classList) {
    return el.classList.contains(cls);
  } else {
    return (" " + el.className + " ").indexOf(" " + cls + " ") > -1;
  }
}

/* istanbul ignore next */
export function addClass(el: HTMLElement, cls: string): void {
  if (!el) return;
  let curClass = el.className;
  const classes = (cls || "").split(" ");

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.add(clsName);
    } else if (!hasClass(el, clsName)) {
      curClass += " " + clsName;
    }
  }
  if (!el.classList) {
    el.className = curClass;
  }
}

/* istanbul ignore next */
export function removeClass(el: HTMLElement, cls: string): void {
  if (!el || !cls) return;
  const classes = cls.split(" ");
  let curClass = " " + el.className + " ";

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.remove(clsName);
    } else if (hasClass(el, clsName)) {
      curClass = curClass.replace(" " + clsName + " ", " ");
    }
  }
  if (!el.classList) {
    el.className = trim(curClass);
  }
}

/* istanbul ignore next */
// Here I want to use the type CSSStyleDeclaration, but the definition for CSSStyleDeclaration
// has { [index: number]: string } in its type annotation, which does not satisfy the method
// camelize(s: string)
// Same as the return type
export const getStyle = function (element: HTMLElement, styleName: string): string | null {
  if (hasWindow) return null;
  if (!element || !styleName) return null;
  // styleName = camelize(styleName);
  if (styleName === "float") {
    styleName = "cssFloat";
  }
  const styleObj = element.style as any;
  try {
    const style = styleObj[styleName];
    if (style) return style;
    const computed = (document.defaultView as any).getComputedStyle(element, "");
    return computed ? computed[styleName] : "";
  } catch (e) {
    return styleObj[styleName];
  }
};

/* istanbul ignore next */
export function setStyle(
  element: HTMLElement,
  styleName: CSSStyleDeclaration | string,
  value?: string
): void {
  if (!element || !styleName) return;

  if (styleName instanceof CSSStyleDeclaration) {
    Object.keys(styleName).forEach((prop) => {
      setStyle(element, prop, (styleName as any)[prop]);
    });
  } else {
    (element.style as any)[styleName] = value;
  }
}

export function removeStyle(element: HTMLElement, style: CSSStyleDeclaration | string) {
  if (!element || !style) return;

  if (style instanceof CSSStyleDeclaration) {
    Object.keys(style).forEach((prop) => {
      setStyle(element, prop, "");
    });
  } else {
    setStyle(element, style, "");
  }
}

export function scrollIntoView(container: HTMLElement, selected: HTMLElement): void {
  if (hasWindow) return;

  if (!selected) {
    container.scrollTop = 0;
    return;
  }

  const offsetParents = [];
  let pointer = selected.offsetParent;
  while (pointer !== null && container !== pointer && container.contains(pointer)) {
    offsetParents.push(pointer);
    pointer = (pointer as HTMLElement).offsetParent;
  }
  const top =
    selected.offsetTop + offsetParents.reduce((prev, curr) => prev + (curr as any).offsetTop, 0);
  const bottom = top + selected.offsetHeight;
  const viewRectTop = container.scrollTop;
  const viewRectBottom = viewRectTop + container.clientHeight;

  if (top < viewRectTop) {
    container.scrollTop = top;
  } else if (bottom > viewRectBottom) {
    container.scrollTop = bottom - container.clientHeight;
  }
}

/**
 * 获取当前元素的left、top偏移
 *   left：元素最左侧距离文档左侧的距离
 *   top:元素最顶端距离文档顶端的距离
 *   right:元素最右侧距离文档右侧的距离
 *   bottom：元素最底端距离文档底端的距离
 *   rightIncludeBody：元素最左侧距离文档右侧的距离
 *   bottomIncludeBody：元素最底端距离文档最底部的距离
 *
 * @description:
 */
export function getViewportOffset(element: Element): ViewportOffsetResult {
  const doc = document.documentElement;

  const docScrollLeft = doc.scrollLeft;
  const docScrollTop = doc.scrollTop;
  const docClientLeft = doc.clientLeft;
  const docClientTop = doc.clientTop;

  const pageXOffset = window.pageXOffset;
  const pageYOffset = window.pageYOffset;

  const box = getBoundingClientRect(element);

  const { left: retLeft, top: rectTop, width: rectWidth, height: rectHeight } = box as DOMRect;

  const scrollLeft = (pageXOffset || docScrollLeft) - (docClientLeft || 0);
  const scrollTop = (pageYOffset || docScrollTop) - (docClientTop || 0);
  const offsetLeft = retLeft + pageXOffset;
  const offsetTop = rectTop + pageYOffset;

  const left = offsetLeft - scrollLeft;
  const top = offsetTop - scrollTop;

  const clientWidth = window.document.documentElement.clientWidth;
  const clientHeight = window.document.documentElement.clientHeight;
  return {
    left: left,
    top: top,
    right: clientWidth - rectWidth - left,
    bottom: clientHeight - rectHeight - top,
    rightIncludeBody: clientWidth - left,
    bottomIncludeBody: clientHeight - top,
  };
}

/* istanbul ignore next */
export const on = function (
  element: Element | HTMLElement | Document | Window,
  event: string,
  handler: Fn
): void {
  if (element && event && handler) {
    element.addEventListener(event, handler, false);
  }
};

/* istanbul ignore next */
export const off = function (
  element: Element | HTMLElement | Document | Window,
  event: string,
  handler: Fn
): void {
  if (element && event && handler) {
    element.removeEventListener(event, handler, false);
  }
};

/* istanbul ignore next */
export const once = function (el: HTMLElement, event: string, fn: EventListener): void {
  const listener = function (this: any, ...args: any) {
    if (fn) {
      fn.apply(this, args);
    }
    off(el, event, listener);
  };
  on(el, event, listener);
};
