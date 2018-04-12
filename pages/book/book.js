// pages/book/book.js
var util = require('../../utils/util.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pok_idx: app.globalData.pok_idx
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id_exised_list=[]
    var pok_idx_list = wx.getStorageSync("pok_idx_list")
    for(var i=0;i<=151;i++){
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
      id_exised_list: id_exised_list
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
  
  }
})