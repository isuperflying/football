//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    let openid = wx.getStorageSync('openid');
    console.log('app.js openid--->' + openid)
    var that = this
    if(!openid){
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          wx.request({
            url: 'https://www.antleague.com/getopenid',
            method: 'POST',
            data: {
              'wxcode': res.code
            },
            success: function (res) {
              
              var wxobj = JSON.parse(res.data.data)

              console.log('新获取用户openid--->' + wxobj.openid)
              wx.setStorage({
                key: 'openid',
                data: wxobj.openid,
              })

              if (that.userInfoReadyCallback) {
                that.userInfoReadyCallback(wxobj)
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