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
          <input v-model="phone" type="number" placeholder="请输入手机号">
        </view>
        <view class="item code">
          <input v-model="code" type="number" placeholder="请输入短信验证码">
          <view class="codeBtn" @click="getCode">{{ tips }}</view>
        </view>
      </view>

      <view class="next-button">登录</view>
    </view>

    <u-verification-code
      ref="uCode"
      :seconds="seconds"
      @change="codeChange"
    />
  </view>
</template>

<script>
export default {
  data() {
    return {
      phone: '',
      code: '',
      tips: '',
      seconds: 60
    }
  },
  methods: {
    codeChange(text) {
      this.tips = text
      console.log(text)
    },
    getCode() {
      this.$refs.uCode.start()
    }
  }
}
</script>

<style lang="scss" scoped>
@import './login.scss';
</style>
