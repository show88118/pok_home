//index.js
//获取应用实例
var util = require('../../utils/util.js');
const app = getApp()
const backgroundAudioManager = wx.getBackgroundAudioManager()
Page({
  onShareAppMessage: function () {
    return {
      title: '快来训练自己的口袋妖怪吧',
      path: 'pages/index/index'//分享的页面地址
    }
  },
  click_start:function(){
    if(util.get_self_pok().length>0){
      wx.navigateTo({
        url: '../home/home',
      })
    }else{
      wx.navigateTo({
        url: '../initpok/initpok',
      })
    }

  },
  bindmy:function(){
    wx.navigateTo({
      url: '../map/map',
    })
  },
  data: {
    motto: '开始',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  sleep:function (milliseconds) {
    var start = new Date().getTime();
    for(var i = 0; i< 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
    break;
  }
}
},
  play_bgm:function(){
    wx.playBackgroundAudio({
      dataUrl: 'https://github.com/show88118/pok_home/blob/master/assets/files/bgm.MP3?raw=true',
      title: '口袋妖怪大作战',
      coverImgUrl: 'https://raw.githubusercontent.com/show88118/pok_home/master/assets/images/home.png'
    })
    
  },
  randomNum: function (minNum, maxNum) {
    switch (arguments.length) {
      case 1:
        return parseInt(Math.random() * minNum + 1, 10);
        break;
      case 2:
        return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
        break;
      default:
        return 0;
        break;
    }
  },
  bgm:function(){
    if(app.globalData.bg_play){
      wx.pauseBackgroundAudio()
      app.globalData.bg_play = false;
      this.setData({
        bgm_img_id:"stop"
      })
    }else{
      this.play_bgm()
      app.globalData.bg_play = true;
      this.setData({
        bgm_img_id: "bgm_img"
      })
    }
  },
  //签到
  signin:function(){
    var signin_status = wx.getStorageSync(app.globalData.today);
    var remain_count = wx.getStorageSync("remain_count")
    var candy_count = wx.getStorageSync("candy_count")
    if (signin_status == undefined || signin_status == "") {
      remain_count = parseInt(remain_count) + app.globalData.signin_gift_remain_count
      candy_count = parseInt(candy_count) + app.globalData.signin_gift_candy_count
      wx.setStorageSync("remain_count", remain_count)
      wx.setStorageSync("candy_count", candy_count)
      wx.setStorageSync(app.globalData.today, "signin")
      wx.showToast({
        title: '获得签到奖励',
      })
    } else {
      wx.showToast({
        title: '已签到',
      })
    }
    this.setData({
      signin_img_id: "stop"
    })
  },
  onLoad: function () {
    // //获取精灵能力
    // console.log(util.get_pok_attr("001",50,1))
    //获取首页签到和音乐随机头像
    var random_pok_id1 = this.randomNum(1, 151)
    var random_pok_id2 = this.randomNum(1, 151)
    var random_pok_id1_length = random_pok_id1.toString().length
    var random_pok_id2_length = random_pok_id2.toString().length
    if (random_pok_id1_length == 1) {
      random_pok_id1 = "00" + random_pok_id1;
    }
    else if (random_pok_id1_length == 2) {
      random_pok_id1 = "0" + random_pok_id1;
    }
    if (random_pok_id2_length == 1) {
      random_pok_id2 = "00" + random_pok_id2;
    }
    else if (random_pok_id2_length == 2) {
      random_pok_id2 = "0" + random_pok_id2;
    }
    this.setData({
      random_pok_id1: random_pok_id1,
      random_pok_id2: random_pok_id2
    })
    //获取是否签到
    var today = this.get_today()
    var signin_status = wx.getStorageSync(today);
    if (signin_status == undefined || signin_status == "") {
      this.setData({
        signin_img_id: "signin_img"
      })
    }
    
    //捕捉次数和经验糖后门
    // wx.setStorageSync("remain_count", 100)
    // wx.setStorageSync("candy_count", 100)
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    //查询用户今天是否签到
    app.globalData.today = today;
    var remain_count = wx.getStorageSync("remain_count")
    var candy_count = wx.getStorageSync("candy_count")
    if (remain_count == undefined || remain_count == "") { remain_count = 0; wx.setStorageSync("remain_count",0)}
    if (candy_count == undefined || candy_count == "") { candy_count = 0; wx.setStorageSync("candy_count", 0) }
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    //储存用户昵称
    wx.setStorageSync('user', this.data.userInfo.nickName)
  },
  get_today:function(){
    var timestamp = Date.parse(new Date());
    var date = new Date(timestamp);
    //年  
    var Y = date.getFullYear();
    //月  
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    //日  
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    //时  
    var h = date.getHours();
    //分  
    var m = date.getMinutes();
    //秒  
    var s = date.getSeconds();
    //console.log("当前时间：" + Y + M + D + h + ":" + m + ":" + s);  
    return Y+M+D
  }
})
