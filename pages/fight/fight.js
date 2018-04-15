// pages/fight/fight.js
var util = require('../../utils/util.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current_pok_head:"/assets/images/head/000.png",
    current_pok_name:"未选择",
    current_pok_sex_text:"",
    current_pok_level:0,
    tap_wild_pok_current_hp_radio:100,
    current_hp : 0,
    current_pok_usedhp : 0,
    current_pok_hp_radio: 100,
  },
  //刷新我的精灵list
  refresh_pok_list: function (haved_pok) {
    //获取我的精灵列表数据
    var my_pok_list_mini = []
    var haved_pok = haved_pok
    var haved_pok_count = haved_pok.length
    for (var i in haved_pok) {
      var pok_id = haved_pok[i]["id"];
      var pok_idx = haved_pok[i]["idx"];
      var mini_img = "/assets/images/mini/" + pok_id + ".png";
      var head_img = "/assets/images/head/" + pok_id + ".png";
      my_pok_list_mini.push([pok_idx, pok_id, mini_img])
    }
    this.setData({
      my_pok_list_mini: my_pok_list_mini,
      my_pok_list_width: 126 * haved_pok_count,
    })
  },
  set_wlid_pok_data:function(){
    this.setData({
      tap_wild_pok_id: app.globalData.tap_wild_pok_id,
      tap_wild_pok_growup: app.globalData.tap_wild_pok_growup,
      tap_wild_pok_level: app.globalData.tap_wild_pok_level,
      tap_wild_pok_usedhp: app.globalData.tap_wild_pok_usedhp,
      tap_wild_pok_sex: app.globalData.tap_wild_pok_sex,
      tap_wild_pok_master: app.globalData.tap_wild_pok_master,
      tap_wild_pok_exp: app.globalData.tap_wild_pok_exp,
      tap_wild_pok_idx: app.globalData.tap_wild_pok_idx,
      tap_wild_pok_name: app.globalData.tap_wild_pok_name,
      tap_wild_pok_type1: app.globalData.tap_wild_pok_type1,
      tap_wild_pok_type2: app.globalData.tap_wild_pok_type2,
      tap_wild_pok_head: app.globalData.tap_wild_pok_head,
      tap_wild_hp: app.globalData.tap_wild_hp,
      tap_wild_att: app.globalData.tap_wild_att,
      tap_wild_def: app.globalData.tap_wild_def,
      tap_wild_speed: app.globalData.tap_wild_speed,
      tap_wild_catch_rate: app.globalData.tap_wild_catch_rate
    })

  },
  //切换当前精灵
  change_pok: function (event) {
    var pok_list_idx = event["currentTarget"]["dataset"]["idx"]
    var haved_pok = util.get_self_pok()
    //获取当前精灵个性化数据
    for (var i in haved_pok){
      if (haved_pok[i]["idx"] == pok_list_idx){
        var current_pok_id = haved_pok[i]["id"]
        var current_pok_idx = haved_pok[i]["idx"]
        var current_pok_level = haved_pok[i]["level"]
        var current_pok_growup = haved_pok[i]["growup"]
        var current_pok_usedhp = haved_pok[i]["usedhp"]
        var current_pok_sex = haved_pok[i]["sex"]
        var current_pok_master = haved_pok[i]["master"]
        var current_pok_exp = haved_pok[i]["exp"]
      }
    }
    //获取当前精灵种族数据
    var current_pok_info = util.get_pok_info(current_pok_id);
    var current_pok_name = current_pok_info[0]
    var current_pok_type1 = current_pok_info[1]
    var current_pok_type2 = current_pok_info[2]
    var current_pok_head = current_pok_info[3]
    var current_catch_rate = current_pok_info[17]
    //根据精灵能力值转换属性
    var current_pok_attr = util.get_pok_attr(current_pok_id, current_pok_growup, current_pok_level)
    var current_hp = current_pok_attr[0]
    var current_att = current_pok_attr[1]
    var current_def = current_pok_attr[2]
    var current_speed = current_pok_attr[3]
    //确认是否选择当前精灵
    var that = this;
    wx.showModal({
      title: "决定是你了！" + current_pok_name,
      content: 'Lv' + current_pok_level,
      success: function (sm) {
        if (sm.confirm) {
          //设置当前精灵个性化数据
          that.setData({
            haved_pok: haved_pok,
            current_pok_idx: current_pok_idx,
            current_pok_id: current_pok_id,
            current_pok_level: current_pok_level,
            current_pok_growup: current_pok_growup,
            current_pok_usedhp: current_pok_usedhp,
            current_pok_sex: current_pok_sex,
            current_pok_master: current_pok_master,
            current_pok_exp: current_pok_exp
          })
          //设置当前精灵种族数据
          that.setData({
            current_pok_name: current_pok_name,
            current_pok_type1: current_pok_type1,
            current_pok_type2: current_pok_type2,
            current_pok_head: current_pok_head,
            current_catch_rate: current_catch_rate,
            current_hp: current_hp,
            current_att: current_att,
            current_def: current_def,
            current_speed: current_speed,
            current_pok_hp_radio: parseInt((1 - parseFloat(current_pok_usedhp) / parseFloat(current_hp)) * 100)
          })
        } else if (sm.cancel) {
          console.log("cancel")
        }
      }
    })
    //开始战斗
    
    //震动
    wx.vibrateShort({})
  },
  start_fight:function(){
    var tap_wild_speed = this.data.tap_wild_speed
    var current_speed = this.data.current_speed
    if (parseInt(tap_wild_speed) > parseInt(current_speed)){
        //敌人优先攻击
    }else{
      //我放优先攻击
    }
    // var tap_wild_pok_type1 = this.data.tap_wild_pok_type1
    // var tap_wild_pok_type2 = this.data.tap_wild_pok_type2
    // var current_pok_type1 = this.data.current_pok_type1
    // var current_pok_type2 = this.data.current_pok_type2
    // var current_pok_level = this.data.current_pok_level
    // var current_att = this.data.current_att
    // var tap_wild_def = this.data.tap_wild_def

  },
  get_damage:function(){
  //damage = 等级*0.4+2*自己攻击力/敌人防御力*2*属性效果
  },
  get_type_effect: function(){

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
    //设置野生精灵数据
    this.set_wlid_pok_data()
    //获取我的精灵数据
    var haved_pok = util.get_self_pok();
    //倒序排列我的精灵
    haved_pok = haved_pok.reverse()
    //刷新我的精灵列表
    this.refresh_pok_list(haved_pok)
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
  
  }
})