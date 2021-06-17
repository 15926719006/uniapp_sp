<template>
  <view>
    <view class="edit">编辑信息</view>
    <!-- 1 -->
    <view class="section-1 card">
      <view class="left">
        <image :src="doctorDetail.imgurl" mode="" />
        <view class="tag tag1_bk">{{ doctorDetail.tag[0] }}</view>
        <view class="tag tag2_bk">{{ doctorDetail.tag[1] }}</view>
      </view>
      <view class="right">
        <view class="right-name">
          <view>{{ doctorDetail.name }}</view>
          <view class="item-score">{{ doctorDetail.score }}分</view>
        </view>
        <view>{{ doctorDetail.office }}-{{ doctorDetail.post }}</view>
        <view>{{ doctorDetail.area }}-{{ doctorDetail.hospital }}</view>
        <view class="phone">联系方式：{{ doctorDetail.phone }}</view>
      </view>
    </view>
    <!-- 2 -->
    <view class="section-2 card">
      <view class="title">讲者评分</view>
      <view class="rate">
        <u-rate v-model="doctorDetail.rateNum" disabled size="40" active-color="#FFD500" inactive-color="#DCDCDC" :count="5" gutter="35" />
        <view class="score">{{ doctorDetail.score }}</view>
      </view>
      <view class="tag">
        <view class="tag-item">普通话标准</view>
      </view>
    </view>
    <view class="section-3">1</view>
  </view>
</template>

<script>
import { doctorDetail } from './detailtalker'
export default {
  data() {
    return {
      doctorDetail
    }
  },
  onLoad() {
    console.log(this.doctorDetail)
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
@import "./detailtalker.scss";
</style>
