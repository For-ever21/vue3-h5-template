import type { App } from "vue";
export function setupMtaPoint(app: App) {
  console.log(app);
  const isProd = process.env.NODE_ENV === "production";
  if (isProd) {
    initBaiduPoint()
  }
}

// 初始化百度埋点
function initBaiduPoint() {
  var _hmt:any = _hmt || [];
  (function () {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?be80a72ce8e8dea7f5e034c8edea95c1";
    var s = document.getElementsByTagName("script")[0];
    (s as any).parentNode.insertBefore(hm, s);
  })();
}