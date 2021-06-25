<template>
  <view>
    <view class="section-1">
      <view class="title">会议信息</view>
      <view class="main">
        <view class="left">
          <view class="left-title">{{ detailData.M_name }}</view>
          <view class="left-time">
            <view>{{ detailData.M_StartingTime }}~{{ detailData.M_EndTime }}</view>
          </view>
          <view>{{ detailData.M_location }}</view>
        </view>
        <view class="right" @click="goMeeting">会议详情</view>
      </view>
    </view>
    <view class="cutline" />
    <view class="section-2">
      <view class="title">受邀讲者</view>
      <view class="main">
        <view class="left">
          <image :src="detailData.SK_Avatar" :mode="detailData.SK_Avatar ? 'center':''" />
          <view class="region text">{{ detailData.AreaName }}</view>
          <view class="text">{{ detailData.SK_province }}·{{ detailData.SK_city }}</view>
        </view>
        <view class="right">
          <view class="right-name">
            <view>{{ detailData.Sk_name }}</view>
            <view class="item-score">{{ detailData.SK_score5 }}分</view>
          </view>
          <view>{{ detailData.SK_hospital }}</view>
          <view>{{ detailData.SK_branch }}·{{ detailData.SK_jobtitle }}</view>
          <view class="right-tag">
            <view class="tag tag1_bk">产品认可度{{ detailData.Sk_attitude }}</view>
            <view class="tag tag2_bk">{{ detailData.Sk_tendency }}</view>
          </view>
        </view>
      </view>
    </view>
    <view class="cutline" />
    <view class="section-3">
      <view class="title">讲题名称</view>
      <view class="theme">{{ detailData.T_Topic }}</view>

      <view v-if="detailData.L_Status == 2">
        <view class="cutline" />
        <view class="title">驳回理由</view>
        <view class="theme">{{ detailData.L_Reply }}</view>
      </view>
    </view>

    <view v-show="detailData.L_Status == 0" class="submit-btn">
      <view class="reject" @click="refuseMeetingModel = true">拒绝</view>
      <view class="submit" @click="submitMeetingModel = true">确认</view>
    </view>

    <view v-show="detailData.L_Status == 1" class="state-button buttonColor-1">已接受</view>
    <view v-show="detailData.L_Status == 2" class="state-button buttonColor-3">已拒绝</view>
    <view v-show="detailData.L_Status == 3" class="state-button buttonColor-2">已取消</view>

    <u-popup v-model="submitMeetingModel" mode="center" border-radius="14">
      <view class="refuse">
        <view class="check">是否确认提交</view>
        <view class="item-btn">
          <view class="item" @click="submitMeetingModel = false">取消</view>
          <view class="item" @click="submitMeeting">确认</view>
        </view>
      </view>
    </u-popup>

    <u-popup v-model="refuseMeetingModel" mode="center" border-radius="14">
      <view class="refuse">
        <view class="item-input">
          <view class="item-textarea">
            <textarea
              v-model="queryParams.L_Reply"
              placeholder="请输入拒绝理由"
              auto-height="true"
              maxlength="140"
              :focus="true"
            />
          </view>
        </view>
        <view class="item-btn">
          <view class="item" @click="refuseMeetingModel = false">取消</view>
          <view class="item" @click="refuseMeeting">确认</view>
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script>
// import { detail, talkerDetail } from './partinDetail.js'
import { meeting_InvitedGet, meeting_InvitedSave } from '@/api/requestConfig'
import { baseUtils } from '@/utils/common/BaseUtils'
import { escapeCode } from '@/utils/common/EscapeCode'
export default {
  data() {
    return {
      refuseMeetingModel: false,
      submitMeetingModel: false,
      topicName: '',
      detailData: {},
      ALID: '', // 受邀ID
      queryParams: {
        ALID: '',
        lType: '',
        L_Reply: ''
      }
    }
  },
  created() {
    this.InvitedGetImpl()
  },
  methods: {
    // 获取详情
    async InvitedGetImpl() {
      this.ALID = this.$route.query.ALID
      const result = await meeting_InvitedGet({ id: this.ALID })
      this.detailData = escapeCode.AllObjectReverse(result.data.Table[0])
      this.queryParams.ALID = this.detailData.ALID
      console.log(this.detailData)
    },
    // 接受会议
    async submitMeeting() {
      this.queryParams.lType = 1
      const result = await meeting_InvitedSave(this.queryParams)
      console.log(result)
      if (result.success) {
        this.$Router.push({
          name: 'index'
        })
      }
    },
    // 拒绝会议
    async refuseMeeting() {
      if (this.queryParams.L_Reply === '') {
        baseUtils.showToast('请输入拒绝理由！')
      } else {
        this.queryParams.lType = 2
        this.queryParams.L_Reply = escapeCode.XMLSerialize(this.queryParams.L_Reply)
        const result = await meeting_InvitedSave(this.queryParams)
        console.log(result)
        if (result.success) {
          this.$Router.push({
            name: 'index'
          })
        }
      }
    },
    // 会议详情
    goMeeting() {
      this.$router.push({
        name: 'sponsorDetail',
        query: {
          DetailAMID: this.detailData.AMID
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import './partinDetail.scss';
</style>
