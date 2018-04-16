// pages/map/map.js
var util = require('../../utils/util.js');
const app = getApp()
Page({
  data: {
    map:false,
    markers: [],
    controls: [{
      id: 0,
      iconPath: '/assets/images/location.png',
      position: {
        left: 0,
        top: 10,
        width: 40,
        height: 40
      },
      clickable: true
    }]
  },
  regionchange(e) {
    console.log(e)
  },
  markertap(e) {
    var that = this
    //获取点击精灵个性化数据
    var wild_pok_idx = e.markerId
    var wild_pok_list =  wx.getStorageSync("wild_pok_list");
    for (var i in wild_pok_list){
      if (wild_pok_list[i]["wild_pok_idx"] == wild_pok_idx){
        var tap_wild_pok = wild_pok_list[i]
        //将点击精灵数据同步globalData
        var tap_wild_pok_id = tap_wild_pok["pok_id"]
        var tap_wild_pok_growup = tap_wild_pok["pok_growup"]
        var tap_wild_pok_level = tap_wild_pok["pok_level"]
        var tap_wild_pok_usedhp = tap_wild_pok["pok_usedhp"]
        var tap_wild_pok_sex = tap_wild_pok["pok_sex"]
        var tap_wild_pok_master = tap_wild_pok["pok_master"]
        var tap_wild_pok_exp = tap_wild_pok["pok_exp"]
        var tap_wild_pok_idx = tap_wild_pok["wild_pok_idx"]
        app.globalData.tap_wild_pok_id = tap_wild_pok_id
        app.globalData.tap_wild_pok_growup = tap_wild_pok_growup
        app.globalData.tap_wild_pok_level = tap_wild_pok_level
        app.globalData.tap_wild_pok_usedhp = tap_wild_pok_usedhp
        app.globalData.tap_wild_pok_sex = tap_wild_pok_sex
        app.globalData.tap_wild_pok_master = tap_wild_pok_master
        app.globalData.tap_wild_pok_exp = tap_wild_pok_exp
        app.globalData.tap_wild_pok_idx = tap_wild_pok_idx
        //获取pok_info
        var wild_pok_info = util.get_pok_info(tap_wild_pok_id);
        var wild_pok_name = wild_pok_info[0]
        var wild_pok_type1 = wild_pok_info[1]
        var wild_pok_type2 = wild_pok_info[2]
        var wild_pok_head = wild_pok_info[3]
        // var wild_hp = wild_pok_info[4];
        // var wild_att = wild_pok_info[5];
        // var wild_def = wild_pok_info[6];
        // var wild_speed = wild_pok_info[7];
        var wild_catch_rate = wild_pok_info[17]
        //根据精灵能力值转换属性
        var pok_attr = util.get_pok_attr(tap_wild_pok_id, tap_wild_pok_growup, tap_wild_pok_level)
        var wild_hp = pok_attr[0]
        var wild_att = pok_attr[1]
        var wild_def = pok_attr[2]
        var wild_speed = pok_attr[3]
        app.globalData.tap_wild_pok_name = wild_pok_name
        app.globalData.tap_wild_pok_type1 = wild_pok_type1
        app.globalData.tap_wild_pok_type2 = wild_pok_type2
        app.globalData.tap_wild_pok_head = wild_pok_head
        app.globalData.tap_wild_hp = wild_hp
        app.globalData.tap_wild_att = wild_att
        app.globalData.tap_wild_def = wild_def
        app.globalData.tap_wild_speed = wild_speed
        app.globalData.tap_wild_catch_rate = wild_catch_rate
      }
    }
    wx.showActionSheet({
      itemList: ['战斗 : ' + wild_pok_name + " Lv" + tap_wild_pok_level],// , '捕捉'],
      success: function (res) {
        //战斗
        if(res.tapIndex == 0){
          wx.navigateTo({
            url: '../fight/fight',
          })
        }
        //捕捉 
        else if (res.tapIndex == 1){

        }
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  controltap(e) {
    console.log(e.controlId)
    this.mapCtx = wx.createMapContext('map')
    this.mapCtx.moveToLocation()
  },
  //获取随机精灵成长cp
  get_pok_growup: function () {
    var seed = util.randomNum(1, 100)
    var pok_growup
    if (seed == 100) {
      pok_growup = util.randomNum(80, 100)
    } else if (seed > 90 && seed < 100) {
      pok_growup = util.randomNum(40, 80)
    } else {
      pok_growup = util.randomNum(1, 80)
    }
    return pok_growup
  },
  //获取精灵随机性别
  get_pok_sex: function (pok_id) {
    var pok_sex
    if (["032", "033", "034", "106", "107", "128"].indexOf(pok_id) > -1) {
      pok_sex = 1
    } else if (["029", "030", "031", "113", "115", "124"].indexOf(pok_id) > -1) {
      pok_sex = 0
    } else if (["001", "002", "003", "004", "005", "006", "007", "008", "009", "133", "134", "135", "136", "138", "139", "140", "141", "142", "143"].indexOf(pok_id) > -1) {
      var seed = util.randomNum(1, 80)
      if (seed > 10) {
        pok_sex = 1
      } else {
        pok_sex = 0
      }
    } else if (["058", "059", "063", "064", "065", "066", "067", "068", "125", "126"].indexOf(pok_id) > -1) {
      var seed = util.randomNum(1, 40)
      if (seed > 10) {
        pok_sex = 1
      } else {
        pok_sex = 0
      }
    } else if (["035", "036", "037", "038", "039", "040"].indexOf(pok_id) > -1) {
      var seed = util.randomNum(1, 40)
      if (seed > 10) {
        pok_sex = 0
      } else {
        pok_sex = 1
      }
    } else {
      pok_sex = util.randomNum(0, 1)
    }
    return pok_sex
  },
  //获取精灵随机登记
  get_pok_level: function (pok_id){
    var max_pok_level = 1
    var pok_level = 1
    var haved_pok = util.get_self_pok();
    for (var i in haved_pok) {
      var i_level = parseInt(haved_pok[i]["level"])
      if (i_level > max_pok_level) {
        max_pok_level = i_level
      }
    }
    if (pok_id == "143"){
      //卡比兽
      pok_level = 30
    } else if (pok_id == "106") {
      //沙瓦郎
      pok_level = 30
    } else if (pok_id == "107") {
      //艾比郎
      pok_level = 30
    } else if (pok_id == "133") {
      //伊布
      pok_level = 30
    } else if (pok_id == "138") {
      //菊石兽
      pok_level = 30
    } else if (pok_id == "140") {
      //化石盔
      pok_level = 30
    } else if (pok_id == "142") {
      //化石翼龙
      pok_level = 50
    } else if (pok_id == "144") {
      //急冻鸟
      pok_level = 50
    } else if (pok_id == "145") {
      //闪电鸟
      pok_level = 50
    } else if (pok_id == "146") {
      //火焰鸟
      pok_level = 50
    } else if (pok_id == "150") {
      //超梦
      pok_level = 70
    } else if (pok_id == "151") {
      //梦幻
      pok_level = 30
    }else{
      if (max_pok_level==100){
        pok_level = util.randomNum(1,98)
      }else{
        pok_level = util.randomNum(1, max_pok_level)
      }
    }
    return pok_level
  },
  seed_create_pok_id: function (seed){
    var seed = parseInt(seed)
    if (seed == 10000) {
      //梦幻
      var pok_id = 151;
    } else if (seed == 9999) {
      //超梦
      var pok_id = 150;
    } else if (seed == 9998) {
      //3D龙
      // var pok_id = 137;
      //御三家
      var items = [1, 4, 7]
      var pok_id = items[Math.floor(Math.random() * items.length)];
    } else if (seed > 9995 && seed < 9998) {
      //三圣鸟
      var items = [144, 145, 146]
      var pok_id = items[Math.floor(Math.random() * items.length)];
    } else if (seed > 9970 && seed < 9996) {
      //卡比化石翼龙乘龙迷你龙
      var items = [142, 143, 131, 147]
      var pok_id = items[Math.floor(Math.random() * items.length)];
    } else if (seed > 9800 && seed < 9971) {
      //无进化
      var items = [83, 95, 106, 107, 108, 113, 114, 115, 122, 123, 124, 125, 126, 127, 128, 132]
      var pok_id = items[Math.floor(Math.random() * items.length)];
    } else {
      var items = [10, 13, 16, 19, 21, 23, 27, 29, 32, 41, 43, 46, 48, 50, 52, 54, 56, 60, 63, 66, 69, 72, 74, 77, 79, 81, 84, 86, 88, 92, 96, 98, 100, 104, 109, 111, 116, 118, 129, 138, 140, 25, 30, 33, 35, 37, 39, 58, 90, 102, 120, 133]
      var pok_id = items[Math.floor(Math.random() * items.length)];
    }
    var pok_id_length = pok_id.toString().length
    if (pok_id_length == 1) {
      pok_id = "00" + pok_id;
    }
    else if (pok_id_length == 2) {
      pok_id = "0" + pok_id;
    }else{
      pok_id = pok_id.toString()
    }
    return pok_id
  },
  create_nearby_point: function (longitude, latitude){
    var lo = util.randomNum(-50, 50) / 10000
    var la = util.randomNum(-50, 50) / 10000
    var longitude = parseFloat( longitude) + lo
    var latitude = parseFloat(latitude) + la
    return [longitude.toString(), latitude.toString()]
  },
  create_pok_id:function(num){
    var wild_pok_list = []
    var num = parseInt(num);
    for (var i=0;i<num;i++){
      var wild_pok = {}
      //抽奖概率
      var seed = util.randomNum(1, 10000)
      var pok_id = this.seed_create_pok_id(seed)
      var pok_growup = this.get_pok_growup()
      var pok_level = this.get_pok_level(pok_id)
      var wild_pok_idx = i+1
      var pok_usedhp = 0
      var pok_sex = this.get_pok_sex(pok_id)
      var pok_master = wx.getStorageSync("user")
      var pok_exp = 0
      wild_pok["pok_id"] = pok_id
      wild_pok["pok_growup"] = pok_growup
      wild_pok["pok_level"] = pok_level
      wild_pok["pok_usedhp"] = pok_usedhp
      wild_pok["pok_sex"] = pok_sex
      wild_pok["pok_master"] = pok_master
      wild_pok["pok_exp"] = pok_exp
      wild_pok["wild_pok_idx"] = wild_pok_idx
      wild_pok_list.push(wild_pok)
    }
    return wild_pok_list
  },
  getPokMarkers() {
    //获取upload初始化的wild_pok_list
    var wild_pok_list = this.data.wild_pok_list
    var markers = [];
    for (var i in wild_pok_list){
      var pok_marker = {}
      //获取附近的点
      var nearby_point = this.create_nearby_point(this.data.longitude, this.data.latitude)
      var pok_longitude = nearby_point[0]
      var pok_latitude = nearby_point[1]
      var pok_id = wild_pok_list[i]["pok_id"]
      //获取pok_info
      var pok_info = util.get_pok_info(pok_id);
      var pok_name = pok_info[0]
      var pok_type1 = pok_info[1]
      var pok_type2 = pok_info[2]
      var pok_head = pok_info[3]
      var hp = pok_info[4];
      var att = pok_info[5];
      var def = pok_info[6];
      var speed = pok_info[7];
      pok_marker["id"] = wild_pok_list[i]["wild_pok_idx"]
      pok_marker["name"] = pok_name
      pok_marker["longitude"] = pok_longitude
      pok_marker["latitude"] = pok_latitude
      pok_marker["iconPath"] = "/assets/images/mini/" + pok_id + ".png"
      pok_marker["width"] = 50
      pok_marker["height"] = 50
      let marker = this.createMarker(pok_marker);
      markers.push(marker)
    }
    // let pok = {
    //   "id": 1,
    //   "name": "北京大学",
    //   //满屏是第三位加4
    //   "longitude": "116.3323",
    //   //满屏是第三位加4
    //   "latitude": "39.9918",
    //   "iconPath": "/assets/images/mini/001.png",
    //   "width": 40,
    //   "height": 40
    // };
    return markers;
  },
  createMarker(point) {
    let latitude = point.latitude;
    let longitude = point.longitude;
    let marker = {
      iconPath: point.iconPath,
      id: point.id || 0,
      name: point.name || '',
      latitude: latitude,
      longitude: longitude,
      width: point.width,
      height: point.height,
    };
    return marker;
  },
  onLoad: function () {
    
  },
  onReady: function (e) {
    
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 使用 wx.createMapContext 获取 map 上下文 
    this.mapCtx = wx.createMapContext('map')
    console.log('地图定位！')
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: (res) => {
        var latitude = res.latitude;
        var longitude = res.longitude;
        console.log(latitude, longitude)
        let marker = this.createMarker(res);
        this.setData({
          longitude: longitude,
          latitude: latitude,
        })
        util.sleep(200)
        //初始化生成随机精灵30只
        var last_wild_pok_time = wx.getStorageSync("last_wild_pok_time")
        var now_time = new Date()
        //判断是否生成过野外精灵
        if (last_wild_pok_time) {
          //判断上次生成精灵时间是否超过一小时
          if (now_time - last_wild_pok_time > 60 * 60 * 1000) {
            //初始化野外精灵
            var wild_pok_list = this.create_pok_id(20)
            //记录初始化时间
            var last_wild_pok_time = new Date()
            wx.setStorageSync("last_wild_pok_time", last_wild_pok_time)
            wx.setStorageSync("wild_pok_list", wild_pok_list)
            this.setData({
              wild_pok_list: wild_pok_list
            })
          } else {
            //判断距离上次定位位置是否过远
            var longitude_sub = Math.abs(parseFloat(this.data.longitude) - parseFloat(wx.getStorageSync("last_longitude")))
            var latitude_sub = Math.abs(this.data.latitude - wx.getStorageSync("last_latitude"))
            console.log(longitude_sub)
            console.log(latitude_sub)
            if (longitude_sub >= 0.015 || latitude_sub >= 0.015) {
              //初始化野外精灵
              var wild_pok_list = this.create_pok_id(20)
              //记录初始化时间
              var last_wild_pok_time = new Date()
              wx.setStorageSync("last_wild_pok_time", last_wild_pok_time)
              wx.setStorageSync("wild_pok_list", wild_pok_list)
              this.setData({
                wild_pok_list: wild_pok_list
              })
            } else {
              var wild_pok_list = wx.getStorageSync("wild_pok_list")
              //判断野外精灵是否为空
              if (wild_pok_list.length == 0) {
                //初始化野外精灵
                var wild_pok_list = this.create_pok_id(20)
                //记录初始化时间
                var last_wild_pok_time = new Date()
                wx.setStorageSync("last_wild_pok_time", last_wild_pok_time)
                wx.setStorageSync("wild_pok_list", wild_pok_list)
                this.setData({
                  wild_pok_list: wild_pok_list
                })
              } else {
                //继续使用历史生成精灵
                var wild_pok_list = wx.getStorageSync("wild_pok_list")
                this.setData({
                  wild_pok_list: wild_pok_list
                })
              }
            }
            //保存上次获取到的经纬度
            wx.setStorageSync("last_latitude", latitude)
            wx.setStorageSync("last_longitude", longitude)
            console.log(now_time - last_wild_pok_time)
          }
        } else {
          //初始化野外精灵
          var wild_pok_list = this.create_pok_id(20)
          //记录初始化时间
          var last_wild_pok_time = new Date()
          wx.setStorageSync("last_wild_pok_time", last_wild_pok_time)
          wx.setStorageSync("wild_pok_list", wild_pok_list)
          this.setData({
            wild_pok_list: wild_pok_list
          })
        }
        //设置地图上的精灵
        this.setData({
          markers: this.getPokMarkers()
        })
        this.mapCtx.moveToLocation()
        console.log(this.data.markers)
      }
    });
   //获取上次生成周围精灵时间
    var last_wild_pok_time = wx.getStorageSync("last_wild_pok_time")
    var now_time = new Date()
    //console.log(now_time - last_wild_pok_time)
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