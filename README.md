# react-admin
react-admin system solution

## 前言
> 最近在学习React,基于实际业务,使用UmiJS框架与Ant Design UI框架开发了一套简单的后台管理系统(框架)，实现用户、角色、资源权限等基本功能。

- [GitHub地址](https://github.com/zstared/react-admin-web)
- [预览地址](http://47.112.194.62:9091)
- [API接口GitHub地址](https://github.com/zstared/koa-admin-api)
## 依赖模块

- [react](https://facebook.github.io/react/)
- [dva](https://dvajs.com/)(dva 首先是一个基于 redux 和 redux-saga 的数据流方案，然后为了简化开发体验，dva 还额外内置了 react-router 和 fetch，所以也可以理解为一个轻量级的应用框架)
- [UmiJS](https://umijs.org/zh/guide/)(<span style="color: rgb(243,121,52);">umi，中文可发音为乌米，是一个可插拔的企业级 react 应用框架</span>)
- [antd](https://ant.design/docs/react/getting-started-cn/)(antd 是基于 Ant Design 设计体系的 React UI 组件库，主要用于研发企业级中后台产品。)
- [axios](https://github.com/mzabriskie/axios)(<span style="color: rgb(243,121,52);">http请求模块，可用于前端任何场景，很强大👍</span>)
- [react-fontawesome](https://fontawesome.com)(<span style="color: rgb(243,121,52);">基于react SVG图标，图标量大,实用！</span>)

## 功能模块

- 首页
    - 工作台
    - 国际化
    - 个性化设置
- 系统管理
    - 用户
    - 角色
	- 资源权限
- ...

## 代码目录
```bash
+-- dist/                                   ---打包的文件目录
+-- config/                                 ---配置文件目录
+-- node_modules/                           ---npm下载文件目录
+-- public/                                 
|   --- favicon.png                         ---网站图标
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

## 使用
### 下载或克隆项目源码
```bash
 git clone https://github.com/zstared/react-admin-web.git
 cd react-admin-web
 npm install
 npm run dev          # 访问 http://localhost:8000
```

## 支持环境
现代浏览器及 IE11。

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------- | --------- | --------- | --------- | --------- |
| IE11, Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions

## 结尾
该项目会不定时更新，后续时间会添加更多的模块

欢迎和感谢大家PR~~👏👏

若有问题，可加微信入群与我交流
![二维码](https://github.com/zstared/react-admin-web/blob/master/wechat.jpg)

如果对你有帮助，给个star哟~~❤️❤️❤️❤️