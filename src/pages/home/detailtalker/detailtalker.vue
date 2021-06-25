<template>
  <view>
    <view class="edit" @click="goEditTalker(doctorDetail)">编辑信息</view>
    <!-- 1 -->
    <view class="section-1 card">
      <view class="left">
        <image :src="doctorDetail.SK_Avatar ? doctorDetail.SK_Avatar : '/static/images/common/head-user.png'" :mode="doctorDetail.SK_Avatar ? 'center':''" />
        <view class="tag tag1_bk">产品认可度{{ doctorDetail.Sk_attitude }}</view>
        <view class="tag tag2_bk">{{ doctorDetail.Sk_tendency }}</view>
      </view>
      <view class="right">
        <view class="right-name">
          <view>{{ doctorDetail.Sk_name }}</view>
          <view class="item-score">{{ doctorDetail.SK_score5 }}分</view>
        </view>
        <view>{{ doctorDetail.SK_branch }}-{{ doctorDetail.SK_branch }}</view>
        <view>{{ doctorDetail.AreaName }}-{{ doctorDetail.SK_hospital }}</view>
      </view>
    </view>
    <!-- 2 -->
    <view class="section-2 card">
      <view class="title">讲者评分</view>
      <view class="rate">
        <u-rate v-model="doctorDetail.SK_score5" disabled size="40" active-color="#FFD500" inactive-color="#DCDCDC" :count="5" gutter="35" />
        <view class="score">{{ doctorDetail.SK_score5 }}分</view>
      </view>
      <view class="tag">
        <view v-for="(item,index) in labelList" v-show="item" :key="index" class="tag-item">{{ item }}</view>
        <!-- <view v-for="(item,index) in doctorDetail.SK_label.split(',')" v-show="item" :key="index" class="tag-item">{{ item }}</view> -->
      </view>
    </view>
    <view class="section-3 card">
      <view class="title">更多信息</view>
      <u-cell-group :border="false">
        <u-cell-item :arrow="false" :border-top="false" title="性别" :value="doctorDetail.Sk_gender" />
        <u-cell-item :arrow="false" title="所在区域" :value="doctorDetail.AreaName" />
        <u-cell-item :arrow="false" title="所在省市" :value="doctorDetail.SK_province+'-'+doctorDetail.SK_city" />
        <u-cell-item :arrow="false" title="医院" :value="doctorDetail.SK_hospital" />
        <u-cell-item :arrow="false" title="职位" :value="doctorDetail.SK_jobtitle" />
        <u-cell-item :arrow="false" :border-bottom="false" title="科室" :value="doctorDetail.SK_branch" />
        <!-- <u-cell-item :arrow="false" title="联系邮箱" :value="doctorDetail.email" /> -->
      </u-cell-group>
    </view>

    <!-- <view class="next-button">预约会议</view> -->
  </view>
</template>

<script>
// import { doctorDetail } from './detailtalker'
import { speakerGet } from '@/api/requestConfig'
import { escapeCode } from '@/utils/common/EscapeCode'
export default {
  data() {
    return {
      doctorDetail: {},
      rateList: [],
      skid: '',
      labelList: []
    }
  },
  onLoad() {
    // console.log(this.doctorDetail)
    this.speakerGetImpl()
  },
  methods: {
    async speakerGetImpl() {
      this.skid = this.$route.query.skid
      const result = await speakerGet({ id: this.skid })
      console.log(result.data.Table[0])
      this.labelList = result.data.Table[0].SK_label.split(',')
      this.doctorDetail = escapeCode.AllObjectReverse(result.data.Table[0])
    },
    // 编辑讲者
    goEditTalker() {
      console.log(this.skid)
      this.$router.push({
        name: 'addtalker',
        query: {
          skid: this.skid
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./detailtalker.scss";
</style>
