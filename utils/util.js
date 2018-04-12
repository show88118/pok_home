const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const app = getApp()

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function get_pok_info(idx) {
  var pok_dict = app.globalData.pok_idx;
  for (var i in pok_dict) {
    if (pok_dict[i].id == idx) {
      var pok_name = pok_dict[i].name;
      var pok_type1 = pok_dict[i].type.split("|")[0];
      var pok_type2 = pok_dict[i].type.split("|")[1];
      var pok_head = "/assets/images/head/"+idx+".png";
      var hp = pok_dict[i].hp;
      var att = pok_dict[i].att;
      var def = pok_dict[i].def;
      var speed = pok_dict[i].speed;
    }
  }
  return [pok_name, pok_type1, pok_type2, pok_head, hp,att,def,speed];
}

function get_self_pok(){
  var pok_id_list = wx.getStorageSync("pok_id_list");
  return pok_id_list;
}

function set_pok_type(type, two){
  if (two == "") {
    if (type == "fire") {
      app.globalData.type1 = "/assets/images/type/fire.png"
    }
    else if (type == "fire") {
      app.globalData.type1 = "/assets/images/type/fire.png"
    }
    else if (type == "bug") {
      app.globalData.type1 = "/assets/images/type/bug.png"
    }
    else if (type == "dark") {
      app.globalData.type1 = "/assets/images/type/dark.png"
    }
    else if (type == "dragon") {
      app.globalData.type1 = "/assets/images/type/dragon.png"
    }
    else if (type == "electric") {
      app.globalData.type1 = "/assets/images/type/electric.png"
    }
    else if (type == "fairy") {
      app.globalData.type1 = "/assets/images/type/fairy.png"
    }
    else if (type == "fight") {
      app.globalData.type1 = "/assets/images/type/fight.png"
    }
    else if (type == "fly") {
      app.globalData.type1 = "/assets/images/type/fly.png"
    }
    else if (type == "ghost") {
      app.globalData.type1 = "/assets/images/type/ghost.png"
    }
    else if (type == "grass") {
      app.globalData.type1 = "/assets/images/type/grass.png"
    }
    else if (type == "ground") {
      app.globalData.type1 = "/assets/images/type/ground.png"
    }
    else if (type == "ice") {
      app.globalData.type1 = "/assets/images/type/ice.png"
    }
    else if (type == "normal") {
      app.globalData.type1 = "/assets/images/type/normal.png"
    }
    else if (type == "poison") {
      app.globalData.type1 = "/assets/images/type/poison.png"
    }
    else if (type == "psychic") {
      app.globalData.type1 = "/assets/images/type/psychic.png"
    }
    else if (type == "rock") {
      app.globalData.type1 = "/assets/images/type/rock.png"
    }
    else if (type == "steel") {
      app.globalData.type1 = "/assets/images/type/steel.png"
    }
    else if (type == "water") {
      app.globalData.type1 = "/assets/images/type/water.png"
    }
  }
  else {
    if (type == "fire") {
      app.globalData.type2 = "/assets/images/type/fire.png"
    }
    else if (type == "bug") {
      app.globalData.type2 = "/assets/images/type/bug.png"
    }
    else if (type == "dark") {
      app.globalData.type2 = "/assets/images/type/dark.png"
    }
    else if (type == "dragon") {
      app.globalData.type2 = "/assets/images/type/dragon.png"
    }
    else if (type == "electric") {
      app.globalData.type2 = "/assets/images/type/electric.png"
    }
    else if (type == "fairy") {
      app.globalData.type2 = "/assets/images/type/fairy.png"
    }
    else if (type == "fight") {
      app.globalData.type2 = "/assets/images/type/fight.png"
    }
    else if (type == "fly") {
      app.globalData.type2 = "/assets/images/type/fly.png"
    }
    else if (type == "ghost") {
      app.globalData.type2 = "/assets/images/type/ghost.png"
    }
    else if (type == "grass") {
      app.globalData.type2 = "/assets/images/type/grass.png"
    }
    else if (type == "ground") {
      app.globalData.type2 = "/assets/images/type/ground.png"
    }
    else if (type == "ice") {
      app.globalData.type2 = "/assets/images/type/ice.png"
    }
    else if (type == "normal") {
      app.globalData.type2 = "/assets/images/type/normal.png"
    }
    else if (type == "poison") {
      app.globalData.type2 = "/assets/images/type/poison.png"
    }
    else if (type == "psychic") {
      app.globalData.type2 = "/assets/images/type/psychic.png"
    }
    else if (type == "rock") {
      app.globalData.type2 = "/assets/images/type/rock.png"
    }
    else if (type == "steel") {
      app.globalData.type2 = "/assets/images/type/steel.png"
    }
    else if (type == "water") {
      app.globalData.type2 = "/assets/images/type/water.png"
    }
    else if (type == "") {
      app.globalData.type2 = ""
    }
  }
}

  function pok_type(pok_type1, pok_type2){
  //设置main页展示type
  set_pok_type(pok_type1, "")
  if (pok_type2) {
    app.globalData.type2_display = "inline"
    set_pok_type(pok_type2, "two")
  } else {
    app.globalData.type2_display = "none"
    set_pok_type("", "two")
  }
}
  function get_pok_attr(id,growup,level){
    var pok_info = this.get_pok_info(id)
    var pok_name = pok_info[0];
    var pok_type1 = pok_info[1];
    var pok_type2 = pok_info[2];
    var pok_head = pok_info[3]
    var hp = pok_info[4];
    var att = pok_info[5];
    var def = pok_info[6];
    var speed = pok_info[7];
    //计算精灵能力值
    var pok_hp = (hp * 2 + growup)*level/100+level+10;
    var pok_att = (att * 2 + growup) * level / 100 + 5;
    var pok_def = (def * 2 + growup) * level / 100 + 5;
    var pok_speed = (speed * 2 + growup) * level / 100 + 5;
    return [Math.floor(pok_hp), Math.floor(pok_att), Math.floor(pok_def), Math.floor(pok_speed)]
  }

  function refresh_pok_book() {
    var pok_book_list = wx.getStorageSync("pok_idx_list")
    if (pok_book_list == "" || pok_book_list == undefined){
      var pok_book_list = []
    }
    var haved_pok = this.get_self_pok();
    for (var i in haved_pok) {
      pok_book_list.push(haved_pok[i]["id"])
    }
    //去重
    pok_book_list = Array.from(new Set(pok_book_list))
    //拥有图签数据入库
    wx.setStorageSync("pok_idx_list", pok_book_list)
  }

  function set_pok_book(){

  }
module.exports = {
    formatTime: formatTime,
      get_pok_info: get_pok_info,
      get_self_pok: get_self_pok,
      pok_type: pok_type,
      get_pok_attr: get_pok_attr,
      refresh_pok_book: refresh_pok_book,
      set_pok_book: set_pok_book
}