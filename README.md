#### uni-app 集成环境，包含eslint,jsconfig配置等
#### 路由请使用 uni-simple-router, ui组件库为uview ui
- 微信小程序启动方式为
    npm run wx
- H5启动方式为
    yarn serve

安装依赖请用yarn add xxx 

项目整体分为三个文件夹 home, index, my 相对应的子页面都在各自文件夹下, 添加，删除页面在 pages.json 文件里
** 注意事项： pages.json修改后(例：新增页面), 需要重新启动项目才能看

####请求
接口域名封装在   api/baseUrl.js
接口地址封装在   api/requestConfig.js
接口拦截器封装在 utils/request/request.js

所有请求前 请求后统一的处理都在拦截器里做  例如 给每个请求的数据包上 Array1:{},请求时loading,请求成功loading关闭

