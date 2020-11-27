# vue2-ts-template

[更新日志](CHANGELOG.md)

- [介绍](#介绍)
- [文档](#文档)
- [预安装](#预安装)
  - [环境要求](#环境要求)
  - [插件](#插件)
  - [建议开发环境](#建议开发环境)
- [使用](#使用)
  - [开发环境](#开发环境)
  - [打包](#打包)
  - [格式化](#格式化)
  - [其他](#其他)
- [项目目录说明](#项目目录说明)
- [已完成功能](#已完成功能)
- [正在开发的功能](#正在开发的功能)
- [学习文档](#学习文档)

## 介绍

基于`element-ui`,`typescript`,`composition-api`实现的 vue3 风格的PC端脚手架

## 注意

本项目为未来升级到vue3做了准备，编写代码时请按照composition api的写法来写

## 文档

[文档地址,正在开发中...](https://vue3js.cn/)

## 预安装

### 环境要求

- `Node.js`: - 版本最好大于 `12.0.0`
- `yarn` > `npm` > `cnpm`: - 包管理工具.

### 插件

- [Vue Router Next](https://github.com/vuejs/vue-router-next)
- [Vuex Next](https://github.com/vuejs/vuex)
- [axios](https://github.com/axios/axios) - Http 数据交互
- [TypeScript](https://www.typescriptlang.org/)

### 建议开发环境

- `Git`: - 版本管理工具
- `Visual Studio Code` - (VSCode): 最新版本
  - [VS Code Extensions](./.vscode/extensions.json)
    - [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) - Tailwind Css 样式联想
    - [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur) - vue 开发必备
    - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) - 脚本代码检查
    - [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) - 代码格式化
    - [Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint) - css 格式化

## 使用

### 开发环境

```bash
yarn serve
```

### 打包

```bash

yarn build # 打包

yarn analysis # 生成构建包报表预览
```

### 格式化

```bash
yarn lint # 样式格式化
```

### 其他

```bash
yarn reinstall # 删除依赖重新装，兼容window

yarn changelog # 生成CHANGELOG
```

## Git 提交规范

- 参考 [vue](https://github.com/vuejs/vue/blob/dev/.github/COMMIT_CONVENTION.md) 规范 ([Angular](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular))

  - `feat` 增加新功能
  - `fix` 修复问题/BUG
  - `style` 代码风格相关无影响运行结果的
  - `perf` 优化/性能提升
  - `refactor` 重构
  - `revert` 撤销修改
  - `test` 测试相关
  - `docs` 文档/注释
  - `chore` 依赖更新/脚手架配置修改等
  - `types` 类型定义文件更改


## 项目目录说明
```
├─.browserslistrc
├─.editorconfig
├─.env
├─.env.development
├─.env.production
├─.env.test
├─.eslintignore
├─.eslintrc.js
├─.gitignore
├─.huskyrc
├─.prettierignore
├─.prettierrc
├─.stylelintrc
├─babel.config.js
├─commitlint.config.js
├─jest.config.js
├─package-lock.json
├─package.json
├─README.md
├─tsconfig.json
├─vue.config.js
├─tests
├─static
|   ├─vuex-3.5.1
|   ├─vue-router-3.4.7
|   ├─vue-2.6.11
|   ├─elementui-2.13.2
|   ├─axios-0.20.0
├─src
|  ├─App.vue
|  ├─main.ts
|  ├─registerServiceWorker.ts
|  ├─utils //公共的util
|  |   ├─commonUtil.ts //存放非常通用的方法 如isObject等
|  |   ├─dataFormatUtil.ts //存放数据格式转换的方法，因为vue3没有filter所以该工具类里定义一些常用的和公用的数据格式转换方法，如果仅是某个模块用就放在写在模块目录里，建议写在模块的mixin里
|  |   ├─domUtil.ts  //存放跟dom操作相关的一些方法。
|  |   ├─elementDataAdaptor.ts //存放一些跟elementUI组件数据适配的一些通用方法。
|  |   ├─httpUtil.ts //http请求方法工具类
|  |   ├─localStorageUtil.ts //本地存储工具类包括localstore和sessionStorage，如果要用indexDB，也要封装在该工具类里，该工具的定位是客户端本地数据库的接口。
|  |   ├─scroll-to.ts // 平缓滚动滚动条的方法
|  |   ├─systemInfo.ts //获取平台和设备系统等信息的一些工具方法
|  |   ├─timerManager.ts //定时器管理类
|  |   ├─validateUtil.ts //一些数据合法有效性的校验方法
|  |   └Vuewrap.ts //composition api的封装，所有用到的composition方法都要经它这一层包裹，方便后续升级vue3，没有export出的方法自行添加。
|  ├─types //全局类型声明，如引入的插件等的声明。
|  |   ├─global.d.ts
|  |   ├─shims-tsx.d.ts
|  |   └shims-vue.d.ts
|  ├─styles
|  |   ├─index.less
|  |   ├─init.less
|  |   ├─mixins.less
|  |   ├─normalize.less
|  |   └transition.less
|  ├─store
|  |   ├─index.ts
|  |   ├─modules
|  |   |    └app.ts
|  ├─service
|  |    ├─index.ts
|  |    ├─modules
|  ├─router
|  |   ├─index.ts
|  |   ├─types.ts
|  |   ├─modules
|  |   |    └basic.ts
|  |   ├─guard //路由守卫的文件夹，需要定义路由守卫，可以在该目录下编写。
|  |   |   ├─index.ts
|  |   |   └NProgressGuard.ts
|  ├─plugins
|  |    └index.ts
|  ├─modules
|  |    ├─home  //业务模块home示例
|  |    |  ├─setup.ts //模块代码运行前，执行的脚本，需要手动在模块代码运行前import
|  |    |  ├─styles  //模块内部的样式文件
|  |    |  ├─store //vuex 里的module，命名空间以[模块目录名]-[文件名]，无需在全局的/src/store里添加代码加入，会自动加入。
|  |    |  |   └index.ts //如此处在vuex的module名为：home-index
|  |    |  ├─service //存放数据处理，api请求，是在vue实例里 以this.$service.home或者this.getService()方法能够拿到的对象，详情请查看目录里的index文件。该文件夹下的内容自行管理
|  |    |  |    └index.ts
|  |    |  ├─router //存放模块的路由，无需在全局的/src/router里添加代码加入，会自动加入。
|  |    |  |   └index.ts
|  |    |  ├─pages //存放页面文件
|  |    |  |   └Home.vue
|  |    |  ├─mixin //存放模块的mixin文件，尽量将同一类的mixin写在一个文件里，然后进行组合
|  |    |  |   └basic.ts
|  |    |  ├─dataTypes //存放类型声明文件
|  |    |  ├─components //存放模块内部的公共组件
|  |    |  |     └HelloWorld.vue
|  |    |  ├─assets //存放模块内部的图片，视频，svg图片的，svg的图片必须放在asset/svg下
|  |    |  |   ├─video
|  |    |  |   ├─svg
|  |    |  |   |  └dashboard.svg
|  |    |  |   ├─images
|  |    |  ├─api  //存放模块内部的请求方法定义文件，vue实例里禁止直接import该文件，来请求api数据，而是通过this.$service.home或者this.getService()得到的对象来访问api请求，方便未来api请求层的替换
|  |    |  |  └index.ts
|  |    ├─error-pages
|  |    |      └404.vue
|  ├─mixins  //公共的通用的一些mixin方法，可从util目录里的选取要用的方法自行组合。
|  |   └UIMixin.ts
|  ├─icons
|  |   ├─index.ts
|  |   ├─svgo.yml
|  |   ├─svg
|  |   |  ├─tree-table.svg
|  |   |  ├─tree.svg
|  |   |  └user.svg
|  ├─dataTypes //自行编写的类，接口等声明文件，公共部分的，如果仅是某个模块的，写在模块里
|  |     ├─interface //接口
|  |     |     └responseHelper.ts
|  |     ├─impl //类
|  |     |  └ResponseHelper.ts
|  ├─components
|  |     ├─inputFile.vue
|  |     ├─SvgIcon
|  |     |    └index.vue
|  ├─assets
|  |   ├─images
|  |   |   └logo.png
├─public
|   ├─favicon.ico
|   ├─index.html
|   ├─robots.txt


注：
关于动态的vuex module可以在模块内部新建一个dynamicStore文件夹自行利用api自决定何时，在何处添加，公共的动态module 就在src/store下新建dynamic文件夹里编写
关于动态路由添加可以在模块内部新建一个dynamicRouter文件夹自行利用api决定何时，在何处添加，公共的动态路由 就在src/router下新建dynamic文件夹里编写，
建议写模块的mixin和数据转换，工具类方法前先到公共部分查找，如果没有问下项目小组成员是否其他模块要用，要用就写在公共部分里。建议加下用到的模块的注释。

```
## 已完成功能

- [x] 项目搭建（基于 vue-cli）

## 正在开发的功能

- [ ] axios 封装

## 学习文档

- [vue3-资源合集](https://vue3js.cn/)

- [composition-api使用文档](https://github.com/vuejs/composition-api/blob/master/README.zh-CN.md)

- [puppeteer使用文档](https://github.com/puppeteer/puppeteer)

- [jest使用文档](https://jestjs.io/docs/zh-Hans/getting-started.html)

- [less使用文档](https://less.bootcss.com/)

- [scss 使用文档](https://www.sass.hk/)
