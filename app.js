//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var that = this
    wx.getStorage({
      key: 'openid',
      success: function(res) {
        console.log('已经存在--->'+res.data)
        that.insertUser(res.data)
      },
      fail:function(){
        // 登录
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
                console.log('新获取用户openid--->'+res.data.openid)
                that.insertUser(res.data.openid)
                wx.setStorage({
                  key: 'openid',
                  data: res.data.openid,
                })
              }, fail: function (e) {
                console.log(e)
              }
            })
          }
        })
      }
    }),
   
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  insertUser: function (openid) {
    wx.request({
      url: 'https://www.antleague.com/insertuser',
      method: 'POST',
      data: {
        'openid': openid
      },
      success: function (res) {
        console.log(res.data)
      },
    })
  },
  globalData: {
    userInfo: null
  }
})