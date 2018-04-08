// pages/main/main.js
var util = require('../../utils/util.js');
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    head_image:"/assets/images/head/001.png",
    pok_num:"001",
    pok_idx: app.globalData.pok_idx,
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
  catch_pok:function(pok_idx){

  },
  change_head:function(){
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
    //储存训练集的pok_idx
    var haved_pok = util.get_self_pok()
    if (haved_pok.length == 0){
      haved_pok = []
    }
    haved_pok.push({ id: this.data.pok_num })
    wx.setStorageSync("pok_id_list", haved_pok)
    //console.log(util.get_self_pok())
    //获取pok_info
    var pok_info = util.get_pok_info(this.data.pok_num);
    var pok_name = pok_info[0];
    var pok_type1 = pok_info[1];
    var pok_type2 = pok_info[2] ;
    util.pok_type(pok_type1, pok_type2);
    var type2_display = app.globalData.type2_display;
    var type1 = app.globalData.type1;
    var type2 = app.globalData.type2;
    this.setData({
      type2_display: type2_display,
      type1: type1,
      type2: type2
    })
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
    if (remain_count>0){
      this.setData({
        remain_count:remain_count
      })
    }else{
      this.setData({
        remain_count: "0"
      })    
    }
    wx.setStorageSync(app.globalData.today, this.data.remain_count);
    //剩余次数查询
    //console.log(wx.getStorageSync(app.globalData.today))
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