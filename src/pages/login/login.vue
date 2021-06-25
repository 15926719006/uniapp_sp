<template>
  <view>
    <view class="section-1">
      <image src="/static/images/login/login-bk.jpg" mode="widthFix" />
    </view>
    <view class="section-2">
      <view class="title">
        <view class="itme-login">手机号登录</view>
        <view class="item-label">请登录后完成后续操作</view>
      </view>
      <view class="input-box">
        <!-- <u-input v-model="phone" :border="true" placeholder="请输入手机号" />
        <u-input v-model="phone" :border="true" placeholder="请输入手机号" /> -->
        <view class="item">
          <input v-model="queryParams.name" placeholder="请输入名字">
        </view>
        <view class="item">
          <input v-model="queryParams.Email" placeholder="请输入邮箱">
        </view>
        <view class="item code">
          <input v-model="code" type="number" placeholder="请输入邮箱验证码">
          <view class="codeBtn" @click="getCode">{{ tips }}</view>
        </view>
      </view>

      <view class="next-button" @click="bind">绑定</view>
    </view>

    <u-verification-code
      ref="uCode"
      :seconds="seconds"
      @change="codeChange"
    />
  </view>
</template>

<script>
import { emailRandomCode, emailBindSave } from '@/api/requestConfig'
import { baseUtils } from '@/utils/common/BaseUtils'
export default {
  data() {
    return {
      email: '',
      code: '',
      tips: '',
      seconds: 60,
      queryParams: {
        Email: '',
        name: ''
      }
    }
  },
  methods: {
    codeChange(text) {
      this.tips = text
      // console.log(text)
    },
    // 获取验证码
    async getCode() {
      if (this.queryParams.name) {
        if (this.$u.test.email(this.queryParams.Email)) {
          const result = await emailRandomCode(this.queryParams)
          if (result.success) {
            baseUtils.showToast('发送成功')
            this.$refs.uCode.start()
          } else {
            // baseUtils.showToast('发送失败 请稍后再试')
          }
        } else {
          baseUtils.showToast('请检查邮箱格式')
        }
      } else {
        baseUtils.showToast('请填写姓名')
      }
    },
    // 绑定
    async bind() {
      if (this.code) {
        if (this.code.length === 6) {
          const result = await emailBindSave({ Email: this.queryParams.Email, code: this.code })
          if (result.success) {
            const aimsurl = encodeURIComponent('http://192.168.31.119:8080/#/')
            window.location.href = `http://onlinescoring.funzoe.cn/LdentityGet.aspx?aimsurl=${aimsurl}`
          }
          // 绑定成功后跳转
          console.log('bangding')
        } else {
          baseUtils.showToast('请检查验证码是否输入有误')
        }
      } else {
        baseUtils.showToast('请输入验证码')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import './login.scss';
</style>
