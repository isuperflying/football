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
  },
  start:function(){
    wx.navigateTo({
      url: '../home/home',
    })
  },
  guess:function(e){
    wx.showToast({
      title: '敬请期待',
      icon:'none'
    })
  },
  scoreMall :function(){
    wx.navigateTo({
      url: '../mail/mail',
    })
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '快来参与世界杯挑战吧',
      path: '../index/index'
    }
  }
})
