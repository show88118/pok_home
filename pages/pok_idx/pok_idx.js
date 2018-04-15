// pages/pok_idx/pok_idx.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
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
    for(var j=1;j<=1000;j++){
      if (this.isheshu(j)){ 
        console.log(j)
      }
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
  
  }
})