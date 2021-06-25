import http from '@/utils/request/request'

// 判断登录状态
export function loginStatusGet(data) { return http.request({ url: '/Basis/LoginStatusGet', method: 'post', data: data }) }

// 讲者管理

// 讲者列表查询
export function speakerListGet(data) { return http.request({ url: '/Speaker/SpeakerListGet', method: 'post', data: data }) }
// 新增和编辑讲者
export function speakerAddSave(data) { return http.request({ url: '/Speaker/SpeakerAddSave', method: 'post', data: data }) }
// 获取区域
export function areaGet(data) { return http.request({ url: '/Options/AreaGet', method: 'post', data: data }) }
// 获取讲者详情
export function speakerGet(data) { return http.request({ url: '/Speaker/SpeakerGet', method: 'post', data: data }) }
// 获取图像秘钥
export function imageuploadkeyGet(data) { return http.request({ url: '/Additional/ImageuploadkeyGet', method: 'post', data: data }) }

// 会议列表查询
export function meetingListGet(data) { return http.request({ url: '/Meeting/MeetingListGet', method: 'post', data: data }) }
// 发起列表查询
export function meetingList_CreateGet(data) { return http.request({ url: '/Meeting/MeetingList_CreateGet', method: 'post', data: data }) }
// 受邀列表查询
export function meetingList_InvitedGet(data) { return http.request({ url: '/Meeting/MeetingList_InvitedGet', method: 'post', data: data }) }
// 新增会议列表
export function meetingAddSave(data) { return http.request({ url: '/Meeting/MeetingAddSave', method: 'post', data: data }) }
// 发起会议详情
export function meetingGet(data) { return http.request({ url: '/Meeting/MeetingGet', method: 'post', data: data }) }
// 受邀会议详情
export function meeting_InvitedGet(data) { return http.request({ url: '/Meeting/Meeting_InvitedGet', method: 'post', data: data }) }
// 邀请讲者
export function meetingInviteSave(data) { return http.request({ url: '/Meeting/MeetingInviteSave', method: 'post', data: data }) }
// 接受/拒绝邀请
export function meeting_InvitedSave(data) { return http.request({ url: '/Meeting/Meeting_InvitedSave', method: 'post', data: data }) }

//  获取个人信息
export function myGet(data) { return http.request({ url: '/My/MyGet', method: 'post', data: data }) }

// 邮箱发送验证码
export function emailRandomCode(data) { return http.request({ url: '/RandomCode/EmailRandomCode', method: 'post', data: data }) }
// 邮箱绑定账号
export function emailBindSave(data) { return http.request({ url: '/RandomCode/EmailBindSave', method: 'post', data: data }) }

