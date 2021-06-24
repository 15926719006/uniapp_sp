<template>
  <view>
    <view class="section-1">
      <view class="title">会议信息</view>
      <view class="main">
        <view class="left">
          <view class="left-title">{{ detail.meetingName }}</view>
          <view>{{ detail.time }}</view>
          <view>{{ detail.address }}</view>
        </view>
        <view class="right">会议详情</view>
      </view>
    </view>
    <view class="cutline" />
    <view class="section-2">
      <view class="title">受邀讲者</view>
      <view class="main">
        <view class="left">
          <image :src="talkerDetail.imgurl" mode="" />
          <view class="region text">{{ talkerDetail.region }}</view>
          <view class="text">{{ talkerDetail.area }}</view>
        </view>
        <view class="right">
          <view class="right-name">
            <view>{{ talkerDetail.name }}</view>
            <view class="item-score">{{ talkerDetail.score }}分</view>
          </view>
          <view>{{ talkerDetail.hospital }}</view>
          <view>{{ talkerDetail.office }}-{{ talkerDetail.post }}</view>
          <view class="right-tag">
            <view class="tag tag1_bk">{{ talkerDetail.tag[0] }}</view>
            <view class="tag tag2_bk">{{ talkerDetail.tag[1] }}</view>
          </view>
        </view>
      </view>
    </view>
    <view class="cutline" />
    <view class="section-3">
      <view class="title">讲题名称</view>
      <view class="theme">{{ detail.themeName }}</view>
    </view>

    <view class="submit-btn">
      <view class="reject">驳回</view>
      <view class="submit">确认</view>
    </view>
  </view>
</template>

<script>
import { detail, talkerDetail } from './sponsorAffirm'
export default {
  data() {
    return {
      detail,
      talkerDetail,
      topicName: ''
    }
  }
}
</script>

<style lang="scss" scoped>
@import './sponsorAffirm.scss';
</style>
