<template>
  <view>
    <!-- 搜索  -->
    <view class="section-search">
      <u-search v-model="keyword" placeholder="搜索讲者" :animation="true" />
    </view>

    <!-- 列表 -->
    <scroll-view scroll-y class="section-list" :style="{height:navHeight+'px'}">
      <view v-for="(item,index) in doctorList" :key="index" class="section-card" @click="goDetail">
        <view class="card-content">
          <view class="left">
            <image :src="item.imgurl" mode="aspectFit" />
          </view>
          <view class="middle">
            <view class="middle-name">
              <view>{{ item.name }}</view>
              <view class="item-score">{{ item.score }}分</view>
            </view>
            <view>{{ item.hospital }}</view>
            <view>{{ item.office }}-{{ item.post }}</view>
            <view class="middle-tag">
              <view class="tag tag1_bk">{{ item.tag[0] }}</view>
              <view class="tag tag2_bk">{{ item.tag[1] }}</view>
            </view>
          </view>
          <view class="right">
            <image src="/static/images/home/home-arrow.png" mode="" />
          </view>
        </view>
      </view>
      <view class="divider">
        <u-divider margin-bottom="20rpx">没有更多了</u-divider>
      </view>
    </scroll-view>

    <!-- 新增悬浮按钮 -->
    <view class="section-button" @click="goAddtalker">
      <image src="/static/images/home/home-plus.png" mode="" />
    </view>
  </view>
</template>

<script>
import { doctorList } from './home'
export default {
  data() {
    return {
      keyword: '',
      doctorList,
      pH: 0, // 窗口高度
      navHeight: 0 // 元素的所需高度
    }
  },
  onLoad() {
    console.log(this.doctorList)
  },
  onReady() {
    const that = this
    uni.getSystemInfo({
      success(res) {
        that._data.pH = res.windowHeight // 窗口高度
        const titleH = uni.createSelectorQuery().select('.section-list') // 列表高度
        titleH.boundingClientRect(data => {
          const pH = that._data.pH
          that._data.navHeight = pH - data.top
        }).exec()
      }
    })
  },
  methods: {
    // 新增讲者
    goAddtalker() {
      this.$Router.push({
        name: 'addtalker'
      })
    },
    // 讲者详情
    goDetail() {
      this.$Router.push({
        name: 'detailtalker'
      })
    }
  }

}
</script>

<style lang="scss" scoped>
@import './home.scss';
</style>
