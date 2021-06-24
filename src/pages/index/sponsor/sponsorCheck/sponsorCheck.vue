<template>
  <view>
    <!-- 会议信息 -->
    <view class="section-1">
      <view class="title">会议信息</view>
      <view class="main">
        <view class="left">
          <view class="left-title">{{ sponsorCheckData.meetingName }}</view>
          <view>{{ sponsorCheckData.time }}</view>
          <view>{{ sponsorCheckData.address }}</view>
        </view>
        <view class="right">会议详情</view>
      </view>
    </view>

    <!-- 审核 -->
    <!-- tabber -->
    <view class="tabbar">
      <view
        class="item"
        :class="{ active: tabIndex === 0 }"
        @click="switchTab(0)"
      >待审核</view>
      <view
        class="item"
        :class="{ active: tabIndex === 1 }"
        @click="switchTab(1)"
      >已确认</view>
      <view
        class="item"
        :class="{ active: tabIndex === 2 }"
        @click="switchTab(2)"
      >已驳回</view>
    </view>
    <!-- tabber -->

    <!-- 列表 -->
    <view v-for="(item,index) in showCheckList" :key="index" class="card section-2" @click="goSponsorAffirm(item.state)">
      <view class="left">
        <view class="item">
          <view class="title">受邀讲者</view>
          <view class="text">{{ item.talkerName }}</view>
        </view>
        <view class="item">
          <view class="title">讲课名称</view>
          <view class="text">{{ item.themeName }}</view>
        </view>
      </view>
      <view class="right">
        <view class="time">{{ item.time }}</view>
        <view
          class="state"
          :class="{'stateColor-1':tabIndex === 0,'stateColor-2':tabIndex === 1,'stateColor-3':tabIndex === 2}"
        >{{ item.state }}</view>
      </view>
    </view>
  </view>
</template>

<script>
import { sponsorCheckData, sponsorCheckList } from './sponsorCheck'
export default {
  data() {
    return {
      sponsorCheckData,
      sponsorCheckList, // 审核总数据
      tabIndex: 0,
      showCheckList: [] // 显示的审核数据
    }
  },
  watch: {
    tabIndex: {
      handler(val) {
        switch (val) {
          case 0 : this.showCheckList = this.sponsorCheckList.filter(item => {
            return item.state === '待审核'
          })
            break
          case 1 : this.showCheckList = this.sponsorCheckList.filter(item => {
            return item.state === '已确认'
          })
            break
          case 2 : this.showCheckList = this.sponsorCheckList.filter(item => {
            return item.state === '已驳回'
          })
            break
        }
      },
      immediate: true
    }
  },
  methods: {
    async switchTab(index) {
      if (this.tabIndex === index) return
      this.tabIndex = index
    },
    goSponsorAffirm(item) {
      if (item === '待审核') {
        this.$Router.push({
          name: 'sponsorAffirm'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import './sponsorCheck.scss';
</style>
