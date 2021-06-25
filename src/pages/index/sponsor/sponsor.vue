<template>
  <view>
    <scroll-view scroll-y class="swiperList" @scrolltolower="scrolltolower">
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
      <view v-if="pageNotData" class="divider">
        <u-divider bg-color="rgb(240, 240, 240)">没有更多了</u-divider>
      </view>
    </scroll-view>

  </view>
</template>

<script>
import { meetingList_CreateGet } from '@/api/requestConfig'
import { sponSordata } from './sponsor'
import { baseUtils } from '@/utils/common/BaseUtils'
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
      sponSordata,
      sponSorList: [],
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
        this.meetingListGetImpl()
      }
    },
    areafilterstr: {
      immediate: false,
      handler(val) {
        this.resetRequest()
        this.queryParams.areaScreen = val
        this.meetingListGetImpl()
      }
    },
    searchfilterstr: {
      immediate: false,
      handler(val) {
        this.resetRequest()
        this.queryParams.search = val
        this.meetingListGetImpl()
      }
    }
  },
  created() {
    this.meetingListGetImpl()
  },
  methods: {
    // 重置请求
    resetRequest() {
      this.sponSorList = []
      this.pageNotData = false
      this.queryParams.pageIndex = 1
    },
    // 获取会议列表
    async meetingListGetImpl() {
      // 到底就不请求了
      if (this.pageNotData) {
        return
      }
      const result = await meetingList_CreateGet(this.queryParams)
      console.log('发起列表', result.data.Table)
      if (result.data.Table.length) {
        this.sponSorList = this.sponSorList.concat(result.data.Table)
      } else {
        baseUtils.showToast('已没有更多数据')
        this.pageNotData = true
      }
    },
    goSponsorDetail(amid) {
      this.$router.push({
        name: 'sponsorDetail',
        query: { amid: amid }
      })
    },
    // 分页
    scrolltolower() {
      // 滑动到底 请求接口
      this.queryParams.pageIndex++
      this.meetingListGetImpl()
    }
  }
}
</script>

<style lang="scss" scoped>
@import './sponsor.scss';
</style>
