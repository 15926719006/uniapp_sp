class BaseUtils {
  // 消息提示
  showToast(content, durationTime = 1500, icon = 'none') {
    return new Promise(resolve => {
      uni.showToast({
        title: content,
        icon: icon,
        duration: durationTime,
        mask: true
      })
      resolve(true)
    })
  }
  showLoading(content) {
    return new Promise(resolve => {
      uni.showLoading({
        title: content,
        mask: true
      })
      resolve(true)
    })
  }
  hideLoading() {
    return new Promise(resolve => {
      uni.hideLoading()
      resolve(true)
    })
  }
  // showModal
  showModal(content = '', title = '', optionsParams = {}) {
    return new Promise((resolve) => {
      uni.showModal({
        title: title,
        content: content,
        showCancel: true,
        cancelText: optionsParams.cancelText || '取消',
        cancelColor: optionsParams.cancelColor || '#000000',
        confirmText: optionsParams.confirmText || '确定',
        confirmColor: optionsParams.confirmColor || '#3CC51F',
        success: (result) => {
          if (result.confirm) {
            resolve(true)
          }
          if (result.cancel) {
            resolve(false)
          }
        }
      })
    })
  }
  // 睡觉
  sleep(time = 1500) {
    return new Promise(resolve => {
      setTimeout(function() {
        resolve(true)
      }, time)
    })
  }
  // 返回
  navigateBack(number = 1) {
    return new Promise(resolve => {
      uni.navigateBack({
        delta: number
      })
      resolve(true)
    })
  }
  // 关闭全部页面退到xx页
  relaunch(url) {
    return new Promise(resolve => {
      uni.reLaunch({
        url: url
      })
      resolve(true)
    })
  }
  // 指定跳转的页面，且关闭当前页面
  redirectTo(url) {
    return new Promise(resolve => {
      uni.redirectTo({
        url: url
      })
      resolve(true)
    })
  }
  navigateTo(url) {
    return new Promise(resolve => {
      uni.navigateTo({
        url: url
      })
      resolve(true)
    })
  }
  switchTab(url) {
    return new Promise(resolve => {
      uni.switchTab({
        url: url
      })
      resolve(true)
    })
  }
  /**
     * @param count 最多可以选择的图片张数
     * @returns {Promise<uni.chooseImage.SuccessCallbackResult>}
     * 返回选择图片的Promise<uni.chooseImage.SuccessCallbackResult>结果；
     * 其中resolve的结果为一个临时路径的数组
     */
  chooseImage(count) {
    return new Promise(resolve => {
      uni.chooseImage({
        count: count,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success: (res) => {
          resolve(res)
        }
      })
    })
  }
  getEnv() {
    let getEnv
    if (process.env.NODE_ENV === 'development') {
      getEnv = function() {
        return 'development'
      }
    } else {
      getEnv = function() {
        return 'production'
      }
    }
    getEnv()
  }
  /** 返回文件唯一名称 */
  getGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0; var v = c === 'x' ? r : (r & 0x3 | 0x8)
      return v.toString(16)
    }) + (Math.floor(Math.random() * (9999 - 1000)) + 1000)
  }
}
const baseUtils = new BaseUtils()
export { baseUtils }
