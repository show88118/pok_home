// pages/fight/fight.js
var util = require('../../utils/util.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current_pok_head:"/assets/images/head/000.png",
    current_pok_name:"未选择",
    current_pok_sex_text:"",
    current_pok_level:0,
    tap_wild_pok_current_hp_radio:100,
    current_hp : 0,
    current_pok_usedhp : 0,
    current_pok_hp_radio: 100,
  },
  //刷新我的精灵list
  refresh_pok_list: function (haved_pok) {
    //获取我的精灵列表数据
    var my_pok_list_mini = []
    var haved_pok = haved_pok
    var haved_pok_count = haved_pok.length
    for (var i in haved_pok) {
      var pok_id = haved_pok[i]["id"];
      var pok_idx = haved_pok[i]["idx"];
      var mini_img = "/assets/images/mini/" + pok_id + ".png";
      var head_img = "/assets/images/head/" + pok_id + ".png";
      my_pok_list_mini.push([pok_idx, pok_id, mini_img])
    }
    this.setData({
      my_pok_list_mini: my_pok_list_mini,
      my_pok_list_width: 126 * haved_pok_count,
    })
  },
  return_map: function () {
    util.sleep(1200)
    wx.navigateBack()
  },
  set_wlid_pok_data:function(){
    this.setData({
      tap_wild_pok_id: app.globalData.tap_wild_pok_id,
      tap_wild_pok_growup: app.globalData.tap_wild_pok_growup,
      tap_wild_pok_level: app.globalData.tap_wild_pok_level,
      tap_wild_pok_usedhp: app.globalData.tap_wild_pok_usedhp,
      tap_wild_pok_sex: app.globalData.tap_wild_pok_sex,
      tap_wild_pok_master: app.globalData.tap_wild_pok_master,
      tap_wild_pok_exp: app.globalData.tap_wild_pok_exp,
      tap_wild_pok_idx: app.globalData.tap_wild_pok_idx,
      tap_wild_pok_name: app.globalData.tap_wild_pok_name,
      tap_wild_pok_type1: app.globalData.tap_wild_pok_type1,
      tap_wild_pok_type2: app.globalData.tap_wild_pok_type2,
      tap_wild_pok_head: app.globalData.tap_wild_pok_head,
      tap_wild_hp: app.globalData.tap_wild_hp,
      tap_wild_att: app.globalData.tap_wild_att,
      tap_wild_def: app.globalData.tap_wild_def,
      tap_wild_speed: app.globalData.tap_wild_speed,
      tap_wild_catch_rate: app.globalData.tap_wild_catch_rate
    })

  },
  //切换当前精灵
  change_pok: function (event) {
    var that = this;
    var pok_list_idx = event["currentTarget"]["dataset"]["idx"]
    var haved_pok = util.get_self_pok()
    //获取当前精灵个性化数据
    for (var i in haved_pok){
      if (haved_pok[i]["idx"] == pok_list_idx){
        var current_pok_id = haved_pok[i]["id"]
        var current_pok_idx = haved_pok[i]["idx"]
        var current_pok_level = haved_pok[i]["level"]
        var current_pok_growup = haved_pok[i]["growup"]
        var current_pok_usedhp = haved_pok[i]["usedhp"]
        var current_pok_sex = haved_pok[i]["sex"]
        var current_pok_master = haved_pok[i]["master"]
        var current_pok_exp = haved_pok[i]["exp"]
      }
    }
    //获取当前精灵种族数据
    var current_pok_info = util.get_pok_info(current_pok_id);
    var current_pok_name = current_pok_info[0]
    var current_pok_type1 = current_pok_info[1]
    var current_pok_type2 = current_pok_info[2]
    var current_pok_head = current_pok_info[3]
    var current_catch_rate = current_pok_info[17]
    //根据精灵能力值转换属性
    var current_pok_attr = util.get_pok_attr(current_pok_id, current_pok_growup, current_pok_level)
    var current_hp = current_pok_attr[0]
    var current_att = current_pok_attr[1]
    var current_def = current_pok_attr[2]
    var current_speed = current_pok_attr[3]
    //判断点击精灵是否还有hp
    if (current_hp - current_pok_usedhp <= 0){
        wx.showToast({
          title: current_pok_name+'需要恢复',
          duration: 1000
        })
        return
    }
    //确认是否选择当前精灵
    wx.showModal({
      title: "决定是你了！" + current_pok_name,
      content: 'Lv' + current_pok_level,
      success: function (sm) {
        if (sm.confirm) {
          //设置当前精灵个性化数据
          that.setData({
            haved_pok: haved_pok,
            current_pok_idx: current_pok_idx,
            current_pok_id: current_pok_id,
            current_pok_level: current_pok_level,
            current_pok_growup: current_pok_growup,
            current_pok_usedhp: current_pok_usedhp,
            current_pok_sex: current_pok_sex,
            current_pok_master: current_pok_master,
            current_pok_exp: current_pok_exp,
          //设置当前精灵种族数据
            current_pok_name: current_pok_name,
            current_pok_type1: current_pok_type1,
            current_pok_type2: current_pok_type2,
            current_pok_head: current_pok_head,
            current_catch_rate: current_catch_rate,
            current_hp: current_pok_attr[0],
            current_att: current_pok_attr[1],
            current_def: current_pok_attr[2],
            current_speed: current_pok_attr[3],
            current_pok_hp_radio: parseInt((1 - parseFloat(current_pok_usedhp) / parseFloat(current_hp)) * 100)
          })
          //开始战斗
          var tap_wild_speed = that.data.tap_wild_speed
          var current_speed = that.data.current_speed
          if (parseInt(tap_wild_speed) > parseInt(current_speed)){
            util.sleep(300)
            that.wild_start_fight()
          }else{
            //我方出手
          }
        } else if (sm.cancel) {
          console.log("cancel")
        }
      }
    })
    //震动
    wx.vibrateShort({})
  },
  current_start_fight: util.throttle(function () {
    //判断是否选择了精灵
    if (this.data.current_pok_level==0){
      wx.showToast({
        title: '请选择出战精灵',
        duration: 1000
      })
      return
    }
    //设置我方动效
    this.setData({
      current_pok_head_animation: "stop"
    })
    this.setData({
      current_pok_head_animation: "att",
    })
      //我方攻击
      //计算我方对对方的攻击血量
      var usehp = this.get_damage(this.data.current_pok_level, this.data.current_att, this.data.tap_wild_def, this.data.current_pok_type1, this.data.current_pok_type2, this.data.tap_wild_pok_type1, this.data.tap_wild_pok_type2)
      //变更对方血量
      var wild_pok_list = wx.getStorageSync("wild_pok_list");
      for (var i in wild_pok_list){
        if (parseInt(wild_pok_list[i]["wild_pok_idx"]) == parseInt( this.data.tap_wild_pok_idx)){
          wild_pok_list[i]["pok_usedhp"] = parseInt(wild_pok_list[i]["pok_usedhp"]) + usehp
          if (wild_pok_list[i]["pok_usedhp"] >= parseInt( this.data.tap_wild_hp)) { 
            wild_pok_list[i]["pok_usedhp"] = this.data.tap_wild_hp
            }
          this.setData({
            tap_wild_pok_usedhp: wild_pok_list[i]["pok_usedhp"]
          })
        }
      }
      //保存对方消耗血量
      wx.setStorageSync("wild_pok_list", wild_pok_list)
      var tap_wild_pok_current_hp_radio = parseInt((1 - parseFloat(this.data.tap_wild_pok_usedhp) / parseFloat(this.data.tap_wild_hp)) * 100)
        this.setData({
          tap_wild_pok_current_hp_radio: tap_wild_pok_current_hp_radio
        })
      //如果对方死了
      if (tap_wild_pok_current_hp_radio == 0){
        util.sleep(500)
        //删除野外精灵数据
        for (var i in wild_pok_list) {
          if (parseInt(wild_pok_list[i]["wild_pok_idx"]) == parseInt(this.data.tap_wild_pok_idx)) {
            wild_pok_list.splice(i, 1)
          }
        }
        wx.setStorageSync("wild_pok_list", wild_pok_list)
        //增加经验糖果
        var candy_count = wx.getStorageSync("candy_count");
        candy_count = candy_count + Math.ceil(this.data.tap_wild_pok_level/10)
        wx.setStorageSync("candy_count", candy_count)
        //回到地图页
        wx.showToast({
          title: '野生' + this.data.tap_wild_pok_name + "阵亡",
          duration: 1000
        })
        util.sleep(500)
        this.return_map()
      }else{
        util.sleep(1000)
        this.wild_start_fight()
      }
  },2500),
  wild_start_fight: util.throttle(function(){
      //敌人攻击
      //设置敌人动效
    this.setData({
      tap_wild_pok_animation: "stop",
    })
    this.setData({
      tap_wild_pok_animation: "att",
    })
      //计算对方对我方的攻击血量
      var usehp = this.get_damage(this.data.tap_wild_pok_level, this.data.tap_wild_att, this.data.current_def, this.data.tap_wild_pok_type1, this.data.tap_wild_pok_type2, this.data.current_pok_type1, this.data.current_pok_type2)
      //变更我方血量
      var haved_pok = util.get_self_pok();
      for (var i in haved_pok){
        if (haved_pok[i]["idx"] == this.data.current_pok_idx){
          haved_pok[i]["usedhp"] = parseInt(haved_pok[i]["usedhp"]) + usehp
          if (haved_pok[i]["usedhp"] >= this.data.current_hp) { haved_pok[i]["usedhp"] = this.data.current_hp}
          this.setData({
            current_pok_usedhp: haved_pok[i]["usedhp"]
          })
        }
      }
      //保存我方消耗的血量
      wx.setStorageSync("pok_id_list", haved_pok)
      var current_pok_hp_radio = parseInt((1 - parseFloat(this.data.current_pok_usedhp) / parseFloat(this.data.current_hp)) * 100)
      this.setData({
        current_pok_hp_radio: current_pok_hp_radio
      })
      
      //如果我被对方打死了
      if (current_pok_hp_radio <= 0){
        wx.showToast({
          title: '我的' + this.data.current_pok_name + "阵亡",
        })
        util.sleep(500)
        //删除野外精灵数据
        var wild_pok_list = wx.getStorageSync("wild_pok_list");
        for (var i in wild_pok_list) {
          if (parseInt(wild_pok_list[i]["wild_pok_idx"]) == parseInt(this.data.tap_wild_pok_idx)) {
            wild_pok_list.splice(i, 1)
          }
        }
        wx.setStorageSync("wild_pok_list", wild_pok_list)
        this.return_map()
      }
  },1500),
  get_damage:function(att_level,att_att,def_def,att_type1,att_type2,def_type1,def_type2){
    var att_level = parseInt(att_level)
    var att_att = parseInt(att_att)
    var def_def = parseInt(def_def)
    var type_effect = this.get_type_effect(att_type1, def_type1) * this.get_type_effect(att_type1, def_type2) * this.get_type_effect(att_type2, def_type1) * this.get_type_effect(att_type2, def_type2)
    // console.log("level" + att_level)
    // console.log("att_att" + att_att)
    // console.log("def_def" + def_def)
    // console.log("type_effect" + type_effect)
    var damage = (att_level * 0.4 + 2) * att_att / def_def * 2 * type_effect
    return Math.floor(damage)
  },
  get_type_effect: function(att_type,def_type){
    var type_effect = 1
    //一般
    if (att_type == "normal"){
      if (def_type == "normal"){
        type_effect = 1
      } else if (def_type == "fight"){
        type_effect = 1
      } else if (def_type == "fly") {
        type_effect = 1
      } else if (def_type == "poison") {
        type_effect = 1
      } else if (def_type == "ground") {
        type_effect = 1
      } else if (def_type == "rock") {
        type_effect = 0.5
      } else if (def_type == "bug") {
        type_effect = 1
      } else if (def_type == "ghost") {
        type_effect = 0
      } else if (def_type == "steel") {
        type_effect = 0.5
      } else if (def_type == "fire") {
        type_effect = 1
      } else if (def_type == "water") {
        type_effect = 1
      } else if (def_type == "grass") {
        type_effect = 1
      } else if (def_type == "electric") {
        type_effect = 1
      } else if (def_type == "psychic") {
        type_effect = 1
      } else if (def_type == "ice") {
        type_effect = 1
      } else if (def_type == "dragon") {
        type_effect = 1
      } else if (def_type == "dark") {
        type_effect = 1
      } else if (def_type == "fairy") {
        type_effect = 1
      } else{
        type_effect = 1
      }
    }//格斗
    else if (att_type == "fight") {
      if (def_type == "normal") {
        type_effect = 2
      } else if (def_type == "fight") {
        type_effect = 1
      } else if (def_type == "fly") {
        type_effect = 0.5
      } else if (def_type == "poison") {
        type_effect = 0.5
      } else if (def_type == "ground") {
        type_effect = 1
      } else if (def_type == "rock") {
        type_effect = 2
      } else if (def_type == "bug") {
        type_effect = 0.5
      } else if (def_type == "ghost") {
        type_effect = 0
      } else if (def_type == "steel") {
        type_effect = 2
      } else if (def_type == "fire") {
        type_effect = 1
      } else if (def_type == "water") {
        type_effect = 1
      } else if (def_type == "grass") {
        type_effect = 1
      } else if (def_type == "electric") {
        type_effect = 1
      } else if (def_type == "psychic") {
        type_effect = 0.5
      } else if (def_type == "ice") {
        type_effect = 2
      } else if (def_type == "dragon") {
        type_effect = 1
      } else if (def_type == "dark") {
        type_effect = 2
      } else if (def_type == "fairy") {
        type_effect = 0.5
      } else {
        type_effect = 1
      }
    }//飞行
    else if (att_type == "fly") {
      if (def_type == "normal") {
        type_effect = 1
      } else if (def_type == "fight") {
        type_effect = 2
      } else if (def_type == "fly") {
        type_effect = 1
      } else if (def_type == "poison") {
        type_effect = 1
      } else if (def_type == "ground") {
        type_effect = 1
      } else if (def_type == "rock") {
        type_effect = 0.5
      } else if (def_type == "bug") {
        type_effect = 2
      } else if (def_type == "ghost") {
        type_effect = 1
      } else if (def_type == "steel") {
        type_effect = 0.5
      } else if (def_type == "fire") {
        type_effect = 1
      } else if (def_type == "water") {
        type_effect = 1
      } else if (def_type == "grass") {
        type_effect = 2
      } else if (def_type == "electric") {
        type_effect = 0.5
      } else if (def_type == "psychic") {
        type_effect = 1
      } else if (def_type == "ice") {
        type_effect = 1
      } else if (def_type == "dragon") {
        type_effect = 1
      } else if (def_type == "dark") {
        type_effect = 1
      } else if (def_type == "fairy") {
        type_effect = 1
      } else {
        type_effect = 1
      }
    }//毒
    else if (att_type == "poison") {
      if (def_type == "normal") {
        type_effect = 1
      } else if (def_type == "fight") {
        type_effect = 1
      } else if (def_type == "fly") {
        type_effect = 1
      } else if (def_type == "poison") {
        type_effect = 0.5
      } else if (def_type == "ground") {
        type_effect = 0.5
      } else if (def_type == "rock") {
        type_effect = 0.5
      } else if (def_type == "bug") {
        type_effect = 1
      } else if (def_type == "ghost") {
        type_effect = 0.5
      } else if (def_type == "steel") {
        type_effect = 0
      } else if (def_type == "fire") {
        type_effect = 1
      } else if (def_type == "water") {
        type_effect = 1
      } else if (def_type == "grass") {
        type_effect = 2
      } else if (def_type == "electric") {
        type_effect = 1
      } else if (def_type == "psychic") {
        type_effect = 1
      } else if (def_type == "ice") {
        type_effect = 1
      } else if (def_type == "dragon") {
        type_effect = 1
      } else if (def_type == "dark") {
        type_effect = 1
      } else if (def_type == "fairy") {
        type_effect = 2
      } else {
        type_effect = 1
      }
    }//地面
    else if (att_type == "ground") {
      if (def_type == "normal") {
        type_effect = 1
      } else if (def_type == "fight") {
        type_effect = 1
      } else if (def_type == "fly") {
        type_effect = 0
      } else if (def_type == "poison") {
        type_effect = 2
      } else if (def_type == "ground") {
        type_effect = 1
      } else if (def_type == "rock") {
        type_effect = 2
      } else if (def_type == "bug") {
        type_effect = 0.5
      } else if (def_type == "ghost") {
        type_effect = 1
      } else if (def_type == "steel") {
        type_effect = 2
      } else if (def_type == "fire") {
        type_effect = 2
      } else if (def_type == "water") {
        type_effect = 1
      } else if (def_type == "grass") {
        type_effect = 0.5
      } else if (def_type == "electric") {
        type_effect = 2
      } else if (def_type == "psychic") {
        type_effect = 1
      } else if (def_type == "ice") {
        type_effect = 1
      } else if (def_type == "dragon") {
        type_effect = 1
      } else if (def_type == "dark") {
        type_effect = 1
      } else if (def_type == "fairy") {
        type_effect = 1
      } else {
        type_effect = 1
      }
    }//岩石
    else if (att_type == "rock") {
      if (def_type == "normal") {
        type_effect = 1
      } else if (def_type == "fight") {
        type_effect = 0.5
      } else if (def_type == "fly") {
        type_effect = 2
      } else if (def_type == "poison") {
        type_effect = 1
      } else if (def_type == "ground") {
        type_effect = 0.5
      } else if (def_type == "rock") {
        type_effect = 1
      } else if (def_type == "bug") {
        type_effect = 2
      } else if (def_type == "ghost") {
        type_effect = 1
      } else if (def_type == "steel") {
        type_effect = 0.5
      } else if (def_type == "fire") {
        type_effect = 2
      } else if (def_type == "water") {
        type_effect = 1
      } else if (def_type == "grass") {
        type_effect = 1
      } else if (def_type == "electric") {
        type_effect = 1
      } else if (def_type == "psychic") {
        type_effect = 1
      } else if (def_type == "ice") {
        type_effect = 2
      } else if (def_type == "dragon") {
        type_effect = 1
      } else if (def_type == "dark") {
        type_effect = 1
      } else if (def_type == "fairy") {
        type_effect = 1
      } else {
        type_effect = 1
      }
    }//虫
    else if (att_type == "bug") {
      if (def_type == "normal") {
        type_effect = 1
      } else if (def_type == "fight") {
        type_effect = 0.5
      } else if (def_type == "fly") {
        type_effect = 0.5
      } else if (def_type == "poison") {
        type_effect = 0.5
      } else if (def_type == "ground") {
        type_effect = 1
      } else if (def_type == "rock") {
        type_effect = 1
      } else if (def_type == "bug") {
        type_effect = 1
      } else if (def_type == "ghost") {
        type_effect = 0.5
      } else if (def_type == "steel") {
        type_effect = 0.5
      } else if (def_type == "fire") {
        type_effect = 0.5
      } else if (def_type == "water") {
        type_effect = 1
      } else if (def_type == "grass") {
        type_effect = 2
      } else if (def_type == "electric") {
        type_effect = 1
      } else if (def_type == "psychic") {
        type_effect = 2
      } else if (def_type == "ice") {
        type_effect = 1
      } else if (def_type == "dragon") {
        type_effect = 1
      } else if (def_type == "dark") {
        type_effect = 2
      } else if (def_type == "fairy") {
        type_effect = 0.5
      } else {
        type_effect = 1
      }
    }
    //幽灵
    else if (att_type == "ghost") {
      if (def_type == "normal") {
        type_effect = 0
      } else if (def_type == "fight") {
        type_effect = 1
      } else if (def_type == "fly") {
        type_effect = 1
      } else if (def_type == "poison") {
        type_effect = 1
      } else if (def_type == "ground") {
        type_effect = 1
      } else if (def_type == "rock") {
        type_effect = 1
      } else if (def_type == "bug") {
        type_effect = 1
      } else if (def_type == "ghost") {
        type_effect = 2
      } else if (def_type == "steel") {
        type_effect = 1
      } else if (def_type == "fire") {
        type_effect = 1
      } else if (def_type == "water") {
        type_effect = 1
      } else if (def_type == "grass") {
        type_effect = 1
      } else if (def_type == "electric") {
        type_effect = 1
      } else if (def_type == "psychic") {
        type_effect = 2
      } else if (def_type == "ice") {
        type_effect = 1
      } else if (def_type == "dragon") {
        type_effect = 1
      } else if (def_type == "dark") {
        type_effect = 0.5
      } else if (def_type == "fairy") {
        type_effect = 1
      } else {
        type_effect = 1
      }
    }//钢
    else if (att_type == "steel") {
      if (def_type == "normal") {
        type_effect = 1
      } else if (def_type == "fight") {
        type_effect = 1
      } else if (def_type == "fly") {
        type_effect = 1
      } else if (def_type == "poison") {
        type_effect = 1
      } else if (def_type == "ground") {
        type_effect = 1
      } else if (def_type == "rock") {
        type_effect = 2
      } else if (def_type == "bug") {
        type_effect = 1
      } else if (def_type == "ghost") {
        type_effect = 1
      } else if (def_type == "steel") {
        type_effect = 0.5
      } else if (def_type == "fire") {
        type_effect = 0.5
      } else if (def_type == "water") {
        type_effect = 0.5
      } else if (def_type == "grass") {
        type_effect = 1
      } else if (def_type == "electric") {
        type_effect = 0.5
      } else if (def_type == "psychic") {
        type_effect = 1
      } else if (def_type == "ice") {
        type_effect = 2
      } else if (def_type == "dragon") {
        type_effect = 1
      } else if (def_type == "dark") {
        type_effect = 1
      } else if (def_type == "fairy") {
        type_effect = 2
      } else {
        type_effect = 1
      }
    }//火
    else if (att_type == "fire") {
      if (def_type == "normal") {
        type_effect = 1
      } else if (def_type == "fight") {
        type_effect = 1
      } else if (def_type == "fly") {
        type_effect = 1
      } else if (def_type == "poison") {
        type_effect = 1
      } else if (def_type == "ground") {
        type_effect = 1
      } else if (def_type == "rock") {
        type_effect = 0.5
      } else if (def_type == "bug") {
        type_effect = 2
      } else if (def_type == "ghost") {
        type_effect = 1
      } else if (def_type == "steel") {
        type_effect = 2
      } else if (def_type == "fire") {
        type_effect = 0.5
      } else if (def_type == "water") {
        type_effect = 0.5
      } else if (def_type == "grass") {
        type_effect = 2
      } else if (def_type == "electric") {
        type_effect = 1
      } else if (def_type == "psychic") {
        type_effect = 1
      } else if (def_type == "ice") {
        type_effect = 2
      } else if (def_type == "dragon") {
        type_effect = 0.5
      } else if (def_type == "dark") {
        type_effect = 1
      } else if (def_type == "fairy") {
        type_effect = 1
      } else {
        type_effect = 1
      }
    }//水
    else if (att_type == "water") {
      if (def_type == "normal") {
        type_effect = 1
      } else if (def_type == "fight") {
        type_effect = 1
      } else if (def_type == "fly") {
        type_effect = 1
      } else if (def_type == "poison") {
        type_effect = 1
      } else if (def_type == "ground") {
        type_effect = 2
      } else if (def_type == "rock") {
        type_effect = 2
      } else if (def_type == "bug") {
        type_effect = 1
      } else if (def_type == "ghost") {
        type_effect = 1
      } else if (def_type == "steel") {
        type_effect = 1
      } else if (def_type == "fire") {
        type_effect = 2
      } else if (def_type == "water") {
        type_effect = 0.5
      } else if (def_type == "grass") {
        type_effect = 0.5
      } else if (def_type == "electric") {
        type_effect = 1
      } else if (def_type == "psychic") {
        type_effect = 1
      } else if (def_type == "ice") {
        type_effect = 1
      } else if (def_type == "dragon") {
        type_effect = 0.5
      } else if (def_type == "dark") {
        type_effect = 1
      } else if (def_type == "fairy") {
        type_effect = 1
      } else {
        type_effect = 1
      }
    }//草
    else if (att_type == "grass") {
      if (def_type == "normal") {
        type_effect = 1
      } else if (def_type == "fight") {
        type_effect = 1
      } else if (def_type == "fly") {
        type_effect = 0.5
      } else if (def_type == "poison") {
        type_effect = 0.5
      } else if (def_type == "ground") {
        type_effect = 2
      } else if (def_type == "rock") {
        type_effect = 2
      } else if (def_type == "bug") {
        type_effect = 0.5
      } else if (def_type == "ghost") {
        type_effect = 1
      } else if (def_type == "steel") {
        type_effect = 0.5
      } else if (def_type == "fire") {
        type_effect = 0.5
      } else if (def_type == "water") {
        type_effect = 2
      } else if (def_type == "grass") {
        type_effect = 0.5
      } else if (def_type == "electric") {
        type_effect = 1
      } else if (def_type == "psychic") {
        type_effect = 1
      } else if (def_type == "ice") {
        type_effect = 1
      } else if (def_type == "dragon") {
        type_effect = 0.5
      } else if (def_type == "dark") {
        type_effect = 1
      } else if (def_type == "fairy") {
        type_effect = 1
      } else {
        type_effect = 1
      }
    }//电
    else if (att_type == "electric") {
      if (def_type == "normal") {
        type_effect = 1
      } else if (def_type == "fight") {
        type_effect = 1
      } else if (def_type == "fly") {
        type_effect = 2
      } else if (def_type == "poison") {
        type_effect = 1
      } else if (def_type == "ground") {
        type_effect = 0
      } else if (def_type == "rock") {
        type_effect = 1
      } else if (def_type == "bug") {
        type_effect = 1
      } else if (def_type == "ghost") {
        type_effect = 1
      } else if (def_type == "steel") {
        type_effect = 1
      } else if (def_type == "fire") {
        type_effect = 1
      } else if (def_type == "water") {
        type_effect = 2
      } else if (def_type == "grass") {
        type_effect = 0.5
      } else if (def_type == "electric") {
        type_effect = 0.5
      } else if (def_type == "psychic") {
        type_effect = 1
      } else if (def_type == "ice") {
        type_effect = 1
      } else if (def_type == "dragon") {
        type_effect = 0.5
      } else if (def_type == "dark") {
        type_effect = 1
      } else if (def_type == "fairy") {
        type_effect = 1
      } else {
        type_effect = 1
      }
    }//超能
    else if (att_type == "psychic") {
      if (def_type == "normal") {
        type_effect = 1
      } else if (def_type == "fight") {
        type_effect = 2
      } else if (def_type == "fly") {
        type_effect = 1
      } else if (def_type == "poison") {
        type_effect = 2
      } else if (def_type == "ground") {
        type_effect = 1
      } else if (def_type == "rock") {
        type_effect = 1
      } else if (def_type == "bug") {
        type_effect = 1
      } else if (def_type == "ghost") {
        type_effect = 1
      } else if (def_type == "steel") {
        type_effect = 0.5
      } else if (def_type == "fire") {
        type_effect = 1
      } else if (def_type == "water") {
        type_effect = 1
      } else if (def_type == "grass") {
        type_effect = 1
      } else if (def_type == "electric") {
        type_effect = 1
      } else if (def_type == "psychic") {
        type_effect = 0.5
      } else if (def_type == "ice") {
        type_effect = 1
      } else if (def_type == "dragon") {
        type_effect = 1
      } else if (def_type == "dark") {
        type_effect = 0
      } else if (def_type == "fairy") {
        type_effect = 1
      } else {
        type_effect = 1
      }
    }//冰
    else if (att_type == "ice") {
      if (def_type == "normal") {
        type_effect = 1
      } else if (def_type == "fight") {
        type_effect = 1
      } else if (def_type == "fly") {
        type_effect = 2
      } else if (def_type == "poison") {
        type_effect = 1
      } else if (def_type == "ground") {
        type_effect = 2
      } else if (def_type == "rock") {
        type_effect = 1
      } else if (def_type == "bug") {
        type_effect = 1
      } else if (def_type == "ghost") {
        type_effect = 1
      } else if (def_type == "steel") {
        type_effect = 0.5
      } else if (def_type == "fire") {
        type_effect = 0.5
      } else if (def_type == "water") {
        type_effect = 0.5
      } else if (def_type == "grass") {
        type_effect = 2
      } else if (def_type == "electric") {
        type_effect = 1
      } else if (def_type == "psychic") {
        type_effect = 1
      } else if (def_type == "ice") {
        type_effect = 0.5
      } else if (def_type == "dragon") {
        type_effect = 2
      } else if (def_type == "dark") {
        type_effect = 1
      } else if (def_type == "fairy") {
        type_effect = 1
      } else {
        type_effect = 1
      }
    }//龙
    else if (att_type == "dragon") {
      if (def_type == "normal") {
        type_effect = 1
      } else if (def_type == "fight") {
        type_effect = 1
      } else if (def_type == "fly") {
        type_effect = 1
      } else if (def_type == "poison") {
        type_effect = 1
      } else if (def_type == "ground") {
        type_effect = 1
      } else if (def_type == "rock") {
        type_effect = 1
      } else if (def_type == "bug") {
        type_effect = 1
      } else if (def_type == "ghost") {
        type_effect = 1
      } else if (def_type == "steel") {
        type_effect = 0.5
      } else if (def_type == "fire") {
        type_effect = 1
      } else if (def_type == "water") {
        type_effect = 1
      } else if (def_type == "grass") {
        type_effect = 1
      } else if (def_type == "electric") {
        type_effect = 1
      } else if (def_type == "psychic") {
        type_effect = 1
      } else if (def_type == "ice") {
        type_effect = 1
      } else if (def_type == "dragon") {
        type_effect = 2
      } else if (def_type == "dark") {
        type_effect = 1
      } else if (def_type == "fairy") {
        type_effect = 0
      } else {
        type_effect = 1
      }
    }//恶
    else if (att_type == "dark") {
      if (def_type == "normal") {
        type_effect = 1
      } else if (def_type == "fight") {
        type_effect = 0.5
      } else if (def_type == "fly") {
        type_effect = 1
      } else if (def_type == "poison") {
        type_effect = 1
      } else if (def_type == "ground") {
        type_effect = 1
      } else if (def_type == "rock") {
        type_effect = 1
      } else if (def_type == "bug") {
        type_effect = 1
      } else if (def_type == "ghost") {
        type_effect = 2
      } else if (def_type == "steel") {
        type_effect = 1
      } else if (def_type == "fire") {
        type_effect = 1
      } else if (def_type == "water") {
        type_effect = 1
      } else if (def_type == "grass") {
        type_effect = 1
      } else if (def_type == "electric") {
        type_effect = 1
      } else if (def_type == "psychic") {
        type_effect = 2
      } else if (def_type == "ice") {
        type_effect = 1
      } else if (def_type == "dragon") {
        type_effect = 1
      } else if (def_type == "dark") {
        type_effect = 0.5
      } else if (def_type == "fairy") {
        type_effect = 0.5
      } else {
        type_effect = 1
      }
    }//妖精
    else if (att_type == "fairy") {
      if (def_type == "normal") {
        type_effect = 1
      } else if (def_type == "fight") {
        type_effect = 2
      } else if (def_type == "fly") {
        type_effect = 1
      } else if (def_type == "poison") {
        type_effect = 0.5
      } else if (def_type == "ground") {
        type_effect = 1
      } else if (def_type == "rock") {
        type_effect = 1
      } else if (def_type == "bug") {
        type_effect = 1
      } else if (def_type == "ghost") {
        type_effect = 1
      } else if (def_type == "steel") {
        type_effect = 0.5
      } else if (def_type == "fire") {
        type_effect = 0.5
      } else if (def_type == "water") {
        type_effect = 1
      } else if (def_type == "grass") {
        type_effect = 1
      } else if (def_type == "electric") {
        type_effect = 1
      } else if (def_type == "psychic") {
        type_effect = 1
      } else if (def_type == "ice") {
        type_effect = 1
      } else if (def_type == "dragon") {
        type_effect = 2
      } else if (def_type == "dark") {
        type_effect = 2
      } else if (def_type == "fairy") {
        type_effect = 1
      } else {
        type_effect = 1
      }
    }
    return type_effect
  },
  escape:function(){
    wx.navigateBack()
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
    //设置野生精灵数据
    this.set_wlid_pok_data()
    //获取我的精灵数据
    var haved_pok = util.get_self_pok();
    //倒序排列我的精灵
    haved_pok = haved_pok.reverse()
    //刷新我的精灵列表
    this.refresh_pok_list(haved_pok)
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