<template>
  <view>
    <view class="section-1">
      <view>
        <view class="photo" @click="uploadImage">
          <image :src="form.SK_Avatar ? form.SK_Avatar : '/static/images/common/head-user.png'" :mode="form.SK_Avatar ? 'center':''" />
        </view>
        <view>添加头像</view>

      </view>
    </view>

    <!-- 表单 -->
    <view class="section-2">
      <u-form ref="uForm" :model="form">
        <!-- 1 -->
        <u-form-item label-width="160" label="姓名" prop="Sk_name" :border-bottom="false">
          <u-input v-model="form.Sk_name" :border="border" />
        </u-form-item>
        <u-form-item label-width="160" :label-position="labelPosition" label="性别" prop="Sk_gender" :border-bottom="false">
          <u-input v-model="form.Sk_gender" :border="border" type="select" :select-open="sexPickerShow" placeholder="请选择性别" @click="sexPickerShow = true" />
        </u-form-item>
        <!-- 2 -->
        <u-form-item label-width="160" :label-position="labelPosition" label="产品认可度" prop="Sk_attitude" :border-bottom="false">
          <u-input v-model="form.Sk_attitude" :border="border" type="select" :select-open="productPickerShow" placeholder="请选择" @click="productPickerShow = true" />
        </u-form-item>
        <u-form-item label-width="160" :label-position="labelPosition" label="擅长的方向" prop="Sk_tendency">
          <u-input v-model="form.Sk_tendency" :border="border" type="select" :select-open="directionPickerShow" placeholder="请选择" @click="directionPickerShow = true" />
        </u-form-item>
        <u-form-item label-width="160" :label-position="labelPosition" label="区域选择" prop="AreaName">
          <u-input v-model="form.AreaName" :border="border" type="select" :select-open="areaPickerShow" placeholder="请选择" @click="areaPickerShow = true" />
        </u-form-item>
        <!-- 3 -->
        <u-form-item :label-position="labelPosition" label="所在地区" prop="Region" label-width="160" :border-bottom="false">
          <u-input v-model="region" :border="border" type="select" :select-open="provincepickerShow" placeholder="请选择地区" @click="provincepickerShow = true" />
        </u-form-item>
        <u-form-item label-width="160" :label-position="labelPosition" label="医院" prop="SK_hospital" :border-bottom="false">
          <u-input v-model="form.SK_hospital" :border="border" placeholder="请输入医院" />
        </u-form-item>
        <u-form-item label-width="160" :label-position="labelPosition" label="科室" prop="SK_branch" :border-bottom="false">
          <u-input v-model="form.SK_branch" :border="border" placeholder="请输入科室" />
        </u-form-item>
        <u-form-item label-width="160" :label-position="labelPosition" label="职称" prop="SK_jobtitle" :border-bottom="false">
          <u-input v-model="form.SK_jobtitle" :border="border" placeholder="请输入职称" />
        </u-form-item>
      </u-form>
    </view>

    <!-- 按钮 -->
    <view class="next-button" @click="goGradetalker">{{ isEdit ? '提交' : '下一步' }}</view>
    <!-- 性别 -->
    <u-picker v-model="sexPickerShow" mode="selector" :default-selector="[0]" :range="sexSelector" @confirm="sexSelectorConfirm" />
    <!-- 产品认可度 -->
    <u-picker v-model="productPickerShow" mode="selector" :default-selector="[0]" :range="productSelector" @confirm="productSelectorConfirm" />
    <!-- 擅长的方向 -->
    <u-picker v-model="directionPickerShow" mode="selector" :default-selector="[0]" :range="directionSelector" @confirm="directionSelectorConfirm" />
    <!-- 区域 -->
    <u-picker v-model="areaPickerShow" mode="selector" :default-selector="[0]" :range="areaSelector" @confirm="areaSelectorConfirm" />
    <!-- 地区 -->
    <u-picker v-model="provincepickerShow" :params="provinceparams" mode="region" @confirm="regionConfirm" />
  </view>
