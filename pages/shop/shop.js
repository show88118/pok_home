// pages/shop/shop.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  buy_ball01:function(){
    //获取我的经验糖数量
    var candy_count = wx.getStorageSync("candy_count")
    var that = this
    wx.showModal({
      title: "花费10个经验糖",
      content: '确定要购买精灵球吗？',
      success: function (sm) {
        if (sm.confirm) {
          if (candy_count>=10){
            candy_count = candy_count - 10
            var ball_list = wx.getStorageSync("ball_list")
            ball_list["ball01"] = ball_list["ball01"] + 1
            //增加一个精灵球
            wx.setStorageSync("ball_list", ball_list)
            //消费经验糖
            wx.setStorageSync("candy_count", candy_count)
            that.setData({
              ball01: ball_list["ball01"],
              candy_count: candy_count
            })
          }else{
            wx.showToast({
              title: '经验糖不足',
              icon:"none"
            })
          }
        } else if (sm.cancel) {
          console.log("cancel")
        }
      }
    });
  },
  buy_ball02: function () {
    //获取我的经验糖数量
    var candy_count = wx.getStorageSync("candy_count")
    var that = this
    wx.showModal({
      title: "花费20个经验糖",
      content: '确定要购买超级球吗？',
      success: function (sm) {
        if (sm.confirm) {
          if (candy_count >= 20) {
            candy_count = candy_count - 20
            var ball_list = wx.getStorageSync("ball_list")
            ball_list["ball02"] = ball_list["ball02"] + 1
            //增加一个精灵球
            wx.setStorageSync("ball_list", ball_list)
            //消费经验糖
            wx.setStorageSync("candy_count", candy_count)
            that.setData({
              ball02: ball_list["ball02"],
              candy_count: candy_count
            })
          } else {
            wx.showToast({
              title: '经验糖不足',
              icon: "none"
            })
          }
        } else if (sm.cancel) {
          console.log("cancel")
        }
      }
    });
  },

  buy_ball03: function () {
    //获取我的经验糖数量
    var candy_count = wx.getStorageSync("candy_count")
    var that = this
    wx.showModal({
      title: "花费50个经验糖",
      content: '确定要购买高级球吗？',
      success: function (sm) {
        if (sm.confirm) {
          if (candy_count >= 50) {
            candy_count = candy_count - 50
            var ball_list = wx.getStorageSync("ball_list")
            ball_list["ball03"] = ball_list["ball03"] + 1
            //增加一个精灵球
            wx.setStorageSync("ball_list", ball_list)
            //消费经验糖
            wx.setStorageSync("candy_count", candy_count)
            that.setData({
              ball03: ball_list["ball03"],
              candy_count: candy_count
            })
          } else {
            wx.showToast({
              title: '经验糖不足',
              icon: "none"
            })
          }
        } else if (sm.cancel) {
          console.log("cancel")
        }
      }
    });
  },

  buy_ball04: function () {
    //获取我的经验糖数量
    var candy_count = wx.getStorageSync("candy_count")
    var that = this
    wx.showModal({
      title: "花费1000个经验糖",
      content: '确定要购买大师球吗？',
      success: function (sm) {
        if (sm.confirm) {
          if (candy_count >= 1000) {
            candy_count = candy_count - 1000
            var ball_list = wx.getStorageSync("ball_list")
            ball_list["ball04"] = ball_list["ball04"] + 1
            //增加一个精灵球
            wx.setStorageSync("ball_list", ball_list)
            //消费经验糖
            wx.setStorageSync("candy_count", candy_count)
            that.setData({
              ball04: ball_list["ball04"],
              candy_count: candy_count
            })
          } else {
            wx.showToast({
              title: '经验糖不足',
              icon: "none"
            })
          }
        } else if (sm.cancel) {
          console.log("cancel")
        }
      }
    });
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

  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //获取我的精灵球数量
    var ball_list = wx.getStorageSync("ball_list")
    var ball01 = ball_list["ball01"]
    var ball02 = ball_list["ball02"]
    var ball03 = ball_list["ball03"]
    var ball04 = ball_list["ball04"]
    this.setData({
      ball01: ball01,
      ball02: ball02,
      ball03: ball03,
      ball04: ball04
    })
    //获取我的经验糖数量
    var candy_count = wx.getStorageSync("candy_count")
    this.setData({
      candy_count: candy_count
    })
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