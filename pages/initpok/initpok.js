// pages/initpok/initpok.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title_idx:0
  },
  miaowa:function(){
    var that = this;
    wx.showModal({
      title: "种子种子",
      content: '确定选择它一起冒险吗？',
      success: function (sm) {
        if (sm.confirm) {
          //赠送御三家
          var haved_pok = [{ "id": "001", "growup": 60, "level": 1, "idx": "1", "usedhp": 0, "sex": 1, "master": wx.getStorageSync("user"), "exp": 0 }];
          wx.setStorageSync("pok_id_list", haved_pok);
          wx.navigateTo({
            url: '../home/home',
          })
        } else if (sm.cancel) {
          console.log("cancel")
        }
      }
    });
  },
  xiaohuo: function () {
    var that = this;
    wx.showModal({
      title: "火龙火龙",
      content: '确定选择它一起冒险吗？',
      success: function (sm) {
        if (sm.confirm) {
          //赠送御三家
          var haved_pok = [{ "id": "004", "growup": 60, "level": 1, "idx": "1", "usedhp": 0, "sex": 1, "master": wx.getStorageSync("user"), "exp": 0 }];
          wx.setStorageSync("pok_id_list", haved_pok);
          wx.navigateTo({
            url: '../home/home',
          })
        } else if (sm.cancel) {
          console.log("cancel")
        }
      }
    });
  },
  jieni: function () {
    var that = this;
    wx.showModal({
      title: "杰尼杰尼",
      content: '确定选择它一起冒险吗？',
      success: function (sm) {
        if (sm.confirm) {
          //赠送御三家
          var haved_pok = [{ "id": "007", "growup": 60, "level": 1, "idx": "1", "usedhp": 0, "sex": 1, "master": wx.getStorageSync("user"), "exp": 0 }];
          wx.setStorageSync("pok_id_list", haved_pok);
          wx.navigateTo({
            url: '../home/home',
          })
        } else if (sm.cancel) {
          console.log("cancel")
        }
      }
    });
  },
  create_title:function(){
    var title = "选一个口袋妖怪开始冒险吧"
    var title_idx = this.data.title_idx
    this.setData({
      title_idx: title_idx + 1
    })
    return title.substring(0, title_idx)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var sys_info = wx.getSystemInfoSync()
    var device_width = sys_info.windowWidth
    var device_height = sys_info.windowHeight
    this.setData({
      device_height: device_height,
      device_width: device_width
    })
    //闪烁显示title
    var that = this
    var i = setInterval(function () {
        that.setData({
          title: that.create_title()
        })
      }, 200)
    setTimeout(function () {
      clearInterval(i)
    }, 3000)

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
    if (util.get_self_pok().length > 0) {
      wx.navigateTo({
        url: '../index/index',
      })
    } else {
    }
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