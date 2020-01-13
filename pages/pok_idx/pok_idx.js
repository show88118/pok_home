// pages/main/index.js
var QR = require("../../utils/qrcode.js");
var util = require('../../utils/util.js');
var aes = require('../../utils/aes.js')
Page({
  data: {
    aes_key: aes.CryptoJS.enc.Utf8.parse("x0TJGtj/JWqBkSlmmZFamwIptyW6fCbGBElkfjYYJyA="),
    aes_iv: aes.CryptoJS.enc.Utf8.parse('z0uOms6fRH+xc3I40qNNDw==')
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("liufan" + this.aes_Decrypt("RGik5MYIYhboWqNEh9UeMQ=="))
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  iszhishu:function(c){
    for(var i=2;i<c;i++){
      if(c%i==0){
        return false;
      }
    }
    return true;
  },
  isheshu:function(c){
    if(this.iszhishu(c)){
      return false;
    }
    return true;
  },
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
  
  }
})