// pages/book/book.js
var util = require('../../utils/util.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pok_idx: app.globalData.pok_idx,
    evo_list: app.globalData.evo_list,
    pok_id: "000",
    pok_name: "???",
    pok_type1: "null",
    pok_type2: "null",
    pok_hp: "???",
    pok_att: "???",
    pok_def: "???",
    pok_speed: "???",
    pok_att1: "???",
    pok_att2: "???",
    pok_def1: "???",
    pok_def2: "???",
    pok_total: "???",
    pok_describe: "无",
    pok_height: "???",
    pok_weight: "???",
    pok_color:"pink",
    pok_evo_level:"无"
  },
  change_idx: function (event){
    try { var pok_id = event["currentTarget"]["dataset"]["id"]}
    catch (e) { pok_id = "000"}
    //if (pok_id == "" || pok_id == undefined) { pok_id="001"}
    var pok_idx = this.data.pok_idx
    var evo_list = this.data.evo_list
    //遍历找到精灵信息
    for (var i in pok_idx){
      if (pok_idx[i]["id"] == pok_id){
        //获取pok_info
        var pok_info = util.get_pok_info(pok_id);
        var pok_name = pok_info[0]
        var pok_type1 = pok_info[1]
        var pok_type2 = pok_info[2]
        var pok_head = pok_info[3]
        var pok_hp = pok_info[4];
        var pok_att = pok_info[5];
        var pok_def = pok_info[6];
        var pok_speed = pok_info[7];
        var pok_att1 = pok_info[8];
        var pok_att2 = pok_info[9];
        var pok_def1 = pok_info[10];
        var pok_def2 = pok_info[11];
        var pok_total = pok_info[12];
        var pok_describe = pok_info[13];
        var pok_height = pok_info[14];
        var pok_weight = pok_info[15];
        var pok_color = pok_info[16];
        break
      }
    }
    //遍历找到精灵进化等级
    for (var i in evo_list){
      if (evo_list[i]["id"] == pok_id) {
        var pok_evo_level = evo_list[i]["evo"]
        this.setData({
          pok_evo_level: pok_evo_level
        })
    }
    }
    if (pok_id != "000"){
      //设置pok_type
      util.pok_type(pok_type1, pok_type2);
      var type2_display = app.globalData.type2_display;
      console.log()
      this.setData({
        type2_display: type2_display,
        pok_id: pok_id,
        pok_name: pok_name,
        pok_type1: pok_type1,
        pok_head: pok_head,
        pok_hp: pok_hp,
        pok_att: pok_att,
        pok_def: pok_def,
        pok_speed: pok_speed,
        pok_att1: pok_att1,
        pok_att2: pok_att2,
        pok_def1: pok_def1,
        pok_def2: pok_def2,
        pok_total: pok_total,
        pok_describe: pok_describe,
        pok_height: pok_height,
        pok_weight: pok_weight,
        pok_color: pok_color
      })
      if (pok_type2){
        this.setData({ pok_type2: pok_type2})
      }else{
        this.setData({ pok_type2: "null" })
      }
    }
    if (pok_id == "000") {
      this.setData({
        pok_id: "000",
        pok_name: "???",
        pok_type1: "null",
        pok_type2: "null",
        pok_hp: "???",
        pok_att: "???",
        pok_def: "???",
        pok_speed: "???",
        pok_att1: "???",
        pok_att2: "???",
        pok_def1: "???",
        pok_def2: "???",
        pok_total: "???",
        pok_describe: "无",
        pok_height: "???",
        pok_weight: "???",
        pok_color: "pink",
        pok_evo_level: "无"
      })
      return
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //初始化默认精灵
    this.change_idx()
    var id_exised_list=[]
    var pok_idx_list = wx.getStorageSync("pok_idx_list")
    var pok_idx_length = pok_idx_list.length
    for(var i=1;i<=151;i++){
      var i_length = i.toString().length
      if (i_length == 1) {
        i = "00" + i;
      }
      else if (i_length == 2) {
        i = "0" + i;
      }else{
        i = i.toString()
      }
      if (pok_idx_list.indexOf(i)>-1){
        id_exised_list.push(i)
      }else{
        id_exised_list.push("000")
      }
    }
    this.setData({
      id_exised_list: id_exised_list,
      pok_idx_length: pok_idx_length
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
      title: '我的图鉴：' + this.data.pok_name,
      path: 'pages/index/index',//分享的页面地址
      //imageUrl: '/assets/images/mini/' + this.data.pok_num + ".png",
    }
  }
})