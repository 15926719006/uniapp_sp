<template>
  <view>
    <view @touchmove.stop.prevent="moveHandle">
      <!-- 搜索  -->
      <view class="section-search">
        <u-search v-model="keyword" placeholder="搜索讲者" :animation="true" @custom="handleSearch" />
      </view>

      <!-- 下拉 -->
      <view class="dropdown-box">
        <u-dropdown class="uDropdown">
          <u-dropdown-item v-model="value1" :title="'产品认可度'+queryParams.productDegree" :options="options1" @change="timeFilter" />
          <u-dropdown-item v-model="value2" :title="queryParams.direction ? queryParams.direction : '擅长的方向'" :options="options2" @change="otherilter" />
        </u-dropdown>
        <!-- <view class="search">搜索</view> -->
      </view>
      <!-- 下拉 -->
    </view>

    <!-- 列表 -->
    <!-- <scroll-view scroll-y class="section-list" :style="{height:navHeight+'px'}"> -->
    <scroll-view scroll-y class="section-list" @scrolltolower="scrolltolower">
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
      <view v-if="pageNotData" class="divider">
        <u-divider>没有更多了</u-divider>
      </view>
    </scroll-view>

    <!-- 新增悬浮按钮 -->
    <view class="section-button" @click="goAddtalker">
      <image src="/static/images/home/home-plus.png" mode="" />
    </view>
  </view>
</template>

<script>
import { speakerListGet } from '@/api/requestConfig'
import { escapeCode } from '@/utils/common/EscapeCode'
import { baseUtils } from '@/utils/common/BaseUtils'
export default {
  data() {
    return {
      keyword: '',
      pH: 0, // 窗口高度
      navHeight: 0, // 元素的所需高度
      queryParams: {
        pageIndex: 1,
        pageSize: 20,
        isAll: 1,
        productDegree: '',
        direction: '',
        search: ''
      },
      talkerList: [],
      value1: '',
      value2: '',
      options1: [{
        label: '不限',
        value: 0
      },
      {
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
          label: '不限',
          value: 0
        },
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
      ],
      pageNotData: false // 是否没数据了
    }
  },

  async onShow() {
    this.talkerList = []
    this.pageNotData = false
    this.queryParams.pageIndex = 1
    this.speakerListGetImpl()
  },
  methods: {
    // 获取讲者列表
    async speakerListGetImpl() {
      // 到底就不请求了
      if (this.pageNotData) {
        return
      }
      const result = await speakerListGet(this.queryParams)
      // 反转义
      result.data.Table.forEach(item => {
        item = escapeCode.AllObjectReverse(item)
      })
      if (result.data.Table.length) {
        this.talkerList = this.talkerList.concat(result.data.Table)
      } else {
        baseUtils.showToast('已没有更多数据')
        this.pageNotData = true
      }
      console.log('讲者列表', this.talkerList)
    },
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
      this.queryParams.search = escapeCode.XMLSerialize(this.keyword)
      this.speakerListGetImpl()
      this.keyword = ''
    },
    timeFilter() {
      switch (this.value1) {
        case 0 :
          this.queryParams.productDegree = ''
          this.speakerListGetImpl()
          break
        case 1 :
          this.queryParams.productDegree = '高'
          this.speakerListGetImpl()
          break
        case 2 :
          this.queryParams.productDegree = '中'
          this.speakerListGetImpl()
          break
        case 3 :
          this.queryParams.productDegree = '低'
          this.speakerListGetImpl()
          break
      }
    },
    otherilter() {
      switch (this.value2) {
        case 0 :
          this.queryParams.direction = ''
          this.speakerListGetImpl()
          break
        case 1 :
          this.queryParams.direction = '学术方向'
          this.speakerListGetImpl()
          break
        case 2 :
          this.queryParams.direction = '研究方向'
          this.speakerListGetImpl()
          break
        case 3 :
          this.queryParams.direction = '讲课内容'
          this.speakerListGetImpl()
          break
      }
    },
    // 禁止滚动
    moveHandle() {
      return
    },
    // 分页
    scrolltolower() {
      // 滑动到底 请求接口
      this.queryParams.pageIndex++
      this.speakerListGetImpl()
    }
  }

}
</script>

<style lang="scss" scoped>
@import './home.scss';
</style>
