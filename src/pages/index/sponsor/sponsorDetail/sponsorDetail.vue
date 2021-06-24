<template>
  <view>
    <!-- 会议卡片 -->
    <view class="card main">
      <view class="edit" @click="goEditMeeting">编辑会议</view>
      <view class="top">
        <view class="top-left">
          <view class="title">
            {{ sponsorDetail.M_name }}
          </view>
          <view class="title-time">
            <view>{{ sponsorDetail.M_StartingTime }}</view>
            &nbsp;~&nbsp;
            <view>{{ sponsorDetail.M_EndTime }}</view>
          </view>
          <view>{{ sponsorDetail.M_location }}</view>
        </view>
        <view class="top-right">
          <view class="tag" :class="{'tag-bk-1':sponsorDetail.M_stage === '招募中','tag-bk-2':sponsorDetail.M_stage === '已完成'}">{{ sponsorDetail.M_stage }}</view>
        </view>
      </view>
      <view class="bottom">
        <view>
          <view>空缺</view>
          <view>{{ sponsorDetail.M_Number_v }}</view>
        </view>
        <view>
          <view>已确认</view>
          <view>{{ sponsorDetail.M_Number_d }}</view>
        </view>
        <view>
          <view class="waitCheck">共需讲者<view v-if="sponsorDetail.M_Number_a !== 0" class="badge" /></view>
          <view>{{ sponsorDetail.M_Number_a }}</view>
        </view>
      </view>
    </view>

    <!-- tabber -->
    <view class="tabbar">
      <view
        class="item"
        :class="{ active: tabIndex === 0 }"
        @click="switchTab(0)"
      >会议详情</view>
      <view
        class="item"
        :class="{ active: tabIndex === 1 }"
        @click="switchTab(1)"
      >讲者邀请</view>
    </view>
    <!-- tabber -->

    <!-- 会议详情 -->
    <view class="section-2">
      <view v-show="tabIndex === 0" class="meetingDetail">
        <view class="main-box">
          <view class="title">会议时间</view>
          <view class="content">{{ sponsorDetail.M_StartingTime }}~{{ sponsorDetail.M_EndTime }}</view>
        </view>
        <view class="main-box">
          <view class="title">会议区域</view>
          <view class="content">{{ sponsorDetail.AreaName }};{{ sponsorDetail.M_province }}-{{ sponsorDetail.M_city }}</view>
        </view>
        <view class="main-box">
          <view class="title">会议地点</view>
          <view class="content">{{ sponsorDetail.M_location }}</view>
        </view>
        <view class="main-box">
          <view class="title">讲者人数</view>
          <view class="content">{{ sponsorDetail.M_Number_p }}</view>
        </view>
        <view class="main-box">
          <view class="title">讲者要求</view>
          <view class="content">{{ sponsorDetail.M_label }}</view>
        </view>
        <view class="main-box">
          <view class="title">发起人</view>
          <view class="content">{{ sponsorDetail.SF_name }}</view>
        </view>
      </view>

      <!-- 讲者推荐 -->
      <view v-show="tabIndex === 1" class="talkerReferr">
        <view v-for="(item,index) in inviteDeatil" :key="index" class="subject-card">
          <view class="top">
            <view class="top-left">
              <view class="title">讲题{{ index+1 }}</view>
              <view class="content">{{ item.T_Topic }}</view>
            </view>
            <view class="top-right">
              <view class="inviteBtn" @click="showInviteModel(item.AMTID)">邀请讲者</view>
            </view>
          </view>
          <view class="cutline" />
          <view class="bottom">
            <view v-if="!mapObj[item.AMTID]" class="noneInvited">暂无邀请讲者</view>
            <block v-if="mapObj[item.AMTID]">
              <view v-for="(itemj,indexj) in mapObj[item.AMTID]" :key="indexj" class="item-card talkerCard">
                <view class="left">
                  <view class="item">
                    <view class="title">受邀讲者</view>
                    <view class="text">{{ itemj.Sk_name }}</view>
                  </view>
                  <view class="item">
                    <view class="title">讲课名称</view>
                    <view class="text">{{ itemj.Column1 }}</view>
                  </view>
                </view>
                <view class="right">
                  <view class="time">{{ itemj.lastminute }}</view>
                  <view
                    class="state"
                    :class="{'stateColor-1':itemj.Str_Status === '已邀请','stateColor-2':itemj.Str_Status === '已接受','stateColor-3':itemj.Str_Status === '已拒绝'}"
                  >{{ itemj.Str_Status }}</view>
                </view>
              </view>
            </block>

          </view>
        </view>
      </view>

      <!-- 邀请弹窗 -->
      <u-popup v-model="inviteShowModel" mode="bottom" height="1100rpx">
        <view class="popupModel">
          <view class="popupSearch"><u-search v-model="searchTalker" placeholder="请输入要搜索的讲者关键词" :animation="true" /></view>
          <scroll-view scroll-y="true" style="height: 800rpx;">
            <view v-for="(item,index) in talkerList" :key="index" class="section-card" @click="checkTalker(item.SKID)">
              <view class="card-content">
                <view class="left">
                  <image :src="item.SK_Avatar ? item.SK_Avatar : '/static/images/common/head-user.png'" :mode="item.SK_Avatar ? 'center':''" />
                </view>
                <view class="middle">
                  <view class="middle-name">
                    <view>{{ item.Sk_name }}</view>
                    <view class="item-score">{{ item.SK_score5 }}分</view>
                  </view>
                  <view>{{ item.SK_hospital }}</view>
                  <view>{{ item.SK_branch }}</view>
                  <view class="middle-tag">
                    <view class="tag tag1_bk">产品认可度{{ item.Sk_attitude }}</view>
                    <view class="tag tag2_bk">{{ item.Sk_tendency }}</view>
                  </view>
                </view>
                <view class="right">
                  <image :src="checkTalkerList.includes(item.SKID) ? '/static/images/sponsor/check.png' : '/static/images/sponsor/uncheck.png'" mode="" />
                </view>
              </view>
            </view>

          </scroll-view>
          <!-- <view class="divider">
            <u-divider margin-bottom="20rpx">没有更多了</u-divider>
          </view> -->
          <view class="next-button" @click="inviteTalker">邀请讲者</view>
        </view>
      </u-popup>
    </view>
  </view>
