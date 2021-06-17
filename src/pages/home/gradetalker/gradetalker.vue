<template>
  <view>
    <view class="section-1">
      <view>
        <view class="title">为讲者评分</view>
        <view class="photo">
          <!-- <image src="" mode="" /> -->
        </view>
      </view>
    </view>

    <!-- 评分 -->
    <view class="section-2">
      <view class="rate-box">
        <view class="title">初始评分</view>
        <u-rate v-model="rateList.init" size="40" active-color="#FFD500" inactive-color="#DCDCDC" :count="5" gutter="35" />
        <view v-show="rateList.init" class="rate">{{ rateList.init }}.0分</view>
      </view>
      <view class="rate-box">
        <view class="title">讲者形象</view>
        <u-rate v-model="rateList.figure" size="40" active-color="#FFD500" inactive-color="#DCDCDC" :count="5" gutter="35" />
        <view v-show="rateList.figure" class="rate">{{ rateList.figure }}.0分</view>
      </view>
      <view class="rate-box">
        <view class="title">语言表达</view>
        <u-rate v-model="rateList.expression" size="40" active-color="#FFD500" inactive-color="#DCDCDC" :count="5" gutter="35" />
        <view v-show="rateList.expression" class="rate">{{ rateList.expression }}.0分</view>
      </view>
      <view class="rate-box">
        <view class="title">讲课经验</view>
        <u-rate v-model="rateList.experience" size="40" active-color="#FFD500" inactive-color="#DCDCDC" :count="5" gutter="35" />
        <view v-show="rateList.experience" class="rate">{{ rateList.experience }}.0分</view>
      </view>
    </view>

    <!-- 评价 -->
    <view class="section-3">
      <view class="title">评价</view>
      <view class="textarea">
        <textarea v-model="evaluate" placeholder="请填写/选择文字评价(请用逗号分割)" auto-height="true" maxlength="200" />
        <view class="tag-area">
          <view v-for="(item,index) in tagList" :key="index" class="tag" @click="addTag(item)">{{ item }}</view>
        </view>
      </view>

    </view>

    <view class="next-button" @click="goGradetalker">确认提交</view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      rateList: {
        init: '',
        figure: '',
        expression: '',
        experience: ''
      },
      evaluate: '',
      tagList: ['普通话标准', '讲解生动', '课件精良', '专业干货', '现场互动', '守时间']
    }
  },
  methods: {
    // 添加标签
    addTag(item) {
      console.log(item)
      this.evaluate = this.evaluate + item + ','
    }
  }
}
</script>

<style lang="scss" scoped>
@import './gradetalker.scss';
</style>
