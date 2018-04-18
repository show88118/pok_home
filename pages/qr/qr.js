// pages/main/index.js
var QR = require("../../utils/qrcode.js");
var util = require('../../utils/util.js');
var aes = require('../../utils/aes.js')
Page({
  data:{
    aes_key: aes.CryptoJS.enc.Utf8.parse("1989022819900212"),
    aes_iv: aes.CryptoJS.enc.Utf8.parse('2016092420160924')
  },
  //调用扫码功能
  callQRcode: function () {
    var that = this
    wx.scanCode({
      success: (res) => {
        var data = res.result;
        console.log(data)
        data = that.aes_Decrypt(data)
        console.log(data)
        that.setData({
          rev_data:data
        })
        }
    });
  },
  //刷新我的精灵list
  refresh_pok_list: function () {
    //获取我的精灵列表数据
    var my_pok_list_mini = []
    var haved_pok = wx.getStorageSync("pok_id_list")
    var haved_pok_count = haved_pok.length
    //倒序排列我的精灵
    haved_pok = haved_pok.reverse()
    for (var i in haved_pok) {
      var pok_id = haved_pok[i]["id"];
      var mini_img = "/assets/images/mini/" + pok_id + ".png";
      //var mini_img = "https://raw.githubusercontent.com/show88118/pokdata/master/" + pok_id + ".gif"
      var head_img = "/assets/images/head/" + pok_id + ".png";
      my_pok_list_mini.push([i, pok_id, mini_img])
    }
    this.setData({
      haved_pok:haved_pok,
      my_pok_list_mini: my_pok_list_mini,
      my_pok_list_width: 126 * haved_pok_count,
    })
  },
  //切换当前精灵
  change_head: function (event) {
    var pok_list_idx = event["currentTarget"]["dataset"]["idx"]
    var haved_pok = this.data.haved_pok
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
    //获取pok_info
    var pok_info = util.get_pok_info(current_pok_id);
    var pok_name = pok_info[0]
    //震动
    wx.vibrateShort({})
    //生成传输数据
    var now_time = new Date().getTime()
    var target_pok = current_pok_idx + "," + current_pok_id + "," + current_pok_level + "," + current_pok_growup + "," + current_pok_usedhp + "," + current_pok_sex + "," + current_pok_master + "," + current_pok_exp
    var transfer_data = "transfer_pok" + "|" + now_time + "|" + target_pok
    var that = this;
    wx.showModal({
      title: "通信" + pok_name + "cp:" + current_pok_growup,
      content: "30分钟内必须有训练家接收，否则口袋妖怪将逃走",
      success: function (sm) {
        if (sm.confirm) {
          //生成密文精灵数据
          var qr_content = that.aes_Encrypt(transfer_data.toString())
          console.log(qr_content)
          //console.log(transfer_data)
          that.create_qr(qr_content)
        } else if (sm.cancel) {
          console.log("cancel")
        }
      }
    });
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
  onLoad:function(options){
    //刷新我的精灵列表
    this.refresh_pok_list()
    // 页面初始化 options为页面跳转所带来的参数
    var size = this.setCanvasSize();//动态设置画布大小
    this.createQrCode("pokemon","mycanvas",size.w,size.h);
  },
  onReady:function(){
    
  },
  onShow:function(){
    
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },

  onUnload:function(){
    // 页面关闭

  },
  //适配不同屏幕大小的canvas
  setCanvasSize:function(){
    var size={};
    try {
        var res = wx.getSystemInfoSync();
        var scale = 750/686;//不同屏幕下canvas的适配比例；设计稿是750宽
        var width = res.windowWidth/scale;
        var height = width;//canvas画布为正方形
        size.w = width;
        size.h = height;
      } catch (e) {
        // Do something when catch error
        console.log("获取设备信息失败"+e);
      } 
    return size;
  } ,
  createQrCode:function(url,canvasId,cavW,cavH){
    //调用插件中的draw方法，绘制二维码图片
    QR.qrApi.draw(url,canvasId,cavW,cavH);
    // var that = this;
    // //二维码生成之后调用canvasToTempImage();延迟3s，否则获取图片路径为空
    // var st = setTimeout(function(){
    //   that.canvasToTempImage();
    //   clearTimeout(st);
    // },3000);
    
  },
  //获取临时缓存照片路径，存入data中
  canvasToTempImage:function(){
    var that = this;
    wx.canvasToTempFilePath({
      canvasId: 'mycanvas',
      success: function (res) {
          var tempFilePath = res.tempFilePath;
          console.log(tempFilePath);
          that.setData({
              imagePath:tempFilePath,
          });
      },
      fail: function (res) {
          console.log(res);
      }
    });
  },
  //点击图片进行预览，长按保存分享图片
  previewImg:function(e){
    var img = this.data.imagePath
    wx.previewImage({
      current: img, // 当前显示图片的http链接
      urls: [img] // 需要预览的图片http链接列表
    })
  },
  create_qr: function(data) {
    var that = this;
    var url = data
    that.setData({
      maskHidden:false,
    });
    wx.showToast({
      title: '通信ing',
      icon: 'loading',
      duration:2000
    });
    var st = setTimeout(function(){
      wx.hideToast()
      var size = that.setCanvasSize();
      //绘制二维码
      that.createQrCode(url,"mycanvas",size.w,size.h);
      that.setData({
        maskHidden:true
      });
      clearTimeout(st);
    },2000)
    
  }

})