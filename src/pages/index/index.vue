<template>
  <view>
    <view class="top" @touchmove.stop.prevent="moveHandle">
      <!-- tabber -->
      <view class="tabbar">
        <view
          class="item"
          :class="{ active: tabIndex === 0 }"
          @click="switchTab(0)"
        >我的发起</view>
        <view
          class="item"
          :class="{ active: tabIndex === 1 }"
          @click="switchTab(1)"
        >我的受邀</view>
      </view>
      <!-- tabber -->
      <!-- 下拉 -->
      <view class="dropdown-box">
        <u-dropdown class="uDropdown">
          <u-dropdown-item v-model="value1" :title="showTimeTitle" :options="options1" @change="timeFilter" />
          <u-dropdown-item v-model="value2" :title="showAreaTitle" :options="options2" @change="otherilter" />
        </u-dropdown>
        <!-- <view class="search">搜索</view> -->
      </view>
    <!-- 下拉 -->
    </view>
    <swiper
      :current="tabIndex"
      :duration="300"
      class="swiper swiperList"
      :style="{height:navHeight+'px'}"
      :show-scrollbar="false"
    >
      <swiper-item @touchmove.stop="handleSwiperItemChange">
        <!-- <scroll-view scroll-y class="swiperList" :style="{height:sonHeight+'px'}"> -->
        <sponsor
          ref="sponsor"
          :timefilterstr="sponsortimefilterstr"
          :areafilterstr="sponsorareafilterstr"
          :searchfilterstr="sponsorsearchfilterstr"
        />
        <!-- </scroll-view> -->
      </swiper-item>
      <swiper-item @touchmove.stop="handleSwiperItemChange">
        <!-- <scroll-view scroll-y class="swiperList" :style="{height:sonHeight+'px'}"> -->
        <invited
          ref="invited"
          :timefilterstr="invitedtimefilterstr"
          :areafilterstr="invitedareafilterstr"
          :searchfilterstr="invitedsearchfilterstr"
        />
        <!-- </scroll-view> -->
      </swiper-item>
    </swiper>

    <!-- 悬浮按钮 -->
    <view class="section-button2">
      <image src="/static/images/home/home-search.png" mode="" @click="showSearchModal = true" />
    </view>
    <view class="section-button">
      <image src="/static/images/home/home-plus.png" mode="" @click="goAddMeeting" />
    </view>

    <!-- 搜索弹出 -->
    <u-popup v-model="showSearchModal" mode="center" border-radius="14">
      <view class="refuse">
        <view class="item-input">
          <view class="item-textarea">
            <textarea
              v-model="searchKeyword"
              placeholder="请输入搜索关键词"
              auto-height="true"
              maxlength="40"
              :focus="true"
            />
          </view>
        </view>
        <view class="item-btn">
          <view class="item" @click="showSearchModal = false">取消</view>
          <view class="item" @click="goSearch">确认</view>
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script>
import sponsor from './sponsor/sponsor.vue'
import invited from './invited/invited.vue'
import { areaGet } from '@/api/requestConfig'
import { escapeCode } from '@/utils/common/EscapeCode'
export default {
  components: { sponsor, invited },
  data() {
    return {
      searchKeyword: '',
      sponsortimefilterstr: '', // 发起时间
      sponsorareafilterstr: '', // 发起区域
      sponsorsearchfilterstr: '', // 发起搜索
      invitedtimefilterstr: '', // 受邀时间
      invitedareafilterstr: '', // 受邀区域
      invitedsearchfilterstr: '', // 受邀搜索
      tabIndex: 0,
      value1: '',
      value2: '',
      showTimeTitle: '时间不限',
      showAreaTitle: '区域不限',
      options1: [{
        label: '时间不限',
        value: ''
      },
      {
        label: '最近三天',
        value: '3'
      }, {
        label: '最近一周',
        value: '7'
      }, {
        label: '最近30天',
        value: '30'
      }],
      options2: [],
      pH: 0, // 窗口高度
      navHeight: 0, // 元素的所需高度
      sonHeight: 0, // 子组件高度
      showSearchModal: false
    }
  },
  onReady() {
    const that = this
    uni.getSystemInfo({
      success(res) {
        that._data.pH = res.windowHeight // 窗口高度
        const titleH = uni.createSelectorQuery().select('.swiperList') // 列表高度
        titleH.boundingClientRect(data => {
          const pH = that._data.pH
          that._data.navHeight = pH - data.top
          that._data.sonHeight = pH - data.top - 15
        }).exec()
      }
    })
  },
  async onShow() {
    await this.indexShow()
    this.areaGetImpl()
  },
  methods: {
    // 禁止滚动
    moveHandle() {
      return
    },
    indexShow() {
      if (this.$refs.sponsor) {
        this.$refs.sponsor.resetRequest()
        this.$refs.sponsor.meetingListGetImpl()
      }
      if (this.$refs.invited) {
        this.$refs.invited.resetRequest()
        this.$refs.invited.InvitedGetImpl()
      }
    },
    handleSwiperItemChange() {
      // 禁止手动滑动
      return true
    },
    async switchTab(index) {
      if (this.tabIndex === index) return
      this.tabIndex = index
      this.value1 = ''
      this.value2 = ''
      this.showTimeTitle = '时间不限'
      this.showAreaTitle = '区域不限'
    },
    // 添加会议
    goAddMeeting() {
      this.$Router.push({
        name: 'addmeeting'
      })
    },
    async timeFilter() {
      this.options1.forEach(item => {
        if (item.value === this.value1) {
          this.showTimeTitle = item.label || '时间不限'
        }
      })
      switch (this.tabIndex) {
        case 0:
          this.sponsortimefilterstr = this.value1
          console.log('请求', this.value1)
          if (this.$refs.sponsor) {
            console.log('没请求', this.value1)
            // await this.$refs.sponsor.meetingListGetImpl()
            // this.indexShow()
          }
          break
        case 1:
          this.invitedtimefilterstr = this.value1
          if (this.$refs.invited) {
            // await this.$refs.invited.InvitedGetImpl()
            // this.indexShow()
          }
          break
      }
    },
    async otherilter() {
      this.options2.forEach(item => {
        if (item.value === this.value2) {
          this.showAreaTitle = item.label || '区域不限'
        }
      })
      switch (this.tabIndex) {
        case 0:
          this.sponsorareafilterstr = this.value2
          // if (this.$refs.sponsor) {
          //   await this.$refs.sponsor.meetingListGetImpl()
          //   // this.indexShow()
          // }
          break
        case 1:
          this.invitedareafilterstr = this.value2
          if (this.$refs.sponsor) {
            // await this.$refs.invited.InvitedGetImpl()
            // this.indexShow()
          }
          break
      }
    },
    // 获取区域
    async areaGetImpl() {
      this.options2 = [{ label: '区域不限', value: '' }]
      const result = await areaGet()
      result.data.Table.map(v => {
        this.options2.push({
          label: v.AreaName,
          value: v.AreaID
        })
      })
    },
    goSearch() {
      this.searchKeyword = escapeCode.XMLSerialize(this.searchKeyword)
      this.tabIndex === 0 ? this.sponsorsearchfilterstr = this.searchKeyword : this.invitedsearchfilterstr = this.searchKeyword
      this.showSearchModal = false
      this.searchKeyword = ''
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
