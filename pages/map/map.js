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

  onReady: function (e) {
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
        this.setData({
          markers: this.getPokMarkers()
        })
        this.mapCtx.moveToLocation()
      }
    });
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
  seed_create_pok_id: function (seed){
    var seed = parseInt(seed)
    if (seed == 10000) {
      var pok_id = 151;
    } else if (seed == 9999) {
      var pok_id = 150;
    } else if (seed == 9998) {
      var pok_id = 137;
    } else if (seed > 9990 && seed < 9998) {
      var items = [144, 145, 146]
      var pok_id = items[Math.floor(Math.random() * items.length)];
    } else if (seed > 9900 && seed < 9991) {
      var items = [142, 143, 131]
      var pok_id = items[Math.floor(Math.random() * items.length)];
    } else if (seed > 9546 && seed < 9901) {
      var items = [1, 4, 7]
      var pok_id = items[Math.floor(Math.random() * items.length)];
    } else if (seed > 7846 && seed < 9547) {
      var items = [83, 95, 106, 107, 108, 113, 114, 115, 122, 123, 124, 125, 126, 127, 128, 132]
      var pok_id = items[Math.floor(Math.random() * items.length)];
    } else {
      var items = [10, 13, 16, 19, 21, 23, 27, 29, 32, 41, 43, 46, 48, 50, 52, 54, 56, 60, 63, 66, 69, 72, 74, 77, 79, 81, 84, 86, 88, 92, 96, 98, 100, 104, 109, 111, 116, 118, 129, 138, 140, 147, 25, 30, 33, 35, 37, 39, 58, 90, 102, 120, 133]
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
    var lo = util.randomNum(-40, 40) / 10000
    var la = util.randomNum(-40, 40) / 10000
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
      var pok_level = 1
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
      pok_marker["width"] = 40
      pok_marker["height"] = 40
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
      height: point.height
    };
    return marker;
  },
  onLoad: function () {
    //初始化生成随机精灵20只
    var wild_pok_list = this.create_pok_id(30)
    this.setData({
      wild_pok_list: wild_pok_list
    })
    console.log(wild_pok_list)
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