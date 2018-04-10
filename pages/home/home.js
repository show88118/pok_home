// pages/home/home.js
var util = require('../../utils/util.js');
var aes = require('../../utils/aes.js')
var QR = require("../../utils/qrcode.js");
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ball_img:"/assets/images/ball/ball_1.png",
    pok_idx_img: "/assets/images/pok_idx.png",
    aes_key : aes.CryptoJS.enc.Utf8.parse("1989022819900212"),
    aes_iv: aes.CryptoJS.enc.Utf8.parse('2016092420160924')
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
      pok_hp: hp,
      pok_att: att,
      pok_def: def,
      pok_speed: speed,
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
    //获取当前精灵剩余血量
    this.get_current_pok_hp()
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
    //设置当前精灵数据
    var current_pok_id = haved_pok[pok_list_idx]["id"]
    var current_pok_idx = haved_pok[pok_list_idx]["idx"]
    var current_pok_level = haved_pok[pok_list_idx]["level"]
    var current_pok_growup = haved_pok[pok_list_idx]["growup"]
    var current_pok_usedhp = haved_pok[pok_list_idx]["usedhp"]
    this.setData({
      haved_pok: haved_pok,
      current_pok_idx: current_pok_idx,
      current_pok_id: current_pok_id,
      current_pok_level: current_pok_level,
      current_pok_growup: current_pok_growup,
      current_pok_usedhp: current_pok_usedhp
    })
    //刷新点击pok
    this.refresh_pok_head(current_pok_id);
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
    //设置当前精灵数据
    var current_pok_id = haved_pok[0]["id"]
    var current_pok_idx = haved_pok[0]["idx"]
    var current_pok_level = haved_pok[0]["level"]
    var current_pok_growup = haved_pok[0]["growup"]
    var current_pok_usedhp = haved_pok[0]["usedhp"]
    this.setData({
      haved_pok: haved_pok,
      current_pok_idx: current_pok_idx,
      current_pok_id: current_pok_id,
      current_pok_level: current_pok_level,
      current_pok_growup: current_pok_growup,
      current_pok_usedhp: current_pok_usedhp
    })
    //获取头像部分数据
    this.refresh_pok_head(haved_pok[0]["id"]);
    //获取我的精灵列表数据
    this.refresh_pok_list(haved_pok);
  },
  longpress_choose: function () {
    var that = this;
    wx.showModal({
      title: this.data.pok_name,
      content: '确定要释放吗？',
      success: function (sm) {
        if (sm.confirm) {
          // 用户点击了确定 可以调用删除方法了
          that.release_pok();
        } else if (sm.cancel) {
          console.log("cancel")
        }
      }
    });
  },
  get_current_pok_hp: function(){
    var current_pok_hp = this.data.pok_hp - this.data.current_pok_usedhp
    if (current_pok_hp<0){
      current_pok_hp = 0
    }
    this.setData({
      current_pok_hp :current_pok_hp
    })
  },
  aes_Encrypt: function (word) {
    var srcs = aes.CryptoJS.enc.Utf8.parse(word);
    var encrypted = aes.CryptoJS.AES.encrypt(srcs, this.data.aes_key, { iv: this.data.aes_iv, mode: aes.CryptoJS.mode.CBC, padding: aes.CryptoJS.pad.Pkcs7 });
    return encrypted.ciphertext.toString().toUpperCase();
  },
  aes_Decrypt: function (word) {
    var encryptedHexStr = aes.CryptoJS.enc.Hex.parse(word);
    var srcs = aes.CryptoJS.enc.Base64.stringify(encryptedHexStr);
    var decrypt = aes.CryptoJS.AES.decrypt(srcs, this.data.aes_key, { iv: this.data.aes_iv, mode: aes.CryptoJS.mode.CBC, padding: aes.CryptoJS.pad.Pkcs7 });
    var decryptedStr = decrypt.toString(aes.CryptoJS.enc.Utf8);
    return decryptedStr.toString();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(this.aes_Encrypt("你好{}"))
    console.log(this.aes_Decrypt(this.aes_Encrypt("你好{}")))
    this.load_trainer()
    var haved_pok = util.get_self_pok();
    var haved_pok_count = haved_pok.length
    if (haved_pok_count == 0) {
      haved_pok = [{ "id": "001", "growup":50 ,"level":1 ,"idx":"1"}]
    }
    //倒序排列我的精灵
    haved_pok = haved_pok.reverse()
    //设置当前精灵数据
    var current_pok_id = haved_pok[0]["id"]
    var current_pok_idx = haved_pok[0]["idx"]
    var current_pok_level = haved_pok[0]["level"]
    var current_pok_growup = haved_pok[0]["growup"]
    var current_pok_usedhp = haved_pok[0]["usedhp"]
    this.setData({
      haved_pok: haved_pok,
      current_pok_idx: current_pok_idx,
      current_pok_id: current_pok_id,
      current_pok_level: current_pok_level,
      current_pok_growup: current_pok_growup,
      current_pok_usedhp: current_pok_usedhp
    })
    //获取头像部分数据
    this.refresh_pok_head(current_pok_id);
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
    try{
      if (haved_pok[0]["usedhp"] == undefined) {
        wx.removeStorageSync('pok_id_list')
      }
    }catch(err){
      wx.removeStorageSync('pok_id_list')
    }
    //倒序排列我的精灵
    if (haved_pok.length > 0) {
      haved_pok = haved_pok.reverse()
      }else{
        //赠送御三家
      var haved_pok = [{ "id": "001", "growup": 50, "level": 1, "idx": "1", "usedhp": 0}]
        wx.setStorageSync("pok_id_list", haved_pok)
      }
    //设置当前精灵数据
    var current_pok_id = haved_pok[0]["id"]
    var current_pok_idx = haved_pok[0]["idx"]
    var current_pok_level = haved_pok[0]["level"]
    var current_pok_growup = haved_pok[0]["growup"]
    var current_pok_usedhp = haved_pok[0]["usedhp"]
    this.setData({
      haved_pok: haved_pok,
      current_pok_idx: current_pok_idx,
      current_pok_id: current_pok_id,
      current_pok_level: current_pok_level,
      current_pok_growup: current_pok_growup,
      current_pok_usedhp: current_pok_usedhp
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