<template>
  <view>
    <view class="section-1">
      <view>
        <view class="photo">
          <!-- <image src="" mode="" /> -->
        </view>
        <view>添加头像</view>
      </view>
    </view>

    <!-- 表单 -->
    <view class="section-2">
      <u-form ref="uForm" :model="form">
        <!-- 1 -->
        <u-form-item label-width="120" label="姓名" prop="name" :border-bottom="false">
          <u-input v-model="form.name" />
        </u-form-item>
        <u-form-item label-width="120" :label-position="labelPosition" label="性别" prop="gender" :border-bottom="false">
          <u-input v-model="form.gender" :border="border" type="select" :select-open="actionSheetShow" placeholder="请选择性别" @click="actionSheetShow = true" />
        </u-form-item>
        <u-form-item label-width="120" label="手机号" prop="phone">
          <u-input v-model="form.phone" />
        </u-form-item>
        <!-- 2 -->
        <u-form-item label-width="160" :label-position="labelPosition" label="产品认可度" prop="gender" :border-bottom="false">
          <u-input v-model="form.gender" :border="border" type="select" :select-open="actionSheetShow" placeholder="请选择" @click="actionSheetShow = true" />
        </u-form-item>
        <u-form-item label-width="160" :label-position="labelPosition" label="擅长的方向" prop="gender">
          <u-input v-model="form.gender" :border="border" type="select" :select-open="actionSheetShow" placeholder="请选择" @click="actionSheetShow = true" />
        </u-form-item>
        <!-- 3 -->
        <u-form-item :label-position="labelPosition" label="所在地区" prop="region" label-width="150" :border-bottom="false">
          <u-input v-model="form.region" :border="border" type="select" :select-open="pickerShow" placeholder="请选择地区" @click="pickerShow = true" />
        </u-form-item>
        <u-form-item label-width="160" :label-position="labelPosition" label="医院" prop="gender" :border-bottom="false">
          <u-input v-model="form.gender" :border="border" type="select" :select-open="actionSheetShow" placeholder="请选择医院" @click="actionSheetShow = true" />
        </u-form-item>
        <u-form-item label-width="160" :label-position="labelPosition" label="科室" prop="gender" :border-bottom="false">
          <u-input v-model="form.gender" :border="border" type="select" :select-open="actionSheetShow" placeholder="请选择科室" @click="actionSheetShow = true" />
        </u-form-item>
        <u-form-item label-width="160" :label-position="labelPosition" label="学会" prop="gender" :border-bottom="false">
          <u-input v-model="form.gender" :border="border" type="select" :select-open="actionSheetShow" placeholder="请选择学会" @click="actionSheetShow = true" />
        </u-form-item>
        <u-form-item label-width="160" :label-position="labelPosition" label="任职" prop="gender">
          <u-input v-model="form.gender" :border="border" type="select" :select-open="actionSheetShow" placeholder="请选择任职" @click="actionSheetShow = true" />
        </u-form-item>
      </u-form>
    </view>

    <!-- 按钮 -->
    <view class="next-button" @click="goGradetalker">下一步</view>
    <u-action-sheet v-model="actionSheetShow" :list="actionSheetList" @click="actionSheetCallback" />
    <u-picker v-model="pickerShow" mode="region" @confirm="regionConfirm" />
  </view>
</template>

<script>
export default {
  data() {
    return {
      actionSheetShow: false,
      pickerShow: false,
      border: false,
      labelPosition: 'left',
      form: {
        name: '',
        gender: '',
        phone: '',
        region: ''
      },
      rules: {
        name: [
          {
            required: true,
            message: '请输入姓名',
            trigger: ['blur', 'change']
          }
        ]
      },
      actionSheetList: [{ text: '男' }, { text: '女' }, { text: '保密' }]
    }
  },
  onReady() {
    this.$refs.uForm.setRules(this.rules)
  },
  methods: {
    submit() {
      this.$refs.uForm.validate(valid => {
        if (valid) {
          console.log('验证通过')
        } else {
          console.log('验证失败')
        }
      })
    },
    // 点击actionSheet回调
    actionSheetCallback(index) {
      uni.hideKeyboard()
      this.form.gender = this.actionSheetList[index].text
    },
    // 选择地区回调
    regionConfirm(e) {
      this.form.region = e.province.label + '-' + e.city.label + '-' + e.area.label
    },
    // 跳转下一页
    goGradetalker() {
      this.$Router.push({
        name: 'gradetalker'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import './addtalker.scss';
</style>
