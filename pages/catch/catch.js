// pages/main/main.js
var util = require('../../utils/util.js');
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    head_image:"/assets/images/unknow.png",
    pok_num:"000",
    pok_idx: app.globalData.pok_idx,
    pok_name:"未知",
  },
  randomNum:function(minNum, maxNum){ 
    switch(arguments.length) { 
    case 1: 
    return parseInt(Math.random() * minNum + 1, 10); 
    break; 
    case 2: 
    return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10); 
    break; 
    default: 
    return 0; 
    break; 
  } 
},
  //获取随机精灵成长cp
  get_pok_growup:function(){
    var seed = this.randomNum(1,100)
    var pok_growup
    if(seed == 100){
      pok_growup = this.randomNum(80, 100)
    }else if(seed >90 && seed <100){
      pok_growup = this.randomNum(40, 80)
    }else{
      pok_growup = this.randomNum(1, 80)
    }
    return pok_growup
  },
  //获取精灵随机性别
  get_pok_sex: function (pok_id) {
    var pok_sex
    if (["032", "033", "034", "106", "107", "128"].indexOf(pok_id) > -1){
      pok_sex = 1
    } else if (["029", "030", "031", "113", "115", "124"].indexOf(pok_id) > -1){
      pok_sex = 0
    } else if (["001", "002", "003", "004", "005", "006", "007", "008", "009", "133", "134", "135", "136", "138", "139", "140", "141", "142","143"].indexOf(pok_id) > -1) {
      var seed = this.randomNum(1, 80)
      if (seed >10){
        pok_sex = 1
      }else{
        pok_sex = 0
      }
    } else if (["058", "059", "063", "064", "065", "066", "067", "068", "125", "126"].indexOf(pok_id) > -1) {
      var seed = this.randomNum(1, 40)
      if (seed > 10) {
        pok_sex = 1
      } else {
        pok_sex = 0
      }
    } else if (["035", "036", "037", "038", "039", "040"].indexOf(pok_id) > -1) {
      var seed = this.randomNum(1, 40)
      if (seed > 10) {
        pok_sex = 0
      } else {
        pok_sex = 1
      }
    }else{
      pok_sex = this.randomNum(0, 1)
    }
    return pok_sex
  },
  //捕捉精灵
  catch_pok:function(){
    if (this.data.remain_count <= 0){
      wx.showToast({
        title: '今日捕捉次数0',
      })
      return
    }
    //抽奖概率
    var seed = this.randomNum(1, 10000)
    if(seed == 10000){
      var pok_num = 151;
    }else if(seed == 9999){
      var pok_num = 150;
    } else if (seed == 9998) {
      var pok_num = 137;
    } else if (seed > 9990 && seed < 9998) {
      var items = [144, 145, 146]
      var pok_num = items[Math.floor(Math.random() * items.length)];
    } else if (seed > 9900 && seed < 9991) {
      var items = [142,143,131]
      var pok_num = items[Math.floor(Math.random() * items.length)];
    } else if (seed > 9546 && seed < 9901) {
      var items = [1, 4, 7]
      var pok_num = items[Math.floor(Math.random() * items.length)];
    } else if (seed > 7846 && seed < 9547) {
      var items = [83, 95, 106, 107, 108, 113, 114, 115, 122, 123, 124, 125, 126, 127, 128, 132]
      var pok_num = items[Math.floor(Math.random() * items.length)];
    }else{
      var items = [10, 13, 16, 19, 21, 23, 27, 29, 32, 41, 43, 46, 48, 50, 52, 54, 56, 60, 63, 66, 69, 72, 74, 77, 79, 81, 84, 86, 88, 92, 96, 98, 100, 104, 109, 111, 116, 118, 129, 138, 140, 147, 25, 30, 33, 35, 37, 39, 58, 90, 102, 120, 133]
      var pok_num = items[Math.floor(Math.random() * items.length)];
    }
    var pok_num_length = pok_num.toString().length
    if (pok_num_length == 1) {
      pok_num = "00" + pok_num;
    }
    else if (pok_num_length == 2){
      pok_num = "0" + pok_num;
    }
    //消费抽奖次数
    this.consume_remain_count()
    //设置当前poknum
    this.setData({
      head_image: "/assets/images/head/" + pok_num + ".png",
      pok_num: pok_num.toString()
    })
    //储存训练集的pok_idx
    var haved_pok = util.get_self_pok();
    var haved_pok_length = haved_pok.length;
    if (haved_pok_length==1){
      var max_pok_idx = haved_pok[0]["idx"]
    }else{
      //遍历当前所有精力中idx最大的值
      var max_pok_idx = 0
      for (var i in haved_pok){
        var i_idx = parseInt(haved_pok[i]["idx"])
        if (i_idx > max_pok_idx){
          max_pok_idx = i_idx
        }
      }
    }
    if (haved_pok_length == 0){
      haved_pok = []
    }
    //捕捉到的精灵数据
    haved_pok.push({ id: this.data.pok_num, growup: this.get_pok_growup(), level: 1, idx: (parseInt(max_pok_idx) + 1).toString(), usedhp: 0, sex: this.get_pok_sex(this.data.pok_num), master: wx.getStorageSync("user"), "exp":0})
    console.log(haved_pok)
    //haved_pok入库
    wx.setStorageSync("pok_id_list", haved_pok)
    //console.log(util.get_self_pok())
    //获取pok_info
    var pok_info = util.get_pok_info(this.data.pok_num);
    var pok_name = pok_info[0];
    var pok_type1 = pok_info[1];
    var pok_type2 = pok_info[2] ;
    var pok_head = pok_info[3]
    var hp = pok_info[4];
    var att = pok_info[5];
    var def = pok_info[6];
    var speed = pok_info[7];
    util.pok_type(pok_type1, pok_type2);
    var type2_display = app.globalData.type2_display;
    var type1 = app.globalData.type1;
    var type2 = app.globalData.type2;
    this.setData({
      type2_display: type2_display,
      type1: type1,
      type2: type2,
      pok_name: pok_name,
      hp: hp,
      att: att,
      def: def,
      speed: speed,
      pok_head: pok_head
    })
    //将已有精灵转化为图签list
    util.refresh_pok_book()
    wx.vibrateLong()
  },
  get_remain_count:function(){
    this.setData({
      remain_count: wx.getStorageSync("remain_count")
    })
  },
  //消费捕捉次数
  consume_remain_count: function () {
    var remain_count = wx.getStorageSync("remain_count") - 1;
    wx.setStorageSync("remain_count", remain_count)
    this.setData({
      remain_count: remain_count
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setStorageSync("remain_count", 10)
    this.get_remain_count();
    /*wx.showToast({
      title: '点击头像开始抽奖',
      duration:1000
    })*/
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
    this.get_remain_count();
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
      title: '我抓到了稀有的' + this.data.pok_name + "!",
      path: 'pages/index/index',//分享的页面地址
      //imageUrl: '/assets/images/mini/' + this.data.pok_num + ".png",
    }
  }
})