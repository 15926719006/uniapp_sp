<template>
  <view>
    <view class="section-1">
      <view>
        <view class="title">为讲者评分</view>
        <view class="photo">
          <image :src="form.SK_Avatar ? form.SK_Avatar : '/static/images/common/head-user.png'" :mode="form.SK_Avatar ? 'center':''" />
        </view>
      </view>
    </view>

    <!-- 评分 -->
    <view class="section-2">
      <view class="rate-box">
        <view class="title">初始评分</view>
        <u-rate
          v-model="rateList.init"
          size="40"
          active-color="#FFD500"
          inactive-color="#DCDCDC"
          :count="5"
          gutter="35"
        />
        <view v-show="rateList.init" class="rate">{{ rateList.init }}分</view>
      </view>
      <view class="rate-box">
        <view class="title">讲者形象</view>
        <u-rate
          v-model="rateList.figure"
          size="40"
          active-color="#FFD500"
          inactive-color="#DCDCDC"
          :count="5"
          gutter="35"
        />
        <view
          v-show="rateList.figure"
          class="rate"
        >{{ rateList.figure }}分</view>
      </view>
      <view class="rate-box">
        <view class="title">语言表达</view>
        <u-rate
          v-model="rateList.expression"
          size="40"
          active-color="#FFD500"
          inactive-color="#DCDCDC"
          :count="5"
          gutter="35"
        />
        <view
          v-show="rateList.expression"
          class="rate"
        >{{ rateList.expression }}分</view>
      </view>
      <view class="rate-box">
        <view class="title">讲课经验</view>
        <u-rate
          v-model="rateList.experience"
          size="40"
          active-color="#FFD500"
          inactive-color="#DCDCDC"
          :count="5"
          gutter="35"
        />
        <view
          v-show="rateList.experience"
          class="rate"
        >{{ rateList.experience }}分</view>
      </view>
    </view>

    <!-- 评价 -->
    <view class="section-3">
      <view class="title">评价</view>
      <view class="textarea">
        <textarea
          v-model="evaluate"
          placeholder="请填写/选择文字评价(请用逗号分割)"
          auto-height="true"
          maxlength="200"
        />
        <view>
          <view class="textLength">{{ evaluate.length }}/200</view>
          <view class="tag-area">
            <view
              v-for="(item, index) in tagList"
              :key="index"
              class="tag"
              @click="addTag(item)"
            >{{ item }}</view>
          </view>
        </view>
      </view>
    </view>

    <view class="next-button" @click="speakerAddSaveImpl">确认提交</view>
  </view>
</template>

<script>
import { baseUtils } from '@/utils/common/BaseUtils'
import { speakerAddSave } from '@/api/requestConfig'
import { escapeCode } from '@/utils/common/EscapeCode'
export default {
  data() {
    return {
      form: {},
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
  created() {
    this.getRouteQuery()
  },
  methods: {
    // 获取路由传参
    getRouteQuery() {
      this.form = this.$route.query.form
    },
    // 添加标签
    addTag(item) {
      console.log(item)
      if ((this.evaluate + item + ',').length <= 140) {
        this.evaluate = this.evaluate + item + ','
      }
    },
    // 新增讲者
    async speakerAddSaveImpl() {
      this.evaluate = this.evaluate.replace(/，/g, ',')
      const queryParams = {
        SKID: '',
        Sk_name: this.form.Sk_name,
        Sk_gender: this.form.Sk_gender,
        Sk_attitude: this.form.Sk_attitude,
        Sk_tendency: this.form.Sk_tendency,
        AreaID: this.form.areaId,
        AreaName: this.form.AreaName,
        SK_province: this.form.SK_province,
        SK_city: this.form.SK_city,
        SK_hospital: this.form.SK_hospital,
        SK_branch: this.form.SK_branch,
        SK_score1: this.rateList.init,
        SK_score2: this.rateList.figure,
        SK_score3: this.rateList.expression,
        SK_score4: this.rateList.experience,
        SK_label: this.evaluate,
        SK_Avatar: this.form.SK_Avatar,
        SK_jobtitle: this.form.SK_jobtitle
      }
      if (this.rateList.init && this.rateList.figure && this.rateList.expression && this.rateList.experience) {
        if (this.evaluate) {
          uni.showModal({
            title: '提交',
            content: '是否确认提交',
            success: async function(res) {
              if (res.confirm) {
                const result = await speakerAddSave(escapeCode.AllObjectFilter(queryParams))
                console.log(result.success)
                if (result.success) {
                  await baseUtils.showToast('添加成功')
                  this.$Router.push({
                    name: 'home'
                  })
                } else {
                  baseUtils.showToast('添加失败')
                }
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        } else {
          baseUtils.showToast('请评价或点击评价标签！')
        }
      } else {
        baseUtils.showToast('请完整评分！')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./gradetalker.scss";
</style>
