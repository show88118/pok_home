// pages/main/main.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    head_image:"/assets/images/head/001.png",
    pok_num:"001",
    pok_idx: [{ "name": "妙蛙种子", "id": "001" }, { "name": "妙蛙草", "id": "002" }, { "name": "妙蛙花", "id": "003" }, { "name": "小火龙", "id": "004" }, { "name": "火恐龙", "id": "005" }, { "name": "喷火龙", "id": "006" }, { "name": "杰尼龟", "id": "007" }, { "name": "卡咪龟", "id": "008" }, { "name": "水箭龟", "id": "009" }, { "name": "绿毛虫", "id": "010" }, { "name": "铁甲蛹", "id": "011" }, { "name": "巴大蝶", "id": "012" }, { "name": "独角虫", "id": "013" }, { "name": "铁壳蛹", "id": "014" }, { "name": "大针蜂", "id": "015" }, { "name": "波波", "id": "016" }, { "name": "比比鸟", "id": "017" }, { "name": "大比鸟", "id": "018" }, { "name": "小拉达", "id": "019" }, { "name": "拉达", "id": "020" }, { "name": "烈雀", "id": "021" }, { "name": "大嘴雀", "id": "022" }, { "name": "阿柏蛇", "id": "023" }, { "name": "阿柏怪", "id": "024" }, { "name": "皮卡丘", "id": "025" }, { "name": "雷丘", "id": "026" }, { "name": "穿山鼠", "id": "027" }, { "name": "穿山王", "id": "028" }, { "name": "尼多兰", "id": "029" }, { "name": "尼多娜", "id": "030" }, { "name": "尼多后", "id": "031" }, { "name": "尼多朗", "id": "032" }, { "name": "尼多力诺", "id": "033" }, { "name": "尼多王", "id": "034" }, { "name": "皮皮", "id": "035" }, { "name": "皮可西", "id": "036" }, { "name": "六尾", "id": "037" }, { "name": "九尾", "id": "038" }, { "name": "胖丁", "id": "039" }, { "name": "胖可丁", "id": "040" }, { "name": "超音蝠", "id": "041" }, { "name": "大嘴蝠", "id": "042" }, { "name": "走路草", "id": "043" }, { "name": "臭臭花", "id": "044" }, { "name": "霸王花", "id": "045" }, { "name": "派拉斯", "id": "046" }, { "name": "派拉斯特", "id": "047" }, { "name": "毛球", "id": "048" }, { "name": "摩鲁蛾", "id": "049" }, { "name": "地鼠", "id": "050" }, { "name": "三地鼠", "id": "051" }, { "name": "喵喵", "id": "052" }, { "name": "猫老大", "id": "053" }, { "name": "可达鸭", "id": "054" }, { "name": "哥达鸭", "id": "055" }, { "name": "猴怪", "id": "056" }, { "name": "火暴猴", "id": "057" }, { "name": "卡蒂狗", "id": "058" }, { "name": "风速狗", "id": "059" }, { "name": "蚊香蝌蚪", "id": "060" }, { "name": "蚊香君", "id": "061" }, { "name": "蚊香泳士", "id": "062" }, { "name": "凯西", "id": "063" }, { "name": "勇基拉", "id": "064" }, { "name": "胡地", "id": "065" }, { "name": "腕力", "id": "066" }, { "name": "豪力", "id": "067" }, { "name": "怪力", "id": "068" }, { "name": "喇叭芽", "id": "069" }, { "name": "口呆花", "id": "070" }, { "name": "大食花", "id": "071" }, { "name": "玛瑙水母", "id": "072" }, { "name": "毒刺水母", "id": "073" }, { "name": "小拳石", "id": "074" }, { "name": "隆隆石", "id": "075" }, { "name": "隆隆岩", "id": "076" }, { "name": "小火马", "id": "077" }, { "name": "烈焰马", "id": "078" }, { "name": "呆呆兽", "id": "079" }, { "name": "呆壳兽", "id": "080" }, { "name": "小磁怪", "id": "081" }, { "name": "三合一磁怪", "id": "082" }, { "name": "大葱鸭", "id": "083" }, { "name": "嘟嘟", "id": "084" }, { "name": "嘟嘟利", "id": "085" }, { "name": "小海狮", "id": "086" }, { "name": "白海狮", "id": "087" }, { "name": "臭泥", "id": "088" }, { "name": "臭臭泥", "id": "089" }, { "name": "大舌贝", "id": "090" }, { "name": "刺甲贝", "id": "091" }, { "name": "鬼斯", "id": "092" }, { "name": "鬼斯通", "id": "093" }, { "name": "耿鬼", "id": "094" }, { "name": "大岩蛇", "id": "095" }, { "name": "催眠貘", "id": "096" }, { "name": "引梦貘人", "id": "097" }, { "name": "大钳蟹", "id": "098" }, { "name": "巨钳蟹", "id": "099" }, { "name": "霹雳电球", "id": "100" }, { "name": "顽皮雷弹", "id": "101" }, { "name": "蛋蛋", "id": "102" }, { "name": "椰蛋树", "id": "103" }, { "name": "卡拉卡拉", "id": "104" }, { "name": "嘎啦嘎啦", "id": "105" }, { "name": "飞腿郎", "id": "106" }, { "name": "快拳郎", "id": "107" }, { "name": "大舌头", "id": "108" }, { "name": "瓦斯弹", "id": "109" }, { "name": "双弹瓦斯", "id": "110" }, { "name": "独角犀牛", "id": "111" }, { "name": "钻角犀兽", "id": "112" }, { "name": "吉利蛋", "id": "113" }, { "name": "蔓藤怪", "id": "114" }, { "name": "袋兽", "id": "115" }, { "name": "墨海马", "id": "116" }, { "name": "海刺龙", "id": "117" }, { "name": "角金鱼", "id": "118" }, { "name": "金鱼王", "id": "119" }, { "name": "海星星", "id": "120" }, { "name": "宝石海星", "id": "121" }, { "name": "魔墙人偶", "id": "122" }, { "name": "飞天螳螂", "id": "123" }, { "name": "迷唇姐", "id": "124" }, { "name": "电击兽", "id": "125" }, { "name": "鸭嘴火兽", "id": "126" }, { "name": "凯罗斯", "id": "127" }, { "name": "肯泰罗", "id": "128" }, { "name": "鲤鱼王", "id": "129" }, { "name": "暴鲤龙", "id": "130" }, { "name": "拉普拉斯", "id": "131" }, { "name": "百变怪", "id": "132" }, { "name": "伊布", "id": "133" }, { "name": "水伊布", "id": "134" }, { "name": "雷伊布", "id": "135" }, { "name": "火伊布", "id": "136" }, { "name": "多边兽", "id": "137" }, { "name": "菊石兽", "id": "138" }, { "name": "多刺菊石兽", "id": "139" }, { "name": "化石盔", "id": "140" }, { "name": "镰刀盔", "id": "141" }, { "name": "化石翼龙", "id": "142" }, { "name": "卡比兽", "id": "143" }, { "name": "急冻鸟", "id": "144" }, { "name": "闪电鸟", "id": "145" }, { "name": "火焰鸟", "id": "146" }, { "name": "迷你龙", "id": "147" }, { "name": "哈克龙", "id": "148" }, { "name": "快龙", "id": "149" }, { "name": "超梦", "id": "150" }, { "name": "梦幻", "id": "151" }],
    pok_name:"妙蛙种子"
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
    this.setData({
      head_image: "/assets/images/head/" + pok_num + ".png",
      pok_num: pok_num.toString()
    })
    var pok_dict = this.data.pok_idx;
    for (var i in pok_dict) {
      if (pok_dict[i].id == this.data.pok_num) {
        var pok_name = pok_dict[i].name;
      }
    }
    this.setData({
      pok_name: pok_name
    });
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showToast({
      title: '点击头像开始抽奖',
      duration:1000
    })
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
      title: '我抽到了' + this.data.pok_name + "!",
      path: 'pages/index/index'//分享的页面地址
    }
  }
})