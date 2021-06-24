<template>
  <view>
    <view class="top">
      <!-- tabber -->
      <view class="tabbar">
        <view
          class="item"
          :class="{ active: tabIndex === 0 }"
          @click="switchTab(0)"
        >我的发起</view>
        <!-- <view
          class="item"
          :class="{ active: tabIndex === 1 }"
          @click="switchTab(1)"
        >我的参与</view> -->
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
          <u-dropdown-item v-model="value1" title="产品认可度" :options="options1" @change="timeFilter" />
          <u-dropdown-item v-model="value2" title="擅长的方向" :options="options2" @change="otherilter" />
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
        <scroll-view scroll-y class="swiperList" :style="{height:sonHeight+'px'}">
          <sponsor ref="sponsor" />
        </scroll-view>
      </swiper-item>
      <!-- <swiper-item @touchmove.stop="handleSwiperItemChange">
        <scroll-view scroll-y class="swiperList" :style="{height:sonHeight+'px'}">
          <partin />
        </scroll-view>
      </swiper-item> -->
      <swiper-item @touchmove.stop="handleSwiperItemChange">
        <scroll-view scroll-y class="swiperList" :style="{height:sonHeight+'px'}">
          <invited ref="invited" />
        </scroll-view>
      </swiper-item>
    </swiper>

    <!-- 悬浮按钮 -->
    <view class="section-button">
      <image src="/static/images/home/home-plus.png" mode="" @click="goAddMeeting" />
    </view>
  </view>
</template>

<script>
import sponsor from './sponsor/sponsor.vue'
import invited from './invited/invited.vue'
export default {
  components: { sponsor, invited },
  data() {
    return {
      tabIndex: 0,
      value1: '',
      value2: '',
      options1: [{
        label: '最近3天',
        value: 1
      }, {
        label: '最近一周',
        value: 2
      }, {
        label: '最近一个月',
        value: 3
      }],
      options2: [{
        label: '学术方向',
        value: 1
      }, {
        label: '研究方向',
        value: 2
      }, {
        label: '讲课内容',
        value: 3
      }],
      pH: 0, // 窗口高度
      navHeight: 0, // 元素的所需高度
      sonHeight: 0 // 子组件高度
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
  onShow() {
    this.indexShow()
  },
  methods: {
    indexShow() {
      this.$refs.sponsor.meetingListGetImpl()
      this.$refs.invited.InvitedGetImpl()
    },
    handleSwiperItemChange() {
      // 禁止手动滑动
      return true
    },
    async switchTab(index) {
      if (this.tabIndex === index) return
      this.tabIndex = index
    },
    // 添加会议
    goAddMeeting() {
      this.$Router.push({
        name: 'addmeeting'
      })
    },
    timeFilter() {
      switch (this.value1) {
        case 1 : console.log(1); break
        case 2 : console.log(2); break
        case 3 : console.log(3); break
      }
    },
    otherilter() {
      console.log(this.value2)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
