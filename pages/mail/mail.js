// pages/mail/mail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    maillist:[
      {
        "img_url":"../../images/1.jpg",
        "score":1600,
        "score_text":"积分：1600"
      },
      {
        "img_url": "../../images/2.jpg",
        "score": 2000,
        "score_text": "积分：2000"
      },
      {
        "img_url": "../../images/3.jpg",
        "score": 2400,
        "score_text": "积分：2400"
      },
      {
        "img_url": "../../images/4.jpg",
        "score": 2600,
        "score_text": "积分：2600"
      },
      {
        "img_url": "../../images/5.jpg",
        "score": 2800,
        "score_text": "积分：2800"
      },
      {
        "img_url": "../../images/6.jpg",
        "score": 3000,
        "score_text": "积分：3000"
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '积分商城',
    })
    var that = this
    wx.getStorage({
      key: 'user_score',
      success: function(res) {
        that.setData({
          total_score: res.data
        })
      },
    })
  },
  exchange:function(e){
    let needScore = e.currentTarget.dataset.score
    let score = wx.getStorageSync('user_score')
    console.log("用户的积分--->" + score)
    if(score < needScore){
      wx.showModal({
        title: '积分不够',
        content: '你的积分不够，请继续努力',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
    }else{
      wx.navigateTo({
        url: '../inputinfo/inputinfo',
      })
    }
  },
  back: function () {
    wx.redirectTo({
      url: '../index/index',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    
    return {
      title: '快来参与世界杯挑战吧',
      path: '../home/home',
      imageUrl: '../../images/start_bottom.png'
    }
  },
})