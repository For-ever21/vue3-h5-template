import Vue from "vue";
import SvgIcon from "@/components/SvgIcon/index.vue"; //svg component

let req = require.context("./svg", false, /\.svg$/);
const requireAll = (requireContext: any) => requireContext.keys().map(requireContext);
requireAll(req);

/**自动加载@modules 下的业务模块里的assets/svg文件夹下的.svg文件 */
req = require.context("../modules", true, /\.\/[a-zA-Z0-9_-]+\/assets\/svg\/.+\.svg$/);
requireAll(req);

export default (): void => {
  Vue.component("svg-icon", SvgIcon);
};
