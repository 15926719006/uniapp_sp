<template>
  <view>
    <view class="top">
      <view class="info-title">
        <image src="/static/images/home/home-photo.png" mode="" />
        <view>{{ myinfoList.SF_name }}</view>
      </view>
    </view>
    <view class="bottom">
      <u-cell-group :border="false">
        <u-cell-item :arrow="false" :border-top="false" title="性别" :value="myinfoList.SF_gender" />
        <u-cell-item :arrow="false" :border-top="false" title="邮箱" :value="myinfoList.SF_Email" />
        <u-cell-item :arrow="false" :border-top="false" title="手机号" :value="myinfoList.SF_phone" />
        <u-cell-item :arrow="false" :border-top="false" title="省市" :value="myinfoList.SF_province + myinfoList.SF_city" />
        <u-cell-item :arrow="false" :border-top="false" title="位置" :value="myinfoList.SF_position" />
        <u-cell-item :arrow="false" :border-top="false" title="职称" :value="myinfoList.SF_jobtitle" />
      </u-cell-group>
    </view>
  </view>
</template>

<script>
import { myGet } from '@/api/requestConfig'
export default {
  data() {
    return {
      myinfoList: {}
    }
  },
  created() {
    this.myGetImpl()
  },
  methods: {
    // 获取个人信息
    async myGetImpl() {
      const result = await myGet()
      console.log(result.data.Table[0])
      this.myinfoList = result.data.Table[0]
    }
  }
}
</script>

<style lang="scss" scoped>
@import './myinfo.scss';
</style>