</template>

<script>
import { meetingGet, speakerListGet, meetingInviteSave } from '@/api/requestConfig'
import { baseUtils } from '@/utils/common/BaseUtils'
import { escapeCode } from '@/utils/common/EscapeCode'
export default {
  data() {
    return {
      tabIndex: 0,
      sponsorDetail: {},
      inviteDeatil: [],
      inviteShowModel: false,
      queryParams: {
        pageIndex: 1,
        pageSize: 20,
        productDegree: '',
        direction: '',
        search: ''
      },
      talkerList: [],
      checkTalkerList: [],
      invitedTalkerList: [],
      searchTalker: '',
      amid: '',
      subjectId: '',
      mapObj: {}
    }
  },
  created() {
    this.meetingGetImpl()
  },
  methods: {
    open(index) {
      // 先将正在被操作的swipeAction标记为打开状态，否则由于props的特性限制，
      // 原本为'false'，再次设置为'false'会无效
      this.list[index].show = true
      this.list.map((val, idx) => {
        if (index !== idx) this.list[idx].show = false
      })
    },
    // 获取详情数据
    async meetingGetImpl() {
      this.amid = this.$route.query.amid
      const result = await meetingGet({ id: this.amid })
      console.log(result.data.Table[0])
      this.sponsorDetail = result.data.Table[0]
      this.inviteDeatil = result.data.Table1
      this.invitedTalkerList = result.data.Table2
      console.log('受邀讲者', this.invitedTalkerList)
      // 处理二维数组
      this.invitedTalkerList.forEach(item => {
        this.mapObj[item.AMTID] = []
      })
      this.invitedTalkerList.forEach(item => {
        for (const key in this.mapObj) {
          if ('' + item.AMTID === key) {
            this.mapObj[key].push(item)
          }
        }
      })
    },
    async switchTab(index) {
      if (this.tabIndex === index) return
      this.tabIndex = index
    },

    // 显示邀请讲者
    async showInviteModel(AMTID) {
      console.log(AMTID)
      this.checkTalkerList = []
      this.inviteShowModel = true
      this.subjectId = AMTID
      const result = await speakerListGet(this.queryParams)
      console.log(result.data.Table)
      result.data.Table.forEach(item => {
        item = escapeCode.AllObjectReverse(item)
      })
      this.talkerList = result.data.Table
    },
    // 编辑会议
    goEditMeeting() {
      this.$router.push({
        name: 'addmeeting',
        query: {
          id: this.sponsorDetail.AMID
        }
      })
    },
    // 选择讲者
    checkTalker(item) {
      if (this.checkTalkerList.includes(item)) {
        const key = this.checkTalkerList.indexOf(item)
        this.checkTalkerList.splice(key, 1)
      } else {
        this.checkTalkerList.push(item)
      }
    },
    // 邀请讲者
    async inviteTalker() {
      if (this.checkTalkerList < 1) {
        baseUtils.showToast('请至少选择一位讲者')
        return
      }
      const talkerQueryParams = []
      this.checkTalkerList.map(v => {
        console.log(v)
        talkerQueryParams.push({
          AMID: this.amid,
          SKID: v,
          AMTID: this.subjectId
        })
      })
      const result = await meetingInviteSave(talkerQueryParams)
      if (result.success) {
        this.inviteShowModel = false
        this.checkTalkerList = []
        this.meetingGetImpl()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import './sponsorDetail.scss';
</style>
