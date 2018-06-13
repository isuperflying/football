// pages/inputInfo/inputInfo.js
var username
var address
var phone
var qqnumber
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  back: function () {
    wx.redirectTo({
      url: '../mail/mail',
    })
  },
  userInput:function(e){
    username = e.detail.value
  },
  addressInput: function (e) {
    address = e.detail.value
  },
  phoneInput: function (e) {
    phone = e.detail.value
  },
  qqInput: function (e) {
    qqnumber = e.detail.value
  },
  submitInfo:function(){
    if (!username){
      wx.showToast({
        title: '请输入收货人姓名',
        icon:'none'
      })
      return;
    }
    if (!address) {
      wx.showToast({
        title: '请输入收货地址',
        icon: 'none'
      })
      return;
    }
    if (!phone) {
      wx.showToast({
        title: '请输入联系电话',
        icon: 'none'
      })
      return;
    }
    let openid = wx.getStorageSync('openid')
    console.log('receipt openid' + openid)
    wx.request({
      url: 'https://www.antleague.com/addreceiptinfo',
      method: 'POST',
      data: {
        'openid': openid,
        'username':username,
        'address':address,
        'phone':phone,
        'qqnumber': qqnumber ? qqnumber:''
      },
      success: function (res) {
        if (res.data.code == 0){
          wx.showToast({
            title: res.data.msg,
            icon:'success'
          })
          wx.navigateTo({
            url: '../mail/mail',
          })
        }else{
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
      },
      fail:function(res){
        wx.showToast({
          title: '提交失败',
          icon: 'none'
        })
      }
    })

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '快来参与世界杯挑战吧',
      path: '/pages/index/index',
      imageUrl: '../../images/start_bottom.png'
    }
  }
})