const TransformPages = require('uni-read-pages')
const tfPages = new TransformPages({
  includes: ['path', 'name', 'meta']
})
module.exports = {
  configureWebpack: {
    plugins: [
      new tfPages.webpack.DefinePlugin({
        ROUTES: JSON.stringify(tfPages.routes)
      })
    ]
  },
  transpileDependencies: ['uni-simple-router'],
  devServer: {
    open: true, // 编译后默认打开浏览器
    // host: 'localhost', // 域名
    host: '192.168.31.119', // 域名
    port: 8080, // 端口
    https: false, // 是否https
    // 显示警告和错误
    overlay: {
      warnings: false,
      errors: true
    }
    // proxy: {}
  }

}
