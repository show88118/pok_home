//index.js
//获取应用实例
const app = getApp()

Page({
  onShareAppMessage: function () {
    return {
      title: '快来抽取口袋妖怪吧',
      path: 'pages/index/index'//分享的页面地址
    }
  },
  click_start:function(){
    wx.navigateTo({
      url: '../catch/catch',
    })
  },
  bindmy:function(){
    wx.navigateTo({
      url: '../home/home',
    })
  },
  data: {
    motto: 'start!',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    head1:"/assets/images/head/001.png",
    head2: "/assets/images/head/004.png",
    head3: "/assets/images/head/007.png",
  },
  change_head: function (){
    for(var idx in [1,2,3]){
      this.setData({
        head1: "/assets/images/head/00" + (parseInt(idx) + 1) + ".png",
        head2: "/assets/images/head/00" + (parseInt(idx) + 4) + ".png",
        head3: "/assets/images/head/00" + (parseInt(idx) + 7) + ".png"
      });
      this.sleep(500);
    }
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
  onLoad: function () {
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
    //储存用户昵称
    wx.setStorageSync('user', this.data.userInfo.nickName)
    //获取用户当天剩余抽奖次数
    var today = this.get_today()
    var remain_count = wx.getStorageSync(today);
    if (remain_count!=""){
      remain_count = remain_count
      wx.setStorageSync(today, remain_count)
    }else{
      wx.setStorageSync(today, 5);
      remain_count = 5
    }
    app.globalData.today = today;
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
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
