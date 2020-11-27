/**
 *
 *
 * @export
 * @param {(string|number)} val
 * @return {*}  {string}
 */
export function numberFormat(val: string | number): string {
  let str = "";
  const num = Number(val);
  if (num > 99999999) {
    str = Math.floor((num / Math.pow(10, 8)) * 10) / 10 + "亿";
  } else if (num > 9999) {
    str = Math.floor((num / Math.pow(10, 4)) * 10) / 10 + "万";
  }
  return str;
}

/**
 *
 * 对数字number 进行四舍五入，保留deci位小数位
 * @export
 * @param {number} number
 * @param {number} deci 默认为2
 * @return {*}
 */
export function roundNum(number: number, deci = 2) {
  return Math.floor(number * Math.pow(10, deci)) / Math.pow(10, deci);
}

/**
 *
 * 将字符串按固定长度截断并添加尾缀
 * @export
 * @param {string} str
 * @param {number} limitLen
 * @param {string} Abbreviations 默认值为：···
 * @return {*}
 */
export function cutStr(str: string, limitLen: number, Abbreviations: string) {
  if (str) {
    if (isNaN(limitLen)) {
      limitLen = 8;
    }
    if (!Abbreviations) {
      Abbreviations = "···";
    }
    if (str.length > limitLen) {
      str = str.substr(0, limitLen) + Abbreviations;
    }
  }
  return str;
}
