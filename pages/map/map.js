// pages/map/map.js
Page({
  data: {
    markers: [],
    controls: [{
      id: 0,
      iconPath: '/assets/images/head/001.png',
      position: {
        left: 0,
        top: 10,
        width: 40,
        height: 40
      },
      clickable: true
    }]
  },

  onReady: function (e) {
    // 使用 wx.createMapContext 获取 map 上下文 
    this.mapCtx = wx.createMapContext('map')
    console.log('地图定位！')
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: (res) => {
        console.log(res)
        var latitude = res.latitude;
        var longitude = res.longitude;
        console.log(latitude, longitude)
        //let marker = this.createMarker(res);
        // wx.openLocation({
        //   longitude: longitude,
        //   latitude: latitude
        // })
        this.setData({
          longitude: longitude,
          latitude: latitude,
          markers: this.getSchoolMarkers()
        })
        console.log(this.data.longitude + "liufan")
        this.mapCtx.moveToLocation()
      }
    });
  },
  onLoad: function () {
    // 使用 wx.createMapContext 获取 map 上下文 
    // this.mapCtx = wx.createMapContext('map')
    // console.log('地图定位！')
    // wx.getLocation({
    //   type: 'gcj02', //返回可以用于wx.openLocation的经纬度
    //   success: (res) => {
    //     console.log(res)
    //     var latitude = res.latitude;
    //     var longitude = res.longitude;
    //     console.log(latitude, longitude)
    //     //let marker = this.createMarker(res);
    //     // wx.openLocation({
    //     //   longitude: longitude,
    //     //   latitude: latitude
    //     // })
    //     this.setData({
    //       longitude: longitude,
    //       latitude: latitude,
    //       markers: this.getSchoolMarkers()
    //     })
    //     console.log(this.data.longitude+"liufan")
    //     this.mapCtx.moveToLocation()
    //   }
    // });
  },
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e)
  },
  controltap(e) {
    console.log(e.controlId)
    this.mapCtx = wx.createMapContext('map')
    this.mapCtx.moveToLocation()
  },
  getSchoolMarkers() {
    let markers = [{
      "id": 1,
      "name": "北京大学",
      "longitude": "116.39845",
      "latitude": "39.95933"
    }];
    return markers;
  },
  createMarker(point) {
    let latitude = point.latitude;
    let longitude = point.longitude;
    let marker = {
      iconPath: "/assets/image/mini/001.png",
      id: point.id || 0,
      name: point.name || '',
      latitude: latitude,
      longitude: longitude,
      width: 25,
      height: 48
    };
    return marker;
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