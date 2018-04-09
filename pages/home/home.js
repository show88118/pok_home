// pages/home/home.js
var util = require('../../utils/util.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ball_img:"/assets/images/ball/ball_1.png",
  },
  load_trainer:function(){
    this.setData({
      userInfo : app.globalData.userInfo
    })
  },
  bind_my_pok: function () {
    wx.navigateTo({
      url: '../catch/catch',
    })
  },
  refresh_pok_head:function(pok_idx){
    //获取pok_info
    var pok_info = util.get_pok_info(pok_idx);
    var pok_name = pok_info[0]
    var pok_type1 = pok_info[1]
    var pok_type2 = pok_info[2]
    var pok_head = pok_info[3]
    this.setData({
      pok_name: pok_name,
      pok_type1: pok_type1,
      pok_head: pok_head,
      pok_type2: pok_type2,
    })
    //设置pok_type
    util.pok_type(pok_type1, pok_type2);
    var type2_display = app.globalData.type2_display;
    var type1 = app.globalData.type1;
    var type2 = app.globalData.type2;
    this.setData({
      type2_display: type2_display,
      type1: type1,
      type2: type2
    })
  },
  change_head:function(event){
    var pok_list_idx = event["currentTarget"]["dataset"]["idx"]
    var haved_pok = this.data.haved_pok
    var target_pok_id = haved_pok[pok_list_idx]["id"]
    //刷新点击pok
    this.refresh_pok_head(target_pok_id);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.load_trainer()
    var haved_pok = util.get_self_pok();
    var haved_pok_count = haved_pok.length
    if (haved_pok_count == 0){
      haved_pok = [{"id":"001"}]
    }
    haved_pok = haved_pok.reverse()
    var near_pok_idx = haved_pok[0]["id"]
    //获取头像部分数据
    this.refresh_pok_head(near_pok_idx);
    //获取我的精灵列表数据
    var my_pok_list_mini = []
    for (var i in haved_pok){
      var pok_id = haved_pok[i]["id"];
      var mini_img = "/assets/images/mini/" + pok_id+".png";
      var head_img = "/assets/images/head/" + pok_id + ".png";
      my_pok_list_mini.push([i,pok_id,mini_img])
    }
    this.setData({
      my_pok_list_mini: my_pok_list_mini,
      my_pok_list_width: 150 * haved_pok_count,
      haved_pok: haved_pok
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
  onShareAppMessage: function () {
    return {
      title: '这是我的' + this.data.pok_name + "!",
      path: 'pages/index/index',//分享的页面地址
      //imageUrl: '/assets/images/mini/' + this.data.pok_num + ".png",
    }
  }
})