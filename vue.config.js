const path = require("path");
const CompressionWebpackPlugin = require("compression-webpack-plugin");

const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');

function resolve(str) {
  return path.resolve(__dirname, str);
}
// 是否是生产环境
const IS_PROD = process.env.NODE_ENV === "production";
// 是否使用gzip
const productionGzip = true
// 需要gzip压缩的文件后缀
const productionGzipExtensions = ['js', 'css']

module.exports = {
  publicPath: process.env.PublicPath, // 默认'/'，部署应用包时的基本 URL
  outputDir: process.env.OutputDir || "dist", // 'dist', 生产环境构建文件的目录
  assetsDir: process.env.AssetsDir || "static", // 相对于outputDir的静态资源(js、css、img、fonts)目录
  filenameHashing: true, // 生成的静态资源文件名是否使用哈希
  lintOnSave: false,
  productionSourceMap: false, // 生产环境的 source map
  integrity: true, // 构建后的文件是部署在 CDN，启用该选项可以提供额外的安全性。
  parallel: require("os").cpus().length > 1, // 在多核机器下会默认开启。
  css: {
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer(),
          pxtorem({
            rootValue: 37.5,
            propList: ['*', '!font-size']
          })
        ]
      },
      // 启用 CSS modules for all css / pre-processor files.
      // modules: false
    }
  },
  chainWebpack(config) {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    config.set('name', process.env.AppName);
    config.resolve.alias
      // .set("vue$", "vue/dist/vue.esm.js")
      .set("@", resolve("src"))
      .set("@images", resolve("src/assets/images"))
      .set("@styles", resolve("src/assets/styles"))
      .set("@icons", resolve("src/assets/icons"))
      .set("@enum", resolve("src/enum"))
      .set("@directives", resolve("src/setup/directives"))
    // it can improve the speed of the first screen, it is recommended to turn on preload
    config.plugin('preload').tap(() => [
      {
        rel: 'preload',
        // to ignore runtime.js
        // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: 'initial'
      }
    ])
    // 修复HMR
    config.resolve.symlinks(true);

    /** 处理svg 图片 打包svg图片为雪碧图*/
    const svgRule = config.module.rule("svg");
    svgRule.uses.clear();
    svgRule.exclude.add(/node_modules/);
    svgRule
      .test(/\.svg$/)
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
      });
    // const imagesRule = config.module.rule("images");
    // imagesRule.exclude.add(resolve("src/icons"));
    config.module.rule("images").test(/\.(png|jpe?g|gif)(\?.*)?$/);

    config
    // https://webpack.js.org/configuration/devtool/#development
      .when(process.env.NODE_ENV === 'development',
        config => config.devtool('cheap-source-map')
      )
    // 如果使用多页面打包，使用vue inspect --plugins查看html是否在结果数组中
    config.plugin("html").tap((args) => {
      // html中添加cdn
      // args[0].cdn = cdn;
      args[0].title = process.env.AppName;
      return args;
    });
    // 拷贝插件 从 from 拷贝 到 to
    // config.plugin("copy").tap((args) => {
    //   args[0].push({
    //     from: resolve(process.env.VUE_APP_STATIC_DIR),
    //     to: resolve(
    //       process.env.OutputDir + "/" + process.env.VUE_APP_STATIC_DIR
    //     ),
    //     ignore: [".*"],
    //   });
    //   return args;
    // });
  },
  configureWebpack: () => {
    const myConfig = {}
    if (IS_PROD) {
      myConfig.plugins = []
      // 1. 构建时开启gzip，降低服务器压缩对CPU资源的占用，服务器也要相应开启gzip
      productionGzip &&
        myConfig.plugins.push(
          new CompressionWebpackPlugin({
            // asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp(
              '\\.(' + productionGzipExtensions.join('|') + ')$'
            ),
            threshold: 8192,
            minRatio: 0.8
          })
        )
      // 2. 生产环境npm包转CDN
      // myConfig.externals = {
      //   'vue': 'Vue',
      //   'vue-router': 'VueRouter',
      //   'vuex': 'Vuex',
      //   'axios': 'axios',
      //   'mqtt': 'mqtt',
      //   'echarts': 'echarts'
      // }
    }
    return myConfig
  },
  pwa: {
    "name": process.env.AppName,
    // icon:[],
  },
  devServer: {
    open: false, // 是否打开浏览器
    port: "8080", // 代理端口
    proxy: {
      "/api": {
        target:
          "http://10.200.0.3:51003", // 目标代理接口地址
        secure: false,
        changeOrigin: true, // 开启代理，在本地创建一个虚拟服务端
        // ws: true, // 是否启用 websocket
        pathRewrite: {
          "^/api": "/",
        },
      },
    },
  },
};
