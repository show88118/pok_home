// pages/package/package.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  getCenterLocation: function () {
    this.mapCtx.getCenterLocation({
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        console.log(res.longitude)
        console.log(res.latitude)
      }
    })
  },
  moveToLocation: function () {
    this.mapCtx.moveToLocation()
  },
  translateMarker: function () {
    this.mapCtx.translateMarker({
      markerId: 3,
      autoRotate: true,
      duration: 1000,
      destination: {
        latitude: 23.10229,
        longitude: 113.3345211,
      },
      animationEnd() {
        console.log('animation end')
      }
    })
  },
  includePoints: function () {
    this.mapCtx.includePoints({
      padding: [10],
      points: [{
        latitude: 23.10229,
        longitude: 113.3345211,
      }, {
        latitude: 23.00229,
        longitude: 113.3345211,
      }]
    })
  },
  data: {
    map: {
      lat: 0,
      lng: 0,
      markers: [],
      hasMarkers: false//解决方案  
    }  
  },
  onCompassChange: function () {
    wx.onCompassChange(function (res) {
      console.log(res)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.onAccelerometerChange(function (res) {
      
      res.x = Math.abs(res.x)
      res.y = Math.abs(res.y)
      res.z = Math.abs(res.z)
      console.log(res.x, res.y, res.z)
      if ((res.x > 0.8 && res.y > 0.8) || (res.z > 0.8 && res.y > 0.8) || (res.z > 0.8 && res.x > 0.8)) {
        wx.showToast({
          title: '摇一摇成功',
          icon: 'success',
          duration: 1000
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (res) {
    // 使用 wx.createMapContext 获取 map 上下文
    this.mapCtx = wx.createMapContext('myMap')
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