<template>
  <view>
    <!-- 搜索  -->
    <view class="section-search">
      <u-search v-model="keyword" placeholder="搜索讲者" :animation="true" @custom="handleSearch" />
    </view>

    <!-- 下拉 -->
    <view class="dropdown-box">
      <u-dropdown class="uDropdown">
        <u-dropdown-item v-model="value1" title="产品认可度" :options="options1" @change="timeFilter" />
        <u-dropdown-item v-model="value2" title="擅长的方向" :options="options2" @change="otherilter" />
      </u-dropdown>
      <!-- <view class="search">搜索</view> -->
    </view>
    <!-- 下拉 -->

    <!-- 列表 -->
    <scroll-view scroll-y class="section-list" :style="{height:navHeight+'px'}">
      <view v-for="(item,index) in talkerList" :key="index" class="section-card" @click="goDetail(item.SKID)">
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
import { speakerListGet, areaGet } from '@/api/requestConfig'
import { escapeCode } from '@/utils/common/EscapeCode'
export default {
  data() {
    return {
      keyword: '',
      doctorList,
      pH: 0, // 窗口高度
      navHeight: 0, // 元素的所需高度
      queryParams: {
        pageIndex: 1,
        pageSize: 20,
        productDegree: '',
        direction: '',
        search: ''
      },
      talkerList: [],
      value1: '',
      value2: '',
      options1: [{
        label: '产品认可度高',
        value: 1
      }, {
        label: '产品认可度中',
        value: 2
      }, {
        label: '产品认可度低',
        value: 3
      }],
      options2: [
        {
          label: '学术方向',
          value: 1
        }, {
          label: '研究方向',
          value: 2
        }, {
          label: '讲课内容',
          value: 3
        }
      ]
    }
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
  async onShow() {
    await this.speakerListGetImpl()
    // this.areaGetImpl()
  },
  methods: {
    // 获取讲者列表
    async speakerListGetImpl() {
      const result = await speakerListGet(this.queryParams)
      // 反转义
      result.data.Table.forEach(item => {
        item = escapeCode.AllObjectReverse(item)
      })
      this.talkerList = result.data.Table
      console.log(this.talkerList)
    },
    // 获取区域
    // async areaGetImpl() {
    //   const result = await areaGet()
    //   result.data.Table.map(v => {
    //     this.options2.push({
    //       label: v.AreaName,
    //       value: v.AreaID
    //     })
    //   })
    // },
    // 新增讲者
    goAddtalker() {
      this.$Router.push({
        name: 'addtalker'
      })
    },
    // 讲者详情
    async goDetail(skid) {
      this.$router.push({
        name: 'detailtalker',
        query: {
          skid: skid
        }
      })
    },
    handleSearch() {
      this.queryParams.productDegree = '高'
      this.queryParams.direction = '讲题内容'
      this.speakerListGetImpl()
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
@import './home.scss';
</style>
