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
    aes_key : aes.CryptoJS.enc.Utf8.parse("1989022819900212"),
    aes_iv: aes.CryptoJS.enc.Utf8.parse('2016092420160924'),
    fire:0,
    electric:0,
    grass:0,
    water:0,
    moon:0
  },
  load_trainer:function(){
    this.setData({
      userInfo : app.globalData.userInfo
    })
  },
  bind_my_pok: function () {
    // //判断日期
    // if (parseInt(this.get_today()) > 20180424) {
    //   console.log("open")
    // } else {
    //   wx.showToast({
    //     title: '暂未开放',
    //     icon: "none"
    //   })
    //   return
    // }
    wx.navigateTo({
      url: '../shop/shop',
    })
  },
  poke_map: function () {
    // //判断日期
    // if (parseInt(this.get_today()) > 20180422) {
    //   console.log("open")
    // } else {
    //   wx.showToast({
    //     title: '暂未开放',
    //     icon: "none"
    //   })
    //   return
    // }
    this.set_current_pok()
    wx.navigateTo({
      url: '../map/map',
    })
  },
  poke_transfer: function () {
    // //判断日期
    // if (parseInt(this.get_today()) > 20180424) {
    //   console.log("open")
    // } else {
    //   wx.showToast({
    //     title: '暂未开放',
    //     icon: "none"
    //   })
    //   return
    // }
    this.set_current_pok()
    wx.navigateTo({
      url: '../qr/qr',
    })
  },
  pok_book: function () {
    wx.navigateTo({
      url: '../book/book',
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
    //根据精灵能力值转换属性
    var pok_attr = util.get_pok_attr(pok_idx, this.data.current_pok_growup, this.data.current_pok_level)
    var pok_hp = pok_attr[0]
    var pok_att = pok_attr[1]
    var pok_def = pok_attr[2]
    var pok_speed = pok_attr[3]
    this.setData({
      pok_name: pok_name,
      pok_type1: pok_type1,
      pok_head: pok_head,
      pok_type2: pok_type2,
      pok_hp: pok_hp,
      pok_att: pok_att,
      pok_def: pok_def,
      pok_speed: pok_speed,
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
    //获取当前精灵性别图标
    this.get_current_pok_sex()
    //获取当前精灵经验条比例
    this.get_exp_radio()
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
      //var mini_img = "https://raw.githubusercontent.com/show88118/pokdata/master/" + pok_id + ".gif"
      var head_img = "/assets/images/head/" + pok_id + ".png";
      my_pok_list_mini.push([i, pok_id, mini_img])
    }
    this.setData({
      my_pok_list_mini: my_pok_list_mini,
      my_pok_list_width: 126 * haved_pok_count,
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
    var current_pok_sex = haved_pok[pok_list_idx]["sex"]
    var current_pok_master = haved_pok[pok_list_idx]["master"]
    var current_pok_exp = haved_pok[pok_list_idx]["exp"]
    this.setData({
      haved_pok: haved_pok,
      current_pok_idx: current_pok_idx,
      current_pok_id: current_pok_id,
      current_pok_level: current_pok_level,
      current_pok_growup: current_pok_growup,
      current_pok_usedhp: current_pok_usedhp,
      current_pok_sex: current_pok_sex,
      current_pok_master: current_pok_master,
      current_pok_exp: current_pok_exp
    })
    //刷新点击pok
    this.refresh_pok_head(current_pok_id);
    //震动
    wx.vibrateShort({})
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
    var current_pok_sex = haved_pok[0]["sex"]
    var current_pok_master = haved_pok[0]["master"]
    var current_pok_exp = haved_pok[0]["exp"]
    this.setData({
      haved_pok: haved_pok,
      current_pok_idx: current_pok_idx,
      current_pok_id: current_pok_id,
      current_pok_level: current_pok_level,
      current_pok_growup: current_pok_growup,
      current_pok_usedhp: current_pok_usedhp,
      current_pok_sex: current_pok_sex,
      current_pok_master: current_pok_master,
      current_pok_exp: current_pok_exp
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
    var haved_pok = util.get_self_pok();
    for (var i in haved_pok){
      if (haved_pok[i]["idx"] == this.data.current_pok_idx){
        var current_pok_usedhp = haved_pok[i]["usedhp"]
      }
    }
    var current_pok_hp = this.data.pok_hp - current_pok_usedhp
    if (current_pok_hp<0){
      current_pok_hp = 0
    }
    this.setData({
      current_pok_hp :current_pok_hp
    })
  },
  get_current_pok_sex: function () {
    var current_pok_sex = this.data.current_pok_sex
    if (current_pok_sex == 1) {
      var current_pok_sex_icon = "♂"
      var current_pok_sex_color = "#3DC5F5"
    }else{
      var current_pok_sex_icon = "♀"
      var current_pok_sex_color = "#F5958D"
    }
    this.setData({
      current_pok_sex_icon: current_pok_sex_icon,
      current_pok_sex_color: current_pok_sex_color
    })
  },
  eat_candy: util.throttle(function(){
    //闪烁动效
    this.setData({ candy_id:"twinkle2"})
    util.sleep(300)
    this.setData({ candy_id: "stop" })
    //
    var current_pok_level = this.data.current_pok_level
    //判断是否满级
    if (current_pok_level >=100){
      wx.showToast({
        title: '已经满级',
        icon: "none"
      })
      return
    }
    var candy_count = wx.getStorageSync("candy_count")
    if (candy_count>0){
      candy_count = candy_count - 1
      //消耗一颗经验糖
      wx.setStorageSync("candy_count", candy_count)
      //吃糖增加经验
      this.eat_exp()
      //设置当前经验糖个数
      this.setData({
        candy_count: candy_count
      })
      //震动
      //wx.vibrateLong()
    }else{
      wx.showToast({
        title: '没有经验糖了',
        icon: "none"
      })
    }
  }, 700),
  //吃经验糖
  eat_exp:function(){
    //设置当前精灵数据
    var current_pok_id = this.data.current_pok_id
    var current_pok_idx = this.data.current_pok_idx
    var current_pok_level = this.data.current_pok_level
    var current_pok_growup = this.data.current_pok_growup
    var current_pok_usedhp = this.data.current_pok_usedhp
    var current_pok_sex = this.data.current_pok_sex
    var current_pok_master = this.data.current_pok_master
    var current_pok_exp = this.data.current_pok_exp
    //获取我拥有的精灵
    var haved_pok = util.get_self_pok();
    var levelup_eat_count = this.get_levelup_eat_count(current_pok_level)
    for (var i in haved_pok){
      if (haved_pok[i]["idx"] == current_pok_idx){
        //达到升级经验后exp归0，level+1
        if (haved_pok[i]["exp"] + 1 >= levelup_eat_count){
          wx.vibrateLong()
          //升级闪烁动效
          this.setData({ level_id:"twinkle2"})
          util.sleep(300)
          this.setData({ level_id: "stop" })
          //
          var [int_pok_id,evolution_level] = this.get_evolution_level(current_pok_id)
          haved_pok[i]["exp"] = 0
          haved_pok[i]["level"] = haved_pok[i]["level"] + 1
          this.setData({
            exp_ratio: 0,
            current_pok_level: haved_pok[i]["level"]
          })
          //判断是否进化
          if (evolution_level == "无" || evolution_level == "通信" || evolution_level == "火之石" || evolution_level == "水之石" || evolution_level == "叶之石" || evolution_level == "雷之石" || evolution_level == "月之石" || evolution_level == "水、雷、火之石"){
            evolution_level = 101
          }
          if (haved_pok[i]["level"] >= parseInt(evolution_level)){
            var that = this
            //抖动动效
            this.setData({pok_head_id:"shake"})
            util.sleep(1000)
            this.setData({ pok_head_id: "stop" })
            this.setData({ pok_head_id: "shake" })
            util.sleep(1000)
            this.setData({ pok_head_id: "stop" })
            this.setData({ pok_head_id: "shake" })
            util.sleep(1000)
            this.setData({ pok_head_id: "stop" })
            this.setData({ pok_head_id: "twinkle" })
            //
            //进化，变更pok的id和usehp
            haved_pok[i]["id"] = this.int_pok_id_to_str(int_pok_id + 1)
            haved_pok[i]["usedhp"] = 0
            this.setData({
              current_pok_id: haved_pok[i]["id"],
              current_pok_usedhp : 0
            })
            //将已有精灵转化为图签list
            util.refresh_pok_book()
          }
        }else{
          //未达到升级经验，exp+1
          haved_pok[i]["exp"] = haved_pok[i]["exp"] + 1
          var exp_ratio = Math.floor((haved_pok[i]["exp"] / levelup_eat_count)*100)
          this.setData({
            exp_ratio: exp_ratio
          }) 
        }
        //吃经验糖后设置当前经验
        this.setData({
          current_pok_exp: haved_pok[i]["exp"],
        })
      }
    }
    //haved_pok入库
    wx.setStorageSync("pok_id_list", haved_pok)
    //将已有精灵转化为图签list
    util.refresh_pok_book()
    //倒序排列我的精灵
    haved_pok = haved_pok.reverse()
    //设置当前精灵数据
    var current_pok_id = this.data.current_pok_id
    var current_pok_idx = this.data.current_pok_idx
    var current_pok_level = this.data.current_pok_level
    var current_pok_growup = this.data.current_pok_growup
    var current_pok_usedhp = this.data.current_pok_usedhp
    var current_pok_sex = this.data.current_pok_sex
    var current_pok_master = this.data.current_pok_master
    var current_pok_exp = this.data.current_pok_exp
    this.setData({
      haved_pok: haved_pok,
      current_pok_idx: current_pok_idx,
      current_pok_id: current_pok_id,
      current_pok_level: current_pok_level,
      current_pok_growup: current_pok_growup,
      current_pok_usedhp: current_pok_usedhp,
      current_pok_sex: current_pok_sex,
      current_pok_master: current_pok_master,
      current_pok_exp: current_pok_exp
    })
    //获取头像部分数据
    this.refresh_pok_head(current_pok_id);
    //获取我的精灵列表数据
    this.refresh_pok_list(haved_pok);

  },
  //获取当前等级需要升级的经验糖数量
  get_levelup_eat_count:function(level){
    var levelup_eat_count
    level = parseInt(level)
    if (level<=10){
      levelup_eat_count = 5
    } else if (10 < level && level<= 20){
      levelup_eat_count = 10
    } else if (20 < level && level <= 30) {
      levelup_eat_count = 15
    } else if (30 < level && level <= 40) {
      levelup_eat_count = 20
    } else if (40 < level && level <= 50) {
      levelup_eat_count = 30
    } else if (50 < level && level <= 60) {
      levelup_eat_count = 40
    } else if (60 < level && level <= 70) {
      levelup_eat_count = 60
    } else if (70 < level && level <= 80) {
      levelup_eat_count = 80
    } else if (80 < level && level <= 90) {
      levelup_eat_count = 120
    } else if (90 < level && level <= 100) {
      levelup_eat_count = 200
    } else{
      levelup_eat_count = 1000
    }
    return levelup_eat_count
  },
  //获取当前经验条比例
  get_exp_radio:function(){
    var levelup_eat_count = this.get_levelup_eat_count(this.data.current_pok_level)
    var exp_ratio = Math.floor((this.data.current_pok_exp / levelup_eat_count) * 100)
    this.setData({
      exp_ratio: exp_ratio
    }) 
  },
  change_idx: function (event){
    var pok_list_idx = event["currentTarget"]["dataset"]["idx"]
    var haved_pok = util.get_self_pok();
    haved_pok = haved_pok.reverse()
    var change_pok = haved_pok[pok_list_idx]
    var change_pok_idx = haved_pok[pok_list_idx]["idx"]
    for (var i in haved_pok) {
      if (haved_pok[i]["idx"] == change_pok_idx) {
        haved_pok.splice(i, 1)
      }
    }
    haved_pok = haved_pok.reverse()
    haved_pok.push(change_pok)
    wx.setStorageSync("pok_id_list", haved_pok)

    haved_pok = haved_pok.reverse()
    //设置当前精灵数据
    var current_pok_id = this.data.current_pok_id
    var current_pok_idx = this.data.current_pok_idx
    var current_pok_level = this.data.current_pok_level
    var current_pok_growup = this.data.current_pok_growup
    var current_pok_usedhp = this.data.current_pok_usedhp
    var current_pok_sex = this.data.current_pok_sex
    var current_pok_master = this.data.current_pok_master
    var current_pok_exp = this.data.current_pok_exp
    this.setData({
      haved_pok: haved_pok,
      current_pok_idx: current_pok_idx,
      current_pok_id: current_pok_id,
      current_pok_level: current_pok_level,
      current_pok_growup: current_pok_growup,
      current_pok_usedhp: current_pok_usedhp,
      current_pok_sex: current_pok_sex,
      current_pok_master: current_pok_master,
      current_pok_exp: current_pok_exp
    })
    // //获取头像部分数据
    this.refresh_pok_head(current_pok_id);
    //获取我的精灵列表数据
    this.refresh_pok_list(haved_pok);
  },
  get_evolution_level: function (id) {
    var evo_list = app.globalData.evo_list
    for (var i in evo_list) {
      if (evo_list[i]["id"] == id.toString()) {
        var evo_level = evo_list[i]["evo"]
      }
    }
    return [parseInt(id),evo_level]
  }
  ,
  int_pok_id_to_str:function(int_pok_id){
    var int_pok_id_length = int_pok_id.toString().length
    if (int_pok_id_length == 1) {
      int_pok_id = "00" + int_pok_id;
    }
    else if (int_pok_id_length == 2) {
      int_pok_id = "0" + int_pok_id;
    }else{
      int_pok_id = int_pok_id.toString()
    }
    return int_pok_id
  },
  //当前精灵数据入库，传递当前精灵时使用，比如去野外练级战斗
  set_current_pok:function(){
    //设置当前精灵数据
    var current_pok_id = this.data.current_pok_id
    var current_pok_idx = this.data.current_pok_idx
    var current_pok_level = this.data.current_pok_level
    var current_pok_growup = this.data.current_pok_growup
    var current_pok_usedhp = this.data.current_pok_usedhp
    var current_pok_sex = this.data.current_pok_sex
    var current_pok_master = this.data.current_pok_master
    var current_pok_exp = this.data.current_pok_exp
    wx.setStorageSync("current_pok_id", current_pok_id)
    wx.setStorageSync("current_pok_idx", current_pok_idx)
    wx.setStorageSync("current_pok_level", current_pok_level)
    wx.setStorageSync("current_pok_growup", current_pok_growup)
    wx.setStorageSync("current_pok_usedhp", current_pok_usedhp)
    wx.setStorageSync("current_pok_sex", current_pok_sex)
    wx.setStorageSync("current_pok_master", current_pok_master)
    wx.setStorageSync("current_pok_exp", current_pok_exp)
  },
  restore_all_pok:function(){
    var pc_status = wx.getStorageSync("pc_status")
    if (pc_status){
      var haved_pok = util.get_self_pok();
      for (var i in haved_pok) {
        haved_pok[i]["usedhp"] = 0
      }
      wx.setStorageSync("pok_id_list", haved_pok)
      wx.showToast({
        title: '全部恢复',
        icon: "none"
      })
      wx.setStorageSync("pc_status", false)
      this.countDown(this, 30);
      //刷新当前精灵头像
      this.refresh_pok_head(this.data.current_pok_id);
    }else{
      wx.showToast({
        title: '精灵中心排队中',
        icon: "none"
      })
    }
  },
  //倒计时60秒
  countDown:function (that, count) {
    var pc_status = wx.getStorageSync("pc_status")
    if (count == 0 || pc_status) {
      that.setData({
        timeCountDownTop: '0 ',
        counting: false
      })
      wx.setStorageSync("pc_status", true)
      return;
    }
  that.setData({
      counting: true,
      timeCountDownTop: count,
    })
  setTimeout(function() {
      count--;
      that.countDown(that, count);
    }, 1000);
},
  get_today: function () {
    var timestamp = Date.parse(new Date());
    var date = new Date(timestamp);
    //年  
    var Y = date.getFullYear();
    //月  
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    //日  
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    //时  
    var h = date.getHours();
    //分  
    var m = date.getMinutes();
    //秒  
    var s = date.getSeconds();
    //console.log("当前时间：" + Y + M + D + h + ":" + m + ":" + s);  
    return Y + M + D
  },
  eat_evo_stone:function(event){
    var evo_stone_list = wx.getStorageSync("evo_stone_list")
    //获取我拥有的精灵
    var haved_pok = util.get_self_pok();
    var that = this
    var evo_type = event["currentTarget"]["dataset"]["type"]
    var pok_evo_info = this.get_evolution_level(this.data.current_pok_id)
    var pok_id = pok_evo_info[0]
    var pok_evo = pok_evo_info[1]
    console.log(pok_evo)
    console.log(evo_type)
    //判断是否有该进化石
    if (evo_stone_list[evo_type] <= 0){
      wx.showToast({
        title: '进化石不足',
        icon:"none"
      })
      return
    }
    if (evo_type == "fire" && pok_evo=="火之石"){
      //火之石进化
      wx.showModal({
        title: "火之石",
        content: '确定进化吗？',
        success: function (sm) {
          if (sm.confirm) {
            wx.vibrateLong()
            //抖动动效
            that.setData({ pok_head_id: "shake" })
            util.sleep(1000)
            that.setData({ pok_head_id: "stop" })
            that.setData({ pok_head_id: "shake" })
            util.sleep(1000)
            that.setData({ pok_head_id: "stop" })
            that.setData({ pok_head_id: "shake" })
            util.sleep(1000)
            that.setData({ pok_head_id: "stop" })
            that.setData({ pok_head_id: "twinkle" })
            //
            for (var i in haved_pok) {
              if (haved_pok[i]["idx"] == that.data.current_pok_idx) {
                //进化，变更pok的id和usehp
                haved_pok[i]["id"] = that.int_pok_id_to_str(pok_id + 1)
                haved_pok[i]["usedhp"] = 0
                that.setData({
                  current_pok_id: haved_pok[i]["id"],
                  current_pok_usedhp: 0
                })
                //将已有精灵转化为图签list
                util.refresh_pok_book()
              }
              }
            //haved_pok入库
            wx.setStorageSync("pok_id_list", haved_pok)
            //将已有精灵转化为图签list
            util.refresh_pok_book()
            //倒序排列我的精灵
            haved_pok = haved_pok.reverse()
            //设置当前精灵数据
            var current_pok_id = that.data.current_pok_id
            var current_pok_idx = that.data.current_pok_idx
            var current_pok_level = that.data.current_pok_level
            var current_pok_growup = that.data.current_pok_growup
            var current_pok_usedhp = that.data.current_pok_usedhp
            var current_pok_sex = that.data.current_pok_sex
            var current_pok_master = that.data.current_pok_master
            var current_pok_exp = that.data.current_pok_exp
            that.setData({
              haved_pok: haved_pok,
              current_pok_idx: current_pok_idx,
              current_pok_id: current_pok_id,
              current_pok_level: current_pok_level,
              current_pok_growup: current_pok_growup,
              current_pok_usedhp: current_pok_usedhp,
              current_pok_sex: current_pok_sex,
              current_pok_master: current_pok_master,
              current_pok_exp: current_pok_exp
            })
            //获取头像部分数据
            that.refresh_pok_head(current_pok_id);
            //获取我的精灵列表数据
            that.refresh_pok_list(haved_pok);
            //减少火之石
            evo_stone_list["fire"] = evo_stone_list["fire"] - 1
            wx.setStorageSync("evo_stone_list", evo_stone_list)
            that.setData({
              fire: evo_stone_list["fire"]
            })
            //进化完毕
          } else if (sm.cancel) {
            console.log("cancel")
          }
        }
      });
    } else if (evo_type == "water" && pok_evo == "水之石") {
      //水之石进化
      wx.showModal({
        title: "水之石",
        content: '确定进化吗？',
        success: function (sm) {
          if (sm.confirm) {
            wx.vibrateLong()
            //抖动动效
            that.setData({ pok_head_id: "shake" })
            util.sleep(1000)
            that.setData({ pok_head_id: "stop" })
            that.setData({ pok_head_id: "shake" })
            util.sleep(1000)
            that.setData({ pok_head_id: "stop" })
            that.setData({ pok_head_id: "shake" })
            util.sleep(1000)
            that.setData({ pok_head_id: "stop" })
            that.setData({ pok_head_id: "twinkle" })
            //
            for (var i in haved_pok) {
              if (haved_pok[i]["idx"] == that.data.current_pok_idx) {
                //进化，变更pok的id和usehp
                haved_pok[i]["id"] = that.int_pok_id_to_str(pok_id + 1)
                haved_pok[i]["usedhp"] = 0
                that.setData({
                  current_pok_id: haved_pok[i]["id"],
                  current_pok_usedhp: 0
                })
                //将已有精灵转化为图签list
                util.refresh_pok_book()
              }
            }
            //haved_pok入库
            wx.setStorageSync("pok_id_list", haved_pok)
            //将已有精灵转化为图签list
            util.refresh_pok_book()
            //倒序排列我的精灵
            haved_pok = haved_pok.reverse()
            //设置当前精灵数据
            var current_pok_id = that.data.current_pok_id
            var current_pok_idx = that.data.current_pok_idx
            var current_pok_level = that.data.current_pok_level
            var current_pok_growup = that.data.current_pok_growup
            var current_pok_usedhp = that.data.current_pok_usedhp
            var current_pok_sex = that.data.current_pok_sex
            var current_pok_master = that.data.current_pok_master
            var current_pok_exp = that.data.current_pok_exp
            that.setData({
              haved_pok: haved_pok,
              current_pok_idx: current_pok_idx,
              current_pok_id: current_pok_id,
              current_pok_level: current_pok_level,
              current_pok_growup: current_pok_growup,
              current_pok_usedhp: current_pok_usedhp,
              current_pok_sex: current_pok_sex,
              current_pok_master: current_pok_master,
              current_pok_exp: current_pok_exp
            })
            //获取头像部分数据
            that.refresh_pok_head(current_pok_id);
            //获取我的精灵列表数据
            that.refresh_pok_list(haved_pok);
            //减少水之石
            evo_stone_list["water"] = evo_stone_list["water"] - 1
            wx.setStorageSync("evo_stone_list", evo_stone_list)
            that.setData({
              water: evo_stone_list["water"]
            })
      //进化完毕
          } else if (sm.cancel) {
            console.log("cancel")
          }
        }
      });
    } else if (evo_type == "grass" && pok_evo == "叶之石") {
      //叶之石进化
      wx.showModal({
        title: "叶之石",
        content: '确定进化吗？',
        success: function (sm) {
          if (sm.confirm) {
      wx.vibrateLong()
      //抖动动效
      that.setData({ pok_head_id: "shake" })
      util.sleep(1000)
      that.setData({ pok_head_id: "stop" })
      that.setData({ pok_head_id: "shake" })
      util.sleep(1000)
      that.setData({ pok_head_id: "stop" })
      that.setData({ pok_head_id: "shake" })
      util.sleep(1000)
      that.setData({ pok_head_id: "stop" })
      that.setData({ pok_head_id: "twinkle" })
      //
      for (var i in haved_pok) {
        if (haved_pok[i]["idx"] == that.data.current_pok_idx) {
          //进化，变更pok的id和usehp
          haved_pok[i]["id"] = that.int_pok_id_to_str(pok_id + 1)
          haved_pok[i]["usedhp"] = 0
          that.setData({
            current_pok_id: haved_pok[i]["id"],
            current_pok_usedhp: 0
          })
          //将已有精灵转化为图签list
          util.refresh_pok_book()
        }
      }
      //haved_pok入库
      wx.setStorageSync("pok_id_list", haved_pok)
      //将已有精灵转化为图签list
      util.refresh_pok_book()
      //倒序排列我的精灵
      haved_pok = haved_pok.reverse()
      //设置当前精灵数据
      var current_pok_id = that.data.current_pok_id
      var current_pok_idx = that.data.current_pok_idx
      var current_pok_level = that.data.current_pok_level
      var current_pok_growup = that.data.current_pok_growup
      var current_pok_usedhp = that.data.current_pok_usedhp
      var current_pok_sex = that.data.current_pok_sex
      var current_pok_master = that.data.current_pok_master
      var current_pok_exp = that.data.current_pok_exp
      that.setData({
        haved_pok: haved_pok,
        current_pok_idx: current_pok_idx,
        current_pok_id: current_pok_id,
        current_pok_level: current_pok_level,
        current_pok_growup: current_pok_growup,
        current_pok_usedhp: current_pok_usedhp,
        current_pok_sex: current_pok_sex,
        current_pok_master: current_pok_master,
        current_pok_exp: current_pok_exp
      })
      //获取头像部分数据
      that.refresh_pok_head(current_pok_id);
      //获取我的精灵列表数据
      that.refresh_pok_list(haved_pok);
      //减少叶之石
      evo_stone_list["grass"] = evo_stone_list["grass"] - 1
      wx.setStorageSync("evo_stone_list", evo_stone_list)
      that.setData({
        grass: evo_stone_list["grass"]
      })
      //进化完毕
          } else if (sm.cancel) {
            console.log("cancel")
          }
        }
      });
    } else if (evo_type == "electric" && pok_evo == "雷之石") {
      //雷之石进化
      wx.showModal({
        title: "雷之石",
        content: '确定进化吗？',
        success: function (sm) {
          if (sm.confirm) {
      wx.vibrateLong()
      //抖动动效
      that.setData({ pok_head_id: "shake" })
      util.sleep(1000)
      that.setData({ pok_head_id: "stop" })
      that.setData({ pok_head_id: "shake" })
      util.sleep(1000)
      that.setData({ pok_head_id: "stop" })
      that.setData({ pok_head_id: "shake" })
      util.sleep(1000)
      that.setData({ pok_head_id: "stop" })
      that.setData({ pok_head_id: "twinkle" })
      //
      for (var i in haved_pok) {
        if (haved_pok[i]["idx"] == that.data.current_pok_idx) {
          //进化，变更pok的id和usehp
          haved_pok[i]["id"] = that.int_pok_id_to_str(pok_id + 1)
          haved_pok[i]["usedhp"] = 0
          that.setData({
            current_pok_id: haved_pok[i]["id"],
            current_pok_usedhp: 0
          })
          //将已有精灵转化为图签list
          util.refresh_pok_book()
        }
      }
      //haved_pok入库
      wx.setStorageSync("pok_id_list", haved_pok)
      //将已有精灵转化为图签list
      util.refresh_pok_book()
      //倒序排列我的精灵
      haved_pok = haved_pok.reverse()
      //设置当前精灵数据
      var current_pok_id = that.data.current_pok_id
      var current_pok_idx = that.data.current_pok_idx
      var current_pok_level = that.data.current_pok_level
      var current_pok_growup = that.data.current_pok_growup
      var current_pok_usedhp = that.data.current_pok_usedhp
      var current_pok_sex = that.data.current_pok_sex
      var current_pok_master = that.data.current_pok_master
      var current_pok_exp = that.data.current_pok_exp
      that.setData({
        haved_pok: haved_pok,
        current_pok_idx: current_pok_idx,
        current_pok_id: current_pok_id,
        current_pok_level: current_pok_level,
        current_pok_growup: current_pok_growup,
        current_pok_usedhp: current_pok_usedhp,
        current_pok_sex: current_pok_sex,
        current_pok_master: current_pok_master,
        current_pok_exp: current_pok_exp
      })
      //获取头像部分数据
      that.refresh_pok_head(current_pok_id);
      //获取我的精灵列表数据
      that.refresh_pok_list(haved_pok);
      //减少雷之石
      evo_stone_list["electric"] = evo_stone_list["electric"] - 1
      wx.setStorageSync("evo_stone_list", evo_stone_list)
      that.setData({
        electric: evo_stone_list["electric"]
      })
      //进化完毕
          } else if (sm.cancel) {
            console.log("cancel")
          }
        }
      });
    } else if (evo_type == "moon" && pok_evo == "月之石") {
      //月之石进化
      wx.showModal({
        title: "月之石",
        content: '确定进化吗？',
        success: function (sm) {
          if (sm.confirm) {
      wx.vibrateLong()
      //抖动动效
      that.setData({ pok_head_id: "shake" })
      util.sleep(1000)
      that.setData({ pok_head_id: "stop" })
      that.setData({ pok_head_id: "shake" })
      util.sleep(1000)
      that.setData({ pok_head_id: "stop" })
      that.setData({ pok_head_id: "shake" })
      util.sleep(1000)
      that.setData({ pok_head_id: "stop" })
      that.setData({ pok_head_id: "twinkle" })
      //
      for (var i in haved_pok) {
        if (haved_pok[i]["idx"] == that.data.current_pok_idx) {
          //进化，变更pok的id和usehp
          haved_pok[i]["id"] = that.int_pok_id_to_str(pok_id + 1)
          haved_pok[i]["usedhp"] = 0
          that.setData({
            current_pok_id: haved_pok[i]["id"],
            current_pok_usedhp: 0
          })
          //将已有精灵转化为图签list
          util.refresh_pok_book()
        }
      }
      //haved_pok入库
      wx.setStorageSync("pok_id_list", haved_pok)
      //将已有精灵转化为图签list
      util.refresh_pok_book()
      //倒序排列我的精灵
      haved_pok = haved_pok.reverse()
      //设置当前精灵数据
      var current_pok_id = that.data.current_pok_id
      var current_pok_idx = that.data.current_pok_idx
      var current_pok_level = that.data.current_pok_level
      var current_pok_growup = that.data.current_pok_growup
      var current_pok_usedhp = that.data.current_pok_usedhp
      var current_pok_sex = that.data.current_pok_sex
      var current_pok_master = that.data.current_pok_master
      var current_pok_exp = that.data.current_pok_exp
      that.setData({
        haved_pok: haved_pok,
        current_pok_idx: current_pok_idx,
        current_pok_id: current_pok_id,
        current_pok_level: current_pok_level,
        current_pok_growup: current_pok_growup,
        current_pok_usedhp: current_pok_usedhp,
        current_pok_sex: current_pok_sex,
        current_pok_master: current_pok_master,
        current_pok_exp: current_pok_exp
      })
      //获取头像部分数据
      that.refresh_pok_head(current_pok_id);
      //获取我的精灵列表数据
      that.refresh_pok_list(haved_pok);
      //减少月之石
      evo_stone_list["moon"] = evo_stone_list["moon"] - 1
      wx.setStorageSync("evo_stone_list", evo_stone_list)
      that.setData({
        electric: evo_stone_list["moon"]
      })
      //进化完毕
          } else if (sm.cancel) {
            console.log("cancel")
          }
        }
      });
    } else if ((evo_type == "water" || evo_type == "fire" || evo_type == "electric") && pok_evo == "水、雷、火之石") {
      //伊布进化
      wx.showModal({
        title: "水、雷、火之石",
        content: '确定进化吗？',
        success: function (sm) {
          if (sm.confirm) {
      wx.vibrateLong()
      //抖动动效
      that.setData({ pok_head_id: "shake" })
      util.sleep(1000)
      that.setData({ pok_head_id: "stop" })
      that.setData({ pok_head_id: "shake" })
      util.sleep(1000)
      that.setData({ pok_head_id: "stop" })
      that.setData({ pok_head_id: "shake" })
      util.sleep(1000)
      that.setData({ pok_head_id: "stop" })
      that.setData({ pok_head_id: "twinkle" })
      //
      for (var i in haved_pok) {
        if (haved_pok[i]["idx"] == that.data.current_pok_idx) {
          //进化，变更pok的id和usehp
          //134水135雷136火
          if (evo_type == "fire"){
            haved_pok[i]["id"] = "136"
          } else if (evo_type == "water"){
            haved_pok[i]["id"] = "134"
          } else if (evo_type == "electric") {
            haved_pok[i]["id"] = "135"
          }
          haved_pok[i]["usedhp"] = 0
          that.setData({
            current_pok_id: haved_pok[i]["id"],
            current_pok_usedhp: 0
          })
          //将已有精灵转化为图签list
          util.refresh_pok_book()
        }
      }
      //haved_pok入库
      wx.setStorageSync("pok_id_list", haved_pok)
      //将已有精灵转化为图签list
      util.refresh_pok_book()
      //倒序排列我的精灵
      haved_pok = haved_pok.reverse()
      //设置当前精灵数据
      var current_pok_id = that.data.current_pok_id
      var current_pok_idx = that.data.current_pok_idx
      var current_pok_level = that.data.current_pok_level
      var current_pok_growup = that.data.current_pok_growup
      var current_pok_usedhp = that.data.current_pok_usedhp
      var current_pok_sex = that.data.current_pok_sex
      var current_pok_master = that.data.current_pok_master
      var current_pok_exp = that.data.current_pok_exp
      that.setData({
        haved_pok: haved_pok,
        current_pok_idx: current_pok_idx,
        current_pok_id: current_pok_id,
        current_pok_level: current_pok_level,
        current_pok_growup: current_pok_growup,
        current_pok_usedhp: current_pok_usedhp,
        current_pok_sex: current_pok_sex,
        current_pok_master: current_pok_master,
        current_pok_exp: current_pok_exp
      })
      //获取头像部分数据
      that.refresh_pok_head(current_pok_id);
      //获取我的精灵列表数据
      that.refresh_pok_list(haved_pok);
      //减少叶之石
      if (evo_type == "fire") {
        evo_stone_list["fire"] = evo_stone_list["fire"] - 1
        that.setData({
          fire: evo_stone_list["fire"]
        })
      } else if (evo_type == "water") {
        evo_stone_list["water"] = evo_stone_list["water"] - 1
        that.setData({
          water: evo_stone_list["water"]
        })
      } else if (evo_type == "electric") {
        evo_stone_list["electric"] = evo_stone_list["electric"] - 1
        that.setData({
          electric: evo_stone_list["electric"]
        })
      }
      wx.setStorageSync("evo_stone_list", evo_stone_list)
      //进化完毕
          } else if (sm.cancel) {
            console.log("cancel")
          }
        }
      });
    }else{
      wx.showToast({
        title: '不能进化',
        icon: "none"
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (parseInt(this.get_today()) > 20180420) {
      this.setData({
        shenhe: "open"
      })
    } else {
      this.setData({
        shenhe: "none"
      })
    }
    var signin_status = wx.getStorageSync(this.get_today());
    if (signin_status == undefined || signin_status == "") {
      wx.showToast({
        title: '首次转发得糖果',
        icon: "none"
      })
    }
    this.countDown(this, 30);
    //将已有精灵转化为图签list
    util.refresh_pok_book()
    this.load_trainer()
    var haved_pok = util.get_self_pok();
    var haved_pok_count = haved_pok.length
    if (haved_pok_count == 0) {
      wx.navigateBack()
    }
    //倒序排列我的精灵
    haved_pok = haved_pok.reverse()
    //设置当前精灵数据
    var current_pok_id = haved_pok[0]["id"]
    var current_pok_idx = haved_pok[0]["idx"]
    var current_pok_level = haved_pok[0]["level"]
    var current_pok_growup = haved_pok[0]["growup"]
    var current_pok_usedhp = haved_pok[0]["usedhp"]
    var current_pok_sex = haved_pok[0]["sex"]
    var current_pok_master = haved_pok[0]["master"]
    var current_pok_exp = haved_pok[0]["exp"]
    this.setData({
      haved_pok: haved_pok,
      current_pok_idx: current_pok_idx,
      current_pok_id: current_pok_id,
      current_pok_level: current_pok_level,
      current_pok_growup: current_pok_growup,
      current_pok_usedhp: current_pok_usedhp,
      current_pok_sex: current_pok_sex,
      current_pok_master: current_pok_master,
      current_pok_exp: current_pok_exp
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
    //获取我的精灵
    var haved_pok = util.get_self_pok();
    var haved_pok_count = haved_pok.length
    if (haved_pok_count == 0) {
      wx.navigateBack()
      return
    }
    //获取candy个数
    var candy_count = wx.getStorageSync("candy_count")
    if (candy_count == "") { candy_count=0}
    this.setData({
      candy_count: candy_count
    })
    //获取进化石数量
    var evo_stone_list = wx.getStorageSync("evo_stone_list")
    this.setData({
      fire: evo_stone_list["fire"],
      electric: evo_stone_list["electric"],
      grass: evo_stone_list["grass"],
      water: evo_stone_list["water"],
      moon: evo_stone_list["moon"]
    })
    //老用户清除本地精灵
    try{
      if (haved_pok[0]["exp"] == undefined) {
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
      var haved_pok = [{ "id": "001", "growup": 50, "level": 1, "idx": "1", "usedhp": 0, "sex": 1, "master": wx.getStorageSync("user"),"exp":0}]
      wx.setStorageSync("pok_id_list", haved_pok)
      }
    //设置当前精灵数据
    var current_pok_id = haved_pok[0]["id"]
    var current_pok_idx = haved_pok[0]["idx"]
    var current_pok_level = haved_pok[0]["level"]
    var current_pok_growup = haved_pok[0]["growup"]
    var current_pok_usedhp = haved_pok[0]["usedhp"]
    var current_pok_sex = haved_pok[0]["sex"]
    var current_pok_master = haved_pok[0]["master"]
    var current_pok_exp = haved_pok[0]["exp"]
    this.setData({
      haved_pok: haved_pok,
      current_pok_idx: current_pok_idx,
      current_pok_id: current_pok_id,
      current_pok_level: current_pok_level,
      current_pok_growup: current_pok_growup,
      current_pok_usedhp: current_pok_usedhp,
      current_pok_sex: current_pok_sex,
      current_pok_master: current_pok_master,
      current_pok_exp: current_pok_exp
    })
    var near_pok_idx = haved_pok[0]["id"]
    //获取头像部分数据
    this.refresh_pok_head(near_pok_idx);
    //获取我的精灵列表数据
    this.refresh_pok_list(haved_pok);
    if (["075", "093", "067", "064"].indexOf(current_pok_id) >= 0 && current_pok_master == "other"){
      //触发通信进化
      //抖动动效
      this.setData({ pok_head_id: "shake" })
      util.sleep(1000)
      this.setData({ pok_head_id: "stop" })
      this.setData({ pok_head_id: "shake" })
      util.sleep(1000)
      this.setData({ pok_head_id: "stop" })
      this.setData({ pok_head_id: "shake" })
      util.sleep(1000)
      this.setData({ pok_head_id: "stop" })
      this.setData({ pok_head_id: "twinkle" })
      //
      //进化，变更pok的id和usehp
      var haved_pok = util.get_self_pok();
      for (var i in haved_pok){
        if (haved_pok[i]["idx"] == current_pok_idx){
          haved_pok[i]["id"] = this.int_pok_id_to_str(parseInt(current_pok_id) + 1)
          this.setData({
            current_pok_id: haved_pok[i]["id"],
          })
        }
      }
      //将已有精灵转化为图签list
      util.refresh_pok_book()
      //haved_pok入库
      wx.setStorageSync("pok_id_list", haved_pok)
      //将已有精灵转化为图签list
      util.refresh_pok_book()
      //倒序排列我的精灵
      haved_pok = haved_pok.reverse()
      //设置当前精灵数据
      var current_pok_id = this.data.current_pok_id
      var current_pok_idx = this.data.current_pok_idx
      var current_pok_level = this.data.current_pok_level
      var current_pok_growup = this.data.current_pok_growup
      var current_pok_usedhp = this.data.current_pok_usedhp
      var current_pok_sex = this.data.current_pok_sex
      var current_pok_master = this.data.current_pok_master
      var current_pok_exp = this.data.current_pok_exp
      this.setData({
        haved_pok: haved_pok,
        current_pok_idx: current_pok_idx,
        current_pok_id: current_pok_id,
        current_pok_level: current_pok_level,
        current_pok_growup: current_pok_growup,
        current_pok_usedhp: current_pok_usedhp,
        current_pok_sex: current_pok_sex,
        current_pok_master: current_pok_master,
        current_pok_exp: current_pok_exp
      })
      //获取头像部分数据
      this.refresh_pok_head(current_pok_id);
      //获取我的精灵列表数据
      this.refresh_pok_list(haved_pok);
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
    var that = this
    return {
      title: '这是我的' + this.data.pok_name + "!",
      path: 'pages/index/index',//分享的页面地址
      //imageUrl: '/assets/images/mini/' + this.data.pok_num + ".png",
      success:function(res){
        var signin_status = wx.getStorageSync(that.get_today());
        if (signin_status == undefined || signin_status == "") {
          wx.setStorageSync(that.get_today(), "signin")
          //增加经验糖果
          var candy_count = wx.getStorageSync("candy_count");
          candy_count = candy_count + 30
          wx.setStorageSync("candy_count", candy_count)
          that.setData({
            candy_count: candy_count
          })
          wx.showToast({
            title: '分享获得30糖果',
            icon:"none"
          })
        }
      }
    }
  },
  get_today: function () {
    var timestamp = Date.parse(new Date());
    var date = new Date(timestamp);
    //年  
    var Y = date.getFullYear();
    //月  
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    //日  
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    //时  
    var h = date.getHours();
    //分  
    var m = date.getMinutes();
    //秒  
    var s = date.getSeconds();
    //console.log("当前时间：" + Y + M + D + h + ":" + m + ":" + s);  
    return Y + M + D
  }
})