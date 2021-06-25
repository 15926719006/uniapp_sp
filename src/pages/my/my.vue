<template>
  <view>
    <view class="section-1">
      <view class="title">个人中心</view>
      <image src="/static/images/my/my-bk.png" mode="bottom" />
    </view>
    <view class="section-2">
      <view>
        <image :src="info.SF_Avatar ? info.SF_Avatar : '/static/images/common/head-user-unop.png'" :mode="info.SF_Avatar ? 'center':''" />
      </view>
      <view class="name">{{ info.SF_name }}</view>
      <view class="area">{{ info.SF_department }}</view>
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
import { myGet } from '@/api/requestConfig'
export default {
  data() {
    return {
      info: {}
    }
  },
  created() {
    this.myGetImpl()
  },
  methods: {
    async myGetImpl() {
      const result = await myGet()
      console.log(result)
      this.info = result.data.Table[0]
    },
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
