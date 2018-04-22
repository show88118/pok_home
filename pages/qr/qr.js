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
        var rev_data = that.aes_Decrypt(data)
        if (rev_data.indexOf("transfer_pok") < 0 && rev_data.indexOf("map_pok") < 0 && rev_data.indexOf("candy") < 0 && rev_data.indexOf("fight") < 0) {
          wx.showToast({
            title: '无效二维码',
            icon: "none"
          })
          return
        }
        var rev_data_list = rev_data.split("|")
        var transfer_type = rev_data_list[0]
        var transfer_time = rev_data_list[1]
        var transfer_pok_info = rev_data_list[2]
        //transfer_pok|1524056869379|1,004,1,60,8,1,,0
        //map_pok|1524056869379|id,gu,level
        //candy|1524056869379|count
        console.log(transfer_type)
        console.log(transfer_time)
        console.log(transfer_pok_info)
        
        //判断传输类型
        if (transfer_type == "transfer_pok"){
          var last_transfer_time = wx.getStorageSync("last_transfer_time")
          if (last_transfer_time == "" || last_transfer_time == undefined) {
          } else {
            if (parseInt(last_transfer_time) == parseInt(transfer_time)) {
              wx.showToast({
                title: '该精灵已被接收',
                icon: "none"
              })
              return
            }
          }
          var now_time = new Date().getTime()

          if (now_time - parseInt(transfer_time) > 30*60*1000){
            wx.showToast({
              title: '已逃跑',
              icon: "none"
            })
            return
          }else{
            //成功接收精灵
            //更新最后传输时间
            wx.setStorageSync("last_transfer_time", transfer_time)
            var rev_pok_info = transfer_pok_info.split(",")
            var rev_pok_id = rev_pok_info[1]
            var rev_pok_level = parseInt(rev_pok_info[2])
            var rev_pok_growup = parseInt(rev_pok_info[3])
            var rev_pok_usedhp = parseInt(rev_pok_info[4])
            var rev_pok_sex = parseInt(rev_pok_info[5])
            var rev_pok_master = rev_pok_info[6]
            var rev_pok_exp = parseInt(rev_pok_info[7])
            //通信精灵加入我的精灵列表
            var haved_pok = util.get_self_pok();
            var max_pok_idx = 0
            for (var i in haved_pok) {
              var i_idx = parseInt(haved_pok[i]["idx"])
              if (i_idx > max_pok_idx) {
                max_pok_idx = i_idx
              }
            }
            var my_pok = {}
            my_pok["idx"] = (max_pok_idx + 1).toString()
            my_pok["id"] = rev_pok_id
            my_pok["level"] = rev_pok_level
            my_pok["growup"] = rev_pok_growup
            my_pok["usedhp"] = rev_pok_usedhp
            my_pok["sex"] = rev_pok_sex
            my_pok["master"] = "other"
            my_pok["exp"] = rev_pok_exp
            //保存刷新到我的精灵
            haved_pok.push(my_pok)
            wx.setStorageSync("pok_id_list", haved_pok)
            that.refresh_pok_list()
            //通信进化
            if (["075", "093", "067", "064"].indexOf(rev_pok_id) >= 0){
              wx.navigateBack()
            }else{
              wx.showToast({
                title: '通信成功',
                icon:"none"
              })
            }
          }
        } else if (transfer_type == "map_pok")
        {//传送地图怪
          var now_time = new Date().getTime()
          if (now_time - parseInt(transfer_time) > 120 * 60 * 1000) {
              wx.showToast({
                title: '已过期',
                icon: "none"
              })
              return
            }
            var rev_map_pok_info = transfer_pok_info.split(",")
            var rev_map_pok_id = rev_map_pok_info[0]
            var rev_map_pok_level = parseInt(rev_map_pok_info[2])
            var rev_map_pok_growup = parseInt(rev_map_pok_info[1])
            var rev_map_pok_usedhp = 0
            var rev_map_pok_sex = 1
            var rev_map_pok_master = ""
            var rev_map_pok_exp = 0
            var map_pok = {}
            map_pok["pok_id"] = rev_map_pok_id
            map_pok["pok_growup"] = parseInt(that.get_pok_growup())
            map_pok["pok_level"] = rev_map_pok_level
            map_pok["pok_usedhp"] = rev_map_pok_usedhp
            map_pok["pok_sex"] = rev_map_pok_sex
            map_pok["pok_master"] = rev_map_pok_master
            map_pok["pok_exp"] = rev_map_pok_exp
            //获取本地野外精灵数据
            var wild_pok_list = wx.getStorageSync("wild_pok_list")
            if (wild_pok_list == "" || wild_pok_list == undefined) {
              var wild_pok_list = []
              map_pok["wild_pok_idx"] = 1
              wild_pok_list.push(map_pok)
            }else{
              for (i in wild_pok_list){
                var max_idx = 0
                console.log(wild_pok_list[i]["wild_pok_idx"])
                if (wild_pok_list[i]["wild_pok_idx"] > max_idx){
                  max_idx = wild_pok_list[i]["wild_pok_idx"]
                }
              }
              map_pok["wild_pok_idx"] = max_idx+1
              wild_pok_list.push(map_pok)
            }
            wx.setStorageSync("wild_pok_list", wild_pok_list)
            wx.setStorageSync("last_wild_pok_time", now_time)
            wx.showToast({
              title: '野外出现了!!!',
              icon:"none"
            })
            util.sleep(1000)
            wx.navigateBack()
        }
        //传送赠送糖果
        else if (transfer_type == "candy"){
          var now_time = new Date().getTime()
          var last_give_candy_time = wx.getStorageSync("last_give_candy_time")
          if (last_give_candy_time == "" || last_give_candy_time == undefined) {
            wx.setStorageSync("last_give_candy_time", transfer_time)
          } else {
            if (parseInt(last_give_candy_time) == parseInt(transfer_time)) {
              wx.showToast({
                title: '领取过了',
                icon: "none"
              })
              return
            }
          }
          var give_candy_count = parseInt(transfer_pok_info)
          var candy_count = wx.getStorageSync("candy_count")
          if (candy_count == "" || candy_count == undefined){
            candy_count = 0
          }else{
            candy_count = candy_count + give_candy_count
          }
          wx.setStorageSync("last_give_candy_time", transfer_time)
          wx.setStorageSync("candy_count", parseInt(candy_count))
          wx.showToast({
            title: '领取成功',
            icon:"none"
          })
          util.sleep(1000)
          wx.navigateBack()
        }
        }
    });
    
    console.log(that.data.rev_data)
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
      content: "30分钟内必须有训练家接收,否则口袋妖怪将逃走,无法撤销",
      success: function (sm) {
        if (sm.confirm) {
          //后门
          // var transfer_data = "transfer_pok|" + new Date().getTime() + "|1,093,47,60,8,1,,0"
        //map_pok|1524056869379|id,gu,level
        //candy|1524056869379|count
         // var transfer_data = "candy|" + new Date().getTime() + "|20000"
          //生成密文精灵数据
          var qr_content = that.aes_Encrypt(transfer_data.toString())
          console.log(qr_content)
          //console.log(transfer_data)
          that.create_qr(qr_content)
          //将本地精灵移除
          var haved_pok = util.get_self_pok();
          for (var i in haved_pok) {
            if (haved_pok[i]["idx"] == current_pok_idx) {
              haved_pok.splice(i, 1)
            }
          }
          //haved_pok入库
          wx.setStorageSync("pok_id_list", haved_pok)
          //倒序排列我的精灵
          haved_pok = haved_pok.reverse()
          that.refresh_pok_list(haved_pok);
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
      duration:1000
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