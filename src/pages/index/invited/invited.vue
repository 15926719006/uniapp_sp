<template>
  <view>
    <view v-for="(item,index) in invitedData" :key="index" class="card main" @click="goInvitedDetail(item.ALID)">
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
          <view
            class="tag"
            :class="{'tag-bk-1':item.Str_Status === '已接受','tag-bk-2':item.Str_Status === '已邀请','tag-bk-3':item.Str_Status === '已拒绝'}"
          >{{ item.Str_Status }}<view v-if="item.L_Status == 0" class="badge" /></view>
        </view>
      </view>
      <view class="bottom">
        <view>
          <view>邀请讲者</view>
          <view>{{ item.Sk_name }}</view>
        </view>
        <view>
          <view>讲题</view>
          <view class="theme">{{ item.T_Topic }}</view>
        </view>
      </view>
    </view>

  </view>
</template>

<script>
import { meetingList_InvitedGet } from '@/api/requestConfig'
// import { invitedData } from './invited'
export default {
  data() {
    return {
      invitedData: [],
      queryParams: {
        pageIndex: 1,
        pageSize: 20
      }
    }
  },
  created() {
    console.log(this.sponSordata)
    this.InvitedGetImpl()
  },
  methods: {
    // 获取受邀列表
    async InvitedGetImpl() {
      const result = await meetingList_InvitedGet()
      console.log('受邀列表', result.data.Table)
      this.invitedData = result.data.Table
    },
    goInvitedDetail(ALID) {
      this.$router.push({
        name: 'partinDetail',
        query: {
          ALID: ALID
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import './invited.scss';
</style>
