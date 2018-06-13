// pages/home/home.js
const app = getApp()
var base_url = "https://www.antleague.com/"
var right_key
var answerOrders = ['A','B','C','D']
var rightIndex;

var initNum = 8; //倒计时数
var spaceNum = 1000; //文字倒计时间隔
var space = 1000; //环倒计时间隔
var id = 1;
// 页面渲染完成  
var cxt_arc
var openid = ''
var userScore
Page({
  /**
   * 页面的初始数据
   */
  data: {
    answers:[],
    answerColor: '',
    clickIndex:'',
    answerOver:'',
    show_canvas:true,
    total_score:0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log('--->onLoad')
    wx.setNavigationBarTitle({
      title: '世界杯大师',
    })
    wx.getStorage({
      key: 'openid',
      success: function(res) {
        openid = res.data
        that.getData();
      },
      fail:function(e){
        that.getData();
      }
    })
  },
  onReady:function(e){
    console.log('--->onready')
    // 页面渲染完成  
    cxt_arc = wx.createCanvasContext('canvasArc');
    if (this.cuntDownCir) {
      console.log('clear onready--->')
      clearInterval(this.cuntDownCir);
    }

    this.countdown();
    if(id > 30){
      initNum = 6
    }
    if(id > 80) {
      initNum = 4
    }
  },
  back:function(){
    wx.redirectTo({
      url: '../index/index',
    })
  },
  getData: function () {
    
    var that = this;
    id = parseInt(wx.getStorageSync('subjectid') || 1)
    console.log('--->getData id'  + id)
    this.setData({
      answer_yes: ''
    })
    wx.request({
      url: base_url + 'getfbdata',
      method: 'POST',
      data: {
        'id': id,
        'openid': openid
      },
      success: function (res) {
        wx.hideLoading();
        console.log(res)
        if (res.data.data){
          let answersArr = res.data.data.subject_options.split(' ');
          right_key = res.data.data.right_key
          //console.log('score--->'+res.data.data.total_score)
          answerOrders.forEach(function (obj,index) {
              if(obj == right_key){
                rightIndex = index
              }
      　　});
          userScore = res.data.data.total_score || 0
          console.log('getscore--->' + userScore)
          wx.setStorage({
            key: 'user_score',
            data: userScore,
          })
          that.setData({
            subject_title: res.data.data.subject_title,
            answers: answersArr,
            total_score: userScore
          });

        }else{
          wx.showToast({
            title: '暂无数据',
            icon:'none'
          })
        }

      },
      fail: function (res) {
        wx.hideLoading();
      }
    })
  },
  answer:function(e){
    let index = e.currentTarget.dataset.index
    let userSelected = answerOrders[index]
    var iscorrect = false
    if (userSelected == right_key) {//判断答案是否正确
      iscorrect = true
      console.log('--->yes')
      this.setData({
        clickIndex: e.currentTarget.dataset.index,
        answerColor: 'right',
        rightIndex:rightIndex,
        answer_yes:'flipInY'
      })
    } else {
      console.log('--->no')
      this.setData({
        clickIndex: e.currentTarget.dataset.index,
        answerColor: 'error',
        rightIndex : rightIndex
      })
    }
    this.setData({
      answerOver: ''
    })
    
    this.data.allowDo = false;
    clearInterval(this.cuntDownCir);
    id++;
    console.log('id--->'+ id)
    if(id > 500){
      wx.setStorageSync('subjectid', 1)
      wx.showModal({
        title: '挑战完成',
        content: '恭喜你，已经挑战完所有题目',
        showCancel: false
      })
    }else{
      wx.setStorageSync('subjectid', id)
      //跳转到下一个题目
      this.updateScore(iscorrect);
    }
  },

  updateScore:function(iscorrect){
    
    openid = wx.getStorageSync('openid')

    var that = this
    if(iscorrect){
      wx.request({
        url: base_url + 'updatescore',
        method: 'POST',
        data: {
          'openid': openid,
          'score': userScore + 1
        },
        success: function (res) {
          that.skipNext(that, iscorrect)
        },
        fail: function () {
          that.skipNext(that, iscorrect)
        }
      })
    }else{
      that.skipNext(that, iscorrect)
    }
  },
  skipNext: function (that, iscorrect){
    let tizz = that
    setTimeout(function () {
      tizz.setData({
        answerOver: iscorrect ? '' :'headShake',
        show_canvas: false
      })
      tizz.countdown();
    }, 30)

    setTimeout(function () {
      tizz.setData({
        clickIndex: '',
        answerColor: '',
        rightIndex: ''
      })
      tizz.getData();
    }, 1000)
  },
  begin: - (1 / 2 * Math.PI),
  pai2: 2 * Math.PI,
  //canvas画圆环
  drawRang: function (precent) {
    
    var windowWidth = wx.getSystemInfoSync().windowWidth;
    var poaitionX = wx.getSystemInfoSync().windowWidth / 2;
    //var cxt_arc = cxtArc;
    //console.log(cxt_arc)
    cxt_arc.setLineWidth(10);
    cxt_arc.setStrokeStyle('#fff');
    cxt_arc.setLineCap('round')
    cxt_arc.beginPath();//开始一个新的路径   
    cxt_arc.arc(poaitionX, 30, 24, 0, this.pai2, false);
    cxt_arc.stroke();//对当前路径进行描边  
    var end = this.pai2 * precent + this.begin;
    if (precent == 0) {
      end = this.pai2 * + this.begin
    } else if (1 == precent) {
      cxt_arc.setFillStyle('white');
      cxt_arc.setFontSize(25);
      cxt_arc.fillText(this.data.countdownNum, poaitionX - 7, 40);
      cxt_arc.draw();
      return;
    }
    cxt_arc.setLineWidth(6);
    cxt_arc.setStrokeStyle('#fc5939');
    cxt_arc.setLineCap('round')
    cxt_arc.beginPath();//开始一个新的路径  
    cxt_arc.arc(poaitionX, 30, 24, this.begin, end, true);
    cxt_arc.stroke();//对当前路径进行描边  
    cxt_arc.setFillStyle('#fff');
    cxt_arc.setFontSize(25);
    cxt_arc.fillText(this.data.countdownNum, poaitionX - 7, 40);
    cxt_arc.draw();
  },
  countdown: function () {
    var that = this;
    that.rangRun = 0;
    clearInterval(that.cuntDownCir);
    
    that.cuntDownCir = setInterval(function () {
      var n = initNum - Math.floor(that.rangRun / spaceNum);
      var precent = that.rangRun / (initNum * spaceNum);
      that.setData({
        countdownNum: n,
        show_canvas:true
      });
      //console.log(precent)
      that.drawRang(precent);
      that.rangRun = that.rangRun + space;
      if (precent >= 1) {
        that.data.allowDo = false;
        clearInterval(that.cuntDownCir);

        id++;
        console.log('id--->' + id)
        if (id > 500) {
          wx.setStorageSync('subjectid', 1)
          wx.showModal({
            title: '挑战完成',
            content: '恭喜你，已经挑战完所有题目',
            showCancel: false
          })
        } else {
          wx.setStorageSync('subjectid', id)
          //跳转到下一个题目
          that.updateScore(false);
        }
      }
    }, space);
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '快来参与世界杯挑战吧',
      path: '../home/home',
      imageUrl:'../../images/start_bottom.png'
    }
  },
  onUnload:function(e){
    if (this.cuntDownCir){
      console.log('cuntDownCir--->'+this.cuntDownCir)
      clearInterval(this.cuntDownCir);
    }
  }
})