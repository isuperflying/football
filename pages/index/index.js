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
    this.countdown();
  },
  start:function(){
    wx.navigateTo({
      url: '../home/home',
    })
  },
  
  begin: - (1 / 2 * Math.PI),
  pai2: 2 * Math.PI,
  //canvas画圆环
  drawRang: function (precent) {
    // 页面渲染完成  
    var cxt_arc = wx.createCanvasContext('canvasArc');
    var windowWidth = wx.getSystemInfoSync().windowWidth;
    var poaitionX = wx.getSystemInfoSync().windowWidth / 2;
    //var cxt_arc = this.cxt_arc;
    cxt_arc.setLineWidth(10);
    cxt_arc.setStrokeStyle('#ffffff');
    cxt_arc.setLineCap('round')
    cxt_arc.beginPath();//开始一个新的路径   
    cxt_arc.arc(poaitionX, 30, 24, 0, this.pai2, false);//设置一个原点(106,106)，半径为100的圆的路径到当前路径  
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
    cxt_arc.setStrokeStyle('#F15A47');
    cxt_arc.setLineCap('round')
    cxt_arc.beginPath();//开始一个新的路径  
    cxt_arc.arc(poaitionX, 30, 24, this.begin, end, true);
    cxt_arc.stroke();//对当前路径进行描边  
    cxt_arc.setFillStyle('white');
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
        countdownNum: n
      });
      that.drawRang(precent);
      that.rangRun = that.rangRun + space;
      if (precent >= 1) {
        that.data.allowDo = false;
        clearInterval(that.cuntDownCir);
      }
    }, space);
  }
})
