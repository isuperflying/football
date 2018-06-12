//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    let openid = wx.getStorageSync('openid');
    var that = this
    if(!openid){
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session',
            method: 'GET',
            data: {
              'appid': 'wx262a3df94d990a62',
              'secret': 'cce2d5a322b5f8f12bab352eee2762e9',
              'js_code': res.code,
              'grant_type': 'authorization_code'
            },
            success: function (res) {
              console.log(res)
              console.log('新获取用户openid--->' + res.data.openid)
              wx.setStorage({
                key: 'openid',
                data: res.data.openid,
              })

              if (that.userInfoReadyCallback) {
                that.userInfoReadyCallback(res)
              }

            }, fail: function (e) {
              console.log(e)
            }
          })
        }
      })
    }
  },
  
  globalData: {
    userInfo: null
  }
})