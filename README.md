# react-admin
react-admin system solution

### 前言
> 最近在学习React,基于实际业务,使用UmiJS框架与Ant Design UI框架开发了一套简单的后台管理系统(框架)，实现用户、角色、资源权限等基本功能。

- [GitHub地址](https://github.com/zstared/react-admin-web)
- [预览地址](http://47.112.194.62:9091)

### 依赖模块

- [react](https://facebook.github.io/react/)
- [dva](https://dvajs.com/)(dva 首先是一个基于 redux 和 redux-saga 的数据流方案，然后为了简化开发体验，dva 还额外内置了 react-router 和 fetch，所以也可以理解为一个轻量级的应用框架)
- [UmiJS](https://umijs.org/zh/guide/)(<span style="color: rgb(243,121,52);">umi，中文可发音为乌米，是一个可插拔的企业级 react 应用框架</span>)
- [antd](https://ant.design/docs/react/getting-started-cn/)(antd 是基于 Ant Design 设计体系的 React UI 组件库，主要用于研发企业级中后台产品。)
- [axios](https://github.com/mzabriskie/axios)(<span style="color: rgb(243,121,52);">http请求模块，可用于前端任何场景，很强大👍</span>)
- [react-fontawesome](https://fontawesome.com)(<span style="color: rgb(243,121,52);">基于react SVG图标，图标量大,实用！</span>)

### 功能模块

- 首页
    - 工作台
    - 国际化
    - 个性化设置
- 系统管理
    - 用户（增、删、查、改、分配权限）
    - 角色（增、删、查、改、分配权限）
	- 资源权限（增、删、查、改）
- 

### 代码目录
```js
+-- dist/                                   ---打包的文件目录
+-- config/                                 ---配置文件目录
+-- node_modules/                           ---npm下载文件目录
+-- public/                                 
|   --- favicon.png							---网站图标
+-- src/                                    ---核心代码目录
|   +-- assets                              ---资源
|   |    --- logo.svg
|   |    |    --- ...   
|   +-- components                          ---各式各样的组件存放目录
|   |    +-- TablePage                      ---表格页面通用组件
|   |    |    --- ...   
|   |    +-- UploadFile                     ---文件上传组件
|   |    |    --- ...   
|   |    +-- UploadImage                    ---图片上传组件
|   |    |    --- ...   
|   |    +-- Permission                     ---权限树形组件
|   |    |    --- ...   
|   |    +--  --- ... 
|   +-- layouts                             ---布局
|   +-- locales                             ---国际化资源
|   +-- models                              ---全局 dva model
|   +-- pages                               ---业务页面入口和常用模板
|   +-- services                            ---后台接口服务
|   +-- utils                               ---工具库
|   --- global.less                         ---全局样式
|   --- global.js                           ---全局 JS
--- package.json                                    
```
### 安装运行
##### 1.下载或克隆项目源码
##### 2.yarn 或者 npm安装相关包文件(首先推荐使用yarn，国内建议增加淘宝镜像源，不然很慢，你懂的😁)
> 有些老铁遇到运行时报错，首先确定下是不是最新稳定版的nodejs和npm或者yarn(推荐用yarn)，切记不要用cnpn

```js
// 首推荐使用yarn装包
yarn or npm i
```
##### 3.启动项目
```js
yarn dev or npm run dev
```
##### 4.打包项目
```js
yarn build or npm run build
```

### 结尾
该项目会不定时更新，后续时间会添加更多的模块

欢迎和感谢大家PR~~👏👏

若有问题，可加微信入群与我交流
![二维码][data:image/jpeg;base64,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]

如果对你有帮助，给个star哟~~❤️❤️❤️❤️