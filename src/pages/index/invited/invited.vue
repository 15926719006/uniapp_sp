<template>
  <view>
    <scroll-view scroll-y class="swiperList" @scrolltolower="scrolltolower">
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
      <view v-if="pageNotData" class="divider">
        <u-divider bg-color="rgb(240, 240, 240)">没有更多了</u-divider>
      </view>
    </scroll-view>

  </view>
</template>

<script>
import { meetingList_InvitedGet } from '@/api/requestConfig'
import { baseUtils } from '@/utils/common/BaseUtils'
// import { invitedData } from './invited'
export default {
  props: {
    timefilterstr: {
      type: String,
      default: ''
    },
    areafilterstr: {
      type: String,
      default: ''
    },
    searchfilterstr: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      invitedData: [],
      queryParams: {
        pageIndex: 1,
        pageSize: 20,
        timeScreen: '',
        areaScreen: '',
        search: ''
      },
      pageNotData: false // 是否没数据了
    }
  },
  watch: {
    timefilterstr: {
      immediate: false,
      handler(val) {
        this.resetRequest()
        this.queryParams.timeScreen = val
        this.InvitedGetImpl()
      }
    },
    areafilterstr: {
      immediate: false,
      handler(val) {
        this.resetRequest()
        this.queryParams.areaScreen = val
        this.InvitedGetImpl()
      }
    },
    searchfilterstr: {
      immediate: false,
      handler(val) {
        this.resetRequest()
        this.queryParams.search = val
        this.InvitedGetImpl()
      }
    }
  },
  created() {
    this.InvitedGetImpl()
  },
  methods: {
    // 重置请求
    resetRequest() {
      this.invitedData = []
      this.pageNotData = false
      this.queryParams.pageIndex = 1
    },
    // 获取受邀列表
    async InvitedGetImpl() {
      // 到底就不请求了
      if (this.pageNotData) {
        return
      }
      const result = await meetingList_InvitedGet(this.queryParams)
      console.log('受邀列表', result.data.Table)
      if (result.data.Table.length) {
        this.invitedData = this.invitedData.concat(result.data.Table)
      } else {
        baseUtils.showToast('已没有更多数据')
        this.pageNotData = true
      }
    },
    goInvitedDetail(ALID) {
      this.$router.push({
        name: 'partinDetail',
        query: {
          ALID: ALID
        }
      })
    },
    // 分页
    scrolltolower() {
      // 滑动到底 请求接口
      this.queryParams.pageIndex++
      this.InvitedGetImpl()
    }
  }
}
</script>

<style lang="scss" scoped>
@import './invited.scss';
</style>
