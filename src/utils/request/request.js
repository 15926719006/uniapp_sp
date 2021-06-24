import { url } from '@/api/baseUrl'
import { baseUtils } from '../common/BaseUtils'
// import storage from '@/utils/storage/index'
const postData = { Array1: {}}

async function loginRequest() {
  if (loginRequest.result) return loginRequest.result
  loginRequest.result = mainLogin()
  return loginRequest.result
}
function mainLogin() {
  return new Promise(resolve => {
    // 没有token的时候
    if (!uni.getStorageSync('authToken')) {
      uni.request({
        url: url + '/Basis/LoginStatusGet',
        data: {},
        method: 'post'
      }).then(res => {
        // console.log(res[1].data.errormsg)
        if (res[1].data.errormsg === '登录状态正常') {
          // console.log(123)
          uni.setStorageSync('authToken', res[1].data.errormsg)
        } else {
          uni.reLaunch({
            url: '' // 登录页面
          })
          uni.setStorageSync('authToken', '')
        }
        resolve(true)
      })
    }
  })
}

const requests = {
  config: {
    baseUrl: url,
    header: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data: {},
    method: 'POST',
    dataType: 'json', /* 如设为json，会对返回的数据做一次 JSON.parse */
    responseType: 'text',
    success() { },
    fail() { },
    complete() { }
  },
  interceptor: {
    request(options) {
      uni.showLoading({
        title: '加载中...'
      })
    },
    response(options) {
      uni.hideLoading()
    }
  },

  async request(options = {}) {
    postData.Array1 = options.data || {}
    options.baseUrl = options.baseUrl || this.config.baseUrl
    options.dataType = options.dataType || this.config.dataType
    options.url = options.baseUrl + (options.url || '')
    options.data = postData || {}
    options.method = options.method || this.config.method
    if (!uni.getStorageSync('authToken')) {
      await loginRequest()
    }
    if (uni.getStorageSync('authToken')) {
      return new Promise((resolve, reject) => {
        let _config = null
        options.complete = (response) => {
          // 响应code
          const statusCode = response.statusCode
          response.config = _config
          if (this.interceptor.response) {
            const newResponse = this.interceptor.response(response)
            if (newResponse) {
              response = newResponse
            }
          }
          // 统一的响应日志记录
          this.reslog(response)
          // 成功
          if (statusCode === 200) {
            // 统一提示报错信息
            if (!response.data.success) {
              baseUtils.showToast(response.data.data)
            }

            resolve(response.data)
          } else if (statusCode === 401) {
            uni.clearStorageSync()
            reject(response)
          }
        }
        // 请求失败处理，同request的fail
        options.fail = (err) => {
          console.log(err)
        }
        _config = Object.assign({}, this.config, options)
        _config.requestId = new Date().getTime()
        if (this.interceptor.request) {
          this.interceptor.request(_config)
        }
        this.reqlog(_config)
        uni.request(_config)
      })
    }
  },
  get(url, data, options = {}) {
    options.url = url
    options.data = data
    options.method = 'GET'
    return this.request(options)
  },
  post(url, data, options = {}) {
    options.url = url
    options.data = data
    options.method = 'POST'
    return this.request(options)
  },
  put(url, data, options = {}) {
    options.url = url
    options.data = data
    options.method = 'PUT'
    return this.request(options)
  },
  delete(url, data, options = {}) {
    options.url = url
    options.data = data
    options.method = 'DELETE'
    return this.request(options)
  },
  reslog(res) {
    const _statusCode = res.statusCode
    console.log('【' + res.config.requestId + '】 地址：' + res.config.url)
    if (res.config.data) {
      console.log('【' + res.config.requestId + '】 请求参数：' + JSON.stringify(res.config.data))
    }
    console.log('【' + res.config.requestId + '】 响应状态：', _statusCode)
    // TODO 除了接口服务错误外，其他日志调接口异步写入日志数据库
    switch (_statusCode) {
      case 200:
        break
      case 401:
        break
      case 404:
        break
      default:
        break
    }
  },
  reqlog(req) {
    console.log('【' + req.requestId + '】 地址：' + req.url)
    if (req.data) {
      console.log('【' + req.requestId + '】 请求参数：' + JSON.stringify(req.data))
    }
  }
}

export default requests
