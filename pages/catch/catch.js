// pages/main/main.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    head_image:"/assets/images/head/001.png",
    pok_num:"001",
    pok_idx: [{ "ename": "bulbasaur", "type": "grass|poison", "name": "妙蛙种子", "id": "001" }, { "ename": "ivysaur", "type": "grass|poison", "name": "妙蛙草", "id": "002" }, { "ename": "venusaur", "type": "grass|poison", "name": "妙蛙花", "id": "003" }, { "ename": "charmander", "type": "fire|", "name": "小火龙", "id": "004" }, { "ename": "charmeleon", "type": "fire|", "name": "火恐龙", "id": "005" }, { "ename": "charizard", "type": "fire|fly", "name": "喷火龙", "id": "006" }, { "ename": "squirtle", "type": "water|", "name": "杰尼龟", "id": "007" }, { "ename": "wartortle", "type": "water|", "name": "卡咪龟", "id": "008" }, { "ename": "blastoise", "type": "water|", "name": "水箭龟", "id": "009" }, { "ename": "caterpie", "type": "bug|", "name": "绿毛虫", "id": "010" }, { "ename": "metapod", "type": "bug|", "name": "铁甲蛹", "id": "011" }, { "ename": "butterfree", "type": "bug|fly", "name": "巴大蝶", "id": "012" }, { "ename": "weedle", "type": "bug|poison", "name": "独角虫", "id": "013" }, { "ename": "kakuna", "type": "bug|poison", "name": "铁壳蛹", "id": "014" }, { "ename": "beedrill", "type": "bug|poison", "name": "大针蜂", "id": "015" }, { "ename": "pidgey", "type": "normal|fly", "name": "波波", "id": "016" }, { "ename": "pidgeotto", "type": "normal|fly", "name": "比比鸟", "id": "017" }, { "ename": "pidgeot", "type": "normal|fly", "name": "大比鸟", "id": "018" }, { "ename": "rattata", "type": "normal|", "name": "小拉达", "id": "019" }, { "ename": "raticate", "type": "normal|", "name": "拉达", "id": "020" }, { "ename": "spearow", "type": "normal|fly", "name": "烈雀", "id": "021" }, { "ename": "fearow", "type": "normal|fly", "name": "大嘴雀", "id": "022" }, { "ename": "ekans", "type": "poison|", "name": "阿柏蛇", "id": "023" }, { "ename": "arbok", "type": "poison|", "name": "阿柏怪", "id": "024" }, { "ename": "pikachu", "type": "electric|", "name": "皮卡丘", "id": "025" }, { "ename": "raichu", "type": "electric|", "name": "雷丘", "id": "026" }, { "ename": "sandshrew", "type": "ground|", "name": "穿山鼠", "id": "027" }, { "ename": "sandslash", "type": "ground|", "name": "穿山王", "id": "028" }, { "ename": "nidoran♀", "type": "poison|", "name": "尼多兰", "id": "029" }, { "ename": "nidorina", "type": "poison|", "name": "尼多娜", "id": "030" }, { "ename": "nidoqueen", "type": "poison|ground", "name": "尼多后", "id": "031" }, { "ename": "nidoran♂", "type": "poison|", "name": "尼多朗", "id": "032" }, { "ename": "nidorino", "type": "poison|", "name": "尼多力诺", "id": "033" }, { "ename": "nidoking", "type": "poison|ground", "name": "尼多王", "id": "034" }, { "ename": "clefairy", "type": "fairy|", "name": "皮皮", "id": "035" }, { "ename": "clefable", "type": "fairy|", "name": "皮可西", "id": "036" }, { "ename": "vulpix", "type": "fire|", "name": "六尾", "id": "037" }, { "ename": "ninetales", "type": "fire|", "name": "九尾", "id": "038" }, { "ename": "jigglypuff", "type": "normal|fairy", "name": "胖丁", "id": "039" }, { "ename": "wigglytuff", "type": "normal|fairy", "name": "胖可丁", "id": "040" }, { "ename": "zubat", "type": "poison|fly", "name": "超音蝠", "id": "041" }, { "ename": "golbat", "type": "poison|fly", "name": "大嘴蝠", "id": "042" }, { "ename": "oddish", "type": "grass|poison", "name": "走路草", "id": "043" }, { "ename": "gloom", "type": "grass|poison", "name": "臭臭花", "id": "044" }, { "ename": "vileplume", "type": "grass|poison", "name": "霸王花", "id": "045" }, { "ename": "paras", "type": "bug|grass", "name": "派拉斯", "id": "046" }, { "ename": "parasect", "type": "bug|grass", "name": "派拉斯特", "id": "047" }, { "ename": "venonat", "type": "bug|poison", "name": "毛球", "id": "048" }, { "ename": "venomoth", "type": "bug|poison", "name": "摩鲁蛾", "id": "049" }, { "ename": "diglett", "type": "ground|", "name": "地鼠", "id": "050" }, { "ename": "dugtrio", "type": "ground|", "name": "三地鼠", "id": "051" }, { "ename": "meowth", "type": "normal|", "name": "喵喵", "id": "052" }, { "ename": "persian", "type": "normal|", "name": "猫老大", "id": "053" }, { "ename": "psyduck", "type": "water|", "name": "可达鸭", "id": "054" }, { "ename": "golduck", "type": "water|", "name": "哥达鸭", "id": "055" }, { "ename": "mankey", "type": "fight|", "name": "猴怪", "id": "056" }, { "ename": "primeape", "type": "fight|", "name": "火暴猴", "id": "057" }, { "ename": "growlithe", "type": "fire|", "name": "卡蒂狗", "id": "058" }, { "ename": "arcanine", "type": "fire|", "name": "风速狗", "id": "059" }, { "ename": "poliwag", "type": "water|", "name": "蚊香蝌蚪", "id": "060" }, { "ename": "poliwhirl", "type": "water|", "name": "蚊香君", "id": "061" }, { "ename": "poliwrath", "type": "water|fight", "name": "蚊香泳士", "id": "062" }, { "ename": "abra", "type": "psychic|", "name": "凯西", "id": "063" }, { "ename": "kadabra", "type": "psychic|", "name": "勇基拉", "id": "064" }, { "ename": "alakazam", "type": "psychic|", "name": "胡地", "id": "065" }, { "ename": "machop", "type": "fight|", "name": "腕力", "id": "066" }, { "ename": "machoke", "type": "fight|", "name": "豪力", "id": "067" }, { "ename": "machamp", "type": "fight|", "name": "怪力", "id": "068" }, { "ename": "bellsprout", "type": "grass|poison", "name": "喇叭芽", "id": "069" }, { "ename": "weepinbell", "type": "grass|poison", "name": "口呆花", "id": "070" }, { "ename": "victreebel", "type": "grass|poison", "name": "大食花", "id": "071" }, { "ename": "tentacool", "type": "water|poison", "name": "玛瑙水母", "id": "072" }, { "ename": "tentacruel", "type": "water|poison", "name": "毒刺水母", "id": "073" }, { "ename": "geodude", "type": "rock|ground", "name": "小拳石", "id": "074" }, { "ename": "graveler", "type": "rock|ground", "name": "隆隆石", "id": "075" }, { "ename": "golem", "type": "rock|ground", "name": "隆隆岩", "id": "076" }, { "ename": "ponyta", "type": "fire|", "name": "小火马", "id": "077" }, { "ename": "rapidash", "type": "fire|", "name": "烈焰马", "id": "078" }, { "ename": "slowpoke", "type": "water|psychic", "name": "呆呆兽", "id": "079" }, { "ename": "slowbro", "type": "water|psychic", "name": "呆壳兽", "id": "080" }, { "ename": "magnemite", "type": "electric|steel", "name": "小磁怪", "id": "081" }, { "ename": "magneton", "type": "electric|steel", "name": "三合一磁怪", "id": "082" }, { "ename": "farfetch'd", "type": "normal|fly", "name": "大葱鸭", "id": "083" }, { "ename": "doduo", "type": "normal|fly", "name": "嘟嘟", "id": "084" }, { "ename": "dodrio", "type": "normal|fly", "name": "嘟嘟利", "id": "085" }, { "ename": "seel", "type": "water|", "name": "小海狮", "id": "086" }, { "ename": "dewgong", "type": "water|ice", "name": "白海狮", "id": "087" }, { "ename": "grimer", "type": "poison|", "name": "臭泥", "id": "088" }, { "ename": "muk", "type": "poison|", "name": "臭臭泥", "id": "089" }, { "ename": "shellder", "type": "water|", "name": "大舌贝", "id": "090" }, { "ename": "cloyster", "type": "water|ice", "name": "刺甲贝", "id": "091" }, { "ename": "gastly", "type": "ghost|poison", "name": "鬼斯", "id": "092" }, { "ename": "haunter", "type": "ghost|poison", "name": "鬼斯通", "id": "093" }, { "ename": "gengar", "type": "ghost|poison", "name": "耿鬼", "id": "094" }, { "ename": "onix", "type": "rock|ground", "name": "大岩蛇", "id": "095" }, { "ename": "drowzee", "type": "psychic|", "name": "催眠貘", "id": "096" }, { "ename": "hypno", "type": "psychic|", "name": "引梦貘人", "id": "097" }, { "ename": "krabby", "type": "water|", "name": "大钳蟹", "id": "098" }, { "ename": "kingler", "type": "water|", "name": "巨钳蟹", "id": "099" }, { "ename": "voltorb", "type": "electric|", "name": "霹雳电球", "id": "100" }, { "ename": "electrode", "type": "electric|", "name": "顽皮雷弹", "id": "101" }, { "ename": "exeggcute", "type": "grass|psychic", "name": "蛋蛋", "id": "102" }, { "ename": "exeggutor", "type": "grass|psychic", "name": "椰蛋树", "id": "103" }, { "ename": "cubone", "type": "ground|", "name": "卡拉卡拉", "id": "104" }, { "ename": "marowak", "type": "ground|", "name": "嘎啦嘎啦", "id": "105" }, { "ename": "hitmonlee", "type": "fight|", "name": "飞腿郎", "id": "106" }, { "ename": "hitmonchan", "type": "fight|", "name": "快拳郎", "id": "107" }, { "ename": "lickitung", "type": "normal|", "name": "大舌头", "id": "108" }, { "ename": "koffing", "type": "poison|", "name": "瓦斯弹", "id": "109" }, { "ename": "weezing", "type": "poison|", "name": "双弹瓦斯", "id": "110" }, { "ename": "rhyhorn", "type": "ground|rock", "name": "独角犀牛", "id": "111" }, { "ename": "rhydon", "type": "ground|rock", "name": "钻角犀兽", "id": "112" }, { "ename": "chansey", "type": "normal|", "name": "吉利蛋", "id": "113" }, { "ename": "tangela", "type": "grass|", "name": "蔓藤怪", "id": "114" }, { "ename": "kangaskhan", "type": "normal|", "name": "袋兽", "id": "115" }, { "ename": "horsea", "type": "water|", "name": "墨海马", "id": "116" }, { "ename": "seadra", "type": "water|", "name": "海刺龙", "id": "117" }, { "ename": "goldeen", "type": "water|", "name": "角金鱼", "id": "118" }, { "ename": "seaking", "type": "water|", "name": "金鱼王", "id": "119" }, { "ename": "staryu", "type": "water|", "name": "海星星", "id": "120" }, { "ename": "starmie", "type": "water|psychic", "name": "宝石海星", "id": "121" }, { "ename": "mr. mime", "type": "psychic|fairy", "name": "魔墙人偶", "id": "122" }, { "ename": "scyther", "type": "bug|fly", "name": "飞天螳螂", "id": "123" }, { "ename": "jynx", "type": "ice|psychic", "name": "迷唇姐", "id": "124" }, { "ename": "electabuzz", "type": "electric|", "name": "电击兽", "id": "125" }, { "ename": "magmar", "type": "fire|", "name": "鸭嘴火兽", "id": "126" }, { "ename": "pinsir", "type": "bug|", "name": "凯罗斯", "id": "127" }, { "ename": "tauros", "type": "normal|", "name": "肯泰罗", "id": "128" }, { "ename": "magikarp", "type": "water|", "name": "鲤鱼王", "id": "129" }, { "ename": "gyarados", "type": "water|fly", "name": "暴鲤龙", "id": "130" }, { "ename": "lapras", "type": "water|ice", "name": "拉普拉斯", "id": "131" }, { "ename": "ditto", "type": "normal|", "name": "百变怪", "id": "132" }, { "ename": "eevee", "type": "normal|", "name": "伊布", "id": "133" }, { "ename": "vaporeon", "type": "water|", "name": "水伊布", "id": "134" }, { "ename": "jolteon", "type": "electric|", "name": "雷伊布", "id": "135" }, { "ename": "flareon", "type": "fire|", "name": "火伊布", "id": "136" }, { "ename": "porygon", "type": "normal|", "name": "多边兽", "id": "137" }, { "ename": "omanyte", "type": "rock|water", "name": "菊石兽", "id": "138" }, { "ename": "omastar", "type": "rock|water", "name": "多刺菊石兽", "id": "139" }, { "ename": "kabuto", "type": "rock|water", "name": "化石盔", "id": "140" }, { "ename": "kabutops", "type": "rock|water", "name": "镰刀盔", "id": "141" }, { "ename": "aerodactyl", "type": "rock|fly", "name": "化石翼龙", "id": "142" }, { "ename": "snorlax", "type": "normal|", "name": "卡比兽", "id": "143" }, { "ename": "articuno", "type": "ice|fly", "name": "急冻鸟", "id": "144" }, { "ename": "zapdos", "type": "electric|fly", "name": "闪电鸟", "id": "145" }, { "ename": "moltres", "type": "fire|fly", "name": "火焰鸟", "id": "146" }, { "ename": "dratini", "type": "dragon|", "name": "迷你龙", "id": "147" }, { "ename": "dragonair", "type": "dragon|", "name": "哈克龙", "id": "148" }, { "ename": "dragonite", "type": "dragon|fly", "name": "快龙", "id": "149" }, { "ename": "mewtwo", "type": "psychic|", "name": "超梦", "id": "150" }, { "ename": "mew", "type": "psychic|", "name": "梦幻", "id": "151" }],
    pok_name:"妙蛙种子",
    type1:"/assets/images/type/grass.png",
    type2:"/assets/images/type/poison.png",
    type2_display:"inline"
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
  change_head:function(){
    if (this.data.remain_count<= 0){
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
    } else if (seed > 9900 && seed < 9999) {
      var items = [142,143,144,145,146,147,148,149]
      var pok_num = items[Math.floor(Math.random() * items.length)];
    }else{
      var pok_num = Math.round(this.randomNum(1, 10000) / 10000 * 141);
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
    //设置当前pok_name,pok_type
    var pok_dict = this.data.pok_idx;
    for (var i in pok_dict) {
      if (pok_dict[i].id == this.data.pok_num) {
        var pok_name = pok_dict[i].name;
        var pok_type1 = pok_dict[i].type.split("|")[0];
        var pok_type2 = pok_dict[i].type.split("|")[1];
      }
    }
    //设置main页展示type
    this.set_pok_type(pok_type1,"");
    if (pok_type2) {
      this.setData({
        type2_display: "inline",
      });
      this.set_pok_type(pok_type2, "two")
    } else {
      this.setData({
        type2_display: "none",
      });
      this.set_pok_type("", "two")
    }
    this.setData({
      pok_name: pok_name,
      pok_type1: pok_type1
    });
  },
  set_pok_type(type,two){
    if(two==""){
      if(type=="fire"){
        this.setData({
          type1:"/assets/images/type/fire.png"
        })
      }
      else if (type == "fire") {
        this.setData({
          type1: "/assets/images/type/fire.png"
        })
      }
      else if (type == "bug") {
        this.setData({
          type1: "/assets/images/type/bug.png"
        })
      }
      else if (type == "dark") {
        this.setData({
          type1: "/assets/images/type/dark.png"
        })
      }
      else if (type == "dragon") {
        this.setData({
          type1: "/assets/images/type/dragon.png"
        })
      }
      else if (type == "electric") {
        this.setData({
          type1: "/assets/images/type/electric.png"
        })
      }
      else if (type == "fairy") {
        this.setData({
          type1: "/assets/images/type/fairy.png"
        })
      }
      else if (type == "fight") {
        this.setData({
          type1: "/assets/images/type/fight.png"
        })
      }
      else if (type == "fly") {
        this.setData({
          type1: "/assets/images/type/fly.png"
        })
      }
      else if (type == "ghost") {
        this.setData({
          type1: "/assets/images/type/ghost.png"
        })
      }
      else if (type == "grass") {
        this.setData({
          type1: "/assets/images/type/grass.png"
        })
      }
      else if (type == "ground") {
        this.setData({
          type1: "/assets/images/type/ground.png"
        })
      }
      else if (type == "ice") {
        this.setData({
          type1: "/assets/images/type/ice.png"
        })
      }
      else if (type == "normal") {
        this.setData({
          type1: "/assets/images/type/normal.png"
        })
      }
      else if (type == "poison") {
        this.setData({
          type1: "/assets/images/type/poison.png"
        })
      }
      else if (type == "psychic") {
        this.setData({
          type1: "/assets/images/type/psychic.png"
        })
      }
      else if (type == "rock") {
        this.setData({
          type1: "/assets/images/type/rock.png"
        })
      }
      else if (type == "steel") {
        this.setData({
          type1: "/assets/images/type/steel.png"
        })
      }
      else if (type == "water") {
        this.setData({
          type1: "/assets/images/type/water.png"
        })
      }
    }
    else{
      if (type == "fire") {
        this.setData({
          type2: "/assets/images/type/fire.png"
        })
      }
      else if (type == "fire") {
        this.setData({
          type2: "/assets/images/type/fire.png"
        })
      }
      else if (type == "bug") {
        this.setData({
          type2: "/assets/images/type/bug.png"
        })
      }
      else if (type == "dark") {
        this.setData({
          type2: "/assets/images/type/dark.png"
        })
      }
      else if (type == "dragon") {
        this.setData({
          type2: "/assets/images/type/dragon.png"
        })
      }
      else if (type == "electric") {
        this.setData({
          type2: "/assets/images/type/electric.png"
        })
      }
      else if (type == "fairy") {
        this.setData({
          type2: "/assets/images/type/fairy.png"
        })
      }
      else if (type == "fight") {
        this.setData({
          type2: "/assets/images/type/fight.png"
        })
      }
      else if (type == "fly") {
        this.setData({
          type2: "/assets/images/type/fly.png"
        })
      }
      else if (type == "ghost") {
        this.setData({
          type2: "/assets/images/type/ghost.png"
        })
      }
      else if (type == "grass") {
        this.setData({
          type2: "/assets/images/type/grass.png"
        })
      }
      else if (type == "ground") {
        this.setData({
          type2: "/assets/images/type/ground.png"
        })
      }
      else if (type == "ice") {
        this.setData({
          type2: "/assets/images/type/ice.png"
        })
      }
      else if (type == "normal") {
        this.setData({
          type2: "/assets/images/type/normal.png"
        })
      }
      else if (type == "poison") {
        this.setData({
          type2: "/assets/images/type/poison.png"
        })
      }
      else if (type == "psychic") {
        this.setData({
          type2: "/assets/images/type/psychic.png"
        })
      }
      else if (type == "rock") {
        this.setData({
          type2: "/assets/images/type/rock.png"
        })
      }
      else if (type == "steel") {
        this.setData({
          type2: "/assets/images/type/steel.png"
        })
      }
      else if (type == "water") {
        this.setData({
          type2: "/assets/images/type/water.png"
        })
      }
      else if (type == "") {
        this.setData({
          type2: ""
        })
      }
    }
  },
  choose:function(){
    wx.showModal({
      title: '你选择了' + this.data.pok_name,
      content: '确定要选择吗？',
      success: function (sm) {
        if (sm.confirm) {
          // 用户点击了确定 可以调用删除方法了
        } else if (sm.cancel) {
          console.log("cancel")
        }
      }
    });
  },
  get_remain_count:function(){
    this.setData({
      remain_count: wx.getStorageSync(app.globalData.today)
    })
  },
  consume_remain_count: function () {
    var remain_count = this.data.remain_count;
    remain_count = remain_count - 1;
    this.setData({
      remain_count:remain_count
    })
    wx.setStorageSync(app.globalData.today, remain_count);
    console.log(wx.getStorageSync(app.globalData.today))
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.get_remain_count();
    /*wx.showToast({
      title: '点击头像开始抽奖',
      duration:1000
    })*/
  },
  saveImgToPhotosAlbumTap: function () {
    console.log(this.data.pok_num);
    wx.downloadFile({
      url: this.data.head_image,
      success: function (res) {
        console.log(res)
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function (res) {
            console.log(res)
          },
          fail: function (res) {
            console.log(res)
            console.log('fail')
          }
        })
      },
      fail: function () {
        console.log("")
      }
    })

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