// pages/home/home.js
var util = require('../../utils/util.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ball_img:"/assets/images/ball/ball_1.png",
    pok_idx_img: "/assets/images/pok_idx.png",
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
  //设置bar颜色
  setNavigationBarColor: function (bar_color) {
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: bar_color,
    })
  },
  //刷新当前精灵头像
  refresh_pok_head:function(pok_idx){
    //获取pok_info
    var pok_info = util.get_pok_info(pok_idx);
    var pok_name = pok_info[0]
    var pok_type1 = pok_info[1]
    var pok_type2 = pok_info[2]
    var pok_head = pok_info[3]
    var hp = pok_info[4];
    var att = pok_info[5];
    var def = pok_info[6];
    var speed = pok_info[7];
    this.setData({
      pok_name: pok_name,
      pok_type1: pok_type1,
      pok_head: pok_head,
      pok_type2: pok_type2,
      hp: hp,
      att: att,
      def: def,
      speed: speed,
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
    //设置bar为精灵type_color
    this.setNavigationBarColor(app.globalData.type_color[this.data.pok_type1]);
  },
  //刷新我的精灵list
  refresh_pok_list: function (haved_pok){
    //获取我的精灵列表数据
    var my_pok_list_mini = []
    var haved_pok = haved_pok
    var haved_pok_count = haved_pok.length
    for (var i in haved_pok) {
      var pok_id = haved_pok[i]["id"];
      var mini_img = "/assets/images/mini/" + pok_id + ".png";
      var head_img = "/assets/images/head/" + pok_id + ".png";
      my_pok_list_mini.push([i, pok_id, mini_img])
    }
    this.setData({
      my_pok_list_mini: my_pok_list_mini,
      my_pok_list_width: 150 * haved_pok_count,
    })
  },
  //切换当前精灵
  change_head:function(event){
    var pok_list_idx = event["currentTarget"]["dataset"]["idx"]
    var haved_pok = this.data.haved_pok
    var target_pok_id = haved_pok[pok_list_idx]["id"]
    //刷新点击pok
    this.refresh_pok_head(target_pok_id);
    this.setData({
      current_pok_idx: haved_pok[pok_list_idx]["idx"]
    })
  },
  //释放精灵
  release_pok:function(){
    var idx = this.data.current_pok_idx
    var haved_pok = util.get_self_pok();
    for (var i in haved_pok){
      if (haved_pok[i]["idx"] == idx){
        haved_pok.splice(i,1)
      } 
    }
    //haved_pok入库
    wx.setStorageSync("pok_id_list", haved_pok)
    //倒序排列我的精灵
    haved_pok = haved_pok.reverse()
    this.setData({
      haved_pok: haved_pok,
      current_pok_idx: haved_pok[0]["idx"]
    })
    //获取头像部分数据
    this.refresh_pok_head(haved_pok[0]["id"]);
    //获取我的精灵列表数据
    this.refresh_pok_list(haved_pok);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.load_trainer()
    var haved_pok = util.get_self_pok();
    var haved_pok_count = haved_pok.length
    if (haved_pok_count == 0) {
      haved_pok = [{ "id": "001", "growup":50 ,"level":1 ,"idx":"1"}]
    }
    //倒序排列我的精灵
    haved_pok = haved_pok.reverse()
    var near_pok_idx = haved_pok[0]["id"]
    this.setData({
      haved_pok: haved_pok,
      current_pok_idx: haved_pok[0]["idx"]
    })
    //获取头像部分数据
    this.refresh_pok_head(near_pok_idx);
    //获取我的精灵列表数据
    this.refresh_pok_list(haved_pok);
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
    var haved_pok = util.get_self_pok();
    //老用户清除本地精灵
    if (haved_pok[0]["level"] == undefined) {
      wx.removeStorageSync('pok_id_list')
    }
    //倒序排列我的精灵
    if (haved_pok.length > 0) {
      haved_pok = haved_pok.reverse()
      }else{
        //赠送御三家
      var haved_pok = [{ "id": "001", "growup": 50, "level": 1, "idx": "1"}]
        wx.setStorageSync("pok_id_list", haved_pok)
      }
    
    this.setData({
      haved_pok: haved_pok,
      current_pok_idx: haved_pok[0]["idx"]
    })
    var near_pok_idx = haved_pok[0]["id"]
    //获取头像部分数据
    this.refresh_pok_head(near_pok_idx);
    //获取我的精灵列表数据
    this.refresh_pok_list(haved_pok);
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