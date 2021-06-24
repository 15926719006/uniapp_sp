<template>
  <view>
    <view v-for="(item,index) in sponSorList" :key="index" class="card main" @click="goSponsorDetail(item.AMID)">
      <view class="top">
        <view class="top-left">
          <view class="title">{{ item.M_name }}</view>
          <view class="title-time">
            <view>{{ item.M_StartingTime }}</view>
            &nbsp;~&nbsp;
            <view>{{ item.M_EndTime }}</view>
          </view>
          <view>{{ item.M_location }}</view>
        </view>
        <view class="top-right">
          <view class="tag" :class="{'tag-bk-1':item.M_stage === '招募中','tag-bk-2':item.M_stage === '已完成'}">{{ item.M_stage }}</view>
        </view>
      </view>
      <view class="bottom">
        <view>
          <view>空缺</view>
          <view>{{ item.M_Number_v }}</view>
        </view>
        <view>
          <view>已确认</view>
          <view>{{ item.M_Number_d }}</view>
        </view>
        <view>
          <view class="waitCheck">共需讲者<view v-if="item.ifnew_n == 1" class="badge" /></view>
          <view>{{ item.M_Number_a }}</view>
        </view>
      </view>
    </view>

  </view>
</template>

<script>
import { meetingList_CreateGet } from '@/api/requestConfig'
import { sponSordata } from './sponsor'
export default {
  data() {
    return {
      sponSordata,
      sponSorList: []
    }
  },
  created() {
    this.meetingListGetImpl()
  },
  methods: {
    // 获取会议列表
    async meetingListGetImpl() {
      const result = await meetingList_CreateGet()
      console.log('发起列表', result.data.Table)
      this.sponSorList = result.data.Table
    },
    goSponsorDetail(amid) {
      this.$router.push({
        name: 'sponsorDetail',
        query: { amid: amid }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import './sponsor.scss';
</style>
