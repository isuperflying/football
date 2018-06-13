//index.js
//获取应用实例
const app = getApp()

var initNum = 7; //倒计时数
var spaceNum = 1000; //文字倒计时间隔
var space = 1000; //环倒计时间隔

Page({
  data: {
    
  },
  onLoad:function(){
    console.log('index onLoad --->')
    wx.setNavigationBarTitle({
      title: '世界杯大师',
    })

    var that = this
    let score = wx.getStorageSync('user_score') || 0
    app.userInfoReadyCallback = res => {
      let opid = res.openid
      console.log('call back openid ' + opid)
      that.insertUser(opid, score)
    }

    wx.getStorage({
      key: 'openid',
      success: function (res) {
        that.insertUser(res.data, score)
      },
      fail: function (res) {
        console.log('null openid--->')
      }
    })
  },
  insertUser: function (openid, score) {
    console.log(openid+'------'+score)
    wx.request({
      url: 'https://www.antleague.com/updatescore',
      method: 'POST',
      data: {
        'openid': openid,
        'score': score
      },
      success: function (res) {
        console.log(res.data)
      },
    })
  },
  start:function(){
    wx.navigateTo({
      url: '../home/home',
    })
  },
  scoreMall :function(){
    wx.navigateTo({
      url: '../mail/mail',
    })
  },
  everyDay:function(){
    wx.showModal({
      title: '敬请期待',
      content: '还在开发中,请耐心等待',
      showCancel:false,
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        }
      }
    })
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '快来参与世界杯挑战吧',
      path: '/pages/index/index',
      imageUrl: '../../images/start_bottom.png'
    }
  }

})
