// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    answers:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData();
  },

  getData: function () {
    var that = this;
    wx.request({
      url: 'http://127.0.0.1:8888/getfbdata',
      method: 'GET',
      data: {
        'id': 1
      },
      success: function (res) {
        wx.hideLoading();
        console.log(res.data.data)
        let answersArr = res.data.data.subject_options.split(' ');

        that.setData({
          subject_title: res.data.data.subject_title,
          answers: answersArr,
        });
      },
      fail: function (res) {
        wx.hideLoading();
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})