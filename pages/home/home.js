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
    aes_iv: aes.CryptoJS.enc.Utf8.parse('2016092420160924')
  },
  load_trainer:function(){
    this.setData({
      userInfo : app.globalData.userInfo
    })
  },
  bind_my_pok: function () {
    wx.navigateTo({
      url: '../catch/catch',
    })
  },
  poke_map: function () {
    this.set_current_pok()
    wx.navigateTo({
      url: '../map/map',
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
  aes_Encrypt: function (word) {
    var srcs = aes.CryptoJS.enc.Utf8.parse(word);
    var encrypted = aes.CryptoJS.AES.encrypt(srcs, this.data.aes_key, { iv: this.data.aes_iv, mode: aes.CryptoJS.mode.CBC, padding: aes.CryptoJS.pad.Pkcs7 });
    return encrypted.ciphertext.toString().toUpperCase();
  },
  aes_Decrypt: function (word) {
    var encryptedHexStr = aes.CryptoJS.enc.Hex.parse(word);
    var srcs = aes.CryptoJS.enc.Base64.stringify(encryptedHexStr);
    var decrypt = aes.CryptoJS.AES.decrypt(srcs, this.data.aes_key, { iv: this.data.aes_iv, mode: aes.CryptoJS.mode.CBC, padding: aes.CryptoJS.pad.Pkcs7 });
    var decryptedStr = decrypt.toString(aes.CryptoJS.enc.Utf8);
    return decryptedStr.toString();
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
      })
    }
  }, 500),
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
    var haved_pok = util.get_self_pok();
    for (var i in haved_pok){
      haved_pok[i]["usedhp"] = 0
    }
    wx.setStorageSync("pok_id_list", haved_pok)
    wx.showToast({
      title: '全部恢复',
    })
    //刷新当前精灵头像
    console.log(this.data.current_pok_id)
    this.refresh_pok_head(this.data.current_pok_id);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //将已有精灵转化为图签list
    util.refresh_pok_book()
    console.log(this.aes_Encrypt("你好{}"))
    console.log(this.aes_Decrypt(this.aes_Encrypt("你好{}")))
    this.load_trainer()
    var haved_pok = util.get_self_pok();
    var haved_pok_count = haved_pok.length
    if (haved_pok_count == 0) {
      //赠送御三家
      var haved_pok = [{ "id": "001", "growup": 50, "level": 1, "idx": "1", "usedhp": 0, "sex": 1, "master": wx.getStorageSync("user"), "exp": 0 }]
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
    //获取candy个数
    var candy_count = wx.getStorageSync("candy_count")
    if (candy_count == "") { candy_count=0}
    this.setData({
      candy_count: candy_count
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
      title: '这是我的' + this.data.pok_name + "!",
      path: 'pages/index/index',//分享的页面地址
      //imageUrl: '/assets/images/mini/' + this.data.pok_num + ".png",
    }
  }
})