<template>
  <view>
    <view class="section-1">
      <view class="title">个人中心</view>
      <image src="/static/images/my/my-bk.png" mode="bottom" />
    </view>
    <view class="section-2">
      <view>
        <image src="/static/images/home/home-photo.png" mode="" />
      </view>
      <view class="name">王销售</view>
      <view class="area">华北区域</view>
    </view>
    <view class="section-3">
      <u-cell-group>
        <u-cell-item icon="order" :arrow="false" title="个人资料" @click="goMyinfo" />
        <u-cell-item icon="bell" :arrow="false" title="我的消息" @click="get" />
      </u-cell-group>
    </view>
  </view>
</template>

<script>
// import { loginStatusGet } from '@/api/requestConfig'
export default {
  created() {
  },
  methods: {
    // async get() {
    //   const result = await loginStatusGet()
    //   console.log(result)
    // }
    get() {
      this.$Router.push({
        name: 'login'
      })
    },
    // 个人信息
    goMyinfo() {
      this.$Router.push({
        name: 'myinfo'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import './my.scss';
</style>
