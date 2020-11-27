import type { App } from "vue";
import "amfe-flexible"; // 可伸缩布局方案
export function setupMobileFit(app: App) {
  console.log(app);
  initPlatform()
}

// 从 UA 获取设备相关信息并在全局初始化
export const initPlatform = () => {
  const UA = navigator.userAgent;
  console.log("UA", UA);
  const info = UA.match(/\s{1}DSBRIDGE[\w\.]+$/g); 
  if (info && info.length > 0) {
    // 判断是否在Android，IOS 上
    const infoArray = info[0].split('_');
    window.$appVersion = infoArray[1];
    window.$systemVersion = infoArray[2];
    window.$platform = infoArray[3] as Platform;
    window.$device = "app";
  } else {
    const isWx = UA.toLowerCase().match(/MicroMessenger/i);
    const isWeibo = UA.toLowerCase().match(/WeiBo/i);
    const isHapApp = UA.toLowerCase().match(/com\.iask\.healthhap/i);
    if (isWx) {
      window.$platform = 'weixin';
    } else if (isWeibo) {
      window.$platform = 'weibo';
    } else if (isHapApp) {
      window.$platform = 'hapApp';
    } else {
      window.$platform = 'h5';
    }
    window.$device = "browser";
    window.$appVersion = '1.0.0';
    window.$systemVersion = undefined;
  }
};

// 初始化 eruda 控制台
export function initConsole () {
  const NO_ERUDA = window.location.protocol === 'https:';
  if (NO_ERUDA) return;
  const src = 'https://cdn.jsdelivr.net/npm/eruda@1.5.8/eruda.min.js';
  document.write('<scr' + 'ipt src="' + src + '"></scr' + 'ipt>');
  document.write('<scr' + 'ipt>eruda.init();</scr' + 'ipt>');
}
