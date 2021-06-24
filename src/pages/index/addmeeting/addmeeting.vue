<template>
  <view>
    <view class="divider"><u-divider>会议信息</u-divider></view>
    <!-- 表单 -->
    <view class="scetion-form">
      <u-form ref="uForm" :model="form">
        <u-form-item label-width="150" label="会议名称" prop="name" :border-bottom="false">
          <u-input v-model="queryParams.M_name" :border="border" placeholder="请输入会议名称" />
        </u-form-item>
        <u-form-item label-width="150" :label-position="labelPosition" label="开始时间" prop="time" :border-bottom="false">
          <u-input v-model="queryParams.M_StartingTime" :border="border" type="select" :select-open="startTimePicker" placeholder="请选择开始时间" @click="startTimePicker = true" />
        </u-form-item>
        <u-form-item label-width="150" :label-position="labelPosition" label="结束时间" prop="time" :border-bottom="false">
          <u-input v-model="queryParams.M_EndTime" :border="border" type="select" :select-open="endTimePicker" placeholder="请选择结束时间" @click="endTimePicker = true" />
        </u-form-item>
        <u-form-item label-width="150" :label-position="labelPosition" label="区域选择" prop="area">
          <u-input v-model="queryParams.AreaName" :border="border" type="select" :select-open="areaPickerShow" placeholder="请选择" @click="areaPickerShow = true" />
        </u-form-item>
        <u-form-item :label-position="labelPosition" label="省市" prop="region" label-width="150" :border-bottom="false">
          <u-input v-model="region" :border="border" type="select" :select-open="provincepickerShow" placeholder="请选择地区" @click="provincepickerShow = true" />
        </u-form-item>
        <u-form-item :label-position="labelPosition" label="地点" prop="region" label-width="150" :border-bottom="false">
          <u-input v-model="queryParams.M_location" :border="border" placeholder="请输入地点" />
        </u-form-item>
        <u-form-item :label-position="labelPosition" label="人数" prop="region" label-width="150" :border-bottom="false">
          <u-input v-model="queryParams.M_Number_p" :border="border" placeholder="请输入人数" />
        </u-form-item>
        <!-- cutline -->
        <view class="divider">
          <u-divider>讲题信息</u-divider>
        </view>
        <!-- cutline -->
        <u-form-item v-for="(item,index) in subjectNum" :key="index" class="talkerBox" :label-position="labelPosition" :label="'讲题'+(index+1)" prop="region" label-width="150" :border-bottom="false">
          <u-input v-model="subjectList[index]" :border="border" placeholder="请输入讲题名称" />
          <image v-show="index !== 0" class="inputImage" src="/static/images/common/delete.png" mode="" @click="removeSubject(index)" />
        </u-form-item>
        <view class="addMore" @click="addMore">添加更多讲题</view>
        <!-- cutline -->
        <view class="divider">
          <u-divider>讲者要求</u-divider>
        </view>
        <!-- cutline -->
        <u-form-item :label-position="labelPosition" label="科室" prop="region" label-width="150" :border-bottom="false">
          <u-input v-model="queryParams.M_branch" :border="border" placeholder="请输入科室" />
        </u-form-item>
        <u-form-item :label-position="labelPosition" label="职称" prop="region" label-width="150" :border-bottom="false">
          <u-input v-model="queryParams.M_jobtitle" :border="border" placeholder="请输入职称" />
        </u-form-item>
        <u-form-item :label-position="labelPosition" label="产品认可度" prop="region" label-width="150" :border-bottom="false">
          <u-input v-model="queryParams.M_attitude" :border="border" type="select" :select-open="productPickerShow" placeholder="请选择产品认可度" @click="productPickerShow = true" />
        </u-form-item>
        <u-form-item :label-position="labelPosition" label="擅长的方向" prop="region" label-width="150" :border-bottom="false">
          <u-input v-model="queryParams.M_tendency" :border="border" type="select" :select-open="directionPickerShow" placeholder="请选择擅长的方向" @click="directionPickerShow = true" />
        </u-form-item>
        <u-form-item :label-position="labelPosition" label="评分" prop="region" label-width="150" :border-bottom="false">
          <view class="scoreText">大于</view>
          <u-number-box v-model="queryParams.M_score" :min="0" :max="4" />
          <view class="scoreTextEnd">分</view>
        </u-form-item>
      </u-form>

      <!-- 评价标签 -->
      <view class="section-3">
        <view class="title">评价</view>
        <view class="textarea">
          <textarea
            v-model="queryParams.M_label"
            placeholder="请填写/选择文字评价(请用逗号分割)"
            auto-height="true"
            maxlength="200"
          />
          <view>
            <view class="textLength">{{ queryParams.M_label.length }}/200</view>
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

    </view>

    <view class="next-button" @click="submit">确认提交</view>
    <!-- 开始时间 -->
    <u-picker v-model="startTimePicker" mode="time" :params="timeparams" @confirm="startTimeConfirm" />
    <!-- 结束时间 -->
    <u-picker v-model="endTimePicker" mode="time" :params="timeparams" @confirm="endTimeConfirm" />
    <!-- 地区 -->
    <u-picker v-model="provincepickerShow" mode="region" :params="provinceparams" @confirm="regionConfirm" />
    <!-- 区域 -->
    <u-picker v-model="areaPickerShow" mode="selector" :default-selector="[0]" :range="areaSelector" @confirm="areaSelectorConfirm" />
    <!-- 产品认可度 -->
    <u-picker v-model="productPickerShow" mode="selector" :default-selector="[0]" :range="productSelector" @confirm="productSelectorConfirm" />
    <!-- 擅长的方向 -->
    <u-picker v-model="directionPickerShow" mode="selector" :default-selector="[0]" :range="directionSelector" @confirm="directionSelectorConfirm" />
  </view>
