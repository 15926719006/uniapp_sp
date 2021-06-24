<template>
  <view>
    <view v-for="(item,index) in partinData" :key="index" class="card main" @click="goPartinDetail(item)">
      <view class="top">
        <view class="top-left">
          <view class="title">{{ item.meetingName }}</view>
          <view>{{ item.time }}</view>
          <view>{{ item.address }}</view>
        </view>
        <view class="top-right">
          <view
            class="tag"
            :class="{'tag-bk-1':item.state === '已确认','tag-bk-2':item.state === '审核中','tag-bk-3':item.state === '已驳回'}"
          >{{ item.state }}</view>
        </view>
      </view>
      <view class="bottom">
        <view>
          <view class="top-text">邀请讲者</view>
          <view class="bottom-text">{{ item.talker }}</view>
        </view>
        <view>
          <view class="top-text">讲题</view>
          <view class="theme bottom-text">{{ item.theme }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { partinData } from './partin'
export default {
  data() {
    return {
      partinData
    }
  },
  methods: {
    goPartinDetail(item) {
      console.log(item)
      this.$router.push({
        name: 'partinDetail',
        query: { detailData: item }
      })
      // console.log(item)
    }
  }
}
</script>

<style lang="scss" scoped>
@import './partin.scss';
</style>