</template>

<script>
import axios from 'axios'
import COS from 'cos-js-sdk-v5'
import { areaGet, speakerGet, speakerAddSave } from '@/api/requestConfig'
import { baseUtils } from '@/utils/common/BaseUtils'
import lrz from 'lrz'
import { escapeCode } from '@/utils/common/EscapeCode'
export default {
  data() {
    return {
      sexPickerShow: false,
      productPickerShow: false,
      directionPickerShow: false,
      areaPickerShow: false,
      provincepickerShow: false,
      border: true,
      labelPosition: 'left',
      provinceparams: {
        province: true,
        area: false,
        city: true
      },
      region: '',
      form: {
        SKID: '',
        Sk_name: '',
        Sk_gender: '',
        SK_province: '',
        SK_city: '',
        Sk_attitude: '',
        Sk_tendency: '',
        AreaName: '',
        areaId: '',
        SK_hospital: '',
        SK_branch: '',
        SK_Avatar: '',
        SK_jobtitle: ''
      },
      rules: {
        Sk_name: [{ required: true, message: '请输入姓名', trigger: ['blur', 'change'] }],
        Sk_gender: [{ required: true, message: '请选择性别', trigger: ['blur', 'change'] }],
        SK_hospital: [{ required: true, message: '请输入医院', trigger: ['blur', 'change'] }],
        SK_branch: [{ required: true, message: '请输入科室', trigger: ['blur', 'change'] }],
        SK_jobtitle: [{ required: true, message: '请输入职称', trigger: ['blur', 'change'] }],
        Sk_attitude: [{ required: true, message: '请选择产品认可度', trigger: ['blur', 'change'] }],
        Sk_tendency: [{ required: true, message: '请选择擅长的方向', trigger: ['blur', 'change'] }],
        AreaName: [{ required: true, message: '请选择区域', trigger: ['blur', 'change'] }]
      },
      sexSelector: ['男', '女'],
      productSelector: ['低', '中', '高'],
      directionSelector: ['学术方向', '研究方向', '讲题内容'],
      areaSelector: [],
      areaList: [],
      isEdit: false
    }
  },
  onReady() {
    this.$refs.uForm.setRules(this.rules)
  },
  created() {
    this.areaGetImpl()
    this.getEdit()
  },
  methods: {
    // 判断目前是新增还是编辑
    async getEdit() {
      if (this.$route.query.skid) {
        // this.form.SKID = this.$route.query.skid
        const result = await speakerGet({ id: this.$route.query.skid })
        console.log(result.data.Table[0])
        this.form = escapeCode.AllObjectReverse(result.data.Table[0])
        this.form.SKID = this.$route.query.skid
        this.region = this.form.SK_province + '-' + this.form.SK_city
        this.isEdit = true
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
    submit() {

    },
    // 性别回调
    sexSelectorConfirm(e) {
      console.log(this.sexSelector[e[0]])
      this.form.Sk_gender = this.sexSelector[e[0]]
    },
    // 产品回调
    productSelectorConfirm(e) {
      this.form.Sk_attitude = this.productSelector[e[0]]
    },
    // 方向回调
    directionSelectorConfirm(e) {
      this.form.Sk_tendency = this.directionSelector[e[0]]
    },
    // 区域回调
    areaSelectorConfirm(e) {
      this.form.AreaName = this.areaSelector[e[0]]
      this.areaList.forEach(item => {
        if (item.AreaName === this.areaSelector[e[0]]) {
          this.form.areaId = item.AreaID
        }
      })
    },
    // 选择地区回调
    regionConfirm(e) {
      this.region = e.province.label + '-' + e.city.label
      this.form.SK_province = e.province.label
      this.form.SK_city = e.city.label
    },
    // 跳转下一页
    async goGradetalker() {
      const self = this
      this.$refs.uForm.validate(valid => {
        if (valid) {
          if (!this.isEdit) {
            this.$router.push({
              name: 'gradetalker',
              query: {
                form: this.form
              }
            })
          } else {
            uni.showModal({
              title: '提交',
              content: '是否确认提交',
              success: async function(res) {
                if (res.confirm) {
                  const result = await speakerAddSave(escapeCode.AllObjectFilter(self.form))
                  if (result.success) {
                    self.$router.push({
                      name: 'home'
                    })
                  }
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
          }
        } else {
          console.log('验证失败')
        }
      })
    },
    // 图片上传
    uploadImage() {
      const self = this
      uni.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        async success(res) {
          if (res.tempFilePaths.length > 0 && res.tempFiles[0].size <= (10 * 1024 * 1024)) {
            lrz(res.tempFiles[0], { quality: 1, fieldName: 'file', width: 100 }).then(function(data) {
              // const img_name = guid().replace(/-/g, '')
              console.log('压缩后的图片', data)
              self.upLoadImageFunc(data.file)
            }).then(function(data) { }).catch(function(err) {
              console.log(err)
              baseUtils.showToast('图片上传失败,请重试')
            })
          }
        }
      })
    },
    // 上传图片封装方法
    upLoadImageFunc(file) {
      const self = this
      var cos = new COS({
        // 必选参数
        getAuthorization: function(options, callback) {
          try {
            // axios.post('http://huizhiapi.com/HuizhiAPI/Additional/ImageuploadkeyGet').then(res => {
            axios.post('http://onlinescoring.funzoe.cn/HuizhiAPI/Additional/ImageuploadkeyGet').then(res => {
              try {
                // console.log(data.d);
                var data_ = JSON.parse(res.data.data)
                var credentials_ = data_.Credentials
                if (!data_ || !credentials_) return console.error('credentials invalid')
                callback({
                  TmpSecretId: credentials_.TmpSecretId,
                  TmpSecretKey: credentials_.TmpSecretKey,
                  XCosSecurityToken: credentials_.Token,
                  // 建议返回服务器时间作为签名的开始时间，避免用户浏览器本地时间偏差过大导致签名错误
                  StartTime: data_.StartTime, // 时间戳，单位秒，如：1580000000
                  ExpiredTime: data_.ExpiredTime, // 时间戳，单位秒，如：1580000900
                  ScopeLimit: true // 细粒度控制权限需要设为 true，会限制密钥只在相同请求时重复使用
                })
              } catch (e) {
                baseUtils.showToast('登录状态已过期,请刷新页面后再上传')
              }
            })
          } catch (e) {
            baseUtils.showToast('登录状态已过期,请刷新页面后再上传')
          }
        }
      })

      // const filePath = baseUtils.getEnv() // 测试 OR 正式环境
      const filePath = process.env.NODE_ENV // 测试 OR 正式环境
      const fileName = baseUtils.getGuid().replace(/-/g, '')
      cos.putObject({
        Bucket: 'huizhi-1258636364', /* 必须 */
        Region: 'ap-beijing', /* 存储桶所在地域，必须字段 */
        Key: filePath + '/' + 'Imaging/' + fileName + '.jpg', /* 必须 文件名称 */
        StorageClass: 'STANDARD', /* 标准存储*/
        Body: file, // 上传文件对象
        onProgress: function(progressData) {
          // console.log(JSON.stringify(progressData))
        }
      }, function(_, data) {
        // console.log(err)
        console.log(data)
        if (data) {
          const imgurl_cos = data.Location
          if (imgurl_cos) {
            self.form.SK_Avatar = 'https://' + imgurl_cos
          }
        } else {
          baseUtils.showToast('图片上传失败,请重试')
        }
      })
    }

  }
}
</script>

<style lang="scss" scoped>
@import './addtalker.scss';
</style>