</template>

<script>
import { areaGet, meetingAddSave, meetingGet } from '@/api/requestConfig'
import { escapeCode } from '@/utils/common/EscapeCode'
export default {
  data() {
    return {
      startTimePicker: false,
      endTimePicker: false,
      areaPickerShow: false,
      provincepickerShow: false,
      productPickerShow: false,
      directionPickerShow: false,
      border: true,
      labelPosition: 'left',
      form: {
        name: '',
        time: '',
        phone: '',
        region: ''
      },
      tagSelect: [],
      productSelector: ['低', '中', '高'],
      directionSelector: ['学术方向', '研究方向', '讲题内容'],
      tagList: ['普通话标准', '讲解生动', '课件精良', '专业干货', '现场互动', '守时间'],
      provinceparams: {
        province: true,
        area: false,
        city: true
      },
      timeparams: {
        year: true,
        month: true,
        day: true,
        hour: true,
        minute: true,
        second: false
      },
      areaSelector: [],
      areaList: [],
      region: '',
      queryParams: {
        AMID: '',
        M_name: '',
        M_StartingTime: '',
        M_EndTime: '',
        AreaID: '',
        AreaName: '',
        M_province: '',
        M_city: '',
        M_location: '',
        M_Number_p: '',
        M_branch: '',
        M_jobtitle: '',
        M_attitude: '',
        M_tendency: '',
        M_score: 0,
        M_label: ''
      },
      subjectNum: 2,
      subjectList: [],
      isEdit: false,
      evaluate: ''
    }
  },
  created() {
    this.areaGetImpl()
    this.getEdit()
  },
  methods: {
    // 判断目前是新增还是编辑
    async getEdit() {
      if (this.$route.query.id) {
        console.log(this.$route.query.id)
        this.isEdit = true
        // 获取会议详情
        const result = await meetingGet({ id: this.$route.query.id })
        console.log(result.data)
        this.queryParams = result.data.Table[0]
        this.subjectNum = result.data.Table1.length
        this.region = this.queryParams.M_province + '-' + this.queryParams.M_city
        // console.log('标签', result.data.Table[0].M_label.split(','))
        this.tagSelect = result.data.Table[0].M_label.split(',')
        result.data.Table1.forEach(item => {
          this.subjectList.push(item.T_Topic)
        })
      }
    },
    // 获取区域
    async areaGetImpl() {
      const result = await areaGet()
      console.log(result.data.Table)
      this.areaSelector = []
      this.areaList = result.data.Table
      result.data.Table.forEach(item => {
        this.areaSelector.push(item.AreaName)
      })
    },
    addTag(item) {
      if ((this.queryParams.M_label + item + ',').length <= 200) {
        this.queryParams.M_label = this.queryParams.M_label + item + ','
      }
    },
    // 开始时间回调
    startTimeConfirm(e) {
      this.queryParams.M_StartingTime = e.year + '-' + e.month + '-' + e.day + ' ' + e.hour + ':' + e.minute
    },
    // 结束时间回调
    endTimeConfirm(e) {
      this.queryParams.M_EndTime = e.year + '-' + e.month + '-' + e.day + ' ' + e.hour + ':' + e.minute
    },
    // 区域回调
    areaSelectorConfirm(e) {
      this.queryParams.AreaName = this.areaSelector[e[0]]
      this.areaList.forEach(item => {
        if (item.AreaName === this.areaSelector[e[0]]) {
          this.queryParams.AreaID = item.AreaID
        }
      })
    },
    // 选择地区回调
    regionConfirm(e) {
      this.region = e.province.label + '-' + e.city.label
      this.queryParams.M_province = e.province.label
      this.queryParams.M_city = e.city.label
    },
    // 产品回调
    productSelectorConfirm(e) {
      this.queryParams.M_attitude = this.productSelector[e[0]]
    },
    // 方向回调
    directionSelectorConfirm(e) {
      this.queryParams.M_tendency = this.directionSelector[e[0]]
    },
    // 提交数据
    async submit() {
      // 转义
      const Array3 = []
      this.subjectList.map((v, k) => {
        Array3.push({
          AMTID: '',
          T_Topic: escapeCode.XMLSerialize(v)
        })
      })

      const result = await meetingAddSave({ Array2: escapeCode.AllObjectFilter(this.queryParams), Array3 })
      console.log(result)
      if (!result.success) {
        baseUtils.showToast(result.data)
      } else {
        this.$Router.push({
          name: 'index'
        })
      }
    },
    addMore() {
      this.subjectNum += 1
    },
    removeSubject(index) {
      this.subjectList.splice(index, 1)
      this.subjectNum = this.subjectList.length
    }
  }
}
</script>

<style lang="scss" scoped>
@import './addmeeting.scss';
</style>
